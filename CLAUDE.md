# CLAUDE.md — Video Factory "Chuyện Tiền · Anh Hai Kể"

> Repo n8n fork dùng làm **xưởng video faceless tài chính (tiếng Việt)**. Mọi phiên đều là việc video.
> Nhân vật: **Anh Hai** (cartoon). Sản phẩm: video DÀI 16:9 + SHORT 9:16, giọng Vbee nam Bắc.
> Practice theo shanraisshan/claude-code-best-practice: CLAUDE.md gọn, spec-driven, skills khóa, Research→Plan→Execute→Review→Ship.

## Nguyên tắc vàng (spec-driven)
- **1 video = 1 spec.** Dài: `VideoSpec` trong `video-factory/remotion-demo/src/Specs.tsx` → `ALL_SPECS`. Short: `ShortSpec` trong `ShortSpecs.tsx` → `ALL_SHORTS`.
- **Engine ĐÃ KHÓA — KHÔNG sửa:** `Kit.tsx`, `Blocks.tsx`, `Short.tsx`, `Root.tsx`, `fonts.css`, `public/*`. Chỉ sửa file Specs. (Sửa engine chỉ khi vá bug layout thật, rồi khóa lại + cập nhật skill.)
- Sản xuất = điền spec → auto-time → render → export. Không code tay từng cảnh.

## Đường dẫn công cụ (BẮT BUỘC nhớ)
```
HS  = /opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell   # render Remotion
CH  = /opt/pw-browsers/chromium-1194/chrome-linux/chrome                          # chụp still (--headless=new)
FF  = /usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2
```
Render PHẢI có `--browser-executable="$HS"` (chrome đầy đủ báo "Old Headless removed"; remotion tải browser bị 403).

## Lệnh lõi (chạy trong `video-factory/remotion-demo`)
```bash
# khung tĩnh kiểm trước:  node_modules/.bin/remotion still <slug> out/x.png --frame=N --browser-executable="$HS"
# render:                 node_modules/.bin/remotion render <slug> out/<slug>_raw.mp4 --browser-executable="$HS" --concurrency=4 --log=error
# phụ đề:                 python3 ../tools/subgen.py <script.txt> <giong.mp3> <slug>.ass
# XUẤT BẢN (1 lệnh khóa): bash ../tools/export_master.sh out/<slug>_raw.mp4 <giong.mp3> <slug>.ass <slug>
```
`export_master.sh` → `_YT_MASTER.mp4` (1080p CRF18, **-14 LUFS**, 48k stereo, up YouTube) + `_SUB30.mp4` (gửi chat).
Node_modules chỉ có ở **bản scratchpad** `…/scratchpad/remotion-demo` → sync file Specs sang đó rồi render; kết quả/commit về `video-factory/`.

## BẤT BIẾN (không bao giờ phá)
- **Chữ Việt CHỈ do code render** — AI dựng chữ Việt là hỏng dấu. Nền/ảnh AI KHÔNG chứa chữ Việt.
- **Vbee = prose sạch, liền mạch, KHÔNG nhãn "Đoạn 1/2/3".** Số liệu thật, có nguồn; nói dạng KHOẢNG để khỏi bị bắt bẻ.
- **Verify file thu trước khi dùng:** luôn kiểm thời lượng + đếm khoảng lặng (tránh nhầm file / file ghép).
- **Loudness -14 LUFS** cho mọi bản (chuẩn feed). Bitrate cao cho YouTube (đừng đưa bản nén nát).
- **Giờ đăng** (trước peak 2–3h): Thứ 6 18:30 · CN 08:00 · Thứ 4 19:00. Rải short 4–5/ngày khung 19–21h.
- Model ID `claude-opus-4-8` KHÔNG xuất hiện trong commit/PR/artifact.
- Nhánh phát triển: `claude/video-analysis-channel-research-hnevyn`.

