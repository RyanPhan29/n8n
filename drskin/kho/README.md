# Kho DrSkin, hồ sơ bàn giao

App quản lý kho vật tư cho cơ sở DrSkin. Thay phần quản lý kho của KiotViet.

**Bản đang chạy:** https://claude.ai/artifact/NBqUzKfnuQDHrePdtCtcAs

```
kho-drskin.html              toàn bộ app, một file, không build, không phụ thuộc gói nào
du-lieu/                     kết xuất dữ liệu sống tại thời điểm bàn giao
  danh_muc/k01..k21.json       2.026 mặt hàng, mỗi tập 100
  phieu/TONDAUKY.json          tồn đầu kỳ, 221 dòng
  phieu/TONAMDAUKY.json        tồn âm, 11 dòng
  tien/TONDAUKY.json           giá vốn phiếu đầu kỳ (dữ liệu nhạy cảm)
cong-cu/
  nap-tu-kiotviet.py           đổi file xlsx của KiotViet thành dữ liệu app
  test-tinh-ton.js             42 test cho phần tính tồn kho
```

---

## 1. App chạy trên nền nào

Đây là **Artifact của claude.ai**. Không phải web tĩnh thông thường. Nó gọi hai
thứ mà chỉ nền tảng claude.ai cung cấp:

- `claude.use('db')` để lưu dữ liệu dùng chung
- `claude.use('user')` để biết ai đang mở và người đó quyền gì

**Mở file `kho-drskin.html` bằng trình duyệt thì giao diện hiện ra nhưng không
có dữ liệu.** Đó là đúng, không phải lỗi. `claude.use` không tồn tại ngoài
claude.ai nên app hiện màn "Chưa mở được kho".

Hai hướng đi tiếp, chọn một:

**Hướng A, giữ nguyên nền tảng.** Sửa file rồi đăng lại cùng URL. Cần tài khoản
claude.ai có quyền trên artifact này. Nhanh nhất, không tốn hạ tầng.

**Hướng B, chuyển sang hạ tầng riêng.** Phần chạm vào cơ sở dữ liệu rất nhỏ và
nằm gọn, xem mục 4. Đổi sang Supabase, Firebase hay API tự viết là việc của một
người trong một hai ngày. Đổi lại phải tự lo đăng nhập và phân quyền.

### Nếu đi hướng A, luật truy cập khai ở đâu

Luật **không nằm trong file HTML**. Nó khai lúc đăng, kèm theo bản đăng:

```json
{
  "user": { "scopes": ["profile"] },
  "db": { "rules": [
    { "path": "danh_muc", "read": "view",  "write": "admin"    },
    { "path": "phieu",    "read": "view",  "write": "interact" },
    { "path": "tien",     "read": "admin", "write": "admin"    }
  ]}
}
```

Đăng lại mà quên khai phần này thì **luật cũ vẫn giữ nguyên**, nhưng nếu khai
một bộ luật mới thì nó thay toàn bộ bộ cũ. Sai một dòng ở đây là lộ giá vốn.

---

## 2. Dữ liệu được tổ chức thế nào

Ba nhánh, mỗi nhánh một mức quyền khác nhau.

### `danh_muc/kNN` — danh mục hàng hóa

Ai đọc cũng được, chỉ quản lý sửa. Mỗi bản ghi chứa tối đa **100** mặt hàng:

```json
{ "items": {
    "SP000056": {
      "ma": "SP000056",
      "ten": "Akicare Cream 30ml- kem dưỡng cho da mụn",
      "dvt": "",
      "nhom": "Kem dưỡng",
      "nhom_day_du": "Kem dưỡng>>Kem dưỡng da mụn",
      "thuong_hieu": "",
      "gia_ban": 450000,
      "ton_toi_thieu": 0,
      "theo_doi_lo": false,
      "dang_dung": true,
      "ghi_chu": "Chiết khấu NCC ghi trong KiotViet: 40%",
      "nguon": "kiotviet"
    }
}}
```

**Vì sao gom thành tập chứ không mỗi mặt hàng một bản ghi.** 2.026 bản ghi rời
thì trình duyệt phải tải 2.026 bản ghi mỗi lần mở, và nạp lần đầu mất 41 lượt
ghi. Gom lại còn 21 bản ghi.

**Cái giá phải trả, phải biết.** Hai người cùng sửa hai mặt hàng **trong cùng
một tập** trong vài giây thì một người bị ghi đè, lặng lẽ. Hàm `luuVaoTap` đã
đọc lại tập ngay trước khi ghi để thu hẹp khoảng đó, nhưng không khử hết. Chấp
nhận được vì danh mục chỉ quản lý sửa và sửa rất ít. **Nếu sau này có nhiều
người cùng quản danh mục thì phải tách lại thành mỗi mặt hàng một bản ghi.**

