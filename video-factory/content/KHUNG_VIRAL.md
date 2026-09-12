# KHUNG VIRAL — chuẩn hoá cấu trúc + edit median-lite + chọn skin
> Kênh "Chuyện Tiền · Anh Hai Kể" · v1 · 2026-09 · Việc #5 trong `HANDOFF_COWORK.md`.
> **File này là bản CHUẨN** cho: (a) cấu trúc kịch bản video dài, (b) 6 kỹ thuật edit median-lite, (c) chọn median-lite hay hybrid.
> Khi mâu thuẫn với `PLAYBOOK_hook_thumbnail.md`, `QUYCHUAN_kechuyen_nhanvat.md`, `KHAOSAT_packaging_edit.md`, `median_style_kit.md` → **file này thắng** (phán quyết ở mục 0). Engine khóa + BẤT BIẾN trong `CLAUDE.md` giữ nguyên, file này không đụng tới.

---

## 0. PHÁN QUYẾT 6 MÂU THUẪN GIỮA CÁC FILE CŨ

| # | Mâu thuẫn | Phán quyết | Lý do |
|---|---|---|---|
| 1 | Payoff ~70% (QUYCHUAN) vs ~85% (PLAYBOOK) | **Tách 2 loại payoff.** Payoff NHẬN THỨC (trả lời câu hỏi title, cú lật chính) ở **45–60%**. Payoff HÀNH ĐỘNG (giải pháp + 3 việc) ở **70–90%**. Riêng dạng "N bẫy" giữ bẫy đắt nhất ở ~85%. | Mẫu độ sâu đã duyệt (`lamphat_full_vbee.txt`) cần ~40% thời lượng SAU cú lật cho giải pháp → mặt trái → 3 việc → disclaimer → câu hỏi. Đẩy payoff về 85% thì không còn chỗ cho phần này. |
| 2 | Median "0 hard cut, cảnh 8–20s" vs KHAOSAT "đổi hình mỗi 5–7s" | **Không mâu thuẫn nếu tách 2 khái niệm.** Median-lite: 0 hard cut, NHƯNG cứ **5–8s phải có 1 sự kiện thị giác** (khoanh mới, số chạy, spotlight dời, phần tử cũ tụt xám). Hybrid: đổi block 5–10s như cũ. | "Cắt" và "thay đổi" là 2 việc khác nhau. Median giữ chân bằng chuyển động liên tục chứ không bằng cắt. |
| 3 | Whoosh + music swell (KHAOSAT, median kit) vs "chỉ tiếng tự nhiên" (HANDOFF) | **HANDOFF thắng.** Median-lite cấm `swell.wav`, sweep, pad, synth. `whoosh.wav` chỉ dùng nếu nghe như vải/giấy lướt; nghe điện tử thì bỏ. | Đã test với anh Ryan, anh chê "nghe như tiếng lỗi" nhiều lần. Bằng chứng trực tiếp thắng convention ngoài. |
| 4 | Grain ~0,4% (đo, median kit) vs `FilmGrain` opacity 0,14–0,15 (HANDOFF) | **Giữ `FilmGrain` 0,14** (bản anh đã duyệt). Hai số khác đơn vị: một bên là độ lệch sáng đo trên video, một bên là opacity lớp phủ. | Kiểm lại trên điện thoại: nhìn rõ hạt thì hạ 0,10. |
| 5 | Hook "cú sốc/in-medias-res" (strategy, QUYCHUAN) vs "lật niềm tin" (HANDOFF) | **Lật niềm tin = dạng chuẩn** cho explainer (mục 1). Hook "cú sốc số" giữ cho Điểm tin/Bẫy. | Explainer bán sự hiểu, không bán tin sốc. |
| 6 | Thư viện explainer = KHÁI NIỆM vs data kênh: "khái niệm trừu tượng THUA" (50/30/20: 235 view) | **Explainer KHÔNG BAO GIỜ đặt title bằng tên khái niệm.** Luôn đóng gói thành BẪY hoặc SO SÁNH (mục 5). | Chính số của kênh: so sánh + bóc bẫy ~1.600–1.900 view, khái niệm ~235–380. |

