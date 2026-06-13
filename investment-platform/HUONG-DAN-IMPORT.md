# 📋 Menu dọn & import workflow (sau khi gỡ "mớ khổng lồ")

> Mục tiêu: xóa cái workflow gộp chung, import lại từng cái **vào 1 workflow riêng**.
> Chat ID đã điền sẵn (`5239928968`) → import xong chỉ cần **chọn credential + bật Active**.

## ⚠️ Quy tắc vàng để KHÔNG bị nhân đôi
Mỗi lần import: **Tạo workflow TRỐNG mới TRƯỚC** → rồi mới `⋯ → Import from URL`.
Đừng bao giờ Import khi đang mở 1 workflow có sẵn node.

URL chung (chỉ thay phần `<file>`):
```
https://raw.githubusercontent.com/RyanPhan29/n8n/claude/investment-platform-proposal-fbfmg4/investment-platform/workflows/<file>.json
```

---

## ✅ NÊN GIỮ — import lại từng cái

### Bắt đầu 3 cái cốt lõi (làm trước)
| # | Đặt tên workflow | File `<file>` | Chạy lúc | Active? |
|---|---|---|---|---|
| 1 | [CK] Báo cáo sáng | `morning-news-report` | 7h sáng T2–T6 | ✅ Bật |
| 2 | [CK] Cảnh báo cổ phiếu | `stock-watchlist-alerts` | mỗi 15' giờ giao dịch | ✅ Bật |
| 3 | [CK] Soi sâu 1 mã | `deep-research-note` | bấm tay (Execute) | ❌ Không |

### Thêm dần khi đã quen
| # | Đặt tên workflow | File `<file>` | Chạy lúc | Active? |
|---|---|---|---|---|
| 4 | [CK] Cảnh báo khối ngoại | `foreign-flow-alerts` | 15h45 T2–T6 | ✅ Bật |
| 5 | [CK] Scorecard tín hiệu | `scorecard-live` | 16h T2–T6 | ✅ Bật |
| 6 | [CK] Định giá tuần | `valuation-weekly` | 6h45 thứ 4 | ✅ Bật |
| 7 | [CK] Backtest tuần | `backtest-weekly` | 9h thứ 7 | ✅ Bật |
| 8 | [CK] Nhịp ngành BĐS | `sector-realestate-pulse` | 6h45 thứ 2 | ✅ Bật |
| 9 | [CK] Sổ luận điểm | `thesis-journal` | 8h Chủ nhật | ✅ Bật |

### Đã làm xong (để riêng rồi, đừng import lại)
- **[CK] Bot nhận lệnh** (`telegram-command-bot`) — đang chạy, bot `/size` `/check`.

---

## ❌ KHÔNG import lại — bỏ luôn
| Trong "mớ khổng lồ" | Vì sao bỏ |
|---|---|
| Nhánh `... (TCBS)` chạy 15 phút | API TCBS **đã chết** — bản `stock-watchlist-alerts` ở trên dùng DNSE/VNDirect thay thế |
| Nhánh `Gom tin tức (RSS)` 7h sáng | **Trùng** báo cáo sáng — bản mới (#1) tốt hơn (VN + quốc tế + dòng tiền) |
| `Bấm Execute → Tính khối lượng` | Bot `/size` thay rồi |
| `Chấm 7 câu` | Bot `/check` thay rồi |
| `Thăm dò Jina Reader / URL` | Đồ thử nghiệm — rác |

---

## 🔧 Mỗi workflow import xong làm 2 việc
1. Mở từng node **Gửi Telegram** (và node Telegram Trigger nếu có) → chọn credential **Telegram Bot (CK)**.
2. Lịch tự chạy → bật **Active**. Loại bấm tay (`deep-research-note`) → không cần Active, chỉ bấm **Execute** khi dùng.

## 🧪 Kiểm tra nhanh sau khi import
- Loại bấm tay: bấm **Execute workflow** → phải nhận tin Telegram trong ~30–60s.
- Loại tự chạy: mở tab **Executions** sau mốc giờ của nó để xem có chạy & xanh không.
