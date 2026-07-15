---
name: chuyen-tien-longform
description: TEM KHÓA — Dựng video DÀI 5-nhịp (Motion-Graphics Explainer 16:9) cho kênh "Chuyện Tiền · Anh Hai Kể". Dùng khi cần sản xuất 1 video dài 3-10 phút phân tích chuyên sâu về tiền bạc/tài chính. Chỉ VIẾT SPEC + auto-time + render, KHÔNG sửa engine.
---

# TEM 1 — VIDEO DÀI 5-NHỊP (16:9)

> Đây là TEM ĐÃ KHÓA. Sản xuất = điền nội dung vào spec, KHÔNG sửa code engine.

## Thành phẩm
- 1920×1080, 30fps. Motion-Graphics Explainer: nền giấy động + chữ code (không bao giờ để AI render chữ Việt) + pill + số nhảy + biểu đồ (cột & đường) + bảng 2 cột + bong bóng comment + checklist + Anh Hai hoạt hình góc phải + SFX + **PHỤ ĐỀ** dưới đáy.
- Cấu trúc **5 nhịp**: Bối cảnh → Kỳ vọng → Xung đột → Giải quyết → Bối cảnh lớn.
- **Bố cục chuẩn (KHÓA)**: tiêu đề trên cùng → **chú thích nhỏ NGAY DƯỚI tiêu đề** → nội dung chính (số/biểu đồ/bảng) ở giữa → Anh Hai góc phải → **đáy để trống cho PHỤ ĐỀ lời đọc**.

## File
- Engine (KHÓA, không sửa): `video-factory/remotion-demo/src/Kit.tsx`, `Blocks.tsx`, `Root.tsx`, `fonts.css`, `public/ah/*`, `public/sfx/*`, `public/paper_bg.mp4`.
- **CHỈ SỬA**: `video-factory/remotion-demo/src/Specs.tsx` — thêm 1 `VideoSpec` mới vào `ALL_SPECS`.

## Quy trình (7 bước)
1. **Viết kịch bản 5-nhịp** — prose liền mạch cho Vbee, TUYỆT ĐỐI không nhãn "Đoạn 1/2/3". Audience-first, số liệu thật có nguồn.
2. Anh **thu Vbee** → file mp3.
3. **Auto-time**: `python3 video-factory/tools/autotime.py <file.mp3> <N>` (N = số cảnh trong spec). In ra mảng `d:[...]` (frame@30).
   - Đoạn nào > ~600 frame (20s) → tự tách thành 2-3 cảnh con (cộng dồn = đúng số gốc) để không "chết khung hình".
4. **Viết VideoSpec** trong `Specs.tsx`: mảng block, mỗi block 1 cảnh, gán `d` = frame từ auto-time. Thêm spec vào `ALL_SPECS`. `slug` = id composition.
5. **Render**: xem lệnh bên dưới (browser = headless_shell). **Kiểm khung tĩnh trước** (remotion still vài frame) rồi mới render full.
6. **Tạo PHỤ ĐỀ**: `python3 video-factory/tools/subgen.py <script.txt> <giong.mp3> <out.ass>` — tự chia câu TRỌN NGHĨA (không tách cụm/số), neo timing vào khoảng lặng thật (không trôi).
7. **Burn phụ đề + ghép giọng + SFX**: 1 lệnh ffmpeg (bên dưới).
8. Nén bản web nếu >30MB.

## Block types (KHÓA) — `t: '...'`
- `hook` / `char` / `list`: heading + items(pill/arrow) + ah + bubble + caption. `center:true` → tiêu đề canh giữa khung (cảnh thưa chữ).
- `number`: heading + value(số nhảy) + sub + pills + ah + caption. `decimals` cho số thập phân.
- `bars`: heading + bars[{label,v}] (đơn vị "tr") + caption.
- `line`: **biểu đồ ĐƯỜNG** (vẽ dần) — `points:[{label,v}]` + `lineColor` + `unit` + caption. Cho xu hướng tăng/giảm.
- `split`: **bảng 2 CỘT** — `colL`/`colR` = `{title, big?, sub?, items?[], c, dim?}`, `midVS:true` để chèn badge VS. Cho quá khứ↔hiện tại, được↔mất.
- `comments`: **bong bóng chat** — `comments:[{name, text, c, side:'l'|'r'}]`. Mở bài bằng comment thật (ẩn danh, chữ do code).
- `versus`: heading + left/right {pill,sub,c} + caption.
- `rule`: n(số tròn) + title + caption. `question`: heading + lines[][] + caption. `cta`: heading + button (tự có Anh Hai celebrate).

## Trường block hay dùng
`bar`, `d`(frame), `heading:Seg[]`, `size`, `htop`, `items:Item[]`, `caption:Seg[]` (nay hiện DƯỚI title; `capTop` để dời), `center`, `deco`(emoji lớn lấp khung trống, `decoSide:'l'|'r'`), `ah:{pose,shirt,female,scale}`, `bubble`, `value/suffix/decimals/numColor/numTop/numSize/sub`, `points/lineColor/unit`, `colL/colR/midVS`, `comments`, `bars/max/barColor`, `left/right`, `n/title/color`, `lines`, `button`.
- `Seg` = `'chữ'` | `{t:'chữ', c:'red'}` (tô màu). `Item` = `{text, c, size}` | `{arrow:'↓ ...'}`.
- Nội dung hiện **gần tức thì** đầu cảnh (delay nhỏ) để bám nhịp giọng.

