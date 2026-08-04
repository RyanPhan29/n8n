#!/usr/bin/env python3
"""
AUDIT 100 KÊNH FACELESS YOUTUBE — pipeline khảo sát (yt-dlp, KHÔNG cần API key).
Chạy được KHI network policy đã mở youtube.com + *.googlevideo.com + i.ytimg.com.

Quy trình (subcommand):
  discover  seeds.txt  -> data/channels.json   (tìm kênh, lọc sub 10k-100k)
  collect   channels   -> data/videos.jsonl    (30 video gần nhất/kênh, metadata nhẹ qua flat-playlist)
  enrich    top-N      -> data/videos_full.jsonl(desc/tags/thumbnail cho video breakout)
  subs      top-N      -> data/subs/*.txt       (phụ đề video breakout)
  thumbs    top-N      -> data/thumbs/*.jpg + contact_sheet.html
  analyze              -> data/report_tables.md + data/faceless_audit.csv

Thiết kế cho tốc độ: dùng --flat-playlist (1 request/kênh) cho metadata nhẹ (title+view+id),
chỉ enrich/subs/thumbs trên nhóm breakout để tiết kiệm request & tránh rate-limit.
Mọi bước ghi log số lượng vào/ra để tái lập (minh bạch khung mẫu).
"""
import subprocess, json, sys, os, re, csv, statistics, datetime, collections, pathlib

ROOT = pathlib.Path(__file__).parent
DATA = ROOT / "data"; DATA.mkdir(exist_ok=True)
SUB_MIN, SUB_MAX = 10_000, 100_000          # bộ lọc cứng subscriber
RECENT_DAYS = 90                             # kênh còn đăng đều
N_VIDEOS = 30                                # video gần nhất/kênh
YTDLP = os.environ.get("YTDLP", "yt-dlp")

def yt(*args, timeout=180):
    """Gọi yt-dlp, trả (stdout, code). Không raise để pipeline chịu lỗi từng item."""
    try:
        p = subprocess.run([YTDLP, *args], capture_output=True, text=True, timeout=timeout)
        return p.stdout, p.returncode, p.stderr
    except subprocess.TimeoutExpired:
        return "", 124, "timeout"

def jlines(s):
    for line in s.splitlines():
        line = line.strip()
        if line:
            try: yield json.loads(line)
            except json.JSONDecodeError: pass

# ---------------- DISCOVER ----------------
def discover(seed_file):
    seeds = [l.strip() for l in pathlib.Path(seed_file).read_text().splitlines()
             if l.strip() and not l.startswith("#")]
    seen, chans = set(), {}
    for q in seeds:
        # ytsearch40: lấy 40 video/seed, flat để nhanh -> gom channel_id
        out, code, err = yt("--flat-playlist", "--dump-json", f"ytsearch40:{q}")
        if code != 0:
            print(f"[discover] seed FAIL '{q}': {err[:120]}", file=sys.stderr); continue
        got = 0
        for e in jlines(out):
            cid = e.get("channel_id") or e.get("uploader_id")
            if cid and cid not in seen:
                seen.add(cid); got += 1
                chans[cid] = {"channel_id": cid,
                              "channel": e.get("channel") or e.get("uploader"),
                              "seed": q}
        print(f"[discover] '{q}': +{got} kênh mới (tổng {len(chans)})")
    # Lấy sub count + lọc 10k-100k (1 request/kênh, page /about)
    kept = []
    for i, (cid, c) in enumerate(chans.items(), 1):
        url = f"https://www.youtube.com/channel/{cid}"
        out, code, err = yt("--flat-playlist", "--playlist-items", "0",
                            "--dump-single-json", url, timeout=60)
        if code != 0: continue
        try: meta = json.loads(out)
        except json.JSONDecodeError: continue
        subs = meta.get("channel_follower_count")
        c.update(subscribers=subs, uploader_url=meta.get("uploader_url"),
                 channel_url=meta.get("channel_url") or url,
                 total_videos=meta.get("playlist_count"))
        if subs and SUB_MIN <= subs <= SUB_MAX:
            kept.append(c)
        if i % 20 == 0: print(f"[discover] đã soi {i}/{len(chans)} kênh, giữ {len(kept)}")
    (DATA / "channels.json").write_text(json.dumps(kept, ensure_ascii=False, indent=2))
    print(f"[discover] XONG: {len(kept)} kênh trong 10k-100k -> data/channels.json")

