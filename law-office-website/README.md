# Website Văn phòng Luật sư

Một website **tĩnh** (chạy nhanh, dễ đăng, không cần máy chủ phức tạp), thiết kế
theo phong cách **Truyền thống – Sang trọng** (đỏ đô + vàng), tối ưu cho **điện
thoại** và bà con ở quê: chữ to, nút bấm lớn, **gọi điện / nhắn Zalo chỉ 1 chạm**.

---

## 📁 Có gì trong này?

```
law-office-website/
├── index.html              ← Trang chính (giao diện chủ đạo)
├── css/styles.css          ← Màu sắc, bố cục (giao diện)
├── js/main.js              ← Cấu hình SĐT/Zalo + hiệu ứng
└── bai-viet/               ← Các bài Cẩm nang pháp luật
    ├── thu-tuc-ly-hon.html
    ├── tranh-chap-dat-dai.html
    └── lam-di-chuc.html
```

---

## ✅ Việc cần làm đầu tiên (rất dễ)

### 1. Sửa số điện thoại, Zalo, email — chỉ 1 chỗ duy nhất
Mở file **`js/main.js`**, sửa phần `CAU_HINH` ở trên cùng:

```js
const CAU_HINH = {
  soDienThoai: "0123456789",      // ← số để bấm gọi
  soHienThi:   "0123 456 789",    // ← số hiển thị cho đẹp
  zalo:        "0123456789",      // ← số Zalo
  email:       "email@vanphongluat.vn",
  facebook:    "#",               // ← dán link Facebook, chưa có thì để "#"
  formEndpoint: ""                // ← xem mục 3 bên dưới
};
```
Sửa xong, **toàn bộ số điện thoại/Zalo trên cả trang sẽ tự cập nhật**.

### 2. Thay các chỗ trong ngoặc vuông `[ ]`
Mở `index.html` (và các file trong `bai-viet/`), tìm và thay:

| Chỗ cần thay | Ví dụ |
|---|---|
| `Triều Nguyễn và Cộng sự` | Văn phòng Luật sư **Minh Anh** |
| `[Số nhà, tên đường], Tây Sơn, Bình Định` | 123 Quang Trung, TT Phú Phong, Tây Sơn, Bình Định |

> 💡 Mẹo: Trong hầu hết trình soạn thảo, nhấn **Ctrl + H** để "Tìm và thay thế"
> tất cả `Triều Nguyễn và Cộng sự` một lần.

### 3. (Nên làm) Nhận thông tin khách điền từ form
Mặc định, khi khách bấm gửi form, trang sẽ **mở Zalo** kèm nội dung khách đã điền.
Nếu muốn nhận trực tiếp vào email:
1. Vào **https://formspree.io** → đăng ký miễn phí → tạo 1 form.
2. Copy đường link dạng `https://formspree.io/f/abcxyz`.
3. Dán vào `formEndpoint` trong `js/main.js`.

### 4. Chỉnh bản đồ Google Maps
Trong `index.html`, tìm phần `<iframe ... googlemaps ...>` ở mục **Liên hệ**.
Vào Google Maps → tìm địa chỉ văn phòng → **Chia sẻ → Nhúng bản đồ** → copy link
trong `src="..."` và thay vào.

---

## 🌐 Đưa website lên mạng (chọn 1 cách)

### Cách A — Netlify (dễ nhất, miễn phí, kéo-thả)
1. Vào **https://app.netlify.com/drop**
2. Kéo nguyên thư mục `law-office-website` thả vào trang đó.
3. Xong! Có ngay địa chỉ web. Có thể gắn tên miền riêng (vd: `vanphongluatXYZ.vn`) sau.

### Cách B — GitHub Pages (miễn phí)
1. Đưa thư mục này lên một kho GitHub.
2. Vào **Settings → Pages** → chọn nhánh → Save.

### Cách C — Tên miền + Hosting riêng
Tải toàn bộ file lên hosting qua FTP (thư mục `public_html`).

> 💵 Muốn có tên miền `.vn` đẹp (vd `vanphongluatminhanh.vn`): mua tại các nhà cung
> cấp như Mắt Bão, PA Vietnam, Nhân Hòa... (khoảng vài trăm nghìn/năm).

---

## ✍️ Thêm một bài Cẩm nang mới

1. Vào thư mục `bai-viet/`, **sao chép** 1 file có sẵn (vd `lam-di-chuc.html`),
   đổi tên mới (vd `tu-van-dat-coc.html`).
2. Mở file mới, sửa lại tiêu đề và nội dung.
3. Mở `index.html`, tới mục **Cẩm nang** (`id="cam-nang"`), thêm 1 thẻ bài viết
   trỏ tới file mới.

---

## 🎨 Đổi màu giao diện (nếu muốn)
Mở `css/styles.css`, sửa các màu ở phần `:root` trên cùng (ví dụ `--maroon` là màu
đỏ đô chính, `--gold` là màu vàng).

---

## 📞 Cần hỗ trợ
Mọi nội dung mẫu (lĩnh vực, câu hỏi, bài viết) đều có thể sửa thoải mái cho đúng
với văn phòng của mình. Cứ thay chữ trong file là được, không sợ hỏng.
