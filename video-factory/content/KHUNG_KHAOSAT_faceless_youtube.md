# KHUNG KHẢO SÁT — AUDIT 100 KÊNH FACELESS YOUTUBE (Research Design)
> Bản thiết kế nghiên cứu cấp chuyên gia. Mục tiêu chất lượng: báo cáo trị giá 500tr–1 tỷ.
> Vai: Phân tích viên YouTube cấp cao. Nguyên tắc: **mọi kết luận neo vào data gốc (YouTube Data API), không suy đoán từ blog.**
> Trạng thái: THIẾT KẾ xong · CHỜ (1) API key + (2) chốt scope để THỰC THI.

---

## 1) CÂU HỎI KINH DOANH (vì sao làm)
Kênh "Chuyện Tiền · Anh Hai Kể" (faceless, cartoon, VN) muốn tăng trưởng bằng cách **học từ kênh faceless đang thắng thật**. Cần trả lời 5 câu, bằng SỐ:
1. **Packaging:** khuôn title + kiểu thumbnail nào tương quan với view/velocity cao (không phải "nghe hay")?
2. **Format:** thời lượng, nhịp đăng, thể loại nào là "điểm ngọt"?
3. **Nội dung:** cấu trúc hook + mạch giữ chân của video breakout ra sao (bóc từ phụ đề)?
4. **SEO/mô tả:** họ đặt tag/mô tả/CTA thế nào?
5. **Khoảng trống:** mình đang thua ở đâu, chen vào đâu?

## 2) KHUNG MẪU (Sampling Frame)
- **Vũ trụ mẫu:** kênh YouTube **faceless / bán-faceless**, ngôn ngữ **tiếng Việt**, ngách **tiền bạc – tài chính – kinh tế – đầu tư – kinh doanh** (scope mặc định; xem §9 để mở rộng).
- **Bộ lọc cứng:** subscriber **10.000–100.000**; còn đăng đều (video mới ≤ 90 ngày); ≥ 20 video để lấy được 30 gần nhất (kênh <30 video lấy tối đa có).
- **Định nghĩa "faceless":** không lộ mặt người dẫn xuyên suốt — gồm: motion-graphics/explainer, doodle/whiteboard, kinetic-typography, stock-footage + voiceover, AI-avatar, slideshow. **Cờ faceless do heuristic + kiểm mẫu tay** (§4).
- **Cỡ mẫu:** mục tiêu **n = 100 kênh** → ~**3.000 video** (30 gần nhất/kênh). Nếu VN không đủ 100, bù bằng kênh khu vực + top faceless finance tiếng Anh làm nhóm đối chiếu (đánh dấu riêng).

## 3) PHƯƠNG PHÁP DISCOVERY (làm sao ra 100 kênh — không bịa)
API không có nhãn "faceless" → discovery 3 lớp:
1. **Seed theo từ khoá** (`search.list`, regionCode=VN, relevanceLanguage=vi): "tài chính cá nhân, đầu tư, chứng khoán, tiền, làm giàu, kinh tế, giá vàng, bất động sản, quản lý tiền, tự do tài chính, tài chính cho người mới…" → gom candidate channelId.
2. **Snowball:** từ mỗi kênh seed, mở rộng qua video liên quan + kênh cùng cụm chủ đề → thêm candidate.
3. **Lọc & phân loại:** `channels.list` lấy sub/tổng view/ngày tạo/uploads playlist → áp bộ lọc cứng §2 → **kiểm tay cờ faceless** trên mẫu (xem 1 video/kênh hoặc suy từ title/format). Ghi rõ kênh nào "chưa chắc faceless".
> Minh bạch: log lại số seed, số candidate, số bị loại & lý do → khung mẫu tái lập được.

## 4) DATA THU THẬP (mỗi kênh)
**Cấp kênh:** channelId, tên, subs, tổng view, tổng video, ngày tạo, quốc gia, uploads-playlistId, cờ faceless (heuristic + tay), thể loại chính.
**Cấp video (30 gần nhất):** videoId, title (nguyên văn), publishedAt, duration, **viewCount**, likeCount, commentCount, description (full), tags, categoryId, **caption available (bool)**, definition (HD/SD), thumbnail URL (maxres).

## 5) CHỈ SỐ PHÁI SINH (~35 biến — nơi tạo ra insight)
**Hiệu suất:**
- `views/day` = viewCount ÷ tuổi video → **velocity** (đo "hot trong thời gian ngắn").
- `breakout ratio` = views video ÷ **trung vị view kênh** → phát hiện video "vượt trần kênh".
- `engagement rate` = (like+comment) ÷ view; `comment ratio` riêng (proxy độ kích tranh luận).
- `like/view`, `view/sub` (độ với ngoài sub).

**Title (bóc đặc trưng bằng regex/NLP):**
- độ dài (ký tự/từ); có số? (bool) + **chẵn/lẻ**; **VIẾT HOA cụm?** (bool + số token hoa); **câu hỏi?** (Vì sao/Tại sao/Có nên…); **so sánh?** (A vs B / hay); **curiosity words** ("bí mật/sự thật/không ai/mà không biết…"); **lexicon nỗi đau** (nghèo/nợ/mất/sai lầm/bẫy/cháy túi) vs **lexicon thèm** (giàu/triệu phú/tự do/đổi đời); có emoji?; có `|`/pipe?; cam kết thời lượng ("trong N phút")?
→ **Tương quan từng đặc trưng với velocity/breakout**, tách theo cỡ kênh (10–30k / 30–60k / 60–100k) để khỏi nhiễu.