## Gotchas môi trường (đã kiểm — đừng phí công thử lại)
- **chromium chụp web KHÔNG qua proxy** → cap URL thật báo ERR_TUNNEL. Dùng WebFetch lấy nội dung rồi tự dựng "thẻ bằng chứng".
- **HuggingFace bị chặn (403)** → không tải model Whisper → KHÔNG chạy ASR/forced-align ở sandbox. Phụ đề dùng subgen (khoảng lặng).
- **Higgsfield: 0 credit (free)** · **gTTS: proxy chặn**. → Cảnh AI + TTS phải chạy bằng credit/công cụ của USER (Flow, Vbee).
- **ffmpeg re-encode 5 phút > 2 phút** → chạy `run_in_background`. Đừng để timeout 2 phút cắt ngang.
- **SendUserFile giới hạn 30MB.** Master lớn (>30MB) không gửi chat được; đưa file ≤100MB vào `video-factory/delivery/` rồi push → user tải từ GitHub. Drive-MCP cần base64 nội tuyến → không đẩy nổi file lớn.

## Phụ đề (subgen.py — khóa quy trình)
Chia câu theo dấu câu, gộp cụm SỐ không tách, wrap trọn nghĩa. Neo mỗi dòng vào **silence_end** (giọng bắt đầu lại), neo dày d=0.14, KHÔNG lệch sớm, min 0.78s/dòng. Không gộp lùi cụm ngắn qua ranh câu.

## Auto-time (khớp giọng)
`python3 video-factory/tools/autotime.py <mp3> <N>` in mảng `d` (frame@30). Nếu chia lệch nhịp → neo tay theo câu chủ đề vào khoảng lặng thật (silencedetect d=0.28–0.55). Đoạn >~20s tách 2–3 cảnh con.

## Bảng màu (khóa)
navy `#16305c` · red `#e11d2a` · teal `#159a86` · blue `#1657d6` · ink `#16223a` · gold `#f2c230` · gray `#6b7280` · amber `#f59e0b`. Đỏ=đau/nợ · xanh dương=phân tích · teal=giải pháp · navy=khung.

## Bản đồ SKILL (dùng cái nào)
- `chuyen-tien-longform` — video DÀI 5 nhịp 16:9 (có phụ đề). Tem 1.
- `chuyen-tien-short-sosanh` — SHORT so sánh X vs Y 9:16. Tem 2 short.
- `chuyen-tien-short-tu-videodai` — SHORT bóc 1 vấn đề 9:16 (1 vấn đề→1 điểm→giải pháp→câu hỏi). Tem 3.
- (đang phát triển) **Tem "câu chuyện thật có bằng chứng"** (thẻ bằng chứng + slot ảnh/AI) · **Skin Tối** (nền đen lưới + chữ vàng kinetic, style @taphoakinhte) — proto trong scratchpad.

## Workflow chuẩn (mỗi video)
1. **Research** — đào số liệu thật + nguồn (file `*_SOLIEU.md`).
2. **Kịch bản** — viết prose Vbee + shotlist → **user DUYỆT** trước khi dựng.
3. **Vbee** — user thu → gửi mp3 → **verify** → auto-time.
4. **Execute** — viết Spec → still-check → render → subgen → export_master.sh.
5. **Review** — kiểm khung lỗi (tràn viền/đè nhân vật/mồ côi chữ) + spot-check sync phụ đề.
6. **Ship** — gửi user (720p/preview + master GitHub nếu >30MB) + bộ SEO. Commit + push.

## Sản xuất SONG SONG (scale nhiều video)
Có nhiều item độc lập (chùm short, batch SEO) → làm song song 2 tầng:
- **Tầng viết spec (fan-out sub-agent):** mỗi topic 1 sub-agent (Agent tool) viết script+spec đồng thời → gộp vào ALL_SHORTS/ALL_SPECS. Giữ context chính sạch.
- **Tầng render (shell):** `bash ../tools/batch_render.sh <slug1>:<audio1.mp3> <slug2>:<audio2.mp3> …` — render + mux + loudnorm nhiều item cùng lúc (mặc định 2 job, đổi bằng `MAXJOBS=3`). Log riêng `out/<slug>.buildlog`.
- Nặng CPU → chạy `run_in_background`; đừng để timeout 2 phút cắt.

## Kho nội dung
`video-factory/content/` — script (`*_thu.txt`), số liệu (`*_SOLIEU.md`), SEO (`*_SEO.md`), phụ đề (`*.ass`).
`video-factory/delivery/` — master lớn để user tải từ GitHub.
