# 📕 CẨM NANG CHỨNG KHOÁN VIỆT NAM

### Tài liệu học & vận hành nền tảng hỗ trợ đầu tư của anh

> Tài liệu này gồm 2 phần lồng vào nhau:
> 1. **Kiến thức nền** về chứng khoán Việt Nam để anh học dần.
> 2. **Giải thích hệ thống** anh em mình đã dựng — mỗi công cụ dựa trên kiến thức nào.
>
> Đọc từ trên xuống là một lộ trình. Quay lại tra cứu từng phần khi cần cũng được.

---

## ⚠️ ĐỌC PHẦN NÀY TRƯỚC — Tư duy nền tảng

Trước khi đi vào chi tiết, ghi nhớ 4 điều này. Nếu chỉ nhớ được 4 điều trong cả
cuốn cẩm nang, hãy nhớ 4 điều này:

**1. Hệ thống này là TRỢ LÝ THÔNG TIN, không phải MÁY DỰ ĐOÁN GIÁ.**
Nó giúp anh nhanh hơn, đỡ bỏ sót, ra quyết định có dữ liệu. Nó **không** biết
giá mai tăng hay giảm, và **không** ai biết. Mọi quyết định mua/bán cuối cùng là
của anh.

**2. Rủi ro cao KHÔNG đảm bảo lợi nhuận cao.**
Không chấp nhận rủi ro thì không có lợi nhuận lớn — đúng. Nhưng chiều ngược lại
sai: rủi ro cao nghĩa là *phổ kết quả rộng ra cả hai phía* — lãi đậm hơn **và**
lỗ đậm hơn. Rủi ro chỉ đáng chịu khi nó *được trả công* (doanh nghiệp tốt thật,
ngành có sóng thật), không phải khi nó là bẫy của "đội lái".

**3. Tránh cú lỗ lớn quan trọng hơn săn cú lãi lớn.**
Lỗ và lãi không đối xứng (xem Phần 5). Lỗ 50% phải lãi lại 100% mới hoà vốn.
Phần lớn người thua không phải vì chiến lược tệ, mà vì *bỏ chiến lược đúng* lúc
nó đang trong chuỗi thua bình thường, hoặc vì một cú lỗ lớn xoá sạch nhiều cú
lãi nhỏ.

**4. Thà thiếu thông tin còn hơn thông tin bịa.**
Cả hệ thống được thiết kế để khi thiếu dữ liệu thì **nói thẳng là thiếu**, không
phịa. Một báo cáo trơn tru nhưng sai nguy hiểm hơn một báo cáo trống.

---

# PHẦN A — KIẾN THỨC NỀN CHỨNG KHOÁN VIỆT NAM

## A1. Thị trường vận hành thế nào

**Ba sàn giao dịch:**
| Sàn | Tên | Đặc điểm | Biên độ giá/ngày |
|-----|-----|----------|------------------|
| **HOSE** | Sở GDCK TP.HCM | Sàn lớn nhất, các mã lớn (VNM, FPT, VCB...) | **±7%** |
| **HNX** | Sở GDCK Hà Nội | Mã vừa và nhỏ | **±10%** |
| **UPCOM** | Thị trường mã chưa niêm yết | Rủi ro cao hơn, ít minh bạch | **±15%** |

**Giá tham chiếu / trần / sàn (rất quan trọng):**
- **Giá tham chiếu** = giá đóng cửa phiên hôm trước (màu vàng trên bảng điện).
- **Giá trần** = tham chiếu + biên độ (màu tím). Ví dụ HOSE: tham chiếu 100, trần = 107.
- **Giá sàn** = tham chiếu − biên độ (màu xanh lam). Sàn = 93.
- Màu trên bảng: **xanh lá** = tăng, **đỏ** = giảm, **vàng** = đứng giá, **tím** = trần, **xanh lam** = sàn.

> 💡 Đây là lý do hệ cảnh báo của anh đặt ngưỡng ±3% và ±5% — vì với biên độ trần
> ±7% của HOSE, một mã chạy 3% đã là "đáng chú ý", chạy 5% là "mạnh".