**Thumbnail (mã hoá thị giác — cần ảnh, §8):** số từ chữ; có mặt/nhân vật?; màu chủ đạo; motif tiền (số to/mũi tên/tiền/vàng/chart); mức tương phản; đỏ có/không. Code trên **mẫu phân tầng top-performer**.

**Format & nhịp:** phân bố thời lượng (buckets: <60s short / 1–3' / 3–8' / 8–15' / 15'+); **videos/tuần**; **thứ + giờ đăng** (từ publishedAt, quy về giờ VN); tỉ lệ short vs long.

**SEO/mô tả:** độ dài mô tả; có link/CTA/affiliate?; số tag; tag hay dùng; hashtag.

**Nội dung (từ phụ đề top breakout, §8):** cấu trúc hook 0–30s; reframe/nỗi đau mở màn; nhịp ví dụ; open loop; câu chốt quotable; độ dài câu; mật độ số liệu.

## 6) GIẢ THUYẾT KIỂM ĐỊNH (nêu trước, tránh thiên vị)
- H1: title **câu hỏi nghịch lý** + **số lẻ** có velocity cao hơn title trung tính.
- H2: **breakout** phần lớn do **1 chủ đề bắt sóng thời sự** chứ không do kênh đều tay.
- H3: thumbnail **1 số to + mặt/nhân vật cảm xúc + nền tối** CTR-proxy cao hơn.
- H4: điểm ngọt thời lượng long-form ngách tiền VN nằm ở **8–15 phút**.
- H5: **comment ratio** cao đến từ title/nội dung "chia phe" → đòn bẩy engagement (nút thắt #1 của mình).
> Mỗi H: xác nhận / bác bỏ / chưa đủ data — kèm số.

## 7) DELIVERABLE (bàn giao)
1. **Dataset** `faceless_audit.csv` + `.json` (100 kênh × 30 video, đủ biến §4–5) — tái phân tích được.
2. **Bảng xếp hạng:** top kênh theo velocity; top 50 video breakout; leaderboard engagement.
3. **Báo cáo sâu** (markdown/PDF): trả lời §1, kiểm §6, **mỗi luật gắn nhãn 🟢/🟡/🔴 + trích số nguồn**.
4. **Thumbnail contact-sheet** (nếu lấy được ảnh) — mã hoá thị giác top-performer.
5. **Hook teardown** 30–50 video breakout (từ phụ đề) — mổ cấu trúc giữ chân.
6. **Gap analysis** đối chiếu kênh mình + **playbook hành động** ưu tiên theo tác động.

## 8) HẠ TẦNG DATA (đã kiểm chứng 4/8) — 3 TẦNG
- ✅ **TẦNG 1 — Metadata (tự động, cần API key):** `googleapis.com` THÔNG. Toàn bộ §4–5 phần metadata + title + SEO + velocity làm được ngay trong sandbox.
- ⚠️ **TẦNG 2 — Ảnh thumbnail:** `i.ytimg.com` bị proxy chặn (403). → hoặc **anh mở network policy**, hoặc em **xuất danh sách URL + contact-sheet HTML** để anh mở xem/tải.
- ⚠️ **TẦNG 3 — Phụ đề/nội dung:** `youtube.com` bị chặn → yt-dlp trong sandbox bó tay; API captions cần OAuth chủ kênh (không lấy chéo được). → hoặc **anh mở network policy** (em tự kéo phụ đề bằng yt-dlp), hoặc em **đưa list top video + lệnh/tool 1 chạm** để anh tải transcript rồi dán lại.

## 9) SCOPE (chờ anh chốt — đổi khung mẫu)
- **A (mặc định, đề xuất):** faceless **tiền/tài chính/kinh tế/đầu tư/kinh doanh — tiếng Việt.** Actionable nhất, so trực tiếp được với mình.
- **B:** A + nhóm **đối chiếu tiếng Anh** (faceless finance global) để học craft đỉnh.
- **C:** faceless **mọi ngách** (giải trí/kể chuyện/AI) — học kỹ thuật packaging/edit chung, nhưng loãng cho niche tiền.

## 10) EM CẦN GÌ ĐỂ CHẠY
1. **1 YouTube Data API v3 key** (anh tạo ~5' trên máy: Google Cloud Console → bật YouTube Data API v3 → tạo key → giới hạn key chỉ API này → dán cho em → **xóa sau khi xong**). *Quota mặc định 10.000 unit/ngày đủ cho 100 kênh; nếu chạm trần em chia 2 ngày.*
2. **Quyết định TẦNG 2–3:** mở network policy (tự động toàn bộ) HAY em đóng gói turnkey để anh lấy thumbnail/phụ đề.
3. **Chốt scope** §9.
> Có (1) là em chạy Tầng 1 ra dataset + báo cáo định lượng ngay. (2)(3) quyết độ sâu phần thumbnail + nội dung.
