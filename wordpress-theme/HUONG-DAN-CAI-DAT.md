# Hướng dẫn cài đặt Website WordPress trên VPS Hostinger

Giao diện **Triều Nguyên Law** dành cho Văn phòng Luật sư Triều Nguyễn và Cộng sự.
Tài liệu này hướng dẫn từ A–Z: cài WordPress trên VPS Hostinger, tải giao diện lên,
và để mẹ/bác **tự đăng bài** dễ dàng.

---

## 📦 Có gì trong thư mục này?

```
wordpress-theme/
├── trieu-nguyen-law/      ← GIAO DIỆN (theme) — đây là phần tải lên WordPress
│   ├── style.css
│   ├── functions.php
│   ├── header.php  footer.php
│   ├── front-page.php  index.php  single.php  page.php
│   └── js/main.js
├── noi-dung-mau.xml       ← 3 bài Cẩm nang mẫu + 4 chuyên mục (nhập 1 lần là có)
└── HUONG-DAN-CAI-DAT.md   ← file bạn đang đọc
```

---

## BƯỚC 1 — Cài WordPress trên VPS Hostinger

Hostinger có 2 trường hợp, chọn đúng loại VPS của bạn:

### Cách A — VPS có sẵn bảng điều khiển (hPanel / template "WordPress")
1. Đăng nhập **hPanel Hostinger** → vào **VPS** → chọn máy chủ của bạn.
2. Mục **Hệ điều hành (OS & Panel)** → chọn template **"Ubuntu + WordPress"** hoặc
   **"WordPress với CyberPanel/Webdash"**. Hostinger sẽ tự cài sẵn WordPress.
3. Làm theo hướng dẫn trên màn hình để đặt **tên miền, tài khoản quản trị**.

### Cách B — VPS dùng panel (khuyên dùng cho dễ): cài CyberPanel
1. Trong hPanel chọn template **CyberPanel** cho VPS (hoặc tự cài).
2. Đăng nhập CyberPanel (`https://IP-VPS:8090`).
3. **Websites → Create Website** → nhập tên miền → **Create**.
4. Vào **Websites → List → Manage → WordPress** (hoặc **WP Manager → Install**)
   để cài WordPress chỉ với vài cú bấm.

> 💡 Nếu thấy rối, bạn có thể nhờ **bộ phận hỗ trợ Hostinger (chat 24/7)** cài giúp
> WordPress lên VPS — họ hỗ trợ việc này.

Sau bước này, bạn đã vào được trang quản trị: `https://tenmien-cua-ban.vn/wp-admin`

---

## BƯỚC 2 — Tải giao diện (theme) lên

### Cách 1: Nén thành .zip rồi tải qua trang quản trị (dễ nhất)
1. Nén **thư mục `trieu-nguyen-law`** thành file `trieu-nguyen-law.zip`.
   *(Quan trọng: nén đúng thư mục này, để khi giải nén ra có ngay `style.css` bên trong.)*
2. Vào **wp-admin → Giao diện → Thêm giao diện mới → Tải giao diện lên**.
3. Chọn file `trieu-nguyen-law.zip` → **Cài đặt** → **Kích hoạt**.

### Cách 2: Tải qua trình quản lý file (nếu cách 1 báo lỗi dung lượng)
1. Trong CyberPanel/hPanel mở **File Manager** (hoặc dùng FTP).
2. Vào thư mục: `.../public_html/wp-content/themes/`
3. Tải nguyên thư mục `trieu-nguyen-law` vào đó.
4. Vào **wp-admin → Giao diện** → **Kích hoạt** "Triều Nguyên Law".

---

## BƯỚC 3 — Cài đặt cho hiển thị đúng (rất quan trọng)

### 3.1. Đặt trang chủ
Giao diện đã có sẵn trang chủ (`front-page.php`), thường tự hiện. Nếu muốn có trang
"Cẩm nang" riêng để liệt kê bài viết:
1. **Trang → Thêm trang mới** → đặt tên *"Trang chủ"* (để trống nội dung) → Đăng.
2. Tạo thêm trang *"Cẩm nang"* (để trống) → Đăng.
3. Vào **Cài đặt → Đọc** → chọn **"Một trang tĩnh"**:
   - Trang chủ: *Trang chủ*
   - Trang bài viết: *Cẩm nang*

### 3.2. Đường dẫn tĩnh (cho link đẹp + SEO)
Vào **Cài đặt → Đường dẫn tĩnh** → chọn **"Tên bài viết"** → Lưu.

