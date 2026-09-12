#!/usr/bin/env python3
import re, json

DOC = "/home/user/n8n/video-factory/content/KHO30short_DOCVBEE.txt"
raw = open(DOC, encoding="utf-8").read()
paste = raw.split("DÁN TỪ ĐÂY")[1]
parts = re.split(r'(?m)^\s*\.\.\.\s*$', paste)
blocks = []
for p in parts:
    p = re.sub(r'(?m)^\s*=+.*$', '', p).strip()
    p = re.sub(r'\s+', ' ', p)
    if len(p) > 20:
        blocks.append(p)
assert len(blocks) == 30, len(blocks)

# sentence split: keep terminator, split on . ? !
sent_frags = []       # each sentence
sent_block = []       # block index (0-based) for each sentence
for bi, b in enumerate(blocks):
    sents = re.findall(r'[^.?!]+[.?!]', b)
    # catch trailing without terminator
    tail = re.sub(r'[^.?!]+[.?!]', '', b).strip()
    if tail:
        sents.append(tail)
    for s in sents:
        s = s.strip()
        if s:
            sent_frags.append(s)
            sent_block.append(bi)

with open("frags_sent.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(sent_frags) + "\n")
with open("sent_block.json", "w") as f:
    json.dump(sent_block, f)
# also clean block-level frags
with open("frags.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(blocks) + "\n")

print(f"blocks={len(blocks)} sentences={len(sent_frags)}")
# sentences per block
from collections import Counter
c = Counter(sent_block)
print("sent/block:", [c[i] for i in range(30)])
