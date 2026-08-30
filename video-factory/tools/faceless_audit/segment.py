#!/usr/bin/env python3
"""Phân tầng dataset (short/long × nhóm ngành) rồi phân tích TRONG từng tầng.
Vì search 'mọi ngách' hút cả skit/brand → phải segment mới có tín hiệu packaging sạch.
Đọc data/videos.jsonl -> in bảng phân tầng + top long-form theo nhóm."""
import json, re, statistics, collections, datetime, pathlib
DATA = pathlib.Path(__file__).parent / "data"
rows = [json.loads(l) for l in (DATA/"videos.jsonl").read_text().splitlines() if l.strip()]

# nhóm ngành theo seed đã tìm ra kênh
CAT = {
 "tài chính cá nhân":"FIN","đầu tư chứng khoán":"FIN","quản lý tiền":"FIN","giá vàng phân tích":"FIN",
 "bất động sản việt nam":"FIN","làm giàu tư duy":"FIN","finance explained":"FIN","personal finance tips":"FIN",
 "stock market explained":"FIN","how money works":"FIN","kinh tế giải thích":"EXPLAIN",
 "tâm lý học":"EXPLAIN","khám phá vũ trụ":"EXPLAIN","history explained":"EXPLAIN","psychology facts":"EXPLAIN",
 "space documentary":"EXPLAIN","philosophy explained":"EXPLAIN","tech explained":"EXPLAIN","ai news":"EXPLAIN",
 "kể chuyện lịch sử":"STORY","truyện ma có thật":"STORY","scary stories reddit":"STORY","true crime story":"STORY",
 "top 10 sự thật":"LIST","top 10 facts":"LIST","review phim tóm tắt":"FILM",
 "động lực thành công":"MOTIV","motivation speech":"MOTIV",
}
for r in rows: r["cat"] = CAT.get(r.get("seed"), "OTHER")
now = datetime.datetime.now(datetime.timezone.utc)
def age(r):
    try: return max((now-datetime.datetime.fromisoformat(r["published"].replace("Z","+00:00"))).days,1)
    except: return None
for r in rows:
    a=age(r); r["age"]=a; r["vpd"]=round((r.get("view_count") or 0)/a) if a else 0
    d=r.get("duration") or 0; r["fmt"]="SHORT" if d and d<=90 else "LONG"

# ---- bảng đếm ----
print("## PHÂN BỐ VIDEO theo nhóm × format")
tab=collections.Counter((r["cat"],r["fmt"]) for r in rows)
cats=sorted({r["cat"] for r in rows})
print("| nhóm | SHORT | LONG | kênh |")
print("|---|---|---|---|")
for c in cats:
    chs=len({r["channel_id"] for r in rows if r["cat"]==c})
    print(f"| {c} | {tab[(c,'SHORT')]} | {tab[(c,'LONG')]} | {chs} |")

# ---- title features TRONG LONG-FORM, tách FIN+EXPLAIN (nhóm gần mình) ----
PAT={"has_number":re.compile(r"\d"),"question":re.compile(r"vì sao|tại sao|có nên|\?|why|how",re.I),
 "compare":re.compile(r"\bvs\b| hay |so sánh",re.I),"curiosity":re.compile(r"bí mật|sự thật|không ai|mà không|secret|truth",re.I),
 "pain":re.compile(r"nghèo|nợ|mất|sai lầm|bẫy|lỗ|thua",re.I),"greed":re.compile(r"giàu|triệu phú|tỷ phú|tự do tài chính|đổi đời",re.I),
 "caps":re.compile(r"\b[A-ZĐÀ-Ỹ]{2,}\b"),"emoji":re.compile("[\U0001F000-\U0001FAFF\U00002600-\U000027BF]"),
 "durprom":re.compile(r"trong \d+ (phút|giây)|in \d+ min",re.I)}
def feat(t,k): return bool(PAT[k].search(t or ""))

def title_table(subset,label):
    print(f"\n## ĐẶC TRƯNG TITLE → median view — {label} (n={len(subset)})")
    print("| đặc trưng | n(có) | median CÓ | median KHÔNG | bội |")
    print("|---|---|---|---|---|")
    for k in PAT:
        yes=[r.get("view_count") or 0 for r in subset if feat(r.get("title"),k)]
        no=[r.get("view_count") or 0 for r in subset if not feat(r.get("title"),k)]
        a=int(statistics.median(yes)) if yes else 0; b=int(statistics.median(no)) if no else 0
        print(f"| {k} | {len(yes)} | {a} | {b} | {round(a/b,2) if b else '—'} |")

longs=[r for r in rows if r["fmt"]=="LONG"]
fin_ex=[r for r in longs if r["cat"] in ("FIN","EXPLAIN")]
title_table(longs,"TẤT CẢ long-form")
title_table(fin_ex,"long-form FIN+EXPLAIN (gần kênh mình)")

# ---- top long-form theo velocity, nhóm FIN+EXPLAIN+STORY ----
for grp in ("FIN","EXPLAIN","STORY"):
    sub=sorted([r for r in longs if r["cat"]==grp],key=lambda r:r["vpd"],reverse=True)[:15]
    print(f"\n## TOP 15 LONG-FORM — {grp} (views/ngày)")
    print("| v/ngày | view | phút | kênh | title |")
    print("|---|---|---|---|---|")
    for r in sub:
        print(f"| {r['vpd']} | {r.get('view_count')} | {round((r.get('duration') or 0)/60,1)} | {(r.get('channel') or '')[:20]} | {(r.get('title') or '')[:60]} |")

# ---- kênh FIN/EXPLAIN leaderboard (median view long-form) ----
print("\n## KÊNH FIN+EXPLAIN — median view long-form (kênh gần mình nhất)")
bychan=collections.defaultdict(list)
for r in fin_ex: bychan[(r["channel"],r["subscribers"],r["cat"])].append(r.get("view_count") or 0)
lead=sorted([(k,int(statistics.median(v)),len(v)) for k,v in bychan.items() if len(v)>=3],key=lambda x:x[1],reverse=True)[:20]
print("| kênh | nhóm | subs | median view LF | n |")
print("|---|---|---|---|---|")
for (ch,sb,ct),mv,n in lead:
    print(f"| {ch[:26]} | {ct} | {sb} | {mv} | {n} |")
