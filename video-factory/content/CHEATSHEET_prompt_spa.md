# 🧠 CHEAT-SHEET: 6 BƯỚC VIẾT PROMPT XỊN
### (chuẩn Anthropic · dùng cho MỌI AI · ví dụ ngành SPA)

> Cùng một con AI, người viết prompt rõ ràng thì ra kết quả chốt đơn, người hỏi mơ hồ thì ra bài chung chung vô dụng. Đây là 6 bước để biến 1 prompt dở thành prompt xịn — minh hoạ bằng bài toán quen thuộc: **viết bài quảng cáo cho spa**.

---

## ❌ Prompt DỞ (ai cũng hay viết)
> "Viết bài quảng cáo cho spa của tôi."

→ AI đoán mò, ra một bài chung chung, đọc xong không biết gửi cho ai, không ai nhắn tin.

## ✅ Sửa lại qua 6 BƯỚC

### ① RÕ MỤC ĐÍCH — output để làm gì, cho AI đọc, dài bao nhiêu
AI không đọc được suy nghĩ của bạn. Càng mơ hồ, nó càng phải đoán.
> 💆 *Spa:* "Viết **bài đăng Facebook** quảng cáo **gói liệu trình trị mụn**, cho **khách nữ 20–30 tuổi ở TP.HCM**, đọc lướt trên điện thoại, dài **khoảng 150 chữ**."

### ② CHO LÝ DO (tại sao) — để AI hiểu dụng ý, tự suy đúng
Cho biết mục tiêu thật đằng sau, AI sẽ tự điều chỉnh cho trúng.
> 💆 *Spa:* "Mục đích là để khách **nhắn tin đặt lịch tư vấn**, chứ không phải chỉ để bài trông đẹp."

### ③ GÁN VAI — 1 câu vai trò nén cả tá chuẩn mực
Thay vì liệt kê hàng chục quy tắc, gán 1 vai là AI tự bật đúng phong cách.
> 💆 *Spa:* "Bạn là **chuyên viên marketing spa 5 năm kinh nghiệm**, chuyên viết content chốt đơn cho khách hàng nữ."

### ④ ĐƯA VÍ DỤ — dán mẫu mình thích, đừng tả bằng lời
"Ngắn gọn, chuyên nghiệp" mỗi người hiểu một kiểu. Ví dụ xoá tan mơ hồ.
> 💆 *Spa:* "Viết theo đúng giọng của bài mẫu sau: *[dán 1 bài spa cũ mà bạn thấy hay — giọng gần gũi, có emoji, có call-to-action]*."

### ⑤ NÓI LÀM GÌ (không nói ĐỪNG) — tiêu chí tích cực, hữu hạn
"Đừng làm X" là vô số khả năng; "hãy làm Y" là đích rõ ràng.
> 💆 *Spa:*
> ✗ "đừng viết lan man, đừng sến"
> ✓ "**Chỉ tập trung** vào cảm giác **tự tin khi hết mụn** + **ưu đãi trong tháng**. Kết bài bằng **lời kêu gọi nhắn tin đặt lịch**."

### ⑥ CHO PHÉP "KHÔNG BIẾT" — chống bịa (quan trọng nhất)
AI hay tự bịa giá, số, deadline nghe rất hợp lý. Buộc nó thành thật.
> 💆 *Spa:* "Nếu tôi **chưa cung cấp giá hoặc thời gian ưu đãi**, hãy để trống dạng **[giá]**, **[hạn ưu đãi]** — **tuyệt đối không tự bịa con số**."

---

## 🧩 PROMPT HOÀN CHỈNH (gộp cả 6 bước)
> "Bạn là **chuyên viên marketing spa 5 năm kinh nghiệm** chuyên viết content chốt đơn.
> Hãy viết **bài đăng Facebook ~150 chữ** quảng cáo **gói liệu trình trị mụn**, cho **khách nữ 20–30 tuổi ở TP.HCM** đọc lướt trên điện thoại.
> Mục đích: để khách **nhắn tin đặt lịch tư vấn**.
> Chỉ tập trung vào **cảm giác tự tin khi hết mụn** và **ưu đãi trong tháng**, kết bằng **lời kêu gọi nhắn tin**.
> Viết theo giọng của bài mẫu: *[dán ví dụ]*.
> Nếu chưa có giá/hạn ưu đãi thì để **[giá]**, **[hạn ưu đãi]**, không tự bịa."

→ Ra bài đúng đối tượng, đúng mục tiêu, sẵn sàng đăng.

---

## ⚡ KHUNG ĐIỀN NHANH (áp cho mọi ngành)
"Bạn là **[VAI TRÒ]**. Hãy **[VIỆC CẦN LÀM]** từ **[NỘI DUNG]**.
Gửi cho **[AI ĐỌC]**, họ có **[THỜI GIAN]** để **[MỤC ĐÍCH]**.
Chỉ giữ **[TIÊU CHÍ TÍCH CỰC]**. Viết theo mẫu: **[VÍ DỤ]**.
Chỗ nào chưa có dữ liệu thì ghi **'chưa xác định'**, không bịa."

---

## 🎛️ MẸO THEO TỪNG AI
- **Claude** → thích **thẻ XML**: `<boi_canh>…</boi_canh>` `<vi_du>…</vi_du>`
- **ChatGPT / Gemini** → thích **markdown**: tiêu đề, gạch đầu dòng
- **Model "suy luận"** (GPT dòng o, Gemini Thinking, DeepSeek R1) → ra lệnh **gọn**; **đừng** bắt "suy nghĩ từng bước", **bớt** ví dụ — nó tự suy luận rồi, nhồi thêm dễ phản tác dụng.

## ⚠️ GHI NHỚ (điểm nhiều người hiểu sai)
`temperature` = độ **NGẪU NHIÊN** khi chọn chữ, **KHÔNG** phải núm "bịa ít / bịa nhiều".
- thấp = ổn định, lặp lại · cao = đa dạng, bay bổng
- Chống bịa = làm **Bước ⑥** + cho **dữ liệu tốt**, KHÔNG phải chỉnh temperature.

---
> 💡 Mẹo vàng: **càng mơ hồ → AI càng phải đoán → càng dễ lệch.** Viết rõ = đỡ phải sửa.
