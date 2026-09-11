# HANDOFF — Xưởng video "Chuyện Tiền · Anh Hai Kể"
> Hồ sơ bàn giao cho phiên/Cowork tiếp theo. Đọc file này là nắm được toàn bộ: kênh, hệ thống sản xuất, thành quả, learnings, và việc đang dở.
> Cập nhật: 2026-09 · Repo: `RyanPhan29/n8n` (fork) · Nhánh dev: `claude/video-analysis-channel-research-hnevyn` · Chủ kênh: Ryan (phanminh254@gmail.com).

---

## 0. TL;DR cho người tiếp nhận
- Đây là **xưởng video faceless tài chính tiếng Việt**, nhân vật cartoon **Anh Hai**, giọng **Vbee nam Bắc**. Ra **video dài 16:9** + **short 9:16**.
- Engine Remotion (React) **đã khóa** — sản xuất = điền spec, KHÔNG code tay từng cảnh (trừ khi làm dòng "explainer median-lite" mới, xem mục 5).
- **Việc đang ở tiền tuyến:** xây **thư viện explainer "median-lite"** — mô phỏng cơ chế tài chính bằng code (animation CHÍNH LÀ lời giải thích), phong cách "median" (nền tối, grain, chú thích vẽ tay trên footage thật). Đã xong 2 bài khớp giọng thật: **Lãi kép** + **Đòn bẩy**. Đang mở rộng: Lạm phát (script đầy đủ đã duyệt độ sâu), Dòng tiền, Giá nhà.
- **Bài học lớn nhất gần đây:** (a) chú thích phải "biểu đạt trọn vẹn" chứ không hời hợt; (b) tiếng phải TỰ NHIÊN, không synth; (c) content YouTube phải ĐẦY ĐỦ chiều sâu, không micro như short.

---

## 1. Định vị kênh (bất biến)
- Tên: **Chuyện Tiền · Anh Hai Kể**. Ngách: tài chính cá nhân/vĩ mô đời thường cho người Việt.
- Nhân vật **Anh Hai** (cartoon, 23 pose cảm xúc) — luôn ở góc/đáy, THỨ YẾU; nội dung chính ở giữa.
- Giọng: **Vbee nam Bắc**, tốc độ 0,9–1,0, tự nhiên.
- Bảng màu khóa: navy `#16305c` · red `#e11d2a` · teal `#159a86` · blue `#1657d6` · ink `#16223a` · gold `#f2c230` · gray `#6b7280` · amber `#f59e0b`. (Đỏ=đau/nợ · xanh dương=phân tích · teal=giải pháp · navy=khung.)
- Giờ đăng (trước peak 2–3h): **Thứ 6 18:30 · CN 08:00 · Thứ 4 19:00**. Short rải 4–5/ngày khung 19–21h.

### ⛔ BẤT BIẾN đạo đức nội dung (RẤT QUAN TRỌNG)
- **Chữ Việt CHỈ do code render** — không để AI/ảnh chứa chữ Việt (hỏng dấu).
- **Tin nhạy cảm (án, pháp luật, chính trị):** chỉ đưa **trung lập + dẫn nguồn**, **KHÔNG nêu tên cá nhân, KHÔNG quy kết, KHÔNG dùng ảnh mặt người thật/nghi phạm**. Chỉ khai thác **góc dòng tiền/bài học tài chính**. (Đã từng có yêu cầu làm tin án mạng dùng ảnh nghi phạm → TỪ CHỐI, giữ nguyên tắc này.)
- **Số liệu nói dạng KHOẢNG, có nguồn.** Không bịa số.
- **Verify mọi file thu Vbee trước khi dùng** (thời lượng + đếm khoảng lặng — tránh nhầm/ghép file).
- **-14 LUFS** cho mọi bản. Model ID không xuất hiện trong commit/PR/artifact.

---

