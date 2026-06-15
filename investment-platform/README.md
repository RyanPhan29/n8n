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
| **1** | Watchlist 2 nhóm ngưỡng + cảnh báo cắt lỗ/chốt lời qua Telegram | ✅ Xong |
| **2** | Gom tin tức nhiều nguồn + Claude AI tóm tắt → báo cáo sáng 7h | ✅ Xong |
| **2b** | Dòng tiền khối ngoại: gom/xả N phiên, mua bán ròng mạnh, đảo chiều | ✅ Xong |
| 3 | Module bất động sản (giá rao theo khu vực) | ⏳ Kế tiếp |
| **3A** | Nhịp ngành BĐS phục vụ quyết định chứng khoán (AI) | ✅ Xong |
| **4** | Định giá cơ bản: P/E, P/B (+ dải lịch sử), ROE → "rẻ hay đắt" (AI) | ✅ Xong |
| **5** | Sổ điểm sống: hệ thống tự chấm tín hiệu bằng dữ liệu thật (NL #8) | ✅ Xong |
| **6** | Máy tính khối lượng & R:R — "vào bao nhiêu" (NL #5) | ✅ Xong |
| **7** | Sổ luận điểm: vì sao mua + điều gì làm sai (NL #3, #8) | ✅ Xong |
| **8** | Bảng quyết định 7 câu trước khi mua (gom toàn hệ thống) | ✅ Xong |
| **4** | Backtest tín hiệu hàng tuần + quét ngưỡng cắt lỗ | ✅ Xong |

---

## Giai đoạn 1 — Cảnh báo cổ phiếu bất thường

**File workflow:** [`workflows/stock-watchlist-alerts.json`](workflows/stock-watchlist-alerts.json)

### Workflow làm gì?
1. **Lịch chạy:** cứ 15 phút/lần trong giờ giao dịch (9h–15h, T2–T6).
2. **Lấy dữ liệu:** gọi API công khai của DNSE cho từng mã trong watchlist
   (tự động chuyển sang VNDirect nếu DNSE lỗi).
3. **Phân tích:** so sánh khối lượng hôm nay với trung bình 20 phiên, và % thay
   đổi giá so với phiên trước.
4. **Cảnh báo:** gửi 1 tin tổng hợp về Telegram khi:
   - **Biến động bất thường** theo 2 nhóm ngưỡng: nhóm nền tảng (giá ±3%, KL
     ≥2x) và nhóm sóng mạnh (giá ±5%, KL ≥2.5x — cao hơn để đỡ nhiễu).
   - **Cắt lỗ / chốt lời:** khai giá vốn trong `PORTFOLIO` → rớt quá
     `stopLossPct` hoặc vượt `takeProfitPct` là báo ngay.
   - **Chống spam:** cùng một cảnh báo không lặp lại trong 3 giờ (chỉ áp dụng
     khi workflow Active; chạy test tay không lưu trạng thái).

### Nguồn dữ liệu
- **Chính: DNSE/Entrade** (`services.entrade.com.vn/chart-api`) — miễn phí,
  không cần API key, trả về OHLCV theo ngày.
- **Dự phòng: VNDirect dchart** (`dchart-api.vndirect.com.vn`) — workflow tự
  chuyển sang nguồn này khi DNSE lỗi (cần headers giả lập trình duyệt, đã có sẵn
  trong code).
- ~~TCBS public API~~ — endpoint cũ trả 404 từ 06/2026, đã bỏ. Bài học: nguồn
  miễn phí có thể chết bất kỳ lúc nào → luôn có nguồn dự phòng + chạy lại
  script Bước 0 khi thấy cảnh báo im ắng bất thường.

---

## Hướng dẫn cài đặt

### Bước 0 — Kiểm tra nguồn dữ liệu (chạy ở máy nào có Node 18+ cũng được)
Chạy script test để xác nhận nguồn dữ liệu sống:

```bash
node investment-platform/scripts/test-datasource.js
# hoặc chọn mã cụ thể:
node investment-platform/scripts/test-datasource.js VNM FPT HPG
```

- Nếu in ra giá/khối lượng hợp lý → nguồn OK, làm tiếp Bước 1.
- Đơn vị giá được **tự nhận diện** (nguồn trả `64.5` nghìn đồng hay `64500`
  đồng đều hiển thị đúng), không cần chỉnh tay.

### Bước 1 — Tạo Telegram Bot
1. Mở Telegram, chat với **@BotFather** → gõ `/newbot` → đặt tên → nhận
   **Bot Token** (dạng `123456:ABC-DEF...`).
2. Lấy **Chat ID** của bạn:
   - Chat 1 câu bất kỳ với bot vừa tạo.
   - Mở: `https://api.telegram.org/bot<TOKEN>/getUpdates`
   - Tìm `"chat":{"id":<CHAT_ID>}` → đó là Chat ID của bạn.
   - (Muốn gửi vào nhóm thì thêm bot vào nhóm, Chat ID nhóm là số âm.)

### Bước 2 — Tạo Credential Telegram trong n8n
1. n8n → **Credentials** → **New** → tìm **Telegram API**.
2. Dán **Bot Token** ở Bước 1 → Save (đặt tên ví dụ `Telegram Bot (CK)`).

### Bước 3 — Import & nối credential
1. n8n → **Workflows** → **Import from File** → chọn
   `stock-watchlist-alerts.json`.
2. Mở node **Gửi Telegram**:
   - Ở mục Credential chọn `Telegram Bot (CK)` vừa tạo.
   - Ô **Chat ID**: thay `PASTE_CHAT_ID_HERE` bằng Chat ID của bạn (Bước 1).
3. **Activate** workflow (bật công tắc góc trên phải).

### Bước 4 — Chạy thử
- Bấm **Execute Workflow** (hoặc **Test step** trên node Telegram) để kiểm tra
  ngay, không cần đợi tới giờ chạy.
- Nếu chưa có mã nào bất thường, workflow chạy xong mà không gửi tin — đó là
  bình thường (nhánh `false` của node "Có cảnh báo?" sẽ sáng "1 item").
- **Muốn ép gửi tin test:** mở node phân tích, đổi `TEST_MODE = false` thành
  `true` → Execute workflow → nhận tin → **đổi lại `false`** rồi mới Activate.

---

## Tuỳ chỉnh

Mở node **Lấy dữ liệu & Phân tích (DNSE/VNDirect)**, sửa 3 khối CẤU HÌNH đầu file:

```js
const TEST_MODE = false; // true = ép gửi tin test — test xong trả về false!

// Nhóm nền tảng (giá ±3%, KL x2) và nhóm sóng mạnh (giá ±5%, KL x2.5)
const WATCHLIST_CORE = ['VNM','FPT','HPG','MWG','VCB','MBB'];
const WATCHLIST_HOT  = ['SSI','VND','DGC','STB'];

// Danh mục đang giữ — đơn vị giá vốn là NGHÌN ĐỒNG (25.5 = 25.500đ)
// stopLossPct gợi ý 8-9% (backtest: cắt 5% bị rũ oan 57% số lần)
const PORTFOLIO = {
  'HPG': { costBasis: 25.5,  stopLossPct: 9, takeProfitPct: 15 },
  'FPT': { costBasis: 118.0, stopLossPct: 9, takeProfitPct: 0  },
};

// Cảnh báo "giảm sâu — theo dõi hồi phục" (mean-reversion, tín hiệu duy nhất
// thắng nền khi backtest). ⚠️ KHÔNG phải lệnh mua — bắt dao rơi rủi ro cao.
const DIP_ALERT = true;
const DIP_PCT   = 4;   // giảm >= % này trong phiên -> tag theo dõi
```

- **Ngưỡng từng nhóm:** sửa `THRESHOLDS` ngay dưới phần cấu hình.
- **Tần suất chống lặp:** sửa `SUPPRESS_HOURS` (mặc định 3 giờ).
- **Đổi tần suất quét:** node **Lịch chạy** → cron `*/15 9-15 * * 1-5`.
- **Khi nghi nguồn dữ liệu chết:** xem mảng `debug` trong OUTPUT của node phân
  tích — mỗi mã ghi `OK (DNSE, 60 phiên)` hoặc dòng lỗi cụ thể.

---

## Chi phí dự kiến (~2 triệu/tháng là dư)

| Khoản | Chi phí | Ghi chú |
|-------|---------|---------|
| VPS | (đã có) | Chạy n8n 24/7 |
| Dữ liệu giá (DNSE/VNDirect) | **0đ** | API công khai |
| Telegram | **0đ** | |
| Claude API (giai đoạn 2 – tóm tắt tin) | ~600k–1tr | Tuỳ lượng tin |
| Proxy scrape BĐS (giai đoạn 3) | ~300k–500k | Tránh chặn IP |
| Dự phòng | ~300k | |

Giai đoạn 1 gần như **miễn phí**. Ngân sách 2 triệu để dành cho AI và scraping ở
các giai đoạn sau.

---

---

## Giai đoạn 2 — Báo cáo sáng (Tin tức + Claude AI)

**File workflow:** [`workflows/morning-news-report.json`](workflows/morning-news-report.json)

### Workflow làm gì?
1. **Lịch chạy:** 7h sáng mỗi ngày T2–T6.
2. **Gom tin:** đọc nhiều RSS của CafeF (chứng khoán, ngân hàng, doanh nghiệp,
   vĩ mô), lọc tin trong ~30h gần nhất.
3. **Claude phân tích:** gửi toàn bộ tin cho **`claude-opus-4-8`** với yêu cầu
   lọc nhiễu, ưu tiên watchlist, đánh giá tác động (tích cực/tiêu cực) + độ tin cậy.
4. **Gửi Telegram:** báo cáo sáng có cấu trúc (tin nóng watchlist / bối cảnh
   chung / cảnh báo rủi ro), tự cắt nhỏ nếu dài quá giới hạn Telegram.

> ⚠️ Báo cáo do AI tổng hợp từ báo chí — **không phải khuyến nghị mua/bán**,
> luôn kiểm chứng nguồn gốc trước khi hành động.

### Cài đặt

**Bước 1 — Lấy Anthropic API key** (để n8n gọi được Claude)
1. Vào [console.anthropic.com](https://console.anthropic.com) → đăng ký/đăng nhập.
2. Vào **Billing** → nạp tín dụng tối thiểu (vài USD là chạy được hàng tháng).
3. Vào **API Keys** → **Create Key** → copy key dạng `sk-ant-api03-...`.

**Bước 2 — Tạo Credential trong n8n**
1. n8n → **Credentials** → **New** → chọn **Header Auth**.
2. **Name** = `x-api-key`, **Value** = dán API key vừa copy → Save
   (đặt tên ví dụ `Anthropic API (x-api-key)`).

**Bước 3 — Import & nối**
1. Import `morning-news-report.json` (giống cách import workflow GĐ1).
2. Node **Claude viết báo cáo** → mục Credential chọn `Anthropic API (x-api-key)`.
3. Node **Gửi Telegram** → chọn lại credential Telegram + điền **Chat ID** của bạn.
4. Bấm **Execute Workflow** để test ngay (không cần đợi 7h sáng).
5. Xem báo cáo về Telegram → nếu ổn thì **Activate**.

### Chi phí
Mỗi báo cáo sáng tốn rất ít token (~vài nghìn–vài chục nghìn đồng/ngày tuỳ
lượng tin). Cả tháng thường dưới 500k — nằm gọn trong ngân sách.

### Tuỳ chỉnh
Mở node **Gom tin tức (RSS)**, sửa phần CẤU HÌNH:
- `FEEDS` — thêm/bớt nguồn RSS. Nếu nguồn nào chết, xem mảng `debug` ở OUTPUT.
- `WATCHLIST` — danh mục để Claude ưu tiên tin liên quan.
- `MAX_PER_FEED`, `MAX_AGE_HOURS` — số tin và khoảng thời gian lấy tin.

> 💡 Muốn đổi văn phong/độ dài báo cáo: sửa biến `system` trong cùng node đó.

---

## Giai đoạn 2b — Dòng tiền khối ngoại

**File workflow:** [`workflows/foreign-flow-alerts.json`](workflows/foreign-flow-alerts.json)

### Workflow làm gì?
Chạy **15h45 sau phiên (T2–T6)**, quét khối ngoại mua/bán ròng từng mã trong
watchlist (nguồn VNDirect api-finfo, miễn phí) và gửi về Telegram:
- 🚨 **Tín hiệu:** mua/bán ròng mạnh trong phiên (mặc định ≥20 tỷ), chuỗi
  gom/xả ≥3 phiên liên tiếp kèm tổng giá trị, và **đảo chiều** (đang gom nhiều
  phiên bỗng chuyển sang xả hoặc ngược lại).
- 📊 **Toàn cảnh:** ròng từng mã trong phiên, sắp theo độ lớn.
- Tự bỏ qua ngày nghỉ/lễ (dữ liệu mới nhất không phải hôm nay → không gửi).

### Cài đặt
1. Import `foreign-flow-alerts.json` → node **Gửi Telegram** chọn credential
   Telegram + điền Chat ID.
2. **Execute workflow** để test (nếu chạy ngoài ngày giao dịch, tạm đổi
   `TEST_MODE = true` trong node phân tích).
3. **Activate**.

### Tuỳ chỉnh (đầu node phân tích)
`WATCHLIST` (mã theo dõi) · `BIG_NET_TY` (ngưỡng ròng mạnh, tỷ đồng) ·
`STREAK_MIN` (số phiên thành chuỗi) · `NET_MIN_TY` (dưới mức này coi là trung tính).

> 💡 File `workflows/probe-foreign-flow.json` là workflow thăm dò nguồn dữ liệu
> (chạy 1 lần khi nghi nguồn chết) — không cần Active.

---

## Giai đoạn 4 — Backtest tín hiệu hàng tuần

**File workflow:** [`workflows/backtest-weekly.json`](workflows/backtest-weekly.json)

### Workflow làm gì?
Chạy **9h sáng thứ 7** (hoặc bấm Execute bất kỳ lúc nào), quét **3 năm** dữ
liệu giá (DNSE/VNDirect) + dữ liệu khối ngoại trên watchlist, rồi gửi về
Telegram một bảng kiểm chứng:

- **6 tín hiệu** được đo tỷ lệ thắng / lãi trung bình / lỗ tệ nhất sau khi giữ
  10 phiên: phá vỡ (KL x2 + giá ≥3%), KL đột biến đơn thuần, giá ≥5%, giảm ≥3%
  ("bắt dao"), khối ngoại gom ≥3 phiên, khối ngoại xả ≥3 phiên.
- **Nền chung** (mua bất kỳ phiên nào) làm mốc so sánh — tín hiệu chỉ đáng tin
  khi THẮNG nền; mỗi tín hiệu được tự chấm ✅/➖/🔻.
- **Quét ngưỡng cắt lỗ** 5/7/9/11%: tỷ lệ "dính" và kết quả trung bình của
  từng ngưỡng, đánh dấu ⭐ ngưỡng giữ tiền tốt nhất.

Phương pháp: vào lệnh **giá mở cửa phiên kế tiếp** sau tín hiệu (sát thực tế
nhận cảnh báo rồi mua sáng hôm sau), tín hiệu cùng loại trên một mã cách nhau
tối thiểu 5 phiên để tránh đếm trùng.

> ⚠️ **Đọc kết quả cho đúng:** backtest dùng để LOẠI luật tệ và đặt kỳ vọng
> đúng, không phải tìm "chén thánh". Chưa tính phí, trượt giá, T+2.5 — kết quả
> thật luôn kém hơn backtest một chút. Khối ngoại chỉ có ~vài trăm phiên gần
> nhất nên tín hiệu 5️⃣/6️⃣ có mẫu nhỏ hơn các tín hiệu giá.

### Cài đặt
1. Import `backtest-weekly.json` → node **Gửi Telegram** chọn credential + Chat ID.
2. **Execute workflow** (chạy ~30–60 giây vì tải 3 năm dữ liệu × 2 nguồn).
3. **Activate** → tự chạy mỗi sáng thứ 7.

### Tuỳ chỉnh (đầu node backtest)
`WATCHLIST` · `YEARS_BACK` · `HOLD_DAYS` (số phiên giữ) · `STOP_LEVELS` (các
ngưỡng cắt lỗ cần thử) · các ngưỡng tín hiệu (để giống hệ cảnh báo đang chạy).

---

## Giai đoạn 3A — Nhịp ngành Bất động sản (phục vụ chứng khoán)

**File workflow:** [`workflows/sector-realestate-pulse.json`](workflows/sector-realestate-pulse.json)

**Vì sao có module này?** Một phần lớn cổ phiếu trên sàn "phơi nhiễm bất động
sản": chủ đầu tư (VHM, NVL, DXG...), BĐS khu công nghiệp (BCM, KBC...), ngân hàng
cho vay BĐS (VCB, BID, TCB...), xây dựng-vật liệu (HPG, HSG...). Sức khoẻ ngành
nhà đất tác động trực tiếp tới định giá các nhóm này. Module 3A theo dõi *cấp
ngành* để hỗ trợ quyết định cổ phiếu (khác với việc theo dõi giá rao nhà đất để
tự đầu tư BĐS vật lý — đó là một nhánh riêng).

**Làm gì:** Chạy **6h45 sáng thứ 2 hàng tuần**, đo hiệu suất giá + dòng tiền khối
ngoại 5 phiên của rổ ~21 mã (chia 4 nhóm con), gom tin ngành (BĐS, tín dụng, trái
phiếu, lãi suất), rồi để **`claude-opus-4-8`** viết báo cáo: sức khoẻ từng nhóm,
**read-through tới BID & BCM** (2 mã được đánh dấu ⭐), và mâu thuẫn tin–dòng tiền.

**Cài đặt:** Import → node **Claude phân tích ngành** chọn credential
`Anthropic API` + node **Gửi Telegram** chọn credential Telegram & Chat ID →
Execute để test → Activate.

**Tuỳ chỉnh:** sửa `BASKET` (rổ ngành) và `FOCUS` (mã đánh dấu ⭐) ở đầu node gom.

---

## Giai đoạn 4 — Định giá cơ bản (Lớp 4)

**File workflow:** [`workflows/valuation-weekly.json`](workflows/valuation-weekly.json)
**Nền tảng triết lý:** nguyên lý #2 (Biên an toàn) trong
[`BO-TU-DUY-DAU-TU.md`](BO-TU-DUY-DAU-TU.md) — trả lời câu #2 của bộ lọc 7 câu:
*"mã này RẺ hay ĐẮT?"*

**Làm gì:** Chạy **6h45 sáng thứ 4 hàng tuần**, kéo chỉ số cơ bản mới nhất
(P/E, P/B, ROE, ROA, nợ/VCSH, biên LN, cổ tức) cho từng mã watchlist từ VNDirect
finfo, gắn nhãn ngành, rồi để **`claude-opus-4-8`** đánh giá RẺ / HỢP LÝ / ĐẮT
theo **ngưỡng của từng ngành** (ngân hàng P/E thấp, công nghệ cao hơn, thép có
tính chu kỳ...), đọc kỹ BID/BCM/FPT, kèm **cảnh báo bẫy giá trị**.

**Cài đặt:** Import → node Claude chọn credential `Anthropic API`, node Telegram
chọn credential + Chat ID → Execute → Activate.

**Tuỳ chỉnh:** `WATCHLIST` (mã + nhãn ngành), `FOCUS` (mã ⭐), `WANT` (danh sách
chỉ số). Mảng `debug` in ra "CÁC ratioCode CÓ SẴN" — dùng để bổ sung chỉ số mới.

> ⚠️ **Giới hạn (đọc kỹ — đúng tinh thần nguyên lý #9):** workflow đã so *cả ngưỡng
> ngành lẫn dải lịch sử của chính mã* (P/E/P/B TB 1N/3N/5N). Nhưng **vế CHẤT LƯỢNG
> (ROE, nợ/vốn) cố ý KHÔNG tự động hoá**: VNDirect chỉ trả mã số BCTC không kèm tên,
> và ngân hàng có cấu trúc BCTC khác hẳn → tự tính ROE dễ ra số *sai mà nghe thật*
> (false precision), tệ hơn để trống. → ROE/nợ làm **thủ công** cho 3–5 mã thực sự
> cân nhắc, tra ở nguồn có nhãn rõ (app môi giới, cafef.vn tab Tài chính,
> finance.vietstock.vn). Định giá từ chỉ số là điểm khởi đầu, không thay BCTC gốc.

---

## Giai đoạn 5 — Sổ điểm sống (tự chấm tín hiệu)

**File workflow:** [`workflows/scorecard-live.json`](workflows/scorecard-live.json)
**Nền tảng triết lý:** nguyên lý #8 (luận điểm bác bỏ được) — *biến niềm tin
thành dữ liệu*.

**Làm gì:** Chạy **16h mỗi ngày (T2–T6)**. Mỗi khi một tín hiệu xuất hiện (giảm
sâu / rẻ so lịch sử / khối ngoại gom ≥3 phiên), nó **ghi lại** giá vào sổ. Sau
**14 ngày**, nó **đo kết quả thật** của tín hiệu đó. Mỗi **thứ 6** gửi báo cáo:
mỗi loại tín hiệu *thật sự* thắng bao nhiêu %, lãi trung bình bao nhiêu — **tiến
về phía trước, không phải backtest quá khứ** (nên không dính thiên kiến sống sót
/ nhìn trộm tương lai).

**Khác backtest thế nào?** Backtest soi quá khứ (dễ bị méo). Sổ điểm sống chấm
các tín hiệu *kể từ hôm nay trở đi* — trung thực hơn. Sau vài tuần–tháng, đây là
bằng chứng khách quan để tin (hoặc loại) từng tín hiệu.

**Cài đặt:** Import → node Telegram chọn credential + Chat ID → Activate. (Cần
chạy đều vài tuần mới có đủ lệnh "đến hạn chốt" để thống kê có ý nghĩa.)

> 💡 Lưu trạng thái bằng `$getWorkflowStaticData` của n8n — chỉ tích luỹ khi
> workflow **Active** (chạy tay không lưu sổ).

---

## Giai đoạn 6 — Máy tính khối lượng & R:R (Position Sizing)

**File workflow:** [`workflows/position-sizing.json`](workflows/position-sizing.json)
**Nền tảng triết lý:** nguyên lý #5 (bất đối xứng & quản trị vị thế) — trả lời câu
#6 của bộ lọc 7 câu: *"vào bao nhiêu, R:R bao nhiêu?"*

**Làm gì:** Nhập 7 thông số (NAV, mã, giá vào, **cắt lỗ**, mục tiêu, % rủi ro/lệnh,
trần % vị thế) → bấm Execute → nhận thẻ trên Telegram: **mua bao nhiêu cổ phiếu**,
giá trị vị thế (% NAV), **rủi ro thực bằng tiền** nếu chạm cắt lỗ, và **R:R**. Tự
cảnh báo khi rủi ro/lệnh quá cao, R:R < 2, hoặc vị thế chạm trần.

Công thức: Khối lượng = (NAV × %rủi-ro) ÷ (giá vào − giá cắt lỗ), làm tròn lô 100,
giới hạn thêm bởi trần % NAV. **Bắt buộc có cắt lỗ** — không có cắt lỗ, không tính
(kỷ luật bảo toàn vốn).

**Cài đặt:** Import → node Telegram chọn credential + Chat ID. Đây là công cụ
**bấm tay** (Manual) — chạy mỗi khi cân nhắc một lệnh, không cần Active.

**Dùng:** sửa 7 dòng đầu node "Tính khối lượng & R:R" → Execute workflow.

---

## Bước tiếp theo
Khi GĐ1 + GĐ2 chạy ổn, dựng tiếp **Giai đoạn 3** (bất động sản: theo dõi giá rao
theo khu vực) và **Giai đoạn 4** (backtest + tinh chỉnh ngưỡng).