**Chu kỳ thanh toán T+2 (hay gọi "T+2.5"):**
Mua cổ phiếu hôm nay (ngày T), thì cổ phiếu về tài khoản và bán được vào **chiều
ngày T+2** (2 ngày làm việc sau). Tiền bán cũng về theo chu kỳ tương tự. Nghĩa
là anh **không lướt sóng trong ngày** được như tưởng tượng — mua hôm nay sớm
nhất 2 ngày sau mới thoát được. → Đây là lý do backtest của anh dùng giả định
"vào lệnh giá mở cửa phiên kế tiếp, giữ tối thiểu vài phiên".

**Lô giao dịch:** HOSE mua tối thiểu **100 cổ phiếu/lô**. Mua lẻ (lô lẻ) có cơ
chế riêng, giá thường thiệt hơn.

## A2. Các "người chơi" trên thị trường

Hiểu ai đang mua/bán giúp anh đọc dòng tiền:

- **Nhà đầu tư cá nhân (NĐT nhỏ lẻ):** như anh. Chiếm phần lớn thanh khoản thị
  trường VN. Tâm lý đám đông mạnh → hay mua đỉnh bán đáy.
- **Khối ngoại (NĐT nước ngoài):** quỹ ngoại, tổ chức quốc tế. Tiền lớn, tầm nhìn
  dài, ít bị cuốn theo tin đồn. **Mua/bán ròng của khối ngoại là tín hiệu "tay
  to" được theo dõi nhiều nhất** → workflow "Dòng tiền khối ngoại" của anh soi
  đúng cái này. *Lưu ý:* mỗi mã có "room ngoại" (tỷ lệ sở hữu tối đa cho người
  nước ngoài); hết room thì khối ngoại không mua thêm được.
- **Tự doanh:** bộ phận tự đầu tư của các công ty chứng khoán. Cũng là "tiền
  thông minh", đôi khi đi ngược khối ngoại.
- **Tổ chức trong nước:** quỹ đầu tư VN, công ty bảo hiểm...
- **"Đội lái":** nhóm thao túng giá một số mã nhỏ/thanh khoản thấp — tạo biến
  động giả để dụ NĐT nhỏ lẻ vào rồi xả. → Đây là lý do anh em mình tách mã
  "sóng mạnh" ra ngưỡng riêng và backtest để loại tín hiệu rác.

## A3. Phân loại cổ phiếu theo vốn hoá

**Vốn hoá** = giá cổ phiếu × số cổ phiếu lưu hành = "độ to" của doanh nghiệp.

| Nhóm | Đặc điểm | Ví dụ | Vai trò trong danh mục |
|------|----------|-------|------------------------|
| **Bluechip / large-cap** | DN đầu ngành, vốn hoá lớn, thanh khoản cao, ít bị "lái" | VNM, FPT, VCB, HPG | "Thân tàu" — sóng vừa nhưng sống lâu |
| **Midcap** | Vốn hoá trung bình, sóng mạnh hơn | DGC, nhiều mã chứng khoán | Cơ hội + rủi ro cao hơn |
| **Penny / smallcap** | Vốn hoá nhỏ, giá rẻ, biến động cực mạnh, rủi ro "lái" cao | (nhiều mã sàn UPCOM) | "Thuyền thúng" — chỉ vốn nhỏ, kỷ luật chặt |

**Các chỉ số quan trọng:**
- **VN-Index:** chỉ số chung của sàn HOSE — "nhiệt kế" thị trường.
- **VN30:** 30 mã vốn hoá lớn & thanh khoản nhất HOSE.
- **VN100:** 100 mã lớn nhất. (Nếu sau này anh muốn quét rộng, ta dùng rổ này.)
- **HNX-Index:** chỉ số sàn Hà Nội.

## A4. Các thuật ngữ doanh nghiệp hay gặp trong tin tức

