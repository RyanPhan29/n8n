---
name: chuyen-tien-diemtin-pro
description: TEM KHÓA — Dựng SHORT ĐIỂM TIN / BÓC BẪY / ĐỌC VỊ 9:16 "daily" cho kênh "Chuyện Tiền · Anh Hai Kể" từ 1 bài báo thời sự. Gồm thẻ bằng chứng (source/evidence), beat "Anh Hai đọc vị", giọng châm biếm tùy chọn, ghép BIỂU ĐỒ số liệu, và bóc comment độc giả. Chỉ VIẾT SPEC + ghép asset, KHÔNG sửa engine.
when_to_use: Kích hoạt khi user gửi 1 bài báo/tin thời sự tài chính (ảnh chụp hoặc link) muốn ra short trong ngày — điểm tin, cảnh báo/bóc bẫy, phân tích "đọc vị góc nhìn", tin có xung đột để kéo comment, hoặc bài có số liệu cần biểu đồ. KHÔNG dùng cho so sánh X vs Y thuần (chuyen-tien-short-sosanh) hay video dài (chuyen-tien-longform).
resources: "examples/ (trỏ spec thật: SHORT_LONGTHANH936, SHORT_PNJ, SHORT_KIMCUONG_GIA, SHORT_LIENNH trong ShortSpecs.tsx) · tools chung: autotime.py, subgen.py, export_master.sh, overlay_chart.sh, pnj_chart.py"
---

# TEM 4 — SHORT ĐIỂM TIN / ĐỌC VỊ / BÓC BẪY "DAILY" (9:16)

> TEM ĐÃ KHÓA. Dùng CHUNG engine `Short.tsx`. Chỉ điền `ShortSpec` vào `ALL_SHORTS` + ghép asset. KHÔNG sửa engine.

## Khi nào dùng dạng nào
- **Điểm tin**: bắt tin nóng trong ngày → thẻ bằng chứng + số + câu hỏi.
- **Bóc bẫy**: cảnh báo tiêu dùng (phí, lừa đảo, cam kết mua lại…) → hook giật → rủi ro → quy tắc vàng → hỏi.
- **Đọc vị / góc nhìn**: khi user muốn "có đánh giá" → thêm beat `👁 Anh Hai đọc vị` (bài học + nghịch lý) trước câu hỏi.
- **Xung đột (kéo comment mạnh)**: mở bằng so sánh gây tức → dựng kỳ vọng → bẻ kèo → **câu hỏi công bằng chia 2 phe**.
- **Bóc comment (Phần 2)**: khi bài gốc nhiều bình luận → cắt nỗi lo được-thích-nhất thành short phản hồi (card comment giả lập, KHÔNG tên thật).

## ⛔ BẤT BIẾN — tin nhạy cảm (đại án, pháp luật, chính trị)
- CHỈ đưa tin **trung lập**, luôn dẫn nguồn ("theo kết luận Thanh tra…", "báo X đưa").
- **KHÔNG nêu tên cá nhân, KHÔNG quy kết.** Đánh giá của Anh Hai chỉ ở **góc dòng tiền / bài học tài chính**, không bình luận chính trị.
- Số nói dạng **KHOẢNG**, có nguồn. Không bịa.

## Cấu trúc 6–8 nhịp (khóa mềm)
1. **HOOK** (`head`+`icon`, pose sly/shock): nghịch lý / số sốc / câu hỏi.
2. **THẺ BẰNG CHỨNG** (`source`+`evidence`): headline báo + quote + `src`.
3. **SỐ / DỮ LIỆU** (`value`+`staticNum`+`label`) hoặc **BIỂU ĐỒ** (xem dưới).
4. **(đọc vị 1)** `👁 Anh Hai đọc vị:` bài học.
5. **(đọc vị 2 / nghịch lý)** đối chiếu gây suy nghĩ.
6. **CÂU HỎI** (`q`, bar navy): chốt, chia phe → kéo comment.