## 2. Hệ thống sản xuất (engine + pipeline)
### Đường dẫn công cụ (BẮT BUỘC)
```
HS = /opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell   # render Remotion
CH = /opt/pw-browsers/chromium-1194/chrome-linux/chrome                          # chụp still
FF = /usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2
```
Render PHẢI có `--browser-executable="$HS"`. Chạy trong `video-factory/remotion-demo` (có node_modules).

### Lệnh lõi
```bash
# still-check:  node_modules/.bin/remotion still <slug> out/x.png --frame=N --browser-executable="$HS"
# render:       node_modules/.bin/remotion render <slug> out/<slug>_raw.mp4 --browser-executable="$HS" --concurrency=4 --log=error
# phụ đề:       python3 ../tools/subgen.py <script.txt> <giong.mp3> <slug>.ass
# xuất bản:     bash ../tools/export_master.sh out/<slug>_raw.mp4 <giong.mp3> <slug>.ass <slug>   # → _YT_MASTER.mp4 + _SUB30.mp4
# auto-time:    python3 ../tools/autotime.py <mp3> <N>   # in mảng d (frame@30) khớp giọng
```

### Engine ĐÃ KHÓA — KHÔNG sửa
`Kit.tsx`, `Blocks.tsx`, `Short.tsx`, `Root.tsx` (chỉ thêm `<Composition>` đăng ký được), `fonts.css`, `public/*`.
- Video dài: `VideoSpec` → `ALL_SPECS` trong `src/Specs.tsx`.
- Short 9:16: `ShortSpec` → `ALL_SHORTS` trong `src/ShortSpecs.tsx`.
- **Mọi video/short mở đầu bằng `cover(...)`** = ảnh bìa (frame đầu). Xuất bìa: `remotion still <slug> out/<slug>_THUMB.png --frame=20`.

### Gotchas môi trường (đã kiểm — đừng phí công thử lại)
- **OffthreadVideo `loop` KHÔNG chạy khi render** → clip đứng hình ở frame cuối. Fix: dùng clip full-length + `playbackRate` chậm để không loop trong cảnh. (`<Loop>` component thì reset OK.)
- chromium chụp web KHÔNG qua proxy → cap URL thật lỗi ERR_TUNNEL. Dùng WebFetch lấy nội dung.
- **HuggingFace 403** → không ASR/forced-align. Phụ đề dùng subgen (khoảng lặng).
- **Higgsfield 0 credit, gTTS bị chặn** → ảnh AI + TTS phải do USER làm (Flow, Vbee).
- ffmpeg re-encode dài > 2 phút → chạy `run_in_background`.
- **SendUserFile ≤ 30MB.** File to đưa vào `delivery/` (≤100MB) rồi push → user tải từ GitHub.
- **Bẫy audio (đã cắn 2 lần):** `amix` mặc định `duration=longest` làm file phình dài, tiếng trôi sai chỗ. LUÔN dùng `amix=...:duration=first` + `-shortest`, và đo lại per-second RMS để xác nhận vị trí tiếng.
- **cwd không tự giữ giữa các lệnh bash rời** → luôn `cd /home/user/n8n/video-factory/remotion-demo &&` ở đầu lệnh render/ffmpeg.

---

## 3. Skills (tem khóa — dùng cái nào)
- `chuyen-tien-longform` — video DÀI 5 nhịp 16:9 (có phụ đề).
- `chuyen-tien-short-sosanh` — SHORT so sánh X vs Y 9:16.
- `chuyen-tien-short-tu-videodai` — SHORT bóc 1 vấn đề 9:16.
- `chuyen-tien-diemtin-pro` — SHORT điểm tin/bóc bẫy/đọc vị "daily" từ 1 bài báo (thẻ bằng chứng + beat "Anh Hai đọc vị"). Tuân thủ BẤT BIẾN tin nhạy cảm.

---

