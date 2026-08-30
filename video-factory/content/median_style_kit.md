# MEDIAN STYLE KIT v2 — bóc FRAME-BY-FRAME (đo thật, không đoán)

> Nghiên cứu 9 video gốc (~2 giờ footage) bằng cách trích khung + đo pixel: contact sheet toàn video, burst 30fps ở các điểm reveal/chuyển cảnh, đo luminance từng frame, đo quầng sáng/nhiễu/vignette bằng PIL.
> Corpus median THẬT = 8 video toán/lý (Trật tự, Lượng giác, Toán 30000 năm, Vật lý 2500 năm, Xác suất, Coriolis, Pi, PEMDAS). Video "quần áo đắt tiền" (3,2 cut/phút) là KÊNH KHÁC — bỏ.
> File này thay thế bản v1 (v1 đoán sai vài chỗ — xem "Đính chính" cuối).

## 0. PHÁT HIỆN LỚN NHẤT — KHÔNG CÓ HARD CUT
Scene-cut detection (threshold 0.30): **8 video median = 0–0,2 cut/phút**. Tức là CẢ VIDEO LÀ MỘT TẤM VẢI LIÊN TỤC — mọi thứ **cross-dissolve / morph** vào-ra, KHÔNG cắt cứng giữa các cảnh.
- Đo luminance từng frame qua ranh giới cảnh (PEMDAS 264s, divider "PHẦN 3"): YAVG phẳng ~28 → **KHÔNG dip về đen giữa cảnh**. Chữ cũ mờ đi trong khi chữ mới hiện lên, chồng nhau, tổng sáng gần như không đổi.
- **Black breath chỉ ở ĐẦU video**: đo được frame 0–15 (0,0–0,5s) đen tuyền, rồi mới fade-in. (Không phải giữa mỗi cảnh như v1 nói.)
- ⇒ Với engine Remotion: KHÔNG dùng `<Sequence>` cắt cứng. Dùng 1 AbsoluteFill xuyên suốt, mỗi phần tử tự fade theo opacity theo khung tuyệt đối. Nền không bao giờ tắt.

## 1. NỀN (đo bằng PIL trên frame thật)
- KHÔNG phải đen tuyền, KHÔNG phải xanh-đen. Là **xám trung tính rất tối**: tâm ~`#0d0d0d`, góc ~`#090909` (chênh 3–4 mức) → **vignette radial nhẹ**, sáng ở giữa.
- **Nhiễu hạt (grain) cực nhẹ**: std luminance ~0,9/255 ≈ **0,4%** (v1 ghi 4% → SAI, mạnh gấp 10). Grain gần như vô hình, chỉ để mặt phẳng không "chết".
- ⇒ CSS nền: `radial-gradient(120% 90% at 50% 42%, #0d0d0e 0%, #0a0a0b 45%, #080809 100%)` + lớp noise opacity ~5% blendMode overlay (biên độ thấp).