**Đính chính thời lượng (đo thật):** Vbee đọc **~215–230 từ/phút** (laikep 116 từ/31,4s · donbay 142/39,4s · NoTot 853/227s · CoMay 912/239s). → `lamphat_full_vbee.txt` (739 từ) dài **~3 phút 20 giây**, KHÔNG phải "5–6 phút" như HANDOFF ghi.

| Thời lượng mục tiêu | Số từ Vbee cần |
|---|---|
| 3,5' (1 explainer đứng riêng) | ~780 |
| 8' (mở mid-roll) | ~1.800 |
| 10' | ~2.250 |

---

## 1. MỞ ĐẦU LẬT NIỀM TIN — 5 BƯỚC (0–40s ≈ 120–150 từ)

| Bước | Giây | Việc | Hình (median-lite) |
|---|---|---|---|
| **B1 · Vật chứng** | 0–5 | 1 vật/cảnh người xem đã thấy trăm lần | Footage thật + khoanh tay 1 chi tiết |
| **B2 · Niềm tin chung** | 5–10 | Nói hộ điều khán giả đang tin | Nhãn trích dẫn xám |
| **B3 · Lật** | 10–15 | "Nhưng…" + cái MẤT cụ thể của chính người xem | 1 chữ đỏ duy nhất |
| **B4 · Thủ phạm** | 15–25 | Gọi tên kẻ gây ra, CHƯA giải cơ chế | Spotlight thu hẹp vào vật |
| **B5 · Hợp đồng xem** | 25–40 | Hé cấu trúc + 1 số mồi + hứa trả lời | Nhãn "3 LỚP" tracked-caps |

**Luật:**
- Câu 1 phải lao thẳng vào đúng câu hỏi của title. Cấm "xin chào", cấm "hôm nay mình nói về…".
- Vật ở B1 **phải quay lại ở câu cuối** (callback). Đây là thứ làm video "đóng vòng" và dễ chia sẻ.
- B3 phải là mất mát của NGƯỜI XEM ("bạn đang nghèo đi"), không phải mất mát chung chung ("nền kinh tế…").

**Mẫu điền cho 5 bài thư viện** (số chỉ lấy từ sim đã dựng; bài chưa research thì để [ô trống có nguồn]):
- **Lạm phát:** B1 cái két/phong bì cất tủ (tô phở để dành cho đoạn định nghĩa) → B2 "có đồng nào cất kỹ đồng đó" → B3 "bạn đang nghèo đi mà không hay biết" → B4 "kẻ lấy tiền hợp pháp, mỗi ngày" → B5 "nó lấy nhiều nhất từ chính những người cẩn thận nhất" (trả ở cú lật: người giữ tiền mặt + gửi tiết kiệm).
- **Lãi kép:** B1 cọc xu → B2 "tiết kiệm là cộng dồn từng tháng" → B3 "góp 720 triệu, nhưng phần lãi còn lớn hơn phần góp" → B4 "thứ làm việc thay bạn là thời gian" → B5 "năm thứ mấy lãi bắt đầu vượt vốn — con số đó nằm ở cuối" (đáp án đã tính: khoảng năm thứ 19).
- **Đòn bẩy:** B1 máy đếm tiền → B2 "vay mua nhà là khôn, tiền ngân hàng làm giàu cho mình" → B3 "chỉ cần nhà giảm 30%, bạn mất trắng mà nợ còn nguyên" → B4 "đòn bẩy phóng to cả đúng lẫn sai" → B5 "có 1 con số quyết định bạn đứng ở phía nào".
- **Dòng tiền thụ động:** B1 bảng lương → B2 "thu nhập thụ động là tiền từ trên trời rơi xuống" → B3 "muốn có [X triệu]/tháng, bạn cần [vốn, có nguồn lãi suất]" → B4 "không phải thiếu ý tưởng, mà thiếu vốn mồi" → B5 "3 cỗ máy, cái rẻ nhất bắt đầu với [số]".
- **Giá nhà vs thu nhập:** B1 căn hộ/sổ tiết kiệm → B2 "chăm chỉ tiết kiệm thì sớm muộn cũng mua được nhà" → B3 "càng tiết kiệm kiểu cũ, đích càng lùi xa" → B4 "hai đường giá nhà và lương đang tách nhau" → B5 "[số năm thu nhập để mua 1 căn, có nguồn] — và vì sao nó còn tăng".

