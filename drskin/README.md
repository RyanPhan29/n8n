# CRM DrSkin, giai đoạn 1

Luồng số 1 trong đặc tả: nhận lead từ mọi nguồn, chuẩn hóa số điện thoại, chống trùng,
tạo lead và gán tư vấn viên.

Bản này dùng **Google Sheets làm nơi lưu tạm** vì không tốn tiền và dựng trong ngày.
Khi anh chốt nền tảng chính thức thì đổi node Google Sheets sang node cơ sở dữ liệu,
toàn bộ phần logic trong các node Code giữ nguyên.

```
drskin/
├── workflows/01-nhan-lead.json   file import thẳng vào n8n
├── lib/chuan-hoa-sdt.js          hàm chuẩn hóa số điện thoại
└── lib/chuan-hoa-sdt.test.js     19 test, chạy: node drskin/lib/chuan-hoa-sdt.test.js
```

---

## Bước 1. Tạo Google Sheet

Tạo một bảng tính tên **DrSkin CRM**, trong đó có 3 trang tính.

Tên cột phải viết **đúng từng chữ** như dưới đây, vì n8n tự khớp tên trường với tên cột.
Sai một chữ là cột đó trống.

### Trang tính `LEAD`

Dán nguyên dòng này vào ô A1:

```
lead_id	ho_ten	sdt	sdt_goc	sdt_khong_hop_le	email	nguon	ma_chien_dich	khoa_quan_tam	thoi_gian_vao	nguoi_phu_trach	thoi_gian_goi_dau	trang_thai	ly_do_mat	khoa_dang_ky	so_tien_da_thu	lop_id	ghi_chu	tao_luc	cap_nhat_luc
```

### Trang tính `HOAT_DONG`

```
id	lead_id	loai	noi_dung	nguoi_thuc_hien	thoi_gian
```

### Trang tính `NHAN_VIEN`

Chưa dùng ở luồng 1, tạo sẵn cho luồng sau:

```
id	ho_ten	vai_tro	dang_lam_viec
```

**Định dạng cột `sdt`:** bôi đen cột C của trang `LEAD`, chọn Định dạng, Số, Văn bản thuần.
Không làm bước này thì Google Sheets sẽ ăn mất số 0 ở đầu, biến `0905123456` thành `905123456`.

---

## Bước 2. Nhập workflow vào n8n

1. Mở n8n, bấm **Import from File**
2. Chọn `drskin/workflows/01-nhan-lead.json`
3. Workflow hiện ra với 8 node

## Bước 3. Nối tài khoản Google

Có 3 node Google Sheets: **Doc bang LEAD**, **Them dong LEAD**, **Ghi khach quay lai**.

Với từng node:
1. Chọn hoặc tạo Credential Google Sheets
2. Ở ô **Document**, chọn bảng tính DrSkin CRM
3. Ở ô **Sheet**, chọn đúng trang tính: hai node đầu trỏ `LEAD`, node cuối trỏ `HOAT_DONG`

Mật khẩu và tài khoản anh tự nhập trong n8n. Không gửi qua chat, không lưu vào repo này.

## Bước 4. Sửa danh sách tư vấn viên

Mở node **Chong trung va gan tu van vien**, sửa dòng đầu:

```js
const TU_VAN_VIEN = ['Tu van vien A', 'Tu van vien B', 'Tu van vien C', 'Tu van vien D'];
```

Thay bằng tên thật. Hệ thống chia lead luân phiên theo đúng thứ tự trong danh sách này.

## Bước 5. Chạy thử

Bật workflow, lấy Production URL của node Webhook, rồi gửi thử:

```bash
curl -X POST 'https://n8n-cua-anh/webhook/drskin-lead' \
  -H 'Content-Type: application/json' \
  -d '{"ho_ten":"Chị Lan","sdt":"0905 123 456","nguon":"facebook_ads","khoa_quan_tam":"mun"}'
```

Kết quả mong đợi: một dòng mới trong trang `LEAD`, số điện thoại đã thành `0905123456`,
trạng thái `moi`, có tên tư vấn viên.

Gửi lại **cùng số đó nhưng viết khác dạng** để thử chống trùng:

```bash
curl -X POST 'https://n8n-cua-anh/webhook/drskin-lead' \
  -H 'Content-Type: application/json' \
  -d '{"ho_ten":"Lan","sdt":"+84 905 123 456","nguon":"zalo_oa"}'
```

Lần này **không được** có dòng mới trong `LEAD`. Thay vào đó `HOAT_DONG` có một dòng
ghi khách quay lại.

---

## Nối các nguồn lead vào

Mọi nguồn chỉ cần gửi POST tới webhook đó với các trường sau:

| Trường | Bắt buộc | Ghi chú |
|---|---|---|
| `sdt` | có | Gõ kiểu gì cũng được, hệ thống tự chuẩn hóa |
| `ho_ten` | không | Thiếu thì ghi "Chua ro ten" |
| `nguon` | nên có | Một trong: `facebook_ads`, `zalo_oa`, `website`, `trang_tour`, `tiktok`, `hotline`, `gioi_thieu`, `khac` |
| `ma_chien_dich` | không | Lấy từ Facebook, để sau này tính chi phí mỗi lead |
| `khoa_quan_tam` | không | Mã khóa theo bảng giá |
| `email`, `ghi_chu` | không | |

Node **Chuan hoa du lieu** đã nhận sẵn vài tên tiếng Anh thường gặp như `phone`,
`full_name`, `source`, `campaign_id`. Nguồn nào gửi tên khác thì thêm vào phần
đánh dấu `ANH XA TEN TRUONG` trong node đó.

---

## Những gì chưa làm

Luồng 2 tới 7 trong đặc tả chưa dựng: chào khách tự động, nhắc việc tư vấn viên,
canh hạn 2 giờ, nhắc lịch hẹn, nuôi lead, báo cáo tuần.

Ưu tiên làm tiếp **luồng 4, canh hạn 2 giờ**, vì nó là thứ biến lời hứa "gọi trong
2 giờ" thành đo được.

## Giới hạn đã biết của bản Google Sheets

- Mỗi lead vào là đọc lại toàn bộ bảng `LEAD`. Dưới khoảng năm nghìn dòng thì vẫn nhanh,
  quá mức đó nên chuyển sang cơ sở dữ liệu thật.
- Hai lead vào cùng một giây có thể nhận cùng một `lead_id`. Số điện thoại vẫn là khóa
  chống trùng nên không sinh lead trùng, chỉ là mã hiển thị bị lặp.
- Google Sheets giới hạn số lần gọi API mỗi phút. Với lượng lead hiện tại thì chưa chạm.
