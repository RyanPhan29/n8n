# THẺ CÔNG THỨC PROMPT THUMBNAIL — Chuyện Tiền (bám 2 kênh mẫu: Me xừ Đức + kênh truyện)

> Chốt sau khi phân tích kênh tham khảo + số liệu thật (video 7 Bẫy được đề xuất nhưng CTR 2,3% → thumbnail là nút thắt).

## Nguyên tắc VÀNG
1. **Style CARTOON PHẲNG** (flat 2D, viền đậm, màu sáng bão hoà) — KHÔNG ảnh thật/điện ảnh.
2. **Nhân vật cố định, mặt CỰC biểu cảm** (sốc/hoảng/tham/smug) — đây là "mặt người" kéo click #1. (Anh Hai = mascot của kênh.)
3. **Thumbnail KỂ TRỌN câu chuyện bằng cảnh** — nhân vật đang *diễn* chủ đề (nhìn ảnh là hiểu nội dung).
4. **Title NGẮN + TO + ĐẬM, nhét TRONG ảnh** (2–4 chữ) — vì ảnh đã gánh nghĩa. **Title video ≠ chữ trên thumb** (bổ nhau, không lặp).
5. **Tương phản gắt + độ "over"** (phóng đại phi thực), 2–3 màu đập nhau, viền/glow.

## Chữ tiếng Việt: LUÔN cho vào prompt (theo yêu cầu user)
- AI hay hỏng dấu (ê/ẫ/ề/ơ/đ). Cách xử lý:
  - Ghi **chính xác** chữ trong prompt + câu chốt: *"Render the Vietnamese title EXACTLY with correct diacritics; thick black outline; keep every accent mark precise."*
  - **Gen 3–4 lần, chọn bản đúng dấu.**
  - Hỏng chữ nào → gửi Claude **vá đúng ô đó** cho khớp style (vẫn nhìn như baked-in, dấu chuẩn 100%).

## Khung prompt chuẩn (điền vào [...])
```
Flat 2D cartoon YouTube thumbnail, 16:9, bold clean outlines, bright saturated colors, funny exaggerated comic style. [NHÂN VẬT + BIỂU CẢM mạnh] [đang diễn chủ đề bằng CẢNH + vật xung đột phóng đại]. Big bold Vietnamese cartoon title [vị trí] reading exactly "[CHỮ]" in thick [màu] letters with black outline [+ drop shadow]. High contrast [nền], punchy clickbait. Render the Vietnamese title EXACTLY with correct diacritics ([liệt kê chữ khó]); thick black outline, keep every accent precise. No watermark.
```

---

## Kho prompt sẵn (nhân bản)

### 7 BẪY TIỀN  · title video: "Đi Làm 10 Năm Vẫn Trắng Tay?"
```
Flat 2D cartoon YouTube thumbnail, 16:9, bold clean outlines, bright saturated colors, funny exaggerated comic style. RIGHT side: a shocked cartoon Vietnamese man wearing a red cap, wide bulging eyes, hands on his cheeks, panicking, looking at a GIANT golden bear-trap snapping shut over an empty wallet, gold coins flying out, red alarm glow. LEFT side: huge bold cartoon Vietnamese title text reading exactly "7 BẪY TIỀN" in thick yellow letters, black outline, red drop shadow. High-contrast dark background, punchy clickbait energy. Render the Vietnamese title EXACTLY with correct diacritics (BẪY, TIỀN); thick black outline, keep every accent precise. No watermark.
```

