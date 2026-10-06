# CRM DrSkin, giai đoạn 1

Hai luồng đã dựng:

- **Luồng 1, nhận lead.** Nhận lead từ mọi nguồn, chuẩn hóa số điện thoại, chống trùng,
  tạo lead và gán tư vấn viên.
- **Luồng 4, canh hạn 2 giờ.** Cứ 15 phút quét bảng LEAD, tìm lead chưa ai gọi quá
  2 giờ làm việc, gửi cảnh báo. Đây là thứ biến lời hứa "gọi trong 2 giờ" thành
  đo được.

Bản này dùng **Google Sheets làm nơi lưu tạm** vì không tốn tiền và dựng trong ngày.
Khi anh chốt nền tảng chính thức thì đổi node Google Sheets sang node cơ sở dữ liệu,
toàn bộ phần logic trong các node Code giữ nguyên.

```
drskin/
├── workflows/01-nhan-lead.json       file import thẳng vào n8n
├── workflows/04-canh-han-2-gio.json  file import thẳng vào n8n
├── lib/chuan-hoa-sdt.js              hàm chuẩn hóa số điện thoại
├── lib/chuan-hoa-sdt.test.js         19 test
├── lib/gio-lam-viec.js               hàm đếm phút làm việc
└── lib/gio-lam-viec.test.js          42 test
```

Chạy toàn bộ test:

```bash
node drskin/lib/chuan-hoa-sdt.test.js && node drskin/lib/gio-lam-viec.test.js
```

---

## Bước 1. Tạo Google Sheet

Tạo một bảng tính tên **DrSkin CRM**, trong đó có 3 trang tính.

Tên cột phải viết **đúng từng chữ** như dưới đây, vì n8n tự khớp tên trường với tên cột.
Sai một chữ là cột đó trống.

### Trang tính `LEAD`

Dán nguyên dòng này vào ô A1:

```
lead_id	ho_ten	sdt	sdt_goc	sdt_khong_hop_le	email	nguon	ma_chien_dich	khoa_quan_tam	thoi_gian_vao	nguoi_phu_trach	thoi_gian_goi_dau	trang_thai	muc_canh_bao	ly_do_mat	khoa_dang_ky	so_tien_da_thu	lop_id	ghi_chu	tao_luc	cap_nhat_luc
```

Cột `muc_canh_bao` là của luồng 4. Luồng 4 ghi vào đó để nhớ đã cảnh báo lead nào
rồi, nhờ vậy không kêu lại mỗi 15 phút. Ba giá trị: để trống là chưa báo,
`sap_han` là đã báo sắp hết hạn, `tre_han` là đã báo trễ hạn.

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

# Luồng 4, canh hạn 2 giờ

Cứ 15 phút quét bảng LEAD. Lead nào chưa có cuộc gọi đầu mà đã chờ quá 2 giờ
**làm việc** thì gửi cảnh báo, kèm một mức báo sớm ở mốc 90 phút để còn kịp cứu.

## Vì sao phải đếm phút làm việc chứ không phải phút thường

Lead vào lúc 11 giờ đêm, nếu đếm phút thường thì 1 giờ sáng đã báo trễ hạn. Tư vấn
viên bị oan, và sau vài lần như vậy thì không ai còn đọc cảnh báo nữa. Một hệ cảnh
báo bị bỏ qua thì tệ hơn là không có.

Nên hàm `lib/gio-lam-viec.js` chỉ cộng những phút nằm trong khung giờ mở cửa, bỏ
hẳn ngày nghỉ. Lead vào 19 giờ 30, tới 8 giờ 30 sáng hôm sau mới tính được 60 phút,
chưa trễ hạn.

Luồng cũng **im hoàn toàn ngoài giờ làm việc**: không gửi và cũng không đánh dấu.
Vì không đánh dấu nên lần chạy đầu tiên sau giờ mở cửa sẽ báo lại đầy đủ, không mất
việc nào.

## Bước 1. Thêm trang tính và cột

Thêm cột `muc_canh_bao` vào bảng `LEAD` như mục trên đã nói.

## Bước 2. Nhập workflow

Import `drskin/workflows/04-canh-han-2-gio.json`. Workflow hiện ra với 10 node.

## Bước 3. Sửa giờ làm việc

Đây là việc quan trọng nhất và chỉ mất mười giây.

Mở node **Tim lead tre han**, tìm khối `GIO_LAM_VIEC` ở đầu:

```js
const GIO_LAM_VIEC = {
	mo: '08:00',
	dong: '20:00',
	ngayNghi: [],
	lechMuiGio: 7,
};
```

