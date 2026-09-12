# BÁO CÁO PHÂN TÍCH — 133 KÊNH FACELESS/EXPLAINER YOUTUBE (data gốc)
> Phân tích viên YouTube · 4/8/2026. **Nguồn: YouTube Data API v3 — em tự cào 133 kênh (sub 10k–100k) × 30 video = 3.741 video thật.** Đây là data sơ cấp 🟢, không phải blog.
> Dataset: `tools/faceless_audit/data/faceless_audit.csv`. Pipeline: `tools/faceless_audit/`.

---

## 0) TÓM TẮT ĐIỀU HÀNH (7 phát hiện đổi quyết định)
1. 🟢 **CHỦ ĐỀ + THỜI SỰ kéo view long-form, KHÔNG phải câu chữ title.** Khi chuẩn hoá trong từng kênh (breakout ratio), **mọi hiệu ứng đặc trưng title về ≈ 0** (số, câu hỏi, curiosity, nỗi đau, "giàu"… chênh ±0.1). Cái "title có số ăn 1.33×" ở bảng thô **chỉ là nhiễu cỡ kênh**. → Đừng dồn công tối ưu chữ title; dồn vào **chọn đúng chủ đề đang nóng**.
2. 🟢 **Engagement kênh mình 0.56% = ¼ trung vị ngành (2.34%).** Xác nhận lại: **nút thắt #1 vẫn là tương tác**, không phải chủ đề.
3. 🟢 **CHỈ 5% video long-form có caption/phụ đề.** Cả ngách gần như bỏ trống chữ on-screen → **lợi thế chữ-code của mình là khoảng trống thật** (research: caption +12–25% watch time).
4. 🟢 **3 "mỏ" long-form đang thắng trong tiền VN:** (a) **tin quyền lợi an sinh/lương hưu** (Góc Nhìn An Sinh — velocity cao nhất nhóm), (b) **live giá vàng** (cả một thể loại "Trực tiếp Giá Vàng" hàng giờ), (c) **newsjack tài chính** (Trạm Tri Thức: "Trung Quốc làm sập thị trường kim cương" 212k).
5. 🟢 **Ngách tiền VN chẻ đôi:** tag đông nhất = **"phát triển bản thân / tư duy làm giàu / tự do tài chính"** (guru self-help) VS **"giá vàng / chứng khoán / lãi suất"** (tin thị trường). Giữa 2 cực này là khoảng trống "tiền đời thường, không guru" của mình.
6. 🟢 **So sánh (X vs Y) KHÔNG phải đòn long-form.** Trong sample, title so sánh median 0.49× và breakout −0.1. → So sánh là **thế mạnh SHORT của mình** (đã chứng minh), **đừng bê nguyên sang long-form**.
7. 🟡 **Thời lượng dài không hại**, median view tăng dần tới **20–40 phút** rồi chững — nhưng lẫn live-stream giá vàng nên đọc thận trọng.

---

## 1) PHƯƠNG PHÁP & MẪU (minh bạch)
- **Discovery:** 28 seed query (VN + global, đa ngách faceless-density cao) → `search.list` order=viewCount, regionCode=VN → **681 kênh candidate** → `channels.list` lọc **sub 10k–100k** → **133 kênh**.
- **Thu thập:** 30 video gần nhất/kênh qua uploads playlist → **3.741 video** đủ metadata (view/like/comment/thời lượng/tag/caption/ngày đăng).
- **Quota API:** ~3.080/10.000 unit. Còn dư cho vòng sau.
- **Phân tầng:** cắt **long-form thật = ≥5 phút** (2.008 video / 96 kênh) để loại skit ngắn; phân nhóm ngành theo seed (FIN/EXPLAIN/STORY/LIST/MOTIV).

**⚠️ Giới hạn phải nói thẳng:**
- **"Faceless" chưa verify từng kênh** (API không có nhãn; youtube.com bị proxy chặn nên không xem video). Discovery "mọi ngách" hút cả **skit người thật** (Bên này vui lắm, Vui Cùng Bạn) và **brand ads** (HEO CAO BỒI, Masterise) → em đã lọc bằng thời lượng + nhóm, nhưng danh sách peer vẫn cần **soi mắt xác nhận faceless** (Phase 2).
- **View ≠ CTR.** API cho VIEW, không cho impression/CTR. Nên "title không tác động view" **không phủ nhận title tác động CTR** — chỉ nói: từ view, không đo được hiệu ứng title. Muốn CTR thật phải là chủ kênh.
- **Median bị nhiễu cỡ kênh** → em đã kiểm chéo bằng breakout ratio (chuẩn hoá trong kênh) cho phần title.

---