Hằng số `MOI_TAP = 100` trong `kho-drskin.html` phải khớp `MOI_TAP` trong
`nap-tu-kiotviet.py`.

### `phieu/{id}` — phiếu nhập và xuất

Ai đọc cũng được, nhân viên ghi được. **Mỗi phiếu một bản ghi**, không gom, vì
đây là chỗ nhiều người ghi cùng lúc.

```json
{
  "loai": "xuat",
  "ngay": "2026-10-06",
  "ly_do": "thuc_hanh",
  "lop": "Mụn K12",
  "so_hoc_vien": 10,
  "doi_tac": "",
  "ghi_chu": "",
  "dong": [{ "ma": "SP000056", "so_luong": 4, "lo": "", "han_dung": "" }],
  "nguoi_lap": "u_...", "nguoi_lap_ten": "Mai",
  "tao_luc": "2026-10-06T02:00:00Z"
}
```

Lý do nhập: `mua`, `tra_lai`, `kiem_thua`, `khac`.
Lý do xuất: `thuc_hanh`, `dich_vu`, `ban`, `hong_huy`, `tra_ncc`, `kiem_thieu`, `khac`.

`ly_do = "thuc_hanh"` **bắt buộc** có `lop` và `so_hoc_vien`. Đây là cách duy
nhất tính được tiêu hao mỗi học viên, và là lý do chính để tự làm app thay vì
mua phần mềm bán lẻ.

### `tien/{id}` — tiền, trùng id với phiếu

**Chỉ quản lý đọc được.** Mức đọc đặt là `admin` nên người dưới mức đó đọc ra
rỗng, kể cả khi họ mở mã nguồn trang. Đã kiểm thật: ghi một bản ghi rồi đọc lại
ở ba mức, mức `interact` và `view` đều thấy trống.

```json
{ "phieu_id": "TONDAUKY", "gia": [420000, null, 15000], "tong_tien": 1324433805 }
```

`gia` là mảng **khớp theo thứ tự** với `dong` của phiếu cùng id. `null` nghĩa là
chưa điền giá.

**Vì sao tách tiền ra khỏi phiếu.** Nếu để đơn giá nhập ngay trong phiếu thì
nhân viên đọc phiếu là biết giá vốn. Tách ra mới giấu được thật. Nhân viên ghi
số lượng nhận hàng, quản lý điền giá sau. Đó cũng là một chốt kiểm soát.

---

## 3. Tồn kho tính thế nào

**Không lưu con số tồn ở đâu cả.** Mỗi lần vẽ lại, hàm `tinhTon()` chạy qua toàn
bộ phiếu, cộng phiếu nhập trừ phiếu xuất. Chậm hơn chút nhưng **không bao giờ
lệch**, vì không có con số đếm nào để sai.

Hệ quả: muốn sửa tồn kho thì sửa phiếu, không có chỗ nào gõ thẳng số tồn.

**Tồn âm được hiện ra chứ không giấu.** Âm nghĩa là có người quên ghi phiếu
nhập. App hiện chữ "Âm kho, thiếu phiếu nhập", khác hẳn "Hết hàng".

**Giới hạn.** Dưới khoảng 2.000 phiếu thì nhanh. App tự hiện cảnh báo khi vượt
mức đó. Lúc ấy cần làm tính năng chốt kỳ: gộp phiếu cũ thành một phiếu tồn đầu
kỳ mới rồi xóa phiếu cũ. **Chưa làm.**

---

## 4. Chỗ chạm vào cơ sở dữ liệu, cho ai muốn đổi nền tảng

Toàn bộ nằm ở đây, không chỗ nào khác:

| Chỗ | Việc |
|---|---|
| cuối file, khối khởi động | `claude.use('db')`, `claude.use('user')` |
| cùng chỗ | `db.collection('danh_muc' / 'phieu' / 'tien').onSnapshot(...)` |
| `luuVaoTap()` | `doc('danh_muc/kNN').get()` rồi `.set()` |
| `suaHang()` lúc lưu | gọi `luuVaoTap()` |
| `soanPhieu()` lúc lưu | `doc('phieu/'+id).set()`, `doc('tien/'+id).set()` |
| `dienGia()` | `doc('tien/'+id).set()` |
| `xemPhieu()` nút Xóa | `doc('phieu/'+id).delete()`, `doc('tien/'+id).delete()` |

Ba quyền đọc từ `user`: `canEdit()` là quản lý, `can('data.write')` là ghi được
phiếu, `me()` lấy tên người lập.

Thay bảy chỗ đó là chạy được trên hạ tầng khác. Phần còn lại của file không biết
gì về nơi lưu dữ liệu.

---

## 5. Công cụ nạp lại từ KiotViet

```bash
pip install openpyxl
python3 cong-cu/nap-tu-kiotviet.py DanhSachSanPham_KV....xlsx du-lieu-moi
```