# ---------------- COLLECT (metadata nhẹ, flat) ----------------
def collect():
    chans = json.loads((DATA / "channels.json").read_text())
    fout = (DATA / "videos.jsonl").open("w")
    now = datetime.datetime.now(datetime.timezone.utc)
    n = 0
    for ci, c in enumerate(chans, 1):
        url = (c.get("channel_url") or f"https://www.youtube.com/channel/{c['channel_id']}") + "/videos"
        out, code, err = yt("--flat-playlist", "--playlist-items", f"1-{N_VIDEOS}",
                            "--dump-json", url, timeout=120)
        if code != 0:
            print(f"[collect] FAIL {c.get('channel')}: {err[:100]}", file=sys.stderr); continue
        for e in jlines(out):
            rec = {"channel_id": c["channel_id"], "channel": c.get("channel"),
                   "subscribers": c.get("subscribers"), "seed": c.get("seed"),
                   "video_id": e.get("id"), "title": e.get("title"),
                   "view_count": e.get("view_count"), "duration": e.get("duration"),
                   "url": e.get("url")}
            fout.write(json.dumps(rec, ensure_ascii=False) + "\n"); n += 1
        if ci % 10 == 0: print(f"[collect] {ci}/{len(chans)} kênh, {n} video")
    fout.close()
    print(f"[collect] XONG: {n} video -> data/videos.jsonl")

# ---------------- TITLE FEATURE EXTRACTION ----------------
PAIN = re.compile(r"nghèo|nợ|mất|sai lầm|bẫy|cháy túi|lỗ|thua|rủi ro|cạm bẫy", re.I)
GREED = re.compile(r"giàu|triệu phú|tỷ phú|tự do tài chính|đổi đời|làm giàu|thịnh vượng", re.I)
CURIO = re.compile(r"bí mật|sự thật|không ai|mà không|ít ai|tiết lộ|hé lộ|secret|truth", re.I)
QUEST = re.compile(r"vì sao|tại sao|có nên|làm sao|\?|why|how", re.I)
COMPARE = re.compile(r"\bvs\b|hay là|hay |so sánh|đối đầu", re.I)
DURPROM = re.compile(r"trong \d+ (phút|giây)|in \d+ min", re.I)
NUM = re.compile(r"\d+")
EMOJI = re.compile("[\U0001F000-\U0001FAFF\U00002600-\U000027BF]")

def title_features(t):
    t = t or ""
    caps = re.findall(r"\b[A-ZĐÀ-Ỹ]{2,}\b", t)
    nums = NUM.findall(t)
    return {
        "len_char": len(t), "len_word": len(t.split()),
        "has_number": bool(nums), "number": int(nums[0]) if nums else None,
        "num_parity": ("odd" if nums and int(nums[0]) % 2 else "even") if nums else None,
        "has_caps": bool(caps), "n_caps": len(caps),
        "is_question": bool(QUEST.search(t)), "is_compare": bool(COMPARE.search(t)),
        "curiosity": bool(CURIO.search(t)), "pain": bool(PAIN.search(t)),
        "greed": bool(GREED.search(t)), "has_emoji": bool(EMOJI.search(t)),
        "has_pipe": "|" in t, "dur_promise": bool(DURPROM.search(t)),
    }