## 2) PACKAGING — TITLE (kết quả kiểm định kép)
**Bảng median view thô (long-form ≥5', nhóm FIN/EXPLAIN/STORY/LIST, n=1762):**

| Đặc trưng | n(có) | median CÓ | median KHÔNG | bội (thô) | **Sau chuẩn hoá trong kênh** |
|---|---|---|---|---|---|
| có số | 962 | 5.067 | 3.808 | 1.33× | **≈ 0 (biến mất)** |
| curiosity (bí mật/sự thật) | 140 | 5.880 | 4.420 | 1.33× | **≈ 0** |
| câu hỏi | 443 | 4.803 | 4.428 | 1.08× | **≈ 0** |
| so sánh | 82 | 2.372 | 4.792 | 0.49× | −0.1 (hơi âm) |
| nỗi đau (nghèo/nợ/bẫy) | 142 | 3.397 | 4.680 | 0.73× | ≈ 0 |
| thèm giàu (triệu phú…) | 151 | 3.441 | 4.678 | 0.74× | ≈ 0 |
| VIẾT HOA cụm | 792 | 4.212 | 4.813 | 0.88× | — |

**Đọc bảng (quan trọng):**
- Cột thô nói "số/curiosity ăn 1.33×" — **NHƯNG cột chuẩn hoá cho thấy đó là ảo giác cỡ kênh.** Trong cùng 1 kênh, thêm số/curiosity/nỗi đau vào title **không đổi view rõ rệt**.
- **Kết luận nghề:** với long-form, **title micro-optimization không phải đòn bẩy view.** Đòn bẩy là **chọn chủ đề** (§4). Title vẫn cần cho CTR (không đo được ở đây) → giữ title rõ ràng, đúng nội dung, **nhưng đừng ảo tưởng "công thức title" tạo ra view**.
- **So sánh** là ngoại lệ đáng ghi: hơi ÂM ở long-form ⇒ **giữ so sánh cho SHORT** (nơi data kênh mình chứng minh nó thắng), không mặc định dùng cho video dài.

---

## 3) FORMAT — THỜI LƯỢNG & CAPTION
**Điểm ngọt thời lượng (long-form ≥5', core):**
| Bucket | n | median view |
|---|---|---|
| 5–10' | 255 | 1.967 |
| 10–20' | 406 | 3.572 |
| **20–40'** | 492 | **6.323** ⬆ đỉnh |
| 40'+ | 609 | 5.040 |
→ 🟡 Dài hơn **không** bị phạt view; đỉnh median ở **20–40'**. Cẩn trọng: nhóm 40'+ lẫn live-stream giá vàng. Với mình, **8–20' vẫn hợp lý để bắt đầu**, có thể thử 1 bản 20–30' phân tích sâu.

**Caption/phụ đề:** 🟢 **chỉ 110/2.008 = 5%** video long-form có caption. Gần như **cả ngách bỏ trống chữ on-screen.** → Kênh mình **chữ Việt do code = đỏ lợi thế**, đúng thứ research nói +12–25% watch time. Đây là **moat rẻ mà cả ngách không làm**.

**Engagement:** 🟢 trung vị ngành **2.34%** (like+comment/view). Kênh mình **0.56%** → **kém ~4 lần**. Củng cố: sửa engagement (CTA sắc, câu hỏi chia phe, pin comment) là ưu tiên #1, trên cả đổi chủ đề.

---

## 4) THỂ LOẠI LONG-FORM ĐANG THẮNG (nơi chọn chủ đề)
Từ top velocity long-form ≥5' (views/ngày), 3 "mỏ" nổi rõ trong tiền VN:

1. 🟢 **TIN QUYỀN LỢI AN SINH / LƯƠNG HƯU** — *Góc Nhìn An Sinh* (23.6k sub) thống trị velocity: "Lịch Lĩnh Lương Hưu Tháng 8 Lùi Ngày — 11 Khoản…" 86.632 view/ngày; "NQ13 từ 2027: Tròn 60 tuổi Lĩnh 2,8 triệu/tháng"; "Người 75 tuổi nhận 4 khoản tiền 2026". → **Tiền đời thường cho người thật, dạng tin chính sách** — CHÍNH LÀ định vị mình, họ làm rất ăn. **Đáng học & đáng cạnh tranh.**
2. 🟢 **LIVE GIÁ VÀNG** — cả một thể loại ("Trực tiếp Giá Vàng Sáng/Trưa/Chiều" — Hanoi in my eyes, CCCS…) chạy stream hàng giờ, view đều. Không hợp faceless-scripted của mình, nhưng cho thấy **cầu theo dõi giá vàng theo ngày cực lớn** → nuôi bằng SHORT điểm tin vàng.
3. 🟢 **NEWSJACK TÀI CHÍNH** — *Trạm Tri Thức* "Trung Quốc vừa làm sập thị trường Kim Cương?" 212k; *TIN TỨC 24H* "Cú Sốc Giá Vàng – Không Phải 5.000 USD". → **Bắt sóng sự kiện + đặt câu hỏi** = mạch long-form ăn khách. Hợp mình.

**Tag SEO nhóm tài chính (đông nhất):** phát triển bản thân (216) · tư duy làm giàu (166) · tài chính cá nhân (127) · tự do tài chính (126) · giá vàng hôm nay (109) · chứng khoán (108) · sách nói (92) · lãi suất (68) · vàng sjc (69). → Ngách chẻ đôi **guru self-help** vs **tin vàng/thị trường**; mình chen giữa: *tiền đời thường, có số liệu, không guru*.

---

## 5) BỘ KÊNH PEER ĐÁNG HỌC (long-form ≥5', gần mình) — cần soi mắt xác nhận faceless
| Kênh | Nhóm | Sub | Median view LF | Ghi chú |
|---|---|---|---|---|
| **Bẻ Khóa Tư Duy** | FIN | 46k | **122.536** | Tư duy tiền, mạnh nhất nhóm tư duy |
| **The Secret Signal** | STORY | 78.6k | 160.992 | Kể chuyện faceless (bí ẩn/rùng rợn) — narration thuần |
| **Thế Giới Hoang Dã** | EXPLAIN | 47.7k | 112.438 | Explainer động vật, 10/30 có caption |
| **Góc Nhìn An Sinh** | FIN | 23.6k | 12.257 | ⭐ Tin an sinh/lương hưu — velocity cao, đúng lane mình |
| Trạm Tri Thức | FIN | 39k | 20.635 | Newsjack tri thức/tài chính |
| Kênh Tài Chính | FIN | 97.6k | 15.611 | 11/29 có caption (hiếm) |
| Cổng Trí Tuệ · Bí mật kinh doanh · Huy Luong · Mặt Trái Sự Thật · Cỏ Khong Ngu | FIN | 28–60k | 11–13k | Cụm tư duy/tài chính tầm trung |
| Astral Current | EXPLAIN | 80.8k | 3.2 triệu | Bùng (n=3) — đáng mổ riêng |

→ **Đề xuất Phase 2:** khoá 8–10 kênh này làm **peer set**, soi tận mắt (faceless?), mổ **thumbnail + hook** (cần mở network policy).

---

## 6) ĐỐI CHIẾU & SỬA `packaging_toolkit.md` v2
| Điểm trong v2 | Data mới nói gì | Hành động |
|---|---|---|
| "So sánh ⭐1 cho long-form" | Long-form so sánh **không lợi thế** (0.49× thô, −0.1 chuẩn hoá) | **Hạ so sánh xuống chỉ dùng SHORT**; long-form ưu tiên newsjack/tin an sinh |
| "Front-load nỗi đau, VIẾT HOA từ đau" | Nỗi đau/greed/VIẾT HOA **không kéo view** | Giữ cho CTR nhưng **bỏ kỳ vọng tạo view**; không ép mọi title theo khuôn đau |
| "Kho 10 công thức title" | Title không phải đòn bẩy view long-form | Đổi trọng tâm sang **"cổng CHỌN CHỦ ĐỀ theo cầu/thời sự"** hơn là cổng chữ nghĩa |
| Chưa nói caption | 95% ngách KHÔNG caption | **Thêm luật: chữ on-screen suốt video = moat** |
| Điểm ngọt "8–15'" | Median đỉnh 20–40' | Nới trần thử nghiệm lên 20–30' |

---

## 7) GIỚI HẠN & PHASE 2 (cần mở network policy)
Chưa làm được trong session này vì `youtube.com`/`i.ytimg.com` bị proxy chặn:
- **Thumbnail (ảnh):** mã hoá thị giác top-performer (chữ/mặt/màu/motif) — cần tải ảnh.
- **Hook teardown từ phụ đề:** mổ 0–30s + mạch giữ chân 30–50 video breakout — cần transcript.
- **Xác nhận faceless** từng kênh peer.
→ Mở network policy (allow `youtube.com`, `*.googlevideo.com`, `i.ytimg.com`) là em chạy `audit.py subs/thumbs` ra nốt 3 lớp này.

## 8) HÀNH ĐỘNG ĐỀ XUẤT (ưu tiên theo tác động)
1. **Sửa ENGAGEMENT** (đòn bẩy #1, gap 4×): mỗi video 1 CTA sắc + 1 câu hỏi chia phe + pin comment mồi.
2. **Khai thác 2 mỏ đúng lane:** (a) **tin an sinh/quyền lợi** kiểu Góc Nhìn An Sinh, (b) **newsjack tài chính** kiểu Trạm Tri Thức — bằng chất "số liệu thật + không guru + Anh Hai".
3. **Biến caption thành moat:** giữ chữ Việt code on-screen gần như suốt (95% ngách bỏ trống).
4. **Chuyển trọng tâm packaging:** từ "công thức title" sang **cổng chọn chủ đề theo cầu/thời sự**; title chỉ cần rõ + đúng.
5. **Phase 2** (mở network policy): thumbnail + hook teardown + xác nhận faceless 8 kênh peer.
