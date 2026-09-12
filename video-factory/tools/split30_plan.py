#!/usr/bin/env python3
import re, sys

SCRATCH = "/tmp/claude-0/-home-user-n8n/9ed80c3f-0197-53dc-95c7-0baab5a1694e/scratchpad"
DOC = "/home/user/n8n/video-factory/content/KHO30short_DOCVBEE.txt"
DURATION = 783.816

# --- parse 30 blocks ---
raw = open(DOC, encoding="utf-8").read()
# take everything after the paste marker
paste = raw.split("DÁN TỪ ĐÂY")[1]
# split on lines that are just ...
parts = re.split(r'(?m)^\s*\.\.\.\s*$', paste)
# strip any === header lines inside each part, keep the prose
blocks = []
for p in parts:
    p = re.sub(r'(?m)^=+.*$', '', p).strip()
    if len(p) > 20:
        blocks.append(p)
assert len(blocks) == 30, f"got {len(blocks)} blocks"

def syl(text):
    # vietnamese syllables ~ whitespace tokens, strip pure punctuation tokens
    toks = re.findall(r"[0-9A-Za-zÀ-ỹ]+", text)
    return len(toks)

counts = [syl(b) for b in blocks]
total = sum(counts)

# cumulative boundary fraction (29 internal boundaries)
cum = 0
boundaries_pred = []
for c in counts[:-1]:
    cum += c
    boundaries_pred.append(cum/total*DURATION)

# --- parse silences: build list of (start,end,center) ---
sil = []
cur_start = None
for line in open(f"{SCRATCH}/silences.txt", encoding="utf-8"):
    m = re.search(r'silence_start:\s*([0-9.]+)', line)
    if m: cur_start = float(m.group(1)); continue
    m = re.search(r'silence_end:\s*([0-9.]+)', line)
    if m and cur_start is not None:
        end = float(m.group(1))
        sil.append((cur_start, end, (cur_start+end)/2))
        cur_start = None

centers = [s[2] for s in sil]

def nearest(t):
    best = min(sil, key=lambda s: abs(s[2]-t))
    return best

print(f"blocks={len(blocks)} total_syll={total} n_silences={len(sil)}")
print(f"{'#':>3} {'syll':>4} {'pred':>8} {'snap_ctr':>8} {'gap[s..e]':>18} {'err':>6}")
cuts = [0.0]
for i,(pt) in enumerate(boundaries_pred):
    b = nearest(pt)
    cuts.append(b[2])
    print(f"{i+1:>3} {counts[i]:>4} {pt:8.2f} {b[2]:8.2f} [{b[0]:7.2f}..{b[1]:6.2f}] {b[2]-pt:6.2f}")
cuts.append(DURATION)

# monotonic check
mono = all(cuts[i] < cuts[i+1] for i in range(len(cuts)-1))
print("MONOTONIC:", mono)
# durations
print("Short durations:", [round(cuts[i+1]-cuts[i],1) for i in range(30)])
# write cut points
with open(f"{SCRATCH}/cuts.txt","w") as f:
    for c in cuts: f.write(f"{c:.3f}\n")
print("wrote cuts.txt")