- **Cổ tức:** phần lợi nhuận chia cho cổ đông (bằng tiền mặt hoặc bằng cổ phiếu).
- **ESOP:** cổ phiếu phát hành ưu đãi cho nhân viên. *Người nội bộ mua ESOP* đôi
  khi là tín hiệu cam kết, nhưng cũng là sự kiện thường lệ — đừng suy diễn quá.
- **Phát hành thêm / pha loãng:** DN phát hành thêm cổ phiếu → mỗi cổ phiếu cũ
  "loãng" giá trị đi → thường tạo áp lực giảm giá ngắn hạn.
- **ĐHĐCĐ (Đại hội đồng cổ đông):** họp thường niên, hay ra tin về kế hoạch, cổ
  tức, mua cổ phiếu quỹ.
- **Giao dịch cổ đông nội bộ / cổ đông lớn:** lãnh đạo đăng ký mua/bán — **một
  trong những tín hiệu sớm giá trị nhất** vì họ hiểu DN nhất, và phải công bố bắt
  buộc. (Hướng nâng cấp tương lai cho hệ thống.)
- **BCTC (Báo cáo tài chính):** quý/năm — doanh thu, lợi nhuận, nợ, dòng tiền.
  Để biết mã đang *đắt hay rẻ* so với giá trị thật.
- **P/E, P/B:** chỉ số định giá. P/E = giá / lợi nhuận mỗi cổ phiếu (bao nhiêu năm
  lợi nhuận thì hoàn vốn). So với trung bình ngành để biết đắt/rẻ.

---

# PHẦN B — HỆ THỐNG CỦA ANH HOẠT ĐỘNG THẾ NÀO

## B0. Kiến trúc tổng thể

Hệ thống chạy trên **n8n** (công cụ tự động hoá) đặt trên **VPS** (máy chủ riêng
của anh, chạy 24/7). Nó gồm 4 "giác quan" + 1 công cụ kiểm chứng:

```
NGUỒN DỮ LIỆU (miễn phí)          XỬ LÝ                    KÊNH NHẬN
─────────────────────────────────────────────────────────────────
DNSE / VNDirect (giá, KL)    →  n8n + Claude AI  →  Telegram của anh
VNDirect finfo (khối ngoại)  →   (lọc, phân tích)
Google News (tin tức)        →
```

**Vì sao mỗi nguồn lại có nguồn dự phòng?** Bài học xương máu trong quá trình
dựng: nguồn TCBS đang dùng bỗng "chết" (lỗi 404), CafeF chặn server nước ngoài
(lỗi 502/504). → Mọi nguồn quan trọng đều có 1 nguồn thay thế tự động, và mỗi
workflow có mảng `debug` để soi nguồn nào sống/chết.

## B1. ☀️ BÁO CÁO SÁNG AI — 7h mỗi sáng (T2–T6)

**File:** `morning-news-report.json`

**Làm gì:** Trước giờ mở cửa, gom ~40 tin từ Google News (gom lại từ mọi báo VN)
+ dữ liệu dòng tiền khối ngoại 5 phiên, đưa hết cho **Claude (model
`claude-opus-4-8`)** đọc, lọc nhiễu, và viết báo cáo có cấu trúc.

**Điểm đặc biệt — ĐỐI CHIẾU TIN VỚI TIỀN:** Claude được yêu cầu so tin tức với
dòng tiền. Ví dụ thật từ hệ thống:
- *Tin nói "cổ phiếu ngân hàng khởi sắc" nhưng khối ngoại xả MBB −271 tỷ/5 phiên*
  → Claude gắn cờ **MÂU THUẪN** → anh thận trọng.
- *VNM được gom đều 6 phiên +164 tỷ mà không có tin ồn ào* → "gom trong im lặng",
  đáng chú ý nhất.

Đây là **kiểm chứng chéo tự động** — thứ mà đọc báo thủ công gần như không bao
giờ thấy.

**Kiến thức nền đằng sau:** tin tức là "Lớp 3", dòng tiền khối ngoại là "Lớp 2"
trong 5 lớp đầu vào quyết định. Tin báo chí có độ trễ và nhiễu (PR, lái); dòng
tiền là hành động thật bằng tiền thật → khi 2 cái mâu thuẫn, tin tiền hơn tin chữ.

