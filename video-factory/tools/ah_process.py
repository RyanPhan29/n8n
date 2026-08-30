# -*- coding: utf-8 -*-
# Tách nền trắng cho ảnh Anh Hai tĩnh (flood-fill từ viền = SENTINEL màu tím) + cắt sát alpha.
# Giữ vùng trắng BÊN TRONG (giày, cổ áo) vì flood chỉ ăn vùng trắng nối với viền.
import sys, os
from PIL import Image, ImageDraw, ImageChops, ImageFilter

SENT = (255, 0, 255)
DST = "/tmp/claude-0/-home-user-n8n/9ed80c3f-0197-53dc-95c7-0baab5a1694e/scratchpad/remotion-demo/public/ah"

# (đường dẫn ảnh gốc, tên pose)
JOBS = [
    ("/root/.claude/uploads/9ed80c3f-0197-53dc-95c7-0baab5a1694e/15c0d51a-1000059063.png", "angry"),
    ("/root/.claude/uploads/9ed80c3f-0197-53dc-95c7-0baab5a1694e/59b485b2-1000059064.png", "warning"),
    ("/root/.claude/uploads/9ed80c3f-0197-53dc-95c7-0baab5a1694e/c83b9b4a-1000059065.png", "aha"),
    ("/root/.claude/uploads/9ed80c3f-0197-53dc-95c7-0baab5a1694e/bdca7d93-1000059066.png", "secret"),
    ("/root/.claude/uploads/9ed80c3f-0197-53dc-95c7-0baab5a1694e/bd9d3564-1000059067.png", "cash"),
    ("/root/.claude/uploads/9ed80c3f-0197-53dc-95c7-0baab5a1694e/da5db706-1000059068.png", "chill"),
    ("/root/.claude/uploads/9ed80c3f-0197-53dc-95c7-0baab5a1694e/9f68b3b2-1000059069.png", "thumbsdown"),
]

def process(src, name):
    im = Image.open(src).convert("RGB")
    w, h = im.size
    flood = im.copy()
    # dày seed dọc theo toàn bộ viền để ăn sạch nền ngoài
    seeds = []
    for x in range(0, w, 40):
        seeds += [(x, 1), (x, h - 2)]
    for y in range(0, h, 40):
        seeds += [(1, y), (w - 2, y)]
    for s in seeds:
        try:
            ImageDraw.floodfill(flood, s, SENT, thresh=60)
        except Exception:
            pass
    # pixel nào đã bị đổi thành SENTINEL -> nền -> alpha 0
    diff = ImageChops.difference(im, flood).convert("L")
    alpha = diff.point(lambda p: 0 if p > 0 else 255)  # đổi = nền(0), giữ nguyên = giữ(255)
    # làm mượt viền 1 chút
    alpha = alpha.filter(ImageFilter.MedianFilter(3)).filter(ImageFilter.GaussianBlur(0.4))
    alpha = alpha.point(lambda p: 255 if p > 140 else (0 if p < 90 else p))
    rgba = im.convert("RGBA")
    rgba.putalpha(alpha)
    # cắt sát bbox vùng không trong suốt
    bbox = alpha.point(lambda p: 255 if p > 8 else 0).getbbox()
    if bbox:
        rgba = rgba.crop(bbox)
    out = os.path.join(DST, name + ".png")
    rgba.save(out)
    return out, rgba.size

for src, name in JOBS:
    if not os.path.exists(src):
        print(f"MISSING {name}: {src}"); continue
    out, size = process(src, name)
    print(f"OK {name} -> {size}")
