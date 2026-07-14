# 🏭 VIDEO FACTORY — Kênh "Chuyện Tiền · Anh Hai Kể"

Hệ thống sản xuất video $0 (Remotion + ffmpeg), chữ Việt hoàn hảo, Anh Hai hoạt hình khóa cứng.
**3 TEM đã khóa** (xem `.claude/skills/`): dùng = điền nội dung vào spec, KHÔNG sửa engine.

| Tem | Skill | Định dạng | Dùng khi |
|---|---|---|---|
| 1. Video dài 5-nhịp | `chuyen-tien-longform` | 16:9 | Phân tích chuyên sâu 3-10 phút |
| 2. Short so sánh | `chuyen-tien-short-sosanh` | 9:16 | Đối chiếu X vs Y (card + VS) |
| 3. Short từ video dài | `chuyen-tien-short-tu-videodai` | 9:16 | Bóc 1 vấn đề từ video dài |

## Cấu trúc
```
video-factory/
  remotion-demo/     # Engine Remotion (KHÓA). Chỉ sửa Specs.tsx / ShortSpecs.tsx
    src/             # Kit.tsx (linh kiện chung) · Blocks.tsx (long) · Short.tsx (short) · Root.tsx
    public/          # ah/ (23 pose Anh Hai) · sfx/ · paper_bg.mp4 (nền động)
  tools/             # autotime.py (chia cảnh khớp lời) · *thumb*.py · ah_process.py · fonts/
  content/           # BIBLE + kịch bản + gói SEO
```

## Cài đặt (mỗi phiên mới)
```bash
cd video-factory/remotion-demo && npm install     # remotion tự tải; browser đã có sẵn trong máy
# Browser render (KHÔNG dùng chrome full — phải headless_shell):
HS="/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell"
FF="/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2"
```
> Remotion tự tải chrome từ remotion.media bị chặn → LUÔN truyền `--browser-executable="$HS"`.

## Quy trình chung (cả 3 tem)
1. Viết kịch bản (prose sạch cho Vbee, KHÔNG nhãn "Đoạn 1/2/3").
2. Anh thu Vbee → mp3. **Luôn xác minh file** (thời lượng + số khoảng lặng) trước khi dùng.
3. `python3 tools/autotime.py <mp3> <N>` → mảng `d[]` khớp lời.
4. Điền spec (`Specs.tsx` cho long / `ShortSpecs.tsx` cho short) → thêm vào `ALL_SPECS`/`ALL_SHORTS`.
5. Render (headless_shell) → ghép giọng+SFX (ffmpeg amix) → xong.
   Chi tiết lệnh trong từng SKILL.md.

## BẤT BIẾN (khóa, không đổi)
- Chữ Việt CHỈ do code render (AI làm hỏng dấu).
- Anh Hai = 23 pose cartoon đã khóa (`public/ah`). SFX tự động. Nền giấy động.
- Short: nội dung chính GIỮA, Anh Hai thứ yếu (căn giữa đáy). SAFE ZONE: đáy 360 / phải 130 / đỉnh 120.
- Màu: navy·red·teal·blue·ink·gold·gray·amber. Font: Montserrat 900/800 + Be Vietnam Pro 800/700.
- Giờ đăng (trước peak 2-3h): Thứ 6 18:30 · Chủ Nhật 08:00 · Thứ 4 19:00.

## Composition đã có sẵn (tham chiếu)
- Long: `LaiKepMG`, `VayNhaLong`, `BDS` (trong Specs). Short: `ShortLK1`.
