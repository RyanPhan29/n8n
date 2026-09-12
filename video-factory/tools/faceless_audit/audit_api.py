#!/usr/bin/env python3
"""
AUDIT faceless YouTube qua YouTube Data API v3 (Đường B — chạy khi youtube.com bị chặn).
Key đọc từ biến môi trường YT_API_KEY (KHÔNG hardcode/commit).

  discover  -> data/channels.json   (search seeds -> lọc sub 10k-100k)
  collect   -> data/videos.jsonl    (30 video gần nhất/kênh, đủ metadata)
  analyze   -> data/report_tables.md + faceless_audit.csv

Quota: search.list=100u/call · channels/playlistItems/videos.list=1u/call. Log tổng quota đã tiêu.
"""
import os, sys, json, time, csv, re, statistics, collections, datetime, pathlib, urllib.parse, urllib.request

ROOT = pathlib.Path(__file__).parent; DATA = ROOT / "data"; DATA.mkdir(exist_ok=True)
KEY = os.environ.get("YT_API_KEY")
API = "https://www.googleapis.com/youtube/v3/"
SUB_MIN, SUB_MAX = 10_000, 100_000
N_VIDEOS = 30
RECENT_DAYS = 120
_quota = {"u": 0}

def api(endpoint, cost=1, **params):
    params["key"] = KEY
    url = API + endpoint + "?" + urllib.parse.urlencode(params)
    for attempt in range(4):
        try:
            with urllib.request.urlopen(url, timeout=40) as r:
                _quota["u"] += cost
                return json.load(r)
        except urllib.error.HTTPError as e:
            body = e.read().decode()[:300]
            if e.code in (403, 400) and "quota" in body.lower():
                print(f"[API] QUOTA/err {e.code}: {body}", file=sys.stderr); sys.exit(2)
            print(f"[API] {endpoint} {e.code}: {body}", file=sys.stderr)
            if attempt == 3: return {}
            time.sleep(2 * (attempt + 1))
        except Exception as e:
            if attempt == 3: return {}
            time.sleep(2 * (attempt + 1))
    return {}

def seeds():
    return [l.strip() for l in (ROOT / "seeds.txt").read_text().splitlines()
            if l.strip() and not l.startswith("#")]

# ---------------- DISCOVER ----------------
def discover():
    cand = {}   # channelId -> seed
    for q in seeds():
        d = api("search", cost=100, part="snippet", q=q, type="video",
                maxResults=50, order="viewCount", regionCode="VN")
        for it in d.get("items", []):
            cid = it["snippet"]["channelId"]
            cand.setdefault(cid, q)
        print(f"[discover] '{q}': tổng candidate {len(cand)} (quota {_quota['u']}u)")
    # channels.list theo batch 50 -> stats + uploads playlist
    kept = []
    ids = list(cand)
    for i in range(0, len(ids), 50):
        d = api("channels", cost=1, part="snippet,statistics,contentDetails",
                id=",".join(ids[i:i+50]), maxResults=50)
        for it in d.get("items", []):
            st = it.get("statistics", {})
            subs = int(st["subscriberCount"]) if st.get("subscriberCount") and not st.get("hiddenSubscriberCount") else None
            if subs and SUB_MIN <= subs <= SUB_MAX:
                kept.append({
                    "channel_id": it["id"], "channel": it["snippet"]["title"],
                    "subscribers": subs, "total_views": int(st.get("viewCount", 0)),
                    "total_videos": int(st.get("videoCount", 0)),
                    "country": it["snippet"].get("country"),
                    "published": it["snippet"].get("publishedAt"),
                    "uploads": it["contentDetails"]["relatedPlaylists"].get("uploads"),
                    "seed": cand[it["id"]],
                    "desc": it["snippet"].get("description", "")[:200],
                })
    kept.sort(key=lambda c: c["subscribers"], reverse=True)
    (DATA / "channels.json").write_text(json.dumps(kept, ensure_ascii=False, indent=2))
    print(f"[discover] XONG: {len(kept)} kênh 10k-100k -> data/channels.json | quota {_quota['u']}u")

# ---------------- COLLECT ----------------
def _iso_dur(s):
    m = re.match(r"PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?", s or "")
    if not m: return None
    h, mi, se = (int(x) if x else 0 for x in m.groups())
    return h*3600 + mi*60 + se

def collect():
    chans = json.loads((DATA / "channels.json").read_text())
    vids = []
    for ci, c in enumerate(chans, 1):
        up = c.get("uploads")
        if not up: continue
        d = api("playlistItems", cost=1, part="contentDetails", playlistId=up, maxResults=N_VIDEOS)
        vid_ids = [it["contentDetails"]["videoId"] for it in d.get("items", [])]
        for i in range(0, len(vid_ids), 50):
            dd = api("videos", cost=1, part="snippet,contentDetails,statistics",
                     id=",".join(vid_ids[i:i+50]), maxResults=50)
            for it in dd.get("items", []):
                sn, cd, st = it["snippet"], it["contentDetails"], it.get("statistics", {})
                vids.append({
                    "channel_id": c["channel_id"], "channel": c["channel"],
                    "subscribers": c["subscribers"], "seed": c["seed"],
                    "video_id": it["id"], "title": sn["title"],
                    "published": sn["publishedAt"], "duration": _iso_dur(cd.get("duration")),
                    "view_count": int(st.get("viewCount", 0)) if st.get("viewCount") else None,
                    "like_count": int(st["likeCount"]) if st.get("likeCount") else None,
                    "comment_count": int(st["commentCount"]) if st.get("commentCount") else None,
                    "caption": cd.get("caption") == "true",
                    "definition": cd.get("definition"),
                    "tags": sn.get("tags", []), "n_tags": len(sn.get("tags", [])),
                    "desc_len": len(sn.get("description", "")),
                    "has_link": bool(re.search(r"https?://", sn.get("description", ""))),
                    "thumb": (sn.get("thumbnails", {}).get("maxres")
                              or sn.get("thumbnails", {}).get("high", {})).get("url"),
                })
        if ci % 10 == 0: print(f"[collect] {ci}/{len(chans)} kênh, {len(vids)} video (quota {_quota['u']}u)")
    with (DATA / "videos.jsonl").open("w") as f:
        for v in vids: f.write(json.dumps(v, ensure_ascii=False) + "\n")
    print(f"[collect] XONG: {len(vids)} video -> data/videos.jsonl | quota {_quota['u']}u")