## 4. Thành quả đã có (inventory)
### Video dài đã giao (`delivery/`)
- `NoTot_NoTotNoXau_1080p.mp4` — **video #5** "Vì Sao Người Giàu Vay Nợ Nhiều Hơn?" (style hybrid Anh Hai, 3:47).
- `MuaThue_median_1080p.mp4` + `MuaThue_median_4K.mp4` — "Mua hay Thuê" dựng lại theo **median craft** (footage thật + chú thích).
- `CoMay_YouTube_1080p.mp4` (Cỗ máy) · `7Bay_YouTube_1080p.mp4` · `KimCuong_1080p.mp4` · `THETD_YT_1080p.mp4` · `TienKet_YT_1080p.mp4` · v.v.
- Hàng loạt **short** (ShortD/E/G/TT/DT + diemtin_*_MASTER) — xem `delivery/`.

### Explainer "median-lite" — TIỀN TUYẾN (xem mục 5)
- `LaiKepSim` (lãi kép) + `DonBaySim` (đòn bẩy) — đã khớp **giọng thật** (file `content/voice/laikep_voice.wav` 31,4s + `donbay_voice.wav` 39,4s, tách từ 1 bản Vbee gộp).

### Research/chiến lược (`content/` + `content/research/`)
- `content/research/{demand_2026.md, competitors.md, strategy_2026.md}` — nghiên cứu nhu cầu/đối thủ/định dạng.
- `content_backlog.md` (36 ý tưởng, 9 pillar), `content_strategy.md`, `median_style_kit.md` (đo đạc craft median), `thumbnail_prompt_guide.md`, `vbee_doc_nuot_guide.md`.

---

## 5. THƯ VIỆN EXPLAINER "MEDIAN-LITE" (frontier — Cowork tiếp ở đây)
### Triết lý (điều làm nên khác biệt)
Kênh median mà Ryan muốn học **mô phỏng CƠ CHẾ bằng code — animation CHÍNH LÀ lời giải thích**, không phải "b-roll làm nền + đè chữ" (kiểu cũ, hời hợt). Mỗi explainer = **footage thật có chú thích vẽ tay (hook) → mô phỏng cơ chế bằng code → chốt số + câu lật niềm tin**.

### Bộ KIT dùng chung: `src/MedianKit.tsx`
Export: `INK/GRAY/DIM/GOLD/RED`, `FN/FH` (font), `glowGold/glowRed/glowW`, `fIn`, `eOut`, và các component:
- **`FilmGrain`** — grain ĐỘNG (seed đổi mỗi frame → nhiễu hạt nhấp nháy như phim). `Bg` = radial trôi + grain.
- **`Spotlight`** — tối xung quanh, sáng 1 vùng focus (dẫn mắt).
- **`HandCircle`** — vòng khoanh VẼ TAY 2 lớp (run nhẹ, hơi lố), vẽ dần.
- **`Bracket`** — bracket "đo" 1 vùng, vẽ dần.
- **`FramedShot`** — khung archival B&W bọc footage (góc gold, Ken Burns, vignette).
- Font nhẹ: `src/median-fonts.css` (BVPm 300/400/500/600 data-URI).

### 2 explainer đã xong (mẫu để nhân bản)
- **`src/LaiKepSim.tsx`** (lãi kép, 31,4s khớp giọng): intro footage `coinstack` + spotlight + khoanh 1 cọc + bracket "1 tháng" + mũi tên → "×240 tháng" → cross-dissolve vào biểu đồ; đường cong vàng "lãi đẻ lãi" phồng vượt vùng xám "vốn góp", cầu tuyết to dần + hạt vàng bay lên + số đếm chạy tới 1,56 tỷ; chốt "gốc 720tr vs lãi 843tr". Toán: 3tr/tháng, 7%/năm, 20 năm.
- **`src/DonBaySim.tsx`** (đòn bẩy, 39,4s khớp giọng): intro footage `machine` (máy đếm tiền) + chú thích; cột NỢ VAY 700tr (xám, CỐ ĐỊNH) + VỐN của bạn (vàng, trên đỉnh); tài sản +10% → vốn +33%; tài sản −30% → vốn về 0 = MẤT TRẮNG (nợ còn nguyên); chốt "phóng to cả đúng lẫn sai".
- Cả 2 đăng ký trong `Root.tsx` (`LaiKepSim`, `DonBaySim`).