### 3.3. Nhập 3 bài mẫu + chuyên mục
1. **Công cụ → Nhập (Import)** → chọn **WordPress** → cài plugin nhập nếu được hỏi.
2. Tải lên file **`noi-dung-mau.xml`** → Nhập.
3. Xong! Bạn sẽ có 4 chuyên mục và 3 bài Cẩm nang để tham khảo cách trình bày.

---

## BƯỚC 4 — Điền thông tin văn phòng (KHÔNG cần code)

Vào **wp-admin → Giao diện → Tùy biến → "Thông tin văn phòng"**, điền:

| Mục | Ví dụ |
|---|---|
| Tên văn phòng | Triều Nguyễn và Cộng sự |
| Số điện thoại (bấm gọi) | 0905123456 |
| Số điện thoại (hiển thị) | 0905 123 456 |
| Số Zalo | 0905123456 |
| Email | vanphongtrieunguyen@gmail.com |
| Link Facebook | https://facebook.com/... |
| Địa chỉ | 123 Quang Trung, TT Phú Phong, Tây Sơn, Bình Định |
| Giờ làm việc | Thứ 2 – Thứ 7: 7h30 – 18h00 |
| Link bản đồ Google Maps | *(xem dưới)* |
| Link Formspree | *(tùy chọn — xem Bước 6)* |

Nhấn **Đăng** (Publish). Toàn bộ số điện thoại/Zalo trên web sẽ tự cập nhật.

**Lấy link bản đồ:** Google Maps → tìm địa chỉ → **Chia sẻ → Nhúng bản đồ** →
trong đoạn mã có `src="..."`, copy phần trong dấu ngoặc kép dán vào ô bản đồ.

**Thêm logo (nếu có):** Tùy biến → **Nhận diện trang → Biểu trưng (Logo)**.

---

## BƯỚC 5 — Cách đăng bài Cẩm nang (cho bác làm hằng ngày)

1. Vào **wp-admin → Bài viết → Viết bài mới**.
2. Gõ **tiêu đề** và **nội dung** (gõ như Word: in đậm, xuống dòng, chèn ảnh...).
3. Bên phải, chọn **Chuyên mục** (Đất đai, Hôn nhân, Hình sự, Doanh nghiệp).
4. (Nên có) Đặt **Ảnh đại diện** để bài đẹp hơn.
5. Bấm **Đăng (Publish)**.

➡️ Bài mới sẽ **tự hiện ở mục Cẩm nang trên trang chủ** (3 bài mới nhất).

---

## BƯỚC 6 — (Tùy chọn) Nhận thông tin khách điền từ form

Mặc định, khi khách bấm gửi form, web sẽ **mở Zalo kèm nội dung** khách đã điền.
Nếu muốn nhận thẳng vào email:
1. Vào **https://formspree.io** → đăng ký miễn phí → tạo 1 form → lấy link
   dạng `https://formspree.io/f/abcxyz`.
2. Dán vào ô **"Link Formspree"** trong Tùy biến (Bước 4).

> Hoặc dùng plugin **Contact Form 7 / WPForms** nếu muốn form chuyên nghiệp hơn.

---

## BƯỚC 7 — Nên cài thêm (miễn phí, giúp web mạnh hơn)

- **Rank Math** hoặc **Yoast SEO** — giúp web lên Google.
- **LiteSpeed Cache** (nếu VPS dùng LiteSpeed/CyberPanel) — tăng tốc độ tải.
- **UpdraftPlus** — tự sao lưu web định kỳ cho an toàn.
- **Wordfence** — bảo mật, chống truy cập xấu.

---

## 🔒 Bảo mật cơ bản
- Đặt mật khẩu quản trị mạnh; bật **HTTPS (SSL)** — Hostinger/CyberPanel cấp SSL miễn phí.
- Cập nhật WordPress, theme, plugin khi có bản mới.

---

## ❓ Gặp khó ở đâu?
- Theme không hiện đúng → kiểm tra đã **Kích hoạt** theme và làm **Bước 3**.
- Trang chủ ra danh sách bài thay vì giao diện đẹp → làm lại **Bước 3.1**.
- Mọi nội dung chữ (lĩnh vực, FAQ, câu giới thiệu) muốn sửa sâu hơn nằm trong
  file `front-page.php`. Liên hệ người làm web nếu cần chỉnh phần này.