# ---------------- TITLE FEATURES + ANALYZE ----------------
PAIN = re.compile(r"nghèo|nợ|mất|sai lầm|bẫy|cháy túi|lỗ|thua|rủi ro", re.I)
GREED = re.compile(r"giàu|triệu phú|tỷ phú|tự do tài chính|đổi đời|làm giàu", re.I)
CURIO = re.compile(r"bí mật|sự thật|không ai|mà không|ít ai|tiết lộ|secret|truth|reveal", re.I)
QUEST = re.compile(r"vì sao|tại sao|có nên|làm sao|\?|why|how", re.I)
COMPARE = re.compile(r"\bvs\b|hay là| hay |so sánh", re.I)
DURPROM = re.compile(r"trong \d+ (phút|giây)|in \d+ min", re.I)
NUM = re.compile(r"\d+")
EMOJI = re.compile("[\U0001F000-\U0001FAFF\U00002600-\U000027BF]")

def feats(t):
    t = t or ""; caps = re.findall(r"\b[A-ZĐÀ-Ỹ]{2,}\b", t); nums = NUM.findall(t)
    return {"len_char": len(t), "len_word": len(t.split()),
            "has_number": bool(nums), "num_parity": ("odd" if nums and int(nums[0])%2 else "even") if nums else None,
            "has_caps": bool(caps), "is_question": bool(QUEST.search(t)),
            "is_compare": bool(COMPARE.search(t)), "curiosity": bool(CURIO.search(t)),
            "pain": bool(PAIN.search(t)), "greed": bool(GREED.search(t)),
            "has_emoji": bool(EMOJI.search(t)), "has_pipe": "|" in t,
            "dur_promise": bool(DURPROM.search(t))}

def analyze():
    rows = [json.loads(l) for l in (DATA / "videos.jsonl").read_text().splitlines() if l.strip()]
    by = collections.defaultdict(list)
    for r in rows:
        if r.get("view_count"): by[r["channel_id"]].append(r["view_count"])
    med = {c: statistics.median(v) for c, v in by.items() if v}
    now = datetime.datetime.now(datetime.timezone.utc)
    out = []
    for r in rows:
        f = feats(r.get("title")); vc = r.get("view_count") or 0
        try:
            age = max((now - datetime.datetime.fromisoformat(r["published"].replace("Z","+00:00"))).days, 1)
        except Exception: age = None
        f["age_days"] = age
        f["views_per_day"] = round(vc/age) if age else None
        f["breakout_ratio"] = round(vc/med[r["channel_id"]], 2) if med.get(r["channel_id"]) else None
        f["engagement"] = round(((r.get("like_count") or 0)+(r.get("comment_count") or 0))/vc, 4) if vc else None
        out.append({**{k: r[k] for k in ("channel","subscribers","seed","video_id","title","view_count","like_count","comment_count","duration","caption","n_tags","desc_len","has_link","published")}, **f})
    keys = sorted({k for o in out for k in o})
    with (DATA / "faceless_audit.csv").open("w", newline="") as fp:
        w = csv.DictWriter(fp, fieldnames=keys); w.writeheader(); w.writerows(out)
    def med_by(sel, val):
        vs = [(o.get("view_count") or 0) for o in out if bool(o.get(sel)) == val]
        return int(statistics.median(vs)) if vs else 0
    L = [f"# BẢNG PHÂN TÍCH (auto) — {len(out)} video / {len(by)} kênh\n",
         "## Đặc trưng title → trung vị view (CÓ vs KHÔNG)\n",
         "| đặc trưng | n(có) | median CÓ | median KHÔNG | bội số |", "|---|---|---|---|---|"]
    for f in ["has_number","is_question","is_compare","curiosity","pain","greed","has_caps","has_emoji","dur_promise","has_pipe"]:
        a, b = med_by(f, True), med_by(f, False); n = sum(1 for o in out if o.get(f))
        L.append(f"| {f} | {n} | {a} | {b} | {round(a/b,2) if b else '—'} |")
    top = sorted(out, key=lambda o: o.get("views_per_day") or 0, reverse=True)[:50]
    L += ["\n## TOP 50 theo VELOCITY (views/ngày)\n", "| v/ngày | view | ratio | kênh | title |", "|---|---|---|---|---|"]
    for o in top:
        L.append(f"| {o.get('views_per_day')} | {o.get('view_count')} | {o.get('breakout_ratio')} | {(o.get('channel') or '')[:20]} | {(o.get('title') or '')[:64]} |")
    (DATA / "report_tables.md").write_text("\n".join(L))
    print(f"[analyze] XONG -> data/report_tables.md + faceless_audit.csv ({len(out)} video)")

if __name__ == "__main__":
    if not KEY: sys.exit("Thiếu YT_API_KEY (export YT_API_KEY=...)")
    {"discover": discover, "collect": collect, "analyze": analyze}.get(
        sys.argv[1] if len(sys.argv) > 1 else "", lambda: print(__doc__))()
