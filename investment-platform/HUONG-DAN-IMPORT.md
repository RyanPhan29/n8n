# 📋 Hướng dẫn tách & đặt tên workflow (sau khi gỡ "mớ gộp")

> Mục tiêu: xóa workflow gộp chung → import lại **mỗi cái 1 workflow riêng**, tên đã đặt sẵn.
> Chat ID đã điền sẵn (`5239928968`) + tên đẹp đã có trong file → import xong **chỉ cần: chọn credential → bật Active**.

## ⚠️ Quy tắc vàng chống nhân đôi
Mỗi lần import: **tạo workflow TRỐNG mới TRƯỚC** → rồi mới `⋯ → Import from URL`.
Tuyệt đối **không** Import khi đang mở 1 workflow đã có node.

URL chung (chỉ đổi phần `<file>` ở cuối):
```
https://raw.githubusercontent.com/RyanPhan29/n8n/claude/investment-platform-proposal-fbfmg4/investment-platform/workflows/<file>.json
```

---

## ✅ DANH SÁCH 10 WORKFLOW (tên tự đúng khi import)

Sắp theo 4 tầng hệ thống. Tên có sẵn số thứ tự nên n8n tự xếp gọn từ trên xuống.

### 🟢 Bắt đầu 3 cái cốt lõi (làm trước cho nhẹ)
| Tên (tự có sẵn) | File `<file>` | Chạy | Active? |
|---|---|---|---|
| CK · 01 · 📰 Báo cáo sáng | `morning-news-report` | 7h T2–T6 | ✅ Bật |
| CK · 02 · 🚨 Cảnh báo cổ phiếu | `stock-watchlist-alerts` | mỗi 15p, giờ GD | ✅ Bật |
| CK · 04 · 🔬 Soi sâu 1 mã | `deep-research-note` | bấm tay | ❌ Không |

### 🔵 Tầng 1 — Tai mắt (quét tự động) — thêm tiếp
| Tên | File | Chạy | Active? |
|---|---|---|---|
| CK · 03 · 🌍 Cảnh báo khối ngoại | `foreign-flow-alerts` | 15h45 T2–T6 | ✅ Bật |

### 🟣 Tầng 3 — Bàn cân (ra quyết định)
| Tên | File | Chạy | Active? |
|---|---|---|---|
| CK · 05 · 🤖 Bot lệnh /size /check | `telegram-command-bot` | luôn (nhận tin) | ✅ Bật |
| CK · 06 · 📓 Sổ luận điểm | `thesis-journal` | 8h Chủ nhật | ✅ Bật |

### ⚪ Tầng 4 — Gương soi (đánh giá, kiểm định)
| Tên | File | Chạy | Active? |
|---|---|---|---|
| CK · 07 · 🎯 Scorecard tín hiệu | `scorecard-live` | 16h T2–T6 | ✅ Bật |
| CK · 08 · 💰 Định giá tuần | `valuation-weekly` | 6h45 thứ 4 | ✅ Bật |
| CK · 09 · 🔁 Backtest tuần | `backtest-weekly` | 9h thứ 7 | ✅ Bật |
| CK · 10 · 🏢 Nhịp ngành BĐS | `sector-realestate-pulse` | 6h45 thứ 2 | ✅ Bật |

---

## ❌ KHÔNG import lại — bỏ hẳn
| Trong "mớ gộp" | Vì sao bỏ |
|---|---|
| Nhánh `... (TCBS)` 15 phút | API TCBS **đã chết** — CK·02 (DNSE/VNDirect) thay thế |
| Nhánh `Gom tin tức (RSS)` 7h | **Trùng** báo cáo sáng — CK·01 tốt hơn |
| `Bấm Execute → Tính khối lượng` | Bot `/size` (CK·05) thay rồi |
| `Chấm 7 câu` | Bot `/check` (CK·05) thay rồi |
| `Thăm dò Jina Reader / URL` | Đồ thử nghiệm — rác |

---

## 🔧 Mỗi workflow, sau khi Import làm đúng 2 việc
1. Mở node **Gửi Telegram** (và **Telegram Trigger** nếu là bot) → chọn credential **Telegram Bot (CK)**.
2. Loại tự chạy → bật **Active**. Loại bấm tay (CK·04) → không cần Active, chỉ **Execute** khi dùng.

## 🧪 Kiểm tra
- Bấm tay: **Execute workflow** → nhận tin Telegram trong ~30–60s.
- Tự chạy: mở tab **Executions** sau mốc giờ → phải có dòng **xanh**.