# ---------------- ANALYZE ----------------
def analyze():
    rows = list(jlines((DATA / "videos.jsonl").read_text()))
    # velocity + breakout theo trung vị kênh
    by_chan = collections.defaultdict(list)
    for r in rows:
        if r.get("view_count"): by_chan[r["channel_id"]].append(r["view_count"])
    med = {c: statistics.median(v) for c, v in by_chan.items() if v}
    out = []
    for r in rows:
        f = title_features(r.get("title"))
        vc = r.get("view_count") or 0
        m = med.get(r["channel_id"]) or 1
        f.update(breakout_ratio=round(vc / m, 2) if m else None)
        out.append({**r, **f})
    # CSV
    keys = sorted({k for o in out for k in o})
    with (DATA / "faceless_audit.csv").open("w", newline="") as fp:
        w = csv.DictWriter(fp, fieldnames=keys); w.writeheader(); w.writerows(out)
    # Bảng tương quan đặc trưng title -> view trung vị
    feats = ["has_number","is_question","is_compare","curiosity","pain","greed",
             "has_caps","has_emoji","dur_promise"]
    lines = ["# BẢNG PHÂN TÍCH (auto)\n",
             f"- Tổng video: {len(out)} · kênh: {len(by_chan)}\n",
             "\n## Đặc trưng title -> trung vị view (video có đặc trưng vs không)\n",
             "| Đặc trưng | n(có) | median view CÓ | median view KHÔNG | bội số |",
             "|---|---|---|---|---|"]
    def med_view(sel):
        vs = [ (o.get("view_count") or 0) for o in out if o.get(sel) ]
        return statistics.median(vs) if vs else 0
    def med_view_not(sel):
        vs = [ (o.get("view_count") or 0) for o in out if not o.get(sel) ]
        return statistics.median(vs) if vs else 0
    for f in feats:
        a, b = med_view(f), med_view_not(f)
        n = sum(1 for o in out if o.get(f))
        mult = round(a / b, 2) if b else "—"
        lines.append(f"| {f} | {n} | {int(a)} | {int(b)} | {mult} |")
    # Top breakout
    top = sorted(out, key=lambda o: o.get("breakout_ratio") or 0, reverse=True)[:50]
    lines += ["\n## TOP 50 VIDEO BREAKOUT (view / trung vị kênh)\n",
              "| ratio | view | kênh | title |", "|---|---|---|---|"]
    for o in top:
        lines.append(f"| {o.get('breakout_ratio')} | {o.get('view_count')} | "
                     f"{(o.get('channel') or '')[:22]} | {(o.get('title') or '')[:70]} |")
    (DATA / "report_tables.md").write_text("\n".join(lines))
    print(f"[analyze] XONG -> data/report_tables.md + data/faceless_audit.csv")
    print(f"          video={len(out)} kênh={len(by_chan)}")

# ---------------- SUBS / THUMBS (top breakout) ----------------
def _top_ids(n):
    rows = list(jlines((DATA / "videos.jsonl").read_text()))
    by = collections.defaultdict(list)
    for r in rows:
        if r.get("view_count"): by[r["channel_id"]].append(r["view_count"])
    med = {c: statistics.median(v) for c, v in by.items() if v}
    for r in rows:
        m = med.get(r["channel_id"]) or 1
        r["_ratio"] = (r.get("view_count") or 0) / m
    return sorted([r for r in rows if r.get("video_id")],
                  key=lambda r: r["_ratio"], reverse=True)[:n]

def subs(n=40):
    d = DATA / "subs"; d.mkdir(exist_ok=True)
    for r in _top_ids(int(n)):
        vid = r["video_id"]
        yt("--skip-download", "--write-auto-subs", "--write-subs",
           "--sub-langs", "vi,en", "--sub-format", "vtt",
           "-o", str(d / f"{vid}.%(ext)s"),
           f"https://www.youtube.com/watch?v={vid}", timeout=90)
    print(f"[subs] tải phụ đề {n} video breakout -> data/subs/")

def thumbs(n=40):
    d = DATA / "thumbs"; d.mkdir(exist_ok=True)
    items = _top_ids(int(n))
    for r in items:
        vid = r["video_id"]
        yt("--skip-download", "--write-thumbnail", "--convert-thumbnails", "jpg",
           "-o", str(d / f"{vid}.%(ext)s"),
           f"https://www.youtube.com/watch?v={vid}", timeout=60)
    # contact sheet
    cells = "".join(
        f'<figure><img src="thumbs/{r["video_id"]}.jpg" loading="lazy">'
        f'<figcaption>{(r.get("title") or "")[:60]} · {r.get("view_count")} view</figcaption></figure>'
        for r in items)
    html = ("<style>body{background:#111;color:#eee;font:14px sans-serif}"
            "figure{display:inline-block;width:320px;margin:6px;vertical-align:top}"
            "img{width:320px;border-radius:8px}figcaption{font-size:12px}</style>" + cells)
    (DATA / "contact_sheet.html").write_text(html)
    print(f"[thumbs] {n} thumbnail + contact_sheet.html")

if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "help"
    a = sys.argv[2:]
    if cmd == "discover": discover(a[0] if a else str(ROOT / "seeds.txt"))
    elif cmd == "collect": collect()
    elif cmd == "analyze": analyze()
    elif cmd == "subs": subs(*a)
    elif cmd == "thumbs": thumbs(*a)
    else:
        print(__doc__)