## Anh Hai (KHÓA) — góc phải x1380, cartoon
- `ah:{pose:'...'}`. Anh Hai chính = áo GOLD (mặc định). Nhân vật phụ: đặt `shirt:'red'`(...) → thành người-que; nữ thêm `female:true`.
- Tự chống đè: khi có `ah`, Stack & số tự thụt lề phải.

## Bảng màu (KHÓA)
navy `#16305c` · red `#e11d2a` · teal `#159a86` · blue `#1657d6` · ink `#16223a` · gold `#f2c230` · gray `#6b7280` · amber `#f59e0b`. Đỏ=đau/nợ, xanh dương=phân tích, teal=giải pháp, navy=khung.

## 23 POSE Anh Hai
point, present(host), cool(smug), sly, shock, think, worried, greedy, excited, broke, facepalm, cry, laugh, celebrate, shrug, pointup, angry(mad), aha(idea/lightbulb), warning(stop), secret(shh), cash(money), chill(relax), thumbsdown(bad/no).

## LỆNH (dán nguyên)
```bash
HS="/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell"
FF="/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2"
cd video-factory/remotion-demo
# (khung tĩnh kiểm trước) node_modules/.bin/remotion still <slug> out/chk.png --frame=1200 --browser-executable="$HS"
node_modules/.bin/remotion render <slug> out/<slug>_raw.mp4 --browser-executable="$HS" --concurrency=4 --log=error
# tạo phụ đề:
python3 ../tools/subgen.py ../../<script.txt> <giong.mp3> ../<slug>.ass
# XUẤT BẢN = 1 LỆNH DUY NHẤT (preset khóa: burn phụ đề + mix giọng+SFX + LOUDNORM -14 LUFS + CRF18 + 48k stereo):
bash ../tools/export_master.sh out/<slug>_raw.mp4 <giong.mp3> ../<slug>.ass <slug>
#   -> out/<slug>_YT_MASTER.mp4  (UP YOUTUBE — đừng nén thêm)
#   -> out/<slug>_SUB30.mp4      (gửi nhanh/mobile, cùng loudness)
```

## XUẤT BẢN — CHUẨN KHÓA (đừng chế lại preset)
- **Luôn dùng `tools/export_master.sh`** — 1 công thức duy nhất, hết cảnh mỗi video 1 preset khác nhau.
- **Loudness = -14 LUFS** (TP -1.5, loudnorm 2-pass linear). Nền tảng chuẩn hóa quanh -14 và CHỈ hạ, không nâng → xuất nhỏ hơn là mất retention giây đầu. Đây là fix ROI cao nhất.
- **File UP YOUTUBE = `_YT_MASTER.mp4`** (1080p CRF18, ~4–6 Mbps, 48kHz stereo). KHÔNG đưa YouTube bản `_web`/`_SUB30` nén nát (đường mảnh/chữ nhỏ vỡ, rồi YouTube nén lần 2 = rác chồng rác).
- `_SUB30.mp4` CHỈ để gửi qua chat/mobile xem nhanh — không phải bản đăng chính.
- Kiểm nhanh trước khi đăng: `ffmpeg -i <file> -af loudnorm=print_format=summary -f null -` → Input Integrated phải ≈ -14.
- (Ghi chú AdSense: video < 8 phút KHÔNG có mid-roll → chỉ pre/post-roll, RPM thực ~$0.5–0.8. Muốn mở mid-roll: dựng video ≥ 8 phút.)

## AN TOÀN BỐ CỤC (engine tự lo — KHÓA)
- **Title (Heading)**: tự `text-wrap: balance` (không mồ côi chữ) + **auto-shrink** khi title dài + **thu mép phải né Anh Hai** ở cảnh `center`. Vẫn nên viết title ngắn gọn, phần diễn giải đưa xuống `caption`.
- **Chú thích (caption)**: khi có Anh Hai tự thu mép phải (right 560) + balance → không lẹm nhân vật, không mồ côi.
- **List/pill**: bo góc 40, `maxWidth 1140`, tự xuống dòng gọn trong viền → item dài không tràn. Dù vậy giữ item NGẮN (1 dòng) cho đẹp.

## PHỤ ĐỀ (KHÓA quy trình)
- `subgen.py` chia câu theo **dấu câu**, gộp cụm SỐ thành khối không tách, wrap 2 dòng đúng ranh khối → luôn TRỌN NGHĨA, không mồ côi chữ.
- Timing: neo mỗi dòng vào **điểm giọng bắt đầu lại (silence_end)**, neo DÀY (d=0.14) để chống trôi giữa đoạn dài. KHÔNG lệch sớm (chữ hiện đúng lúc đọc, không "nhanh/chậm hơn giọng"). Tối thiểu 0.78s/dòng.
- Style: DejaVu Sans đậm, trắng viền đậm, đáy giữa (Alignment 2, MarginV 60). Muốn đổi → sửa khối `[V4+ Styles]` trong subgen.py.
- Chú thích nhỏ đã dời LÊN dưới title để nhường đáy cho phụ đề (không đè nhau).

## BẤT BIẾN (không bao giờ đổi)
- Chữ Việt CHỈ do code render (AI làm hỏng dấu). Vbee = prose sạch, không nhãn Đoạn.
- Anh Hai = bộ 23 pose đã khóa. SFX tự động (pop/ding/ticker/whoosh). Font Montserrat 900/800 + Be Vietnam Pro 800/700.
- Giờ đăng: đăng TRƯỚC peak 2-3h → Thứ 6 18:30 / Chủ Nhật 08:00 / Thứ 4 19:00.
- Xác minh file thu: luôn kiểm thời lượng + số khoảng lặng trước khi dùng (tránh nhầm file).