---

## 2. THÂN BÀI "ĐIỀU TRA" (40s → cuối)

Học từ video giải thích "vì sao không nhớ lúc còn bé" (7:31, cấu trúc điều tra rất chặt) + mẫu độ sâu lạm phát.

| % thời lượng | Nhịp | Bắt buộc có |
|---|---|---|
| 5–15% | Định nghĩa bằng đời thường | 1 ví dụ trong bữa sáng/ví tiền người xem |
| 15–45% | **2–3 LỚP CƠ CHẾ** | Mỗi lớp = câu hỏi → bằng chứng có nguồn → 1 ẩn dụ vật lý → mô phỏng code → câu nối mở lớp sau |
| ~35–50% | **Wow số** | 1 con số làm người xem "ồ hoá ra mình nhầm" (lạm phát: 100 triệu còn ~nửa sau 20 năm) |
| 45–60% | **Payoff nhận thức = cú lật** | Đảo niềm tin ở B2. Nên có 1 khoảnh khắc biến NGƯỜI XEM thành đối tượng thử ("Bạn còn nhớ tô phở…?") |
| 60–75% | Quan điểm + giải pháp | Nguyên tắc 1 câu, rồi mới đến công cụ |
| 72–82% | **Mặt trái thẳng thắn** | Mỗi giải pháp nêu 1 rủi ro thật |
| 82–90% | 3 việc làm ngay | Đánh số, mỗi việc 1 câu |
| 90–96% | Disclaimer | 1 câu, không lên giọng |
| 96–100% | **Callback B1 + câu hỏi comment** | Câu hỏi 2 phe, trả lời được bằng 1 từ |

