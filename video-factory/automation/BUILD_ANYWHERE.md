# BUILD_ANYWHERE — Dựng 1 video ở MÁY KHÁC (cho Cowork / máy mới)

> `CLAUDE.md` để đường dẫn tool theo **sandbox gốc** (HS/CH/FF `/opt/pw-browsers`, imageio-ffmpeg, `node_modules` ở scratchpad). Máy khác thì làm theo doc này để pipeline chạy được.

## 0) Cần cài
- **Node 20+**, **Python 3.11+** (matplotlib nếu vẽ biểu đồ: `pip install matplotlib`), **ffmpeg** (`apt install ffmpeg` hoặc dùng imageio-ffmpeg).
- Chromium cho Remotion (xem bước 2).

## 1) Cài Remotion (repo đã có lockfile → reproducible)
```bash
cd video-factory/remotion-demo
npm ci          # dùng package-lock.json đã commit
```
> Asset đã nằm trong repo: 23 pose Anh Hai (`public/ah`), 6 SFX (`public/sfx`), nền `public/paper_bg.mp4`, kit, **font nhúng base64 trong `src/fonts.css`** (render offline, không cần internet). Chỉ `node_modules`/`out` bị gitignore.

## 2) Chromium để render
```bash
npx playwright install chromium         # mạng thật tải được (khác sandbox gốc bị 403)
# rồi render KHÔNG cần --browser-executable (Remotion tự tìm), HOẶC trỏ tay:
#   --browser-executable="$(npx playwright ... )"
```
Sandbox gốc phải trỏ `--browser-executable=$HS` vì Remotion tải browser bị 403 + "Old Headless removed". Máy thường thì bỏ được flag đó.

## 3) Render + xuất (đường dẫn PORTABLE)
```bash
# still-check 1 khung:
node_modules/.bin/remotion still <slug> out/x.png --frame=N
# render:
node_modules/.bin/remotion render <slug> out/<slug>_raw.mp4 --concurrency=4 --log=error
# phụ đề (nếu long-form): python3 ../tools/subgen.py <script.txt> <giong.mp3> <slug>.ass
# xuất master -14 LUFS:
bash ../tools/export_master.sh out/<slug>_raw.mp4 <giong.mp3> <slug>.ass <slug>
#   (short có biểu đồ: bash ../tools/overlay_chart.sh out/<slug>_raw.mp4 <giong.mp3> <chart.png> <t0> <t1> out/<slug>_MASTER.mp4)
```
> `export_master.sh` / `overlay_chart.sh` / `autotime.py` **tự fallback về `ffmpeg` hệ thống** nếu không có imageio-ffmpeg. Nếu `export_master.sh` còn hardcode path FF → sửa dòng `FF=` đầu file thành `ffmpeg`.

## 4) Quy trình đầy đủ theo skill
- Long: skill `chuyen-tien-longform`
- Short so sánh: `chuyen-tien-short-sosanh`
- Short bóc 1 ý: `chuyen-tien-short-tu-videodai`
- **Daily (điểm tin/đọc vị/bóc bẫy/biểu đồ)**: `chuyen-tien-diemtin-pro`  ← mới, gói trọn công thức tuần này

## Nghiệm thu (1 video full)
- [ ] `npm ci` OK, `remotion still` ra khung có chữ Việt sắc (font offline OK).
- [ ] Verify Vbee → neo cảnh → render → still-check sạch.
- [ ] Export master **-14 LUFS** (kiểm: `ffmpeg -i master.mp4 -af loudnorm=print_format=summary -f null -`).
- [ ] (nếu có) biểu đồ ghép đúng đoạn.