## B2. 🔔 CẢNH BÁO TRONG PHIÊN — mỗi 15 phút (9h–15h, T2–T6)

**File:** `stock-watchlist-alerts.json`

**Làm gì:** Quét watchlist, phát hiện và báo Telegram 3 loại tín hiệu:

**(a) Biến động bất thường — 2 tầng ngưỡng:**
- Nhóm **nền tảng** (bluechip): báo khi giá ±3% hoặc khối lượng ≥2× trung bình.
- Nhóm **sóng mạnh** (midcap, đánh dấu 🌊): báo khi giá ±5% hoặc KL ≥2.5×.
- *Vì sao 2 tầng?* Midcap chạy 3% là chuyện thường — nếu báo ±3% cho cả midcap
  thì Telegram thành cái chợ. Ngưỡng cao hơn cho nhóm sóng = đỡ nhiễu.

**Khái niệm "khối lượng đột biến":** khối lượng (KL) = số cổ phiếu khớp lệnh.
KL hôm nay gấp 2–3 lần trung bình 20 phiên nghĩa là **có dòng tiền lớn bất
thường đang vào/ra** — thường đi kèm tin tức hoặc động thái "tay to". KL xác
nhận cho biến động giá: giá tăng + KL lớn đáng tin hơn giá tăng + KL nhỏ.

**(b) 🎯 Giảm sâu — theo dõi hồi phục (mean-reversion):**
Báo khi một mã giảm ≥4% trong phiên. *Đây là tín hiệu DUY NHẤT thắng được "nền"
khi backtest* (xem Phần C). **Mean-reversion** = hiện tượng giá bị bán quá đà rồi
"nảy" lại về trung bình. Bluechip VN có xu hướng này.
> ⚠️ Đây là tag "theo dõi", **KHÔNG phải lệnh mua**. "Bắt dao rơi" rủi ro cao
> (backtest cho thấy cú tệ nhất −35%). Nếu vào phải đặt cắt lỗ chặt.

**(c) 🛑 Cắt lỗ / 💰 Chốt lời theo giá vốn:**
Anh khai giá vốn từng mã đang giữ trong `PORTFOLIO`. Khi giá rớt quá ngưỡng cắt
lỗ (gợi ý 8–9%) → Telegram réo "cắt lỗ, giữ kỷ luật". Vượt mục tiêu lãi → báo
chốt lời. **Đây là tính năng bảo vệ tiền thật quan trọng nhất.**

**Chống spam:** cùng một cảnh báo không lặp lại trong 3 giờ.

## B3. 💰 DÒNG TIỀN KHỐI NGOẠI — 15h45 sau phiên (T2–T6)

**File:** `foreign-flow-alerts.json`

**Làm gì:** Sau khi đóng cửa, quét mua/bán ròng khối ngoại từng mã và báo:
- **Mua/bán ròng** = (giá trị mua − giá trị bán) trong phiên. Dương = khối ngoại
  gom; âm = khối ngoại xả.
- **Chuỗi gom/xả:** khối ngoại mua ròng (hoặc bán ròng) ≥3 phiên liên tiếp → tín
  hiệu tích luỹ/phân phối có chủ đích, không phải ngẫu nhiên.
- **Đảo chiều:** đang gom nhiều phiên bỗng chuyển xả (hoặc ngược lại) → điểm xoay
  đáng chú ý.

**Vì sao quan trọng:** giá là tín hiệu *trễ* (giá chạy 3% nghĩa là người có tin
đã vào trước anh). Dòng tiền khối ngoại gom đều nhiều phiên là tín hiệu *sớm* —
thấy "tay to" nhúc nhích **trước khi** giá chạy. Đây là nâng cấp chất lượng đầu
vào từ "Lớp 1 (giá)" lên "Lớp 2 (dòng tiền)".

## B4. 📋 BACKTEST TUẦN — 9h sáng thứ 7