**Luật nối (giữ nguyên QUYCHUAN #3):** giữa 2 đoạn phải điền được "nhưng" hoặc "do đó"; cấm "và rồi". Cứ **45–60s (~170–220 từ) phải có 1 câu nối mở vòng mới.** Thư viện câu nối:
1. "Nhưng đó mới là một nửa câu chuyện."
2. "Nhưng có một cái giá."
3. "Nghe thì hiền. Nhưng không phải lúc nào cũng vậy."
4. "Và đây là chỗ ngược đời nhất."
5. "Bạn nghĩ mình không dính? Thử nhìn con số này."
6. "Còn một mảnh cuối cùng — và nó nằm ngay trong ví bạn."

**Luật uy tín:** mỗi lớp cơ chế có ≥1 nguồn gọi tên được (Tổng cục Thống kê, NHNN, báo cáo có năm). Nguồn hiện thành thẻ xám nhỏ ở đáy, nói dạng KHOẢNG. Không có nguồn thì không nói số.

**Luật engagement** (nút thắt #1, đang 0,56%): câu hỏi cuối phải có **2 phe** ("tiền của bạn đang nằm im hay đã đi làm việc?"). Ghim 1 comment mồi cùng câu hỏi đó. Cấm câu hỏi mở kiểu "bạn nghĩ sao?".

---

## 3. 6 KỸ THUẬT EDIT MEDIAN-LITE (dùng `MedianKit`)

1. **Một tấm vải liên tục.** Không hard cut. Mọi phần tử fade/rise theo frame tuyệt đối; nền không bao giờ tắt; chỉ đen 0,5s ở đầu video. Chuyển chương = divider "PHẦN N" cross-dissolve.
2. **Chú thích trọn vẹn trên vật chứng.** `FramedShot` footage thật → `HandCircle` khoanh 1 CHI TIẾT cụ thể → nhãn nói RA Ý NGHĨA (không chỉ gọi tên) → mũi tên có đích. Đọc theo thứ tự vật → ý → cú lật như một câu. Nhãn nằm ngoài khung ảnh (lề ≥70px).
   *Ví dụ lạm phát:* khoanh giá trên tấm biển hàng phở → nhãn "30.000đ · 10 năm trước" → mũi tên → "nay ~50–60.000đ".
3. **Một điểm sáng, phần còn lại tụt xám.** `Spotlight` dẫn mắt; phần tử cũ về xám `#7d7f83`. Mỗi khung chỉ **1 màu nhấn**: ĐỎ = mất tiền/nợ, VÀNG = phương án thắng/số chốt. Chỉ hero number mới có glow.
4. **Cơ chế chính là animation.** Mô phỏng chạy liên tục (không đứng hình), số đếm chạy song song với hình.
   *Ví dụ lạm phát — sim "tiền teo dần":* tờ "100.000.000" giữ nguyên chữ số, còn rổ hàng bên cạnh co lại theo năm (bộ đếm 2026→2046), đường sức mua vàng tụt về ~50%. Con số không đổi, thứ nó mua được teo lại → hình nói đúng câu thoại.
5. **Nhịp đọc kịp.** 1 ý = 1 lớp; mỗi lớp ≥1,5s; khung nhiều số 3–5s. Hình hiện ≤0,5s sau từ khoá. Neo beat theo mốc giây thật của từng đoạn thoại (`silencedetect`). Sự kiện thị giác mỗi 5–8s (mục 0 #2).
6. **Tiếng tự nhiên, đúng chỗ.** Bút kẽ khi khoanh, xu rơi khi tăng trưởng, tiếng đổ khi sụp. Mức −20…−26dB, im khi animation xong. Cấm synth/pad/sweep, cấm rung kéo dài. Mix: `amix=inputs=2:normalize=0:duration=first` + `-shortest` + `loudnorm=I=-14:TP=-1.5:LRA=11`, đo RMS từng giây trước khi giao.

---

## 4. MEDIAN-LITE HAY HYBRID?

**Chấm 3 câu, ≥2 "có" → median-lite:**
1. Chủ đề có **con số biến đổi theo thời gian/tham số** mô phỏng được không? (lãi kép, lạm phát, đòn bẩy: có · trả góp 0%: có · thói quen tự thưởng: không)
2. Có **vật chứng quay/footage thật** làm B1 không?
3. **Evergreen** ≥12 tháng không? (tin thời sự: không)

| | Median-lite (nền tối, sim code) | Hybrid Anh Hai (nền giấy, spec) |
|---|---|---|
| Hợp | Cơ chế số, evergreen | Bẫy hành vi, đời sống, so sánh, Điểm tin |
| Chi phí | Cao: code tay 1 file `*Sim.tsx`/bài | Thấp: điền `VideoSpec` |
| Vai trò | Tài sản dài hạn, định vị "hiểu sâu" | Nhịp tuần, volume |
| Tỉ lệ đề xuất | ~1 bài/2 tuần | Phần còn lại |

**Ghép video dài 8–10' (việc #3 của HANDOFF):** hook hybrid (Anh Hai, 30–45s, 5 bước mục 1) → 2–3 segment median-lite → kết hybrid (Anh Hai + câu hỏi comment).
⚠️ **Rủi ro cần anh quyết:** nền giấy sáng và nền tối có grain nhảy qua lại dễ trông như 2 kênh ghép. Luật đề xuất: **chỉ đổi skin ở divider chương**, dùng chung font BVPm + vàng làm cầu nối, và Anh Hai "bước vào" màn tối ở lần chuyển đầu tiên. Nếu thử 1 bản vẫn thấy lệch → làm video dài **thuần median-lite**, Anh Hai chỉ ở bìa + outro.

---

## 5. ĐÓNG GÓI EXPLAINER (title + bìa)

**Luật:** title = bẫy hoặc so sánh hoặc "vì sao", **không bao giờ là tên khái niệm**. So sánh phải giữa 2 thứ CỤ THỂ có số/vật ("100tr bank vs vàng": 1.646 view), không phải 2 khái niệm ("Đầu tư vs đầu cơ": 382 view).

| Bài | ❌ Title khái niệm | ✅ Title bẫy/so sánh |
|---|---|---|
| Lạm phát | "Lạm phát là gì?" | "Để Tiền Trong Két: An Toàn Hay Đang Nghèo Đi?" |
| Lãi kép | "Sức mạnh lãi kép" | "Góp 720 Triệu, Lãi 843 Triệu: Tiền Đẻ Tiền Thế Nào?" |
| Đòn bẩy | "Đòn bẩy tài chính" | "Vay 700 Triệu Mua Nhà: Lời 33% Hay Mất Trắng?" |
| Dòng tiền | "Thu nhập thụ động" | "Cần Bao Nhiêu Vốn Để Tháng Nào Cũng Có 10 Triệu Không Đi Làm?" |
| Giá nhà | "Giá nhà vs thu nhập" | "Lương [X] Triệu: Bao Nhiêu Năm Mới Mua Nổi 1 Căn?" |

(Số lãi kép: 3 triệu/tháng, 7%/năm, 20 năm → ~1,56 tỷ = gốc 720 triệu + lãi ~843 triệu. Đòn bẩy: nhà 1 tỷ, vốn 300 triệu, vay 700 triệu. Cả hai đã kiểm toán lại.)

**Bìa:** 1 SỐ TO + Anh Hai biểu cảm + ≤4 từ. Nền tối median trùng "bảng màu tài chính đáng tin" (KHAOSAT §2.3) → hợp. ⚠️ `cover()` hiện tại là nền sáng → cần **biến thể cover nền tối**; việc này đụng engine khóa, **cần anh duyệt** trước khi làm.

---

## 6. CỔNG KIỂM TRA TRƯỚC KHI GIAO (bắt buộc, không bỏ bước)

**Kịch bản:** ☐ 5 bước mở đầu đủ, ≤40s · ☐ câu 1 khớp title · ☐ không "hôm nay mình nói về" · ☐ câu nối mỗi 170–220 từ · ☐ wow số có nguồn · ☐ cú lật 45–60% · ☐ mặt trái thẳng thắn · ☐ 3 việc · ☐ disclaimer · ☐ callback B1 + câu hỏi 2 phe · ☐ số từ khớp thời lượng mục tiêu (mục 0).
**Hình:** ☐ xem TRỌN 1 lượt ở 1x trước khi giao (không chỉ still-check) · ☐ không sót khung storyboard/ô lưới/timecode, không sót artifact AI (video tham chiếu "ký ức 3 năm đầu đời" để lộ nguyên storyboard có timecode 6 giây — lỗi này làm mất uy tín ngay) · ☐ không chữ Việt trong ảnh AI · ☐ nhãn không đè footage · ☐ mỗi khung 1 màu nhấn.
**Tiếng:** ☐ file Vbee đã verify (thời lượng + khoảng lặng) · ☐ không synth · ☐ −14 LUFS · ☐ RMS từng giây khớp vị trí.
**Đạo đức:** ☐ số dạng khoảng + nguồn · ☐ tin nhạy cảm: không tên/ảnh cá nhân, không quy kết.

---

## 7. ĐO ĐỂ BIẾT KHUNG CÓ ĐÚNG KHÔNG

Mốc hiện tại (video "7 Bẫy"): CTR **2,3%** · giữ chân **~30%** · engagement kênh **0,56%**.
**Mục tiêu test cho 5 video dài áp khung** (giả thuyết, chưa phải cam kết): giữ 30s đầu ≥65% · APV ≥40% (video 3–4') · CTR ≥3,5% (chuẩn ngách tài chính 3–5%) · engagement ≥1,5%.
Sau 5 video: đọc đường retention tại 3 mốc — giây 15 (hook), cú lật (45–60%), đoạn giải pháp (60–75%). Tụt ở đâu thì sửa đúng bước đó trong file này và tăng version.

---

## 8. ÁP THỬ: CHẤM `lamphat_full_vbee.txt` THEO KHUNG

739 từ ≈ 3'20". Vị trí đo theo % số từ.

| Hạng mục | Kết quả | Vị trí |
|---|---|---|
| B1 vật chứng | ⚠️ Lời không cần, nhưng **hình B1 phải là cái két/phong bì cất tủ** (để câu kết "nằm im trong két" thành callback) | 0% |
| B2 niềm tin chung | ✅ "có đồng nào, cất kỹ đồng đó" | 0–5% |
| B3 lật + mất mát người xem | ✅ "đang từ từ nghèo đi mà không hề hay biết" | 0–5% |
| B4 thủ phạm | ⚠️ Nội dung đúng, nhưng mở bằng **"Hôm nay, mình nói về…"** → vi phạm luật | 5–11% |
| B5 hợp đồng xem | ❌ Thiếu: không hé cấu trúc, không hứa | — |
| Câu nối mỗi 45–60s | ⚠️ Đoạn 3→4 nối yếu ("Ở Việt Nam, vài năm gần đây…" = kiểu "và rồi") | 22% |
| Wow số | ✅ 100 triệu còn ~một nửa sau 20 năm (kiểm: 1/1,035²⁰ ≈ 0,50) | 33–45% |
| Cú lật | ✅ "giữ tiền mặt mới là rủi ro lớn nhất" | 45–56% |
| Người xem thành đối tượng thử | ✅ câu tô phở | 11–22% |
| Giải pháp → mặt trái → 3 việc → disclaimer | ✅ đủ và đúng thứ tự | 56–96% |
| Câu hỏi 2 phe + callback | ✅ "nằm im trong két, hay đã đi làm việc?" | 96–100% |
| Nguồn số liệu | ❌ **Chưa có `lamphat_SOLIEU.md`** — số 2008/2011, "3–4% gần đây", tô phở chưa có nguồn gắn thẻ | — |

**4 sửa đề xuất (chờ anh duyệt, chưa sửa file gốc):**
1. Đoạn 2, câu đầu: "Hôm nay, mình nói về kẻ lấy tiền của bạn êm ru nhất." → **"Có một kẻ đang lấy tiền của bạn êm ru nhất."**
2. Thêm B5 cuối đoạn 2 (sau "Nó tên là lạm phát."): **"Và nó lấy nhiều nhất từ chính những người cẩn thận nhất."** Lời hứa này được trả đúng ở cú lật (đoạn 6).
3. Đầu đoạn 4: thay "Ở Việt Nam, vài năm gần đây," bằng **"Vậy mỗi năm nó lấy của bạn bao nhiêu? Ở Việt Nam, vài năm gần đây,"** (chuỗi câu hỏi thay cho "và rồi").
4. Đoạn 6: câu "lãi suất gửi cũng chỉ nhỉnh hơn lạm phát một chút" → thêm 1 phép trừ có số thật: **[lãi tiết kiệm 12 tháng, nguồn NHNN/ngân hàng] trừ [CPI bình quân, nguồn Tổng cục Thống kê]**. Research xong mới điền, không điền số khi chưa có nguồn.

Kết luận test: khung chấm được và chỉ ra đúng 4 lỗ mà lúc duyệt độ sâu chưa bắt → khung dùng được. Kịch bản đạt ~9/12 hạng mục; sau 4 sửa + file nguồn thì đủ chuẩn để thu Vbee.
