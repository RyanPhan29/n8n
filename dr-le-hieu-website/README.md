# Website Bác sĩ CKI Lê Hiếu — SKINLAB the Beauty

Website tĩnh (HTML/CSS/JS thuần) cho phòng khám da liễu **BS CKI Lê Hiếu** tại Thủ Dầu Một, Bình Dương. Xây dựng theo đúng brief: định hướng chiến lược, design system, full copy và design brief.

## 📁 Cấu trúc

```
dr-le-hieu-website/
├── index.html                 # Trang chủ (Hero + Dịch vụ + Case study + Về BS + Công nghệ + Testimonial + Đặt lịch)
├── about.html                 # Về BS Lê Hiếu (câu chuyện + bằng cấp + triết lý)
├── services/
│   ├── tri-mun.html           # Trị Mụn Y Khoa
│   ├── tri-seo-ro.html        # Trị Sẹo Rỗ Chuyên Sâu
│   ├── peel-da.html           # Peel Da Dược Mỹ Phẩm
│   ├── laser-tre-hoa.html     # Laser Trẻ Hoá
│   └── triet-long.html        # Triệt Lông Diode
├── assets/
│   ├── css/style.css          # Design system đầy đủ (màu, font, component)
│   └── js/main.js             # Menu mobile, smooth scroll, form đặt lịch, scroll animation
└── README.md
```

## 🎨 Design System (theo brief)

| Vai trò | Màu | Mã |
|---|---|---|
| CTA / accent | Red SKINLAB | `#B22234` |
| Header / text | Black Navy | `#0E1E34` |
| Nền chính | White | `#FFFFFF` |
| Nền section | Cream Soft | `#F8F5F0` |
| Body text | Gray Text | `#4A4A4A` |
| Badge cao cấp | Gold Accent | `#BC913A` |

- **Font tiêu đề:** Playfair Display (serif — cảm giác uy tín, y khoa)
- **Font body:** Inter (sans-serif — dễ đọc mobile)
- Toàn bộ token nằm trong `:root` của `assets/css/style.css` — đổi 1 chỗ, cập nhật cả site.

## 🚀 Cách xem / chạy

Chỉ là file tĩnh — mở trực tiếp hoặc chạy server nhẹ:

```bash
cd dr-le-hieu-website
python3 -m http.server 8000
# mở http://localhost:8000
```

## ✅ Đã có sẵn

- Responsive đầy đủ (desktop / tablet / mobile), menu hamburger
- SEO on-page: `<title>`, meta description, meta keywords, Open Graph, **Schema.org MedicalBusiness**
- Form đặt lịch (Họ tên · SĐT · Vấn đề da · Ngày · Ghi chú)
- Nút gọi nhanh nổi (Hotline / Zalo / Messenger) trên mobile
- Disclaimer "Kết quả phụ thuộc cơ địa" trên mọi trang dịch vụ (đúng compliance)
- Scroll reveal animation nhẹ nhàng

## 🔧 Cần điền trước khi go-live (placeholder)

Tìm và thay các chỗ sau:

1. **Số điện thoại** — `tel:+84900000000` → số hotline thật (trong tất cả file)
2. **Zalo** — `https://zalo.me/` → link Zalo thật
3. **Messenger / Facebook** — `https://m.me/` và link social ở footer
4. **Địa chỉ đầy đủ** — hiện đang để "Thủ Dầu Một, Bình Dương"
5. **Ảnh thật** — thay các khối placeholder (portrait BS, case study before/after) bằng ảnh thật
6. **Form đặt lịch** — nối `#booking-form` với backend/email thật (hiện đang demo, chỉ hiện thông báo). Gợi ý: Formspree, Google Forms, hoặc Contact Form 7 nếu chuyển sang WordPress
7. **Bằng cấp** trong `about.html` — điền tên trường + chứng chỉ cụ thể
8. **Google Map** — nhúng iframe map thật vào section liên hệ

## 📈 Bước tiếp theo (theo roadmap trong brief)

- Kết nối Google Analytics 4 + Search Console
- Facebook Pixel + Conversion API
- Tạo `sitemap.xml` + `robots.txt` và submit lên Google
- Bổ sung trang Blog/Kiến thức da (SEO organic — 2 bài/tuần)
- Thêm trang Case Study đầy đủ (grid + filter theo vấn đề)

---

*Nội dung copy lấy nguyên văn từ file brief "DR_LE_HIEU_Website_Full_Copy". Ảnh minh hoạ hiện là placeholder — thay bằng hình thật của phòng khám khi go-live.*
