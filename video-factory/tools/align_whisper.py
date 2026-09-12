#!/usr/bin/env python3
"""Align Whisper word timestamps to the known 30 blocks; derive precise cut points."""
import re, json, unicodedata
from difflib import SequenceMatcher

SCRATCH = "/tmp/claude-0/-home-user-n8n/9ed80c3f-0197-53dc-95c7-0baab5a1694e/scratchpad"
DURATION = 783.816

# --- known blocks ---
sents = [l.rstrip("\n") for l in open(f"{SCRATCH}/frags_sent.txt", encoding="utf-8") if l.strip()]
sent_block = json.load(open(f"{SCRATCH}/sent_block.json"))
# rebuild blocks text from sentences
blocks = ["" for _ in range(30)]
for s, b in zip(sents, sent_block):
    blocks[b] += (" " if blocks[b] else "") + s

def norm(t):
    t = t.lower()
    t = re.sub(r"[^0-9a-zà-ỹ ]", " ", t)
    return t.split()

# script tokens with block id
script_tok = []
script_blk = []
for bi, b in enumerate(blocks):
    for tok in norm(b):
        script_tok.append(tok)
        script_blk.append(bi)

# boundary token index = index of LAST script token of block b (b=0..28)
last_tok_of_block = {}
for idx, b in enumerate(script_blk):
    last_tok_of_block[b] = idx

# --- whisper words ---
W = json.load(open(f"{SCRATCH}/whisper_words.json"))["words"]
wtok, wt_end, wt_start = [], [], []
for w in W:
    ns = norm(w["w"])
    for tk in ns:               # a word token may split; assign same time
        wtok.append(tk); wt_start.append(w["s"]); wt_end.append(w["e"])

print(f"script_tokens={len(script_tok)} whisper_tokens={len(wtok)}")

# --- align via SequenceMatcher matching blocks ---
sm = SequenceMatcher(a=script_tok, b=wtok, autojunk=False)
mb = sm.get_matching_blocks()   # list of (i,j,n): script[i:i+n]==whisper[j:j+n]
# build sorted anchor list of (script_idx, whisper_idx)
anchors = []
for (i, j, n) in mb:
    for k in range(n):
        anchors.append((i+k, j+k))
anchors.sort()
print("anchor matched tokens:", len(anchors), f"({100*len(anchors)/len(script_tok):.0f}% of script)")

import bisect
anch_si = [a[0] for a in anchors]

def script_idx_to_time(si):
    # find nearest anchor at/after si, and at/before si; map to whisper time, interpolate
    p = bisect.bisect_left(anch_si, si)
    if p < len(anchors) and anchors[p][0] == si:
        j = anchors[p][1]; return wt_start[j]
    # interpolate between surrounding anchors
    lo = anchors[p-1] if p-1 >= 0 else None
    hi = anchors[p] if p < len(anchors) else None
    if lo and hi and hi[0] != lo[0]:
        frac = (si - lo[0]) / (hi[0] - lo[0])
        t_lo = wt_end[lo[1]]; t_hi = wt_start[hi[1]]
        return t_lo + frac * (t_hi - t_lo)
    if hi: return wt_start[hi[1]]
    if lo: return wt_end[lo[1]]
    return si/len(script_tok)*DURATION

cuts = [0.0]
for b in range(29):
    si = last_tok_of_block[b]          # last token of block b
    t_end = script_idx_to_time(si)     # ~end time of that token
    # next block first token time
    t_next = script_idx_to_time(si+1)
    cut = (t_end + t_next) / 2 if t_next > t_end else t_end + 0.15
    cuts.append(cut)
cuts.append(DURATION)

mono = all(cuts[k] < cuts[k+1] for k in range(len(cuts)-1))
durs = [round(cuts[k+1]-cuts[k],1) for k in range(30)]
print("MONOTONIC:", mono)
print("durations:", durs)
print(f"min {min(durs)} max {max(durs)} mean {sum(durs)/30:.1f}")
with open(f"{SCRATCH}/cuts_whisper.txt","w") as f:
    for c in cuts: f.write(f"{c:.3f}\n")
print("wrote cuts_whisper.txt")