**File:** `backtest-weekly.json`

**Làm gì:** Quét 3 năm lịch sử, kiểm chứng xem các tín hiệu hệ thống đang dùng
*có thật sự kiếm được tiền trong quá khứ không*, và quét dải ngưỡng cắt lỗ. Đây
là "phiếu khám sức khoẻ" định kỳ cho bộ luật. (Giải thích kết quả ở Phần C.)

---

# PHẦN C — BÀI HỌC TỪ BACKTEST (rất quan trọng)

Backtest = đem "luật chơi" hiện tại thử trên dữ liệu quá khứ. Kết quả lần chạy
đầu (3 năm, 10 mã) **khiêm tốn hơn kỳ vọng — và chính vì thế mà quý giá**, vì nó
nói sự thật thay vì nịnh.

**Cách đọc:** mọi tín hiệu được so với "**NỀN CHUNG**" = mua đại bất kỳ phiên nào
rồi giữ 10 phiên. Tín hiệu chỉ đáng tin nếu **thắng được nền này**.

**Kết quả thật và ý nghĩa:**

| Tín hiệu | Kết quả | Bài học |
|----------|---------|---------|
| Phá vỡ (KL x2 + giá +3%) | ≈ ngang nền | Momentum giá **không có lợi thế** khi giữ 10 phiên |
| KL đột biến đơn thuần | ≈ ngang nền | Tương tự |
| Giá +5% (nhóm sóng) | ≈ ngang nền | Tương tự |
| **Giá giảm ≥3% (bắt dao)** | **✅ thắng nền (55%, +1.5%)** | Mean-reversion là tín hiệu duy nhất có lợi thế |
| Khối ngoại gom ≥3 phiên | ≈ ngang nền | Không phải tín hiệu mua đứng một mình |
| Khối ngoại xả ≥3 phiên | ≈ ngang nền | Dùng làm bối cảnh, không phải nút bấm |
| Cắt lỗ 5% | bị "rũ oan" 57% số lần | Cắt quá chặt → bị quét liên tục |

**4 kết luận hành động:**
1. **Còi biến động giá = "ngẩng đầu lên nhìn", KHÔNG phải "vào lệnh".** Có bằng
   chứng: momentum giá không tự sinh lời. Dùng nó để *biết mà soi*.
2. **Tín hiệu giảm sâu (mean-reversion) là cái duy nhất có lợi thế** → đã thêm
   còi 🎯, nhưng kèm cảnh báo rủi ro đuôi −35%.
3. **Cắt lỗ nên 8–9%, đừng 5%** → đã chỉnh. Mã VN dao động rộng, cắt chặt là tự
   sát bằng "quét oan".
4. **Dòng tiền khối ngoại dùng đúng cách rồi** (làm bối cảnh đối chiếu trong báo
   cáo sáng), đừng nâng thành tín hiệu mua.

**Giới hạn phải nhớ:**
- Quá khứ **không** bảo hành tương lai. Một bảng, một khung thời gian (2023–2026,
  giai đoạn thị trường lên) chưa đủ kết luận chắc.
- **Bẫy overfitting:** chỉnh ngưỡng quá khít theo dữ liệu cũ = học thuộc lòng quá
  khứ, không phải tìm quy luật. → Chỉ chỉnh thô, không tỉa.
- Backtest **chưa tính** phí giao dịch, trượt giá, T+2.5 → kết quả thật luôn kém
  hơn một chút.
- Giá trị thật của backtest: **LOẠI luật tệ và đặt KỲ VỌNG ĐÚNG**, không phải tìm
  "chén thánh in tiền".

---

# PHẦN D — QUẢN TRỊ RỦI RO (phần đáng giá nhất)

## D1. Toán học của lỗ–lãi bất đối xứng

Đây là thứ ít người để ý mà quyết định sống còn:

| Lỗ | Cần lãi lại bao nhiêu để hoà vốn |
|----|------|
| −10% | +11% |
| −20% | +25% |
| −30% | +43% |
| −50% | **+100%** |
| −70% | +233% |

