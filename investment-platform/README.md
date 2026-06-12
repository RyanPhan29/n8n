# Nền tảng Hỗ trợ Đầu tư (Chứng khoán + Bất động sản)

Hệ thống tự động thu thập – phân tích – cảnh báo thông tin đầu tư, chạy trên
**n8n + AI + VPS** sẵn có. Lợi thế cốt lõi: **gom tin từ nhiều nguồn nhanh và
đầy đủ hơn**, để ra quyết định có dữ liệu thay vì cảm tính.

> ⚠️ **Lưu ý quan trọng:** Đây là **trợ lý thông tin**, KHÔNG phải công cụ dự
> đoán giá hay đảm bảo lợi nhuận. Mọi quyết định mua/bán cuối cùng là của bạn.
> Dữ liệu có thể trễ hoặc sai sót — luôn kiểm chứng trước khi giao dịch.

---

## Lộ trình

| Giai đoạn | Nội dung | Trạng thái |
|-----------|----------|-----------|
| **1** | Watchlist cổ phiếu + cảnh báo giá/khối lượng bất thường qua Telegram | ✅ Có sẵn |
| 2 | Gom tin tức nhiều nguồn + AI tóm tắt → báo cáo sáng mỗi ngày | ⏳ Kế tiếp |
| 3 | Module bất động sản (giá rao theo khu vực) | ⏳ |
| 4 | Backtest đơn giản + tinh chỉnh ngưỡng | ⏳ |

---

## Giai đoạn 1 — Cảnh báo cổ phiếu bất thường

**File workflow:** [`workflows/stock-watchlist-alerts.json`](workflows/stock-watchlist-alerts.json)

### Workflow làm gì?
1. **Lịch chạy:** cứ 15 phút/lần trong giờ giao dịch (9h–15h, T2–T6).
2. **Lấy dữ liệu:** gọi API công khai của TCBS cho từng mã trong watchlist.
3. **Phân tích:** so sánh khối lượng hôm nay với trung bình 20 phiên, và % thay
   đổi giá so với phiên trước.
4. **Cảnh báo:** nếu phát hiện bất thường (KL ≥ 2x trung bình, hoặc giá biến
   động ≥ 3%) → gửi 1 tin tổng hợp về Telegram.

### Nguồn dữ liệu
- **TCBS public API** (`apipubaws.tcbs.com.vn`) — miễn phí, là nguồn mà thư viện
  `vnstock` cũng dùng. Không cần API key cho dữ liệu giá cơ bản.

---

## Hướng dẫn cài đặt

### Bước 1 — Tạo Telegram Bot
1. Mở Telegram, chat với **@BotFather** → gõ `/newbot` → đặt tên → nhận
   **Bot Token** (dạng `123456:ABC-DEF...`).
2. Lấy **Chat ID** của bạn:
   - Chat 1 câu bất kỳ với bot vừa tạo.
   - Mở: `https://api.telegram.org/bot<TOKEN>/getUpdates`
   - Tìm `"chat":{"id":<CHAT_ID>}` → đó là Chat ID của bạn.
   - (Muốn gửi vào nhóm thì thêm bot vào nhóm, Chat ID nhóm là số âm.)

### Bước 2 — Thêm biến môi trường trên VPS
Để không hard-code Chat ID trong workflow, thêm vào file cấu hình n8n
(ví dụ `docker-compose.yml` hoặc `.env`):

```env
TELEGRAM_CHAT_ID=123456789
```
Khởi động lại n8n để biến có hiệu lực.

### Bước 3 — Tạo Credential Telegram trong n8n
1. n8n → **Credentials** → **New** → tìm **Telegram API**.
2. Dán **Bot Token** ở Bước 1 → Save (đặt tên ví dụ `Telegram Bot (CK)`).

### Bước 4 — Import & nối credential
1. n8n → **Workflows** → **Import from File** → chọn
   `stock-watchlist-alerts.json`.
2. Mở node **Gửi Telegram** → ở mục Credential chọn `Telegram Bot (CK)` vừa tạo
   (thay cho placeholder trong file).
3. **Activate** workflow (bật công tắc góc trên phải).

### Bước 5 — Chạy thử
- Bấm **Execute Workflow** (hoặc **Test step** trên node Telegram) để kiểm tra
  ngay, không cần đợi tới giờ chạy.
- Nếu chưa có mã nào bất thường, workflow chạy xong mà không gửi tin — đó là
  bình thường. Muốn test tin nhắn, tạm hạ ngưỡng trong node phân tích (xem dưới).

---

## Tuỳ chỉnh

Mở node **Lấy dữ liệu & Phân tích (TCBS)**, sửa phần CẤU HÌNH đầu file:

```js
const WATCHLIST  = ['VNM','FPT','HPG','MWG','VCB','SSI','DGC','VND','MBB','STB'];
const VOL_SPIKE  = 2.0;   // KL hôm nay >= 2x trung bình -> cảnh báo
const PRICE_MOVE = 3.0;   // |thay đổi giá| >= 3% -> cảnh báo
const LOOKBACK   = 20;    // số phiên tính trung bình KL
```

- **Thêm mã:** chỉ cần bỏ thêm mã vào mảng `WATCHLIST`.
- **Nhạy hơn:** giảm `VOL_SPIKE` (vd 1.5) hoặc `PRICE_MOVE` (vd 2.0).
- **Đổi tần suất:** node **Lịch chạy** → sửa cron `*/15 9-15 * * 1-5`
  (vd `*/5` = 5 phút/lần).

> 💡 **Đơn vị giá:** TCBS trả giá theo *nghìn đồng*, workflow đã `*1000` khi hiển
> thị. Nếu thấy giá lệch, chỉnh lại hệ số trong node phân tích.

---

## Chi phí dự kiến (~2 triệu/tháng là dư)

| Khoản | Chi phí | Ghi chú |
|-------|---------|---------|
| VPS | (đã có) | Chạy n8n 24/7 |
| Dữ liệu giá TCBS | **0đ** | API công khai |
| Telegram | **0đ** | |
| Claude API (giai đoạn 2 – tóm tắt tin) | ~600k–1tr | Tuỳ lượng tin |
| Proxy scrape BĐS (giai đoạn 3) | ~300k–500k | Tránh chặn IP |
| Dự phòng | ~300k | |

Giai đoạn 1 gần như **miễn phí**. Ngân sách 2 triệu để dành cho AI và scraping ở
các giai đoạn sau.

---

## Bước tiếp theo
Khi giai đoạn 1 chạy ổn, báo lại để mình dựng tiếp **giai đoạn 2** (gom tin tức
CafeF/Vietstock + Claude tóm tắt → báo cáo sáng 7h mỗi ngày).
