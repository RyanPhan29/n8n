---
name: chuyen-tien-short-tu-videodai
description: TEM KHÓA — Bóc 1 vấn đề từ VIDEO DÀI thành SHORT dọc 9:16 cho kênh "Chuyện Tiền · Anh Hai Kể". Mỗi short = 1 vấn đề → 1 điểm → (1 giải pháp) → 1 câu hỏi. Chỉ VIẾT SPEC, KHÔNG sửa engine.
when_to_use: Kích hoạt khi user muốn "short bóc 1 ý / bắt sóng thời sự / cắt từ video dài", nội dung là 1 vấn đề duy nhất (không phải so sánh X vs Y — cái đó dùng chuyen-tien-short-sosanh).
resources: "examples/ShortSpec-example.tsx (spec 4 cảnh mẫu) · scripts dùng chung tại video-factory/tools/ (autotime.py, batch_render.sh, export_master.sh)"
---

# TEM 3 — SHORT TỪ VIDEO DÀI (9:16)

> TEM ĐÃ KHÓA. Sản xuất = điền spec, KHÔNG sửa code. Dùng CHUNG engine với Tem 2 (`Short.tsx`).

## Thành phẩm
- 1080×1920, 9:16. Nền giấy động. **Nội dung/SỐ luôn ở GIỮA to rõ**; Anh Hai căn giữa đáy, full người, thứ yếu. SFX + SAFE ZONE (đáy 360 / phải 130 / đỉnh 120).
- Nguyên tắc: mỗi short chỉ **1 vấn đề duy nhất**, không tham nhiều ý.

## Công thức 4 cảnh (KHÓA)
1. **HOOK** — `head` + `icon` metaphor (vd `'💰  😴  ❓'`): nêu vấn đề.
2. **SỐ / HÌNH** — `value` (số nhảy to giữa) + `label` (pill nhãn dưới): con số đắt giá.
3. **ĐIỂM/GIẢI PHÁP** — `cards` (đối chiếu) hoặc `icon`+`label` hoặc `pills`: 1 insight/giải pháp.
4. **CÂU HỎI** — `q` (khung navy): kéo tương tác.

## File
- Engine (KHÓA): `video-factory/remotion-demo/src/Short.tsx`, `Kit.tsx`, assets.
- **CHỈ SỬA**: `video-factory/remotion-demo/src/ShortSpecs.tsx` → thêm `ShortSpec` vào `ALL_SHORTS`.

## Ví dụ spec đầy đủ (LK-1, đã chạy)
```ts
export const SHORT_LK1: ShortSpec = {slug: 'ShortLK1', scenes: [
  {d: 207, bar: 'blue', pose: 'sly',
   head: ['Bỏ ', {t: '10 triệu', c: 'blue'}, ' rồi đi ngủ 😴'], icon: '💰  😴  ❓', iconTop: 540, iconSize: 150},
  {d: 158, bar: 'blue', pose: 'greedy', ahH: 600,
   head: ['Vài chục năm sau…'], size: 70, value: 450, suffix: ' triệu', numColor: 'blue', numTop: 560, numSize: 150,
   label: ['Chính là ', {t: 'LÃI KÉP', c: 'blue'}, ' 🤯'], labelTop: 800, labelC: 'blue'},
  {d: 173, bar: 'teal', pose: 'aha', ahH: 600,
   head: ['Bí mật là ', {t: 'THỜI GIAN', c: 'teal'}], size: 82,
   cards: [{header: 'BẮT ĐẦU SỚM', icon: '🌱', label: 'Lời chồng lời', c: 'teal'},
           {header: 'ĐỂ TRỄ', icon: '🐌', label: 'Thiệt đủ đường', c: 'gray', dim: true}], cardsTop: 440},
  {d: 122, bar: 'navy', pose: 'point',
   head: ['Vậy còn bạn?'], size: 90, icon: '🤔💭', iconTop: 520, iconSize: 150,
   q: ['Bạn định bắt đầu đầu tư từ ', {t: 'năm bao nhiêu tuổi?', c: 'gold'}]},
]};
```

## Mẹo canh số không bị che / xuống dòng
- Số dài (vd "450 triệu") → giảm `numSize` (~150) để gọn 1 dòng.
- Có `label` dưới số → giảm `ahH` (~600) để đầu Anh Hai không đè pill.
- Cảnh trống giữa → thêm `icon` metaphor.

## Bí quyết: thu GỘP nhiều short 1 lần
Có thể gộp nhiều script short vào Vbee đọc 1 lượt (mỗi short cách nhau 1 dòng trống). Sau đó tách theo khoảng lặng:
```bash
FF="/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2"
$FF -i gop.mp3 -af "silencedetect=noise=-33dB:d=0.45" -f null -   # tìm ranh giữa các short
$FF -y -i gop.mp3 -ss <a> -to <b> -c copy shorts_audio/<TEN>.mp3   # cắt từng clip
```
Rồi mỗi clip auto-time nội bộ (ngưỡng d=0.22) để chia 4 cảnh.

## LỆNH render + mux (dán nguyên)
```bash
HS="/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell"
FF="/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2"
cd video-factory/remotion-demo
node_modules/.bin/remotion render <slug> out/<slug>_raw.mp4 --browser-executable="$HS" --concurrency=3 --log=error
$FF -y -i out/<slug>_raw.mp4 -i <giong.mp3> -filter_complex "[1:a]volume=1.15[vo];[0:a][vo]amix=inputs=2:duration=first:normalize=0[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest out/<slug>_final.mp4
```

## Anh Hai, màu, 23 pose, giờ đăng, bất biến
→ Giống Tem 1. Anh Hai **căn giữa đáy** (cx), full người, thứ yếu — nội dung không bao giờ bị che.