Dính một cú −30% là anh phải tìm một cú +43% *chỉ để về bờ*. Trong khi người đi
chậm ăn 4 cú +10% đều đặn đã +46%. → **Bảo vệ vốn khỏi cú lỗ lớn quan trọng hơn
săn cú lãi lớn.** Đây là lý do cắt lỗ có kỷ luật là tính năng số 1.

## D2. Mô hình "Thân tàu — Thuyền thúng"

Cách phân bổ vốn đề xuất:
- **Thân tàu (70–80% vốn):** bluechip + midcap đầu ngành, thanh khoản tốt. Sóng
  vừa nhưng sống lâu. → nhóm `WATCHLIST_CORE`.
- **Thuyền thúng (20–30% vốn):** mã sóng mạnh anh muốn đánh — nhưng **kỷ luật
  cứng:** cắt lỗ −8~9% không lý do, không trung bình giá xuống, không tất tay một
  mã. → nhóm `WATCHLIST_HOT`.

Anh muốn rủi ro cao hơn không sai — chỉ cần **chọn rủi ro nào đáng chịu và đóng
khung nó lại**, đừng để nó tràn ra cả tài khoản.

## D3. Các bẫy tâm lý phải tránh

- **Mua đỉnh bán đáy:** thấy giá tăng mạnh thì FOMO mua, thấy giảm thì hoảng bán.
  Ngược hoàn toàn với "mua rẻ bán đắt".
- **Trung bình giá xuống (DCA vào mã đang lỗ):** "giá giảm thì mua thêm cho rẻ" —
  rất dễ biến khoản lỗ nhỏ thành lỗ lớn nếu mã tiếp tục rơi.
- **Bỏ chiến lược giữa chuỗi thua:** dính 3 lệnh thua liên tiếp rồi tắt hệ thống
  đánh tay. Nếu backtest nói chuỗi thua đó nằm trong tính toán thì đừng hoảng.
- **Yêu một mã:** giữ mãi mã đang lỗ vì "tin tưởng" thay vì theo kỷ luật.
- **Tất tay một mã / dùng đòn bẩy (margin) quá tay:** một cú sai là cháy tài khoản.

## D4. Quy tắc vàng

> *Quy tắc số 1: Đừng để mất tiền. Quy tắc số 2: Đừng quên quy tắc số 1.* —
> Warren Buffett nói câu này không phải vì ông nhát, mà vì ông hiểu toán ở mục D1.

---

# PHẦN E — QUY TRÌNH DÙNG HÀNG NGÀY

| Thời điểm | Nhận gì | Anh làm gì |
|-----------|---------|-----------|
| **7h sáng** | ☀️ Báo cáo sáng AI | Đọc 2 phút trước khi mở cửa. Lưu ý mục "mâu thuẫn tin–tiền" và cảnh báo rủi ro. |
| **Trong phiên** | 🔔 Cảnh báo biến động / 🎯 giảm sâu / 🛑 cắt lỗ | Còi biến động = *soi*, không phải *mua*. Còi 🛑 cắt lỗ = **hành động kỷ luật ngay**. |
| **15h45** | 💰 Dòng tiền khối ngoại | Xem "tay to" gom/xả mã nào, có đảo chiều không. Ghi nhận xu hướng nhiều phiên. |
| **9h thứ 7** | 📋 Backtest tuần | Xem tín hiệu nào còn đáng tin, ngưỡng cắt lỗ có cần chỉnh. |

**Nguyên tắc xuyên suốt:** hệ thống đưa *thông tin chất lượng cao*, anh đưa
*quyết định*. Đừng biến nó thành robot ra lệnh.

---

# PHẦN F — TỪ ĐIỂN THUẬT NGỮ NHANH