## Trường ShortSpec hay dùng
`source:{name,date}` (tag nguồn nhỏ) · `evidence:{headline:[],quote:[],src}`+`evidenceTop` (thẻ bằng chứng) · `value/suffix/staticNum/numColor/numTop/numSize` (số to giữa) · `label`+`labelTop`+`labelC` · `icon`+`iconTop`+`iconSize` · `cards`(2 phần tử → VS, `dim:true`=phe mờ) · `q` · `ah:false` (ẨN Anh Hai — dùng cho cảnh biểu đồ) · `ahCorner:'left'|'right'` · `bar`(navy/red/teal/amber/gold/blue).

## Neo cảnh theo giọng (KHÓA quy trình)
1. **Verify Vbee** trước: `ffmpeg -i giong.mp3` (thời lượng) + đếm khoảng lặng (tránh nhầm/ghép file).
2. Lấy bản đồ lặng: `ffmpeg -i g.mp3 -af silencedetect=noise=-30dB:d=0.30 -f null -`.
3. Chia 6–8 nhịp, **cắt cảnh vào mốc lặng rõ (>0.45s)**. `d`(frame@30) = (mốc_sau − mốc_trước)×30. Tổng `d` = thời lượng×30.
4. ⚠️ **Bẫy đuôi**: câu hỏi cuối cần đủ thời gian — chừa cảnh cuối ≥3.5s. Đừng dồn hết vào 1 cảnh dài 9s.

## Ghép BIỂU ĐỒ (kỹ thuật khóa)
1. Vẽ chart bằng matplotlib theo mẫu `tools/pnj_chart.py` (bảng màu kênh: navy doanh thu, gold phụ, red nhấn số âm; chỉ gắn nhãn số cần; chú thích cột quan trọng). Xuất PNG landscape.
2. Cảnh biểu đồ trong spec: đặt **`ah:false`** + `head` ngắn ở đỉnh → chừa giữa trống.
3. Render short (silent) như thường → rồi ghép:
   `bash ../tools/overlay_chart.sh out/<slug>_raw.mp4 <giong.mp3> <chart.png> <t_bắt_đầu> <t_kết_thúc> out/<slug>_MASTER.mp4`
   (t = frame tích lũy của cảnh biểu đồ / 30). Script tự loudnorm -14 LUFS.

## Việt hóa số (đừng để lỗi)
- Thập phân dùng **dấu phẩy**: "1–1,2 tỷ" → `value:1, suffix:'–1,2 tỷ'` (KHÔNG `decimals` ra "1.2").
- Số lớn: `value:6, suffix:' nghìn tỷ'` thay vì 6000 (tránh mất dấu chấm ngăn cách).
- **`label` ≤ ~22 ký tự / 1 dòng** — dài hơn sẽ xuống 2 dòng + đè đầu Anh Hai. Dài thì đẩy vế 1 lên `head`.

## Còn Anh Hai · màu · pose · export → giống Tem 1/2/3
Anh Hai căn giữa đáy (thứ yếu), full người. Nội dung KHÔNG để Anh Hai che.

## Quy trình chuẩn (mỗi short)
1. Research bài báo → verify số + URL + ngày (thẻ bằng chứng). Nhạy cảm → theo BẤT BIẾN trên.
2. Viết kịch bản Vbee (prose sạch, số khoảng, kết bằng câu hỏi; châm biếm nhẹ nếu hợp) → **user duyệt**.
3. User thu Vbee → **verify** → neo cảnh theo lặng.
4. Viết `ShortSpec` → **still-check** vài khung (số dài/label/đuôi câu hỏi/thẻ) sửa tràn-đè.
5. (nếu có) vẽ + ghép biểu đồ bằng `overlay_chart.sh`; không thì mux + loudnorm -14 như Tem 2/3.
6. SEO (title/caption/hashtag/**pin comment mồi**) + gửi user + push.

## SEO / engagement (fix nút thắt tương tác)
Mỗi short: 1 CTA sắc + 1 câu hỏi chốt + **mồi comment để pin** (mời kể hoàn cảnh / chọn phe). Đây là đòn kéo tương tác chính.