Em đặt tạm 8 giờ sáng tới 8 giờ tối, làm cả bảy ngày, vì spa và học viện thẩm mỹ
thường đông nhất cuối tuần. **Anh sửa lại cho đúng thực tế.**

`ngayNghi` đánh số 0 là Chủ nhật, 1 là thứ Hai, tới 6 là thứ Bảy. Để rỗng là làm
cả tuần. Nghỉ Chủ nhật thì ghi `[0]`.

Ngay dưới đó là hai ngưỡng:

```js
const HAN_PHUT = 120;        // lời hứa gọi khách trong 2 giờ làm việc
const SAP_HAN_PHUT = 90;     // báo sớm khi còn 30 phút
```

## Bước 4. Nối Google Sheets

Ba node Google Sheets cần chọn credential và bảng tính:

| Node | Trang tính | Việc |
|---|---|---|
| Doc bang LEAD | `LEAD` | đọc |
| Danh dau da canh bao | `LEAD` | cập nhật, khớp theo cột `lead_id` |
| Ghi so hoat dong | `HOAT_DONG` | thêm dòng |

Ở node **Danh dau da canh bao**, kiểm lại ô **Column to match on** đang là `lead_id`.

## Bước 5. Đặt người nhận cảnh báo

Mở node **Gui canh bao qua email**, thay `NGUOI-NHAN-CANH-BAO@vidu.com` bằng địa
chỉ thật, rồi chọn credential Gmail.

Node này đặt `onError: continueRegularOutput`, nghĩa là thiếu credential hay sai địa
chỉ thì nó bỏ qua chứ không làm sập cả luồng, phần ghi sổ bên dưới vẫn chạy. Nhờ vậy
anh lắp dần được, nhưng cũng nghĩa là **email lỗi sẽ im lặng**. Lắp xong nhớ chạy
thử một lần để chắc là tin tới được.

Mật khẩu và tài khoản anh tự nhập trong n8n. Không gửi qua chat, không lưu vào repo này.

## Bước 6. Chạy thử

Bấm **Test workflow** khi trong giờ làm việc. Để thử nhanh, sửa tạm một dòng trong
bảng `LEAD`: để trống `thoi_gian_goi_dau`, đặt `trang_thai` là `moi`, và đặt
`thoi_gian_vao` về sáng nay sớm hơn 3 tiếng.

Kết quả mong đợi: một email cảnh báo, cột `muc_canh_bao` của dòng đó thành `tre_han`,
và bảng `HOAT_DONG` có một dòng mới.

Chạy lại lần nữa ngay sau đó thì **không được** có email, vì đã đánh dấu rồi.

Xong thì bật workflow lên.

## Lead nào bị bỏ qua, có chủ ý

- Đã có `thoi_gian_goi_dau`, tức đã gọi rồi
- `trang_thai` là `da_chot`, `da_dang_ky` hoặc `mat`
- Đã được đánh dấu cảnh báo cùng mức

Lead thiếu hoặc sai cột `thoi_gian_vao` thì **không bị bỏ im**, nó vào mục
"LOI DU LIEU" trong email để có người đi sửa. Bỏ im một lead là bỏ im tiền thật.

---

## Những gì chưa làm

Luồng 2, 3, 5, 6, 7 trong đặc tả: chào khách tự động, nhắc việc tư vấn viên,
nhắc lịch hẹn, nuôi lead, báo cáo tuần.

## Giới hạn đã biết của bản Google Sheets

- Mỗi lead vào là đọc lại toàn bộ bảng `LEAD`. Dưới khoảng năm nghìn dòng thì vẫn nhanh,
  quá mức đó nên chuyển sang cơ sở dữ liệu thật.
- Hai lead vào cùng một giây có thể nhận cùng một `lead_id`. Số điện thoại vẫn là khóa
  chống trùng nên không sinh lead trùng, chỉ là mã hiển thị bị lặp.
- Google Sheets giới hạn số lần gọi API mỗi phút. Với lượng lead hiện tại thì chưa chạm.
- Luồng 4 chạy mỗi 15 phút nên mỗi giờ đọc bảng `LEAD` bốn lần. Cộng với luồng 1 thì
  vẫn còn xa hạn mức.
- Giờ làm việc trong luồng 4 là một khung cố định, chưa biết ngày lễ. Tết hay nghỉ lễ
  dài thì tạm tắt workflow, hoặc thêm ngày đó vào `ngayNghi`.
