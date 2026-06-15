# 🗺️ SƠ ĐỒ HỆ THỐNG CK — chức năng từng workflow

> Đọc 1 lần để hết rối. Toàn bộ hệ thống chia **4 TẦNG**: từ "quét rộng phát hiện"
> → "đào sâu" → "ra quyết định" → "soi lại để giỏi hơn".

---

## 🧭 4 TẦNG & vai trò

| Tầng | Tên | Làm gì | Workflow |
|---|---|---|---|
| 1 | 👀 **TAI MẮT** | Tự động quét, **phát hiện** "để ý mã này" | CK·01, 02, 03, 11 |
| 2 | 🔬 **KÍNH LÚP** | **Đào sâu** 1 mã (luận điểm ①③⑤) | CK·04, CK·05 (/sâu) |
| 3 | ⚖️ **BÀN CÂN** | **Ra quyết định**: vào không, bao nhiêu | CK·05 (/check /size), CK·06 |
| 4 | 🪞 **GƯƠNG SOI** | **Đánh giá định kỳ** để lên tay | CK·07, 08, 09, 10 |

---

## 📋 Từng workflow

### Tầng 1 — Tai mắt (tự chạy, gửi Telegram)
- **CK·01 · 📰 Báo cáo sáng** (7h, T2–T6): gom tin VN + quốc tế + dòng tiền **watchlist**, đối chiếu chéo, gắn cờ giật tít.
- **CK·02 · 🚨 Cảnh báo cổ phiếu** (mỗi 15', giờ GD): báo **đột biến giá/khối lượng** trong giờ.
- **CK·03 · 🌍 Cảnh báo khối ngoại** (15h45): tổng kết **dòng tiền ngoại** sau phiên.
- **CK·11 · 📡 Radar thị trường** (6h50): quét ~54 mã (VN30 + thanh khoản cao), nổi **TOP biến động NGOÀI watchlist** → chống điểm mù danh sách cứng.

### Tầng 2 — Kính lúp (đào sâu 1 mã)
- **CK·04 · 🔬 Soi sâu (bấm tay trên n8n)** — research note **ĐẦY ĐỦ** 5 phần.
- **CK·05 /sâu (gõ Telegram)** — nháp **①③⑤ tập trung**, tiện trên điện thoại.
  *(So sánh chi tiết ở mục dưới ⬇️)*

### Tầng 3 — Bàn cân (quyết định)
- **CK·05 · 🤖 Bot lệnh** (Telegram): trợ lý bỏ túi, 3 lệnh:
  - `/check MÃ` → bảng 7 câu (②④⑥⑦ tự động) + gắn bậc rủi ro.
  - `/size MÃ` → khối lượng nên mua + R:R + **lãi/lỗ tại mục tiêu** + trần bậc (80/20).
  - `/sâu MÃ` → AI viết nháp ①③⑤ + chất lượng/đòn bẩy (FSA).
- **CK·06 · 📓 Sổ luận điểm** (8h CN): nhắc anh ghi & review luận điểm đã đặt.

### Tầng 4 — Gương soi (định kỳ, để giỏi lên)
- **CK·07 · 🎯 Scorecard** (16h): chấm tín hiệu thắng/thua theo thời gian.
- **CK·08 · 💰 Định giá tuần** (6h45 T4): soi định giá cơ bản watchlist.
- **CK·09 · 🔁 Backtest tuần** (9h T7): kiểm định ngưỡng tín hiệu (tránh tự lừa mình).
- **CK·10 · 🏢 Nhịp ngành BĐS** (6h45 T2): sức khoẻ ngành BĐS/Ngân hàng/Xây dựng.

---

## ⚠️ CK·04 vs CK·05 (/sâu) — KHÁC NHAU CHỖ NÀO

Anh lấn cấn đúng: **bản chất giống nhau** (cùng nguồn dữ liệu, cùng AI Claude phân
tích sâu). Khác ở **độ tiện** và **độ dài**:

| | **CK·04 Soi sâu** | **CK·05 `/sâu`** |
|---|---|---|
| Dùng ở đâu | Mở n8n, sửa mã, bấm Execute | **Gõ `/sâu MÃ` trên Telegram** |
| Độ sâu | **Đầy đủ 5 phần** (~700 từ, đọc 3 bài) | Tập trung **①③⑤ + FSA** (~550 từ, 2 bài) |
| Tốc độ | ~60–90s | ~30–60s |
| Khi nào dùng | Mã anh **cực kỳ nghiêm túc**, muốn bản đầy đủ nhất | **Đa số trường hợp** — nhanh, gọn, ngay trên điện thoại |

👉 **Đề xuất của em:** dùng **CK·05 `/sâu` làm chính** (tiện, đủ để quyết). CK·04 chỉ
mở khi anh muốn "bản in đầy đủ" tại bàn. **Nếu thấy thừa, hoàn toàn có thể BỎ CK·04**
cho gọn — `/sâu` đã gánh ~90% công việc của nó. Anh quyết, không bắt buộc giữ cả hai.

---

## 🔄 QUY TRÌNH 1 QUYẾT ĐỊNH (ghép tất cả lại)

```
SÁNG: đọc CK·01 (báo sáng) + CK·11 (radar) → thấy mã đáng để ý
  ↓
/check MÃ   → lọc nhanh: rẻ/đắt? dòng tiền? R:R? (Tầng 3)
  ↓ (nếu lọt)
/sâu MÃ  (hoặc CK·04)  → hiểu ①③⑤, chất lượng, rủi ro (Tầng 2)
  ↓ anh tự trả lời ①③⑤, đủ 7 câu?
/size MÃ   → mua bao nhiêu, lãi/lỗ dự kiến, trần bậc 80/20 (Tầng 3)
  ↓
Ghi Sổ luận điểm (CK·06) → MUA (đuôi 01, không margin)
  ↓
CK·07/08/09/10 chạy nền → soi lại, anh lên tay dần (Tầng 4)
```

> Nguyên tắc thép: không đủ 7 câu → ĐỨNG NGOÀI. Tiền mặt là một vị thế.
> Mọi thứ là gợi ý để anh phản biện, KHÔNG phải khuyến nghị mua/bán.