- **Bluechip:** cổ phiếu đầu ngành, vốn hoá lớn, ổn định.
- **Khối ngoại:** nhà đầu tư nước ngoài.
- **Mua/bán ròng:** giá trị mua trừ giá trị bán trong phiên.
- **Khối lượng (KL):** số cổ phiếu khớp lệnh.
- **KL đột biến:** KL hôm nay cao bất thường so với trung bình → dòng tiền lớn vào/ra.
- **Mean-reversion (hồi phục về trung bình):** giá bị bán quá đà rồi nảy lại.
- **Momentum:** xu hướng giá đang chạy tiếp tục chạy (đà).
- **Cắt lỗ (stop-loss):** bán ra khi lỗ chạm ngưỡng định trước, để chặn lỗ lan rộng.
- **Chốt lời (take-profit):** bán ra khi lãi đạt mục tiêu.
- **Bắt dao rơi:** mua mã đang rơi mạnh, kỳ vọng nảy — lợi thế có thật nhưng đuôi rủi ro lớn.
- **Backtest:** thử chiến lược trên dữ liệu quá khứ.
- **Tỷ lệ thắng (win rate):** % số lệnh có lãi.
- **Kỳ vọng (expectancy):** lãi/lỗ trung bình mỗi lệnh về dài hạn.
- **Overfitting:** tinh chỉnh quá khít theo dữ liệu cũ → vô dụng với tương lai.
- **Nền (baseline):** kết quả "mua đại" để so sánh — tín hiệu phải thắng nền mới có giá trị.
- **VN-Index:** chỉ số chung sàn HOSE.
- **Room ngoại:** tỷ lệ sở hữu tối đa cho nhà đầu tư nước ngoài ở một mã.
- **T+2:** mua hôm nay, chiều ngày thứ 2 sau mới bán được.
- **Pha loãng:** phát hành thêm cổ phiếu làm giảm giá trị mỗi cổ phiếu cũ.

---

# PHẦN G — LỘ TRÌNH HỌC & NÂNG CẤP TIẾP

**Việc còn treo:**
1. **Nạp danh mục thật + giá vốn** vào `PORTFOLIO` và 2 watchlist → để hệ thống
   phục vụ đúng ví của anh thay vì 10 mã mẫu.
2. **Giai đoạn 3 — Bất động sản:** theo dõi giá rao theo khu vực anh quan tâm.

**Các lớp đầu vào còn có thể bổ sung (5 lớp quyết định):**
- ✅ Lớp 1 — Giá & khối lượng *(đã có)*
- ✅ Lớp 2 — Dòng tiền khối ngoại *(đã có)*
- ✅ Lớp 3 — Tin tức & sự kiện *(đã có)*
- ⏳ Lớp 4 — Cơ bản doanh nghiệp (BCTC, P/E, P/B) — hướng nâng cấp
- ⏳ Lớp 5 — Vĩ mô (lãi suất, tỷ giá, CK thế giới) — Claude đã chạm tới trong báo cáo sáng
- ⏳ Bonus: giao dịch cổ đông nội bộ (tín hiệu sớm giá trị)

**Tự học thêm:** đọc BCTC một vài DN trong watchlist; theo dõi lịch sự kiện
(cổ tức, ĐHĐCĐ); quan sát cách giá phản ứng với tin để cảm nhận thị trường.

---

> ## 🧭 LỜI KẾT
>
> Hệ thống này không biến anh thành người thắng chắc — không công cụ nào làm được
> điều đó, vì dữ liệu công khai ai trả tiền cũng mua được. **Lợi thế thật của anh
> nằm ở chỗ: xử lý nhanh hơn, có kỷ luật hơn, không bỏ sót, và không để cảm xúc
> phá quyết định.** Đó đúng là cái máy làm tốt hơn người.
>
> Cuốn cẩm nang này là điểm khởi đầu để học, không phải đích đến. Thị trường luôn
> dạy bài mới. Giữ kỷ luật, tôn trọng rủi ro, và để hệ thống lo phần thông tin —
> phần quyết định, giữ cho mình.

---
*Tài liệu đi kèm nền tảng hỗ trợ đầu tư — cập nhật theo tiến độ dự án. Mọi nội
dung mang tính thông tin & giáo dục, KHÔNG phải khuyến nghị đầu tư.*