### MUA hay THUÊ?  · title video: "Đi Làm Mãi Vẫn Không Mua Nổi Nhà?" / "Mua Nhà hay Thuê ở Tuổi 30?"
```
Flat 2D cartoon YouTube thumbnail, 16:9, bold outlines, bright colors, comic style. CENTER: a cartoon Vietnamese man ~30 scratching his head, confused, standing between TWO choices. LEFT: a small house with a heavy chain and a "loan" weight. RIGHT: a glowing golden upward arrow with stacks of coins. Big bold cartoon Vietnamese title at the TOP reading exactly "MUA hay THUÊ?" in thick white-and-yellow letters with black outline; smaller below "SAU 20 NĂM?". High contrast, punchy. Render the Vietnamese text EXACTLY with correct diacritics (THUÊ, NĂM); thick black outline, keep every accent precise. No watermark.
```
Biến thể hook mạnh — "THUÊ GIÀU HƠN MUA?":
```
Flat 2D cartoon YouTube thumbnail, 16:9, bold outlines, bright saturated colors, comic style. LEFT: a cartoon man proudly holding a house key next to a small apartment. RIGHT: another cartoon man riding a soaring golden money-arrow with coins, laughing, richer. Big bold Vietnamese cartoon title across the top reading exactly "THUÊ GIÀU HƠN MUA?" in thick yellow letters with black outline and red shadow. Shocked vs smug expressions, high contrast, clickbait. Render the Vietnamese title EXACTLY with correct diacritics (THUÊ, HƠN); thick black outline, keep every accent precise. No watermark.
```

### CỖ MÁY IN TIỀN  · title video: "Người Giàu Không Đổi Sức Lấy Tiền Cả Đời"
① Ẩn dụ cỗ máy:
```
Flat 2D cartoon YouTube thumbnail, 16:9, bold clean outlines, bright saturated colors, funny comic style. A happy smug cartoon Vietnamese man dropping ONE gold coin into a big funny money-printing machine (pipes, gears, glowing), and a fountain of paper money + coins shoots out the other side. His eyes are dollar signs, grinning. Big bold Vietnamese cartoon title across the TOP reading exactly "CỖ MÁY IN TIỀN" in thick gold letters with black outline and red drop shadow; small subtitle "CÁ NHÂN" below. High contrast dark teal background, punchy. Render the Vietnamese title EXACTLY with correct diacritics (CỖ, MÁY, TIỀN, CÁ NHÂN); thick black outline, keep every accent precise. No watermark.
```
② In tiền khi ngủ:
```
Flat 2D cartoon YouTube thumbnail, 16:9, bold outlines, bright colors, comic style. A relaxed cartoon Vietnamese man sleeping peacefully in a hammock, hands behind head, smiling; beside him a funny machine automatically prints money that piles into a golden mountain of coins and bills. Zzz above his head. Big bold Vietnamese cartoon title reading exactly "IN TIỀN KHI NGỦ" in thick yellow letters, black outline, at the top. High contrast, cozy night background with warm glow, clickbait. Render the Vietnamese title EXACTLY with correct diacritics (TIỀN, NGỦ); thick black outline, keep every accent precise. No watermark.
```
③ Đổi sức vs xây máy:
```
Flat 2D cartoon YouTube thumbnail, 16:9, split composition, bold outlines, bright colors, comic style. LEFT: an exhausted sweaty cartoon Vietnamese man pushing a huge heavy cart of coins uphill, tired face, grey tone. RIGHT: a relaxed rich cartoon man sitting back while a money-printing machine works for him, gold glow, coins flying. Big bold Vietnamese cartoon title across the top reading exactly "ĐỔI SỨC hay XÂY MÁY?" in thick white and gold letters with black outline. Strong contrast between tired-grey and rich-gold sides, punchy. Render the Vietnamese title EXACTLY with correct diacritics (ĐỔI SỨC, XÂY MÁY); thick black outline, keep every accent precise. No watermark.
```

## Quy tắc TITLE (video)
- Ngắn, đánh nỗi đau/câu hỏi. **Không lặp chữ trên thumbnail** (bổ sung nghĩa).
- Đổi title video đang chạy → theo dõi 48h (YouTube không A/B title, chỉ A/B thumbnail).
- Thumbnail thì bật **"Thử nghiệm & so sánh"** (Test & compare) up 2–3 mẫu để YT tự chọn CTR cao nhất.