### LEARNINGS craft median (đã trả giá để rút ra — Cowork PHẢI theo)
1. **Chú thích "biểu đạt TRỌN VẸN" (không hời hợt):** khoanh 1 CHI TIẾT cụ thể (không khoanh chung chung), nhãn nói RA Ý NGHĨA; spotlight dẫn mắt; đọc theo THỨ TỰ (vật → ý → cú lật) như một câu; nét vẽ tay run nhẹ.
2. **Bố cục:** nhãn số/mô tả LUÔN đặt NGOÀI khung ảnh (lề ≥70px), không đè lên footage. Mũi tên phải có đích rõ (đi từ vật → tới nhãn).
3. **Nhịp:** mỗi ý giữ đủ lâu để ĐỌC KỊP (đừng nhồi nhiều lớp trong <1,5s). Khi có giọng → neo beat theo TỪNG ĐOẠN thoại.
4. **Grain:** dùng `FilmGrain` động (opacity ~0.14–0.15), không noise tĩnh.
5. **TIẾNG (quan trọng, đã cắn nhiều lần):** CHỈ tiếng TỰ NHIÊN (bút "kẽ" cho chú thích, xu rơi cho tăng trưởng, tiếng "đổ" cho sụp đổ). **TUYỆT ĐỐI không synth/pad/sweep** (nghe như tiếng lỗi). Tiếng growth phải TO rõ đúng lúc animation chạy (đặt −20…−26dB, trên nền giọng), im khi xong. Không hiệu ứng rung kéo dài (từng để shake 9,5s → giật).
6. **Quy trình ghép tiếng CHUẨN:** `[voice]` là input đầu, `amix=inputs=2:normalize=0:duration=first` + `-shortest` + `loudnorm=I=-14:TP=-1.5:LRA=11`. Đo per-second RMS xác nhận vị trí trước khi gửi.

### Còn dở trong thư viện
- **Lạm phát** — script YouTube ĐẦY ĐỦ đã viết + Ryan đã duyệt độ sâu: `content/lamphat_full_vbee.txt` (722 từ, ~5–6 phút). CHƯA dựng hình. (Bản micro cũ `lamphat_vbee.txt` bỏ.)
- **Dòng tiền thụ động** (`content/dongtien_vbee.txt`) + **Giá nhà vs thu nhập** (`content/gianha_vbee.txt`) — MỚI có bản MICRO, cần NÂNG lên độ sâu YouTube như lạm phát.

---

## 6. Quy trình GIỌNG Vbee (đọc nuột + khớp hình)
### Viết cho Vbee đọc nuột (cẩm nang: `content/vbee_doc_nuot_guide.md`)
- **Số viết bằng CHỮ** ("ba triệu", "một tỷ rưỡi", "hai mươi năm") — Vbee vấp số dạng "3tr/1,5 tỷ".
- Câu ngắn 1 ý, **hết ý là dấu chấm** (chống đọc lẹm sang từ sau).
- Dấu phẩy chỉ ở chỗ nghỉ thật; **KHÔNG chèn phẩy vào giữa cụm dính** ("ba trăm triệu", "lãi kép" — viết liền).
- Bỏ `...`, gạch ngang `—`, ngoặc, ký tự lạ. Từ nối đầu câu (Và, Nhưng, Cho nên) cho mạch trôi.

### Tách + khớp giọng (đã làm cho lãi kép/đòn bẩy)
- Ryan hay dán NHIỀU script vào Vbee đọc **1 file liền** → em verify (thời lượng + `silencedetect`), đếm số đoạn qua gap ~1,3s, tách bằng `ffmpeg -ss/-to`, loudnorm -14 từng file, lưu `content/voice/`.
- **Đề nghị Ryan thu MỖI BÀI 1 FILE riêng** (hoặc nghỉ 2–3s giữa các bài) để tách chuẩn.
- Neo hình: map TỪNG ĐOẠN thoại → beat hình (intro/dựng/growth/chốt), đặt frame anchor theo mốc giây thật.