## 2. MÀU (KHÓA — đo trên nhiều frame)
- Chữ chính (narration/hero): **trắng ngà** `#e8e8ea` (không phải #fff chói). Nét sáng đo được L≈223–239.
- Phụ/gloss/trục/đã-qua: **xám** `#7d7f83` → mờ hơn nữa `#4a4c50`.
- **1 màu nhấn tuỳ chủ đề, mỗi lúc CHỈ 1 phần tử:**
  - Video xác suất → **ĐỎ** `#e5484d` chỉ dùng cho "trạng thái xấu": người MẮC BỆNH, vài chấm dương-tính-nhầm. Mọi thứ khác trắng/xám.
  - Video toán/lý → **VÀNG amber** `#e9c46a` cho đường/kết luận/annotation quan trọng.
  - ⇒ Bài Mua-vs-Thuê: **ĐỎ = nợ/lãi vay/mất tiền** (1 phần tử/khung), **VÀNG = phương án thắng (thuê+đầu tư)/annotation chốt**. Không dùng teal/navy/blue.

## 3. QUẦNG SÁNG (glow bloom) — "premium tell", đo được
Hero number "30/300" (V3): nét lõi sáng rộng ~19px, quầng (L>40) rộng ~62px → **bán kính glow ≈ 21px ≈ 23% chiều cao glyph**. Falloff mềm (223→124→18).
- ⇒ Với hero number/title cỡ ~150–190px: `text-shadow: 0 0 8px rgba(255,255,255,.55), 0 0 22px rgba(255,255,255,.38), 0 0 48px rgba(233,233,238,.20)`.
- Chỉ hero (số lớn/từ khoá/điểm chạy timeline) mới glow. Body text KHÔNG glow.
- **Grey-demotion trong 1 số**: "300" → chữ "3" trắng+glow, "00" xám (khoe hàng đơn vị). Số/nhãn cũ luôn tụt xuống xám.

## 4. CHỮ & FONT
- Font: geometric sans bo tròn. Dự án có **BVPm** (Be Vietnam Pro 300/400/500/600 — mới nhúng data-URI ở `src/median-fonts.css`, hỗ trợ dấu tiếng Việt) cho narration/label; **Mont 800/900** cho hero number/wordmark. (fonts.css gốc chỉ có weight nặng → đã bổ sung weight nhẹ.)
- **Narration** (câu kể): sentence-case, weight 400–500, letter-spacing ~0. Cỡ vừa, căn giữa.
- **Nhãn/label** (PHẦN, tên mục, nguồn): **IN HOA, letter-spacing rộng (~0.22em)**, weight 500, màu xám. Cỡ nhỏ.
- **Hero number/equation**: weight 800–900, glow, căn giữa, 1 dòng.
- Reveal chữ: **fade + rise 8–12px trong ~0,25s** (đo opening: ramp ~7 frame). KHÔNG slide xa, KHÔNG bung to.
- **Typewriter caret "|"**: từ khoá/nhãn "đáp án" (VD "TRẬT TỰ", "CALCUL|", "E = m|") gõ từng ký tự **~0,11s/ký tự** + caret nhấp nháy. Equation cũng có caret nhấp nháy sau khi xong.

## 5. NHỊP (pacing, đo)
- Rất chậm, sang. Mỗi ý ở lại lâu (nhiều cảnh 8–20s). Mô phỏng chạy liên tục vận tốc tuyến tính (bi rơi, kim rơi, coin xoay, chấm timeline trôi).
- **Constant subtle motion**: KHÔNG frame nào đứng hình chết. Coin xoay ngay từ frame xuất hiện; sao/bụi trôi; nền vignette "thở" rất nhẹ.

## 6. BỘ KHỐI DỰNG (component) — bóc từ frame thật
1. **Opening**: 0,5s đen → fade-in vật thể hook (thường là **ẢNH THẬT của thứ viral**: screenshot Facebook bài toán, hoặc coin xoay trên sàn lưới phối cảnh). Hook = "vật chứng", không phải chữ to.
2. **Section divider (chapter break)**: nhãn nhỏ IN HOA tracked "PHẦN 3" (xám) + 1 câu trắng sentence-case ở dưới, căn giữa, nền đen. Dùng chia chương.
3. **Hero equation/number**: số/công thức lớn glow căn giữa, 1 dòng. Có thể kèm nhãn chủ đề nhỏ phía trên ("đại số", "tính phân phối"). Kết quả: `A → (mũi tên xuống) → B`.
4. **Bilingual list "từ chính + phụ"** (PEMDAS 145s): **canh TRÁI**, mỗi mục = từ lớn trắng + dòng nhỏ xám ngay dưới. Không bullet/box. Giãn dòng rộng. Hiện lần lượt. Khi focus 1 mục → các mục khác **tụt xám gần tắt** (grey-demotion).
5. **Stat-card row** (Xác suất 168s) — CHUẨN cho "3 con số": 3 cột chia bởi **vạch dọc mảnh**, mỗi cột = nhãn 2 dòng (từ trắng + gloss xám) → **icon line-art mảnh** → **% lớn trắng**. Annotation vàng vẽ tay (ellipse + mũi tên + ghi chú ngắn) chỉ trên 1 cột nhấn.
6. **Annotation vẽ tay** (vàng): vòng ellipse khoanh + mũi tên cong + chú thích ngắn — đây là "chú thích sáng tạo" (không phải chỉ text). Mỗi khung 1 cái.
7. **Timeline mốc chạy** (Toán 30k, Vật lý — CHẠY XUYÊN VIDEO): trục ngang đáy mảnh, tick, **chấm sáng glow trôi**; mốc active = trắng+đậm+glow, mốc cũ = xám mờ. Dùng kể "20 năm".
8. **Thanh tỉ lệ/so sánh**: thanh ngang chia đoạn có nhãn (Vật lý "năng lượng bảo toàn"), hoặc 2–3 thanh dài-ngắn khác nhau (so sánh mức). Trắng + 1 thanh nhấn.
9. **Biểu đồ đường**: trục xám mảnh, đường vẽ dần (stroke-dashoffset) + chấm chạy glow, nhãn giá trị **bên phải điểm cuối**, 1 đường nhấn màu.
10. **Population/dot array**: lưới người/chấm phối cảnh, trước sáng → sau chìm đen; vài phần tử ĐỎ (thiểu số xấu). Dùng "phần lớn chúng ta…".
11. **Ảnh tư liệu / chân dung**: đen-trắng, khung viền trắng mảnh, **quầng radial sau ảnh**, caption tracked-caps dưới (tên + năm). Có khi 2 chân dung cạnh nhau.
12. **Phone mockup**: khung điện thoại tối giản (SMS lừa đảo…) — sạch, xám.
13. **Quote card**: câu trích in nghiêng căn giữa + attribution nhỏ (+ chân dung/vật bên cạnh).
14. **Two-column compare**: 2 nhãn box ("QUY ƯỚC" vs "EXCEL") → kết quả khác nhau. Dùng cho nghịch lý.
15. **Outro wordmark**: chữ thường "median" (logo có "e" ngược) căn giữa, xám-trắng, nền đen, tiết chế → mình đổi thành wordmark "Chuyện Tiền" tối giản 1 nét.

## 7. SỐ LIỆU (LUÔN 2026, gắn nguồn — đã có ở muathue)
Lãi vay ~8–11% · lợi suất cho thuê ~3–4% · lãi gửi ~7% · giá CH HN ~85–123tr/m². Nguồn gắn card xám nhỏ đáy.

## 8. ĐÍNH CHÍNH v1 (chỗ v1 đoán SAI, frame-check bắt được)
- v1: "chuyển cảnh dip qua đen". SAI → cross-dissolve, tổng sáng phẳng, không dip.
- v1: "grain opacity ~4%". SAI → ~0,4% (nhẹ gấp 10).
- v1: "nền đen tuyền #050607". Chưa đúng → xám trung tính #0a0a0b + vignette radial, không xanh.
- v1: "π hiện trên nền xám sáng (invert)". SAI (đọc nhầm thumbnail) → luminance đo được vẫn ~25 (tối); đó là divider "PHẦN 3" trên nền đen.
- v1: "chữ #ededed". Gần đúng nhưng nên #e8e8ea + phân tầng xám rõ (grey-demotion là linh hồn).

## 9. ÁP VÀO MUA-vs-THUÊ (rebuild MuaThue.tsx)
- Bỏ hard cut → 1 canvas liên tục, phần tử fade/rise theo khung tuyệt đối, **đồng bộ theo mốc giọng** (đã tính mảng timestamp câu/cảnh).
- Nền vignette radial + grain 0,4%. Chữ #e8e8ea + xám phân tầng. ĐỎ cho nợ/lãi vay/mất tiền, VÀNG cho phương án thắng + annotation chốt.
- Dùng: divider "PHẦN 1..N", stat-card row cho 3 số 2026, annotation vàng vẽ tay ở số chốt ("thuê+đầu tư thắng"), timeline 20 năm mốc chạy, thanh so sánh 3 mức (vay 10 / gửi 7 / thuê 3–4), biểu đồ 2 đường, list "từ chính+phụ" cho phe mua/phe thuê, 3 câu hỏi đánh số, outro wordmark.
- Glow chỉ ở hero number. Typewriter caret cho từ khoá chốt. SFX: whoosh rất khẽ khi chuyển chương + tick/pop nhẹ khi số hiện + nhạc nền trầm; master -14 LUFS.