Script đã chạy đối chiếu: sinh ra đúng từng byte so với dữ liệu đang chạy trên
app. Ba quyết định quan trọng trong script được ghi rõ ở đầu file, **đọc trước
khi sửa**:

1. Cột `ĐVT` của KiotViet không phải đơn vị tính, nó chứa chiết khấu nhà cung
   cấp (`40%`, `ck35%`, `40-45%/5sp`). Không nạp làm đơn vị.
2. Lô và hạn sử dụng không nạp, vì mọi lô trong file đều có tồn bằng 0.
3. Ba dòng `Ship hàng`, `Phụ phí`, `VAT ( thuế GTGT)` không phải hàng hóa.

---

## 6. Test

```bash
node cong-cu/test-tinh-ton.js      # 42 test, chạy không cần cài gì
```

Phủ: cộng trừ tồn, tồn âm, tồn theo lô, cảnh báo hạn, xuất hết lô thì tắt cảnh
báo, tiêu hao mỗi học viên, loại phiếu hỏng hủy khỏi phép tính tiêu hao, làm mã
hàng an toàn cho đường dẫn, đếm ngày tới hạn, và kho rỗng.

Test nạp thẳng phần script trong file HTML bằng DOM giả lập, nên nó kiểm đúng
mã đang chạy chứ không kiểm một bản sao.

---

## 7. Hiện trạng dữ liệu, ba chỗ cần người xử lý

**Chỉ 9 trên 2.026 mặt hàng có định mức tồn tối thiểu.** Nên app chỉ báo được 1
mặt hàng sắp hết. Đây là việc đáng làm nhất và rẻ nhất: chọn khoảng 30 thứ hay
hết nhất rồi đặt định mức.

**11 mặt hàng tồn âm**, phần lớn là kim: Kim 27G âm 25, Kim 30G âm 7, Canula âm
5, Túi rác âm 430. Cần đối chiếu rồi ghi phiếu nhập bù.

**1.794 trên 2.026 mặt hàng tồn bằng 0**, nhiều cái tạo từ 2021. Màn Tồn kho mặc
định chỉ hiện hàng còn tồn. Nếu rà lại thấy nhiều cái bỏ hẳn thì đặt
`dang_dung: false` cho gọn danh mục.

**Giá trị tồn app hiện là 1.299.285.458 đ**, file KiotViet ghi 1.324.433.805 đ.
Chênh đúng 25.148.347 đ là dòng `Ship hàng`. Số của app đúng hơn, vì tiền ship
không phải hàng tồn kho.

---

## 8. Đã làm và chưa làm

**Đã làm**

- Tồn kho theo mặt hàng và theo lô, cảnh báo sắp hết, âm kho, sắp hết hạn, hết hạn
- Phiếu nhập và xuất, bảy lý do xuất, ô chọn hàng có tìm kiếm
- Gợi ý xuất lô hết hạn trước
- Tiêu hao mỗi học viên theo mặt hàng và theo lớp
- Phân quyền ba mức, giấu giá vốn ở phía máy chủ
- Giao diện điện thoại, chủ đề sáng và tối

**Chưa làm**

- **Sổ quỹ và báo cáo dòng tiền.** Có trong yêu cầu ban đầu, tách ra để làm kho
  trước. Nhánh `tien` đã sẵn và đã chặn quyền đúng, nối thêm thu chi vào đó được.
- **Chốt kỳ.** Cần khi vượt khoảng 2.000 phiếu.
- **Kiểm kho.** Hiện phải ghi tay phiếu `kiem_thua` hoặc `kiem_thieu`.
- **Đơn vị tính.** Đang trống toàn bộ vì dữ liệu nguồn không có. Số lượng hiện ra
  không kèm đơn vị. Cần người điền, hoặc nạp từ một nguồn khác.
- **Nhà cung cấp.** Hiện là ô chữ tự do trong phiếu, chưa thành danh mục riêng.
- **Xuất file.** Artifact không cho trang tự tải file xuống, nên muốn xuất Excel
  thì phải đọc dữ liệu từ ngoài vào.
- **Chuyển phiếu nhập xuất cũ từ KiotViet.** Mới chuyển tồn đầu kỳ, chưa chuyển
  lịch sử. Lấy được khi tài khoản KiotViet còn hạn, sau đó thì mất.

---

## 9. Một điều quan trọng hơn phần mềm

App chỉ chứa thứ người ta nhập vào. Nếu cuối mỗi buổi thực hành không ai ghi
phiếu xuất thì app này vô dụng y như KiotViet. Khác biệt là thao tác ghi chỉ mất
khoảng hai mươi giây trên điện thoại.

Thước đo nên theo dõi trong tháng đầu: **số buổi thực hành có ghi phiếu chia cho
tổng số buổi đã dạy**. Dưới tám phần mười thì vấn đề nằm ở quy trình, không phải
ở phần mềm, và sửa phần mềm sẽ không cứu được.