### Bài học ĐỘ SÂU nội dung (mới nhất)
Ryan chê explainer micro "**hời hợt so với YouTube**". YouTube cần **đầy đủ**: hook → cơ chế + ví dụ đời thường → số liệu thật có mốc → cú lật → **quan điểm + giải pháp** → **mặt trái thẳng thắn** → 3 việc làm ngay → disclaimer → câu hỏi kéo comment. Mẫu chuẩn: `content/lamphat_full_vbee.txt`.

---

## 7. VIỆC TIẾP THEO (ưu tiên cho Cowork)
1. **Nâng #4 Dòng tiền + #5 Giá nhà** lên độ sâu YouTube như lạm phát (bám mẫu `lamphat_full_vbee.txt`) → Ryan duyệt → thu Vbee.
2. **Dựng hình explainer Lạm phát** (script đã duyệt): nhiều nhịp median (mô phỏng "tiền teo dần" + thẻ số liệu có nguồn + footage thật chú thích), không chỉ 1 sim ngắn. Dùng `MedianKit`.
3. Sau khi đủ 5 explainer → **ghép vào video dài** (hook cảm xúc hybrid + các segment median-lite) — đúng mục tiêu thư viện.
4. Khớp giọng + tiếng tự nhiên + xuất bản (bìa + SEO TikTok-first & YouTube).
5. (Deferred) Chuẩn hoá "khung viral": 5 bước mở đầu lật-niềm-tin + 6 kỹ thuật edit median + khi nào median-lite vs hybrid.

---

## 8. Bản đồ FILE nhanh
- **Kịch bản Vbee đã duyệt/khớp:** `content/{laikep,donbay,muathue,notot,comay}_vbee.txt`, `content/lamphat_full_vbee.txt`, `content/{dongtien,gianha}_vbee.txt` (micro).
- **Giọng đã tách/chuẩn hoá:** `content/voice/{laikep,donbay}_voice.wav`.
- **Craft/cẩm nang:** `content/median_style_kit.md`, `content/vbee_doc_nuot_guide.md`, `content/thumbnail_prompt_guide.md`.
- **Research:** `content/research/{demand_2026,competitors,strategy_2026}.md`, `content/content_backlog.md`, `content/content_strategy.md`.
- **Source explainer:** `remotion-demo/src/{MedianKit,LaiKepSim,DonBaySim,MuaThue,NoTot,CoMayHybrid}.tsx`, `src/median-fonts.css`.
- **Asset:** `remotion-demo/public/broll/` (budget, cashspin, coinfigs, coinstack, coinstack, crowd, handsbill, machine, people, piggy, richwave, stocks) · `public/sfx/` (chime, coin, ding, pop, scribble, swell, ticker, whoosh).
- **Đã giao:** `delivery/`.

---

## 9. Cách render 1 explainer median-lite (công thức Cowork lặp lại)
1. Viết/sửa `src/<Ten>Sim.tsx` dùng `MedianKit` (Bg+grain, FramedShot intro, Spotlight/HandCircle/Bracket chú thích, phần mô phỏng cơ chế bằng SVG/DOM). Đăng ký `<Composition>` trong `Root.tsx`.
2. `cd remotion-demo` → still-check vài frame khoá (intro / lúc animation chạy / chốt).
3. Render `--browser-executable="$HS"`.
4. Nếu có giọng: neo beat theo mốc đoạn thoại; ghép tiếng TỰ NHIÊN (`duration=first` + `-shortest` + loudnorm -14); đo RMS xác nhận.
5. Gửi Ryan bản xem; sửa theo góp ý; commit + push (kèm 2 dòng attribution).

---

### Ghi chú bàn giao
- Nhánh dev: `claude/video-analysis-channel-research-hnevyn` (PR #4 mở, draft). Commit kèm:
  `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>` + dòng `Claude-Session`.
- Luôn đọc `CLAUDE.md` (gốc repo) + skill tương ứng trước khi làm.
- Giữ đúng BẤT BIẾN đạo đức (mục 1) — đặc biệt tin nhạy cảm: không tên/ảnh cá nhân, không quy kết.
