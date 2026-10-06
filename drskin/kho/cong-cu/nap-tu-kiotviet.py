#!/usr/bin/env python3
"""
Chuyển file kết xuất hàng hóa của KiotViet thành dữ liệu cho app Kho DrSkin.

Dùng:
    python3 nap-tu-kiotviet.py DanhSachSanPham_KV....xlsx [thu-muc-ra]

Sinh ra trong thư mục ra:
    danh_muc/k01.json ... kNN.json   mỗi tập tối đa 100 mặt hàng
    phieu/TONDAUKY.json              phiếu nhập ghi tồn đầu kỳ
    phieu/TONAMDAUKY.json            phiếu xuất ghi những mặt hàng đang âm kho
    tien/TONDAUKY.json               giá vốn của phiếu đầu kỳ, chỉ quản lý đọc

Cần: pip install openpyxl

BA QUYẾT ĐỊNH TRONG FILE NÀY, ĐỌC TRƯỚC KHI SỬA
------------------------------------------------
1. Cột "ĐVT" của KiotViet KHÔNG phải đơn vị tính.
   Trong file thật nó chứa '40%', 'ck35%', '40-45%/5sp', tức chiết khấu nhà
   cung cấp. Nạp nó làm đơn vị thì app hiện "20 40%" thay vì "20 chai".
   Nên: đơn vị để trống, giá trị gốc chuyển sang ghi chú.

2. Lô và hạn sử dụng KHÔNG được nạp.
   Trong file thật, cả 65 mặt hàng có lô đều có tồn lô bằng 0, tức lô cũ đã
   dùng hết. Nạp vào sẽ tạo lô ma rồi app báo hết hạn với hàng không tồn tại.
   Cờ theo_doi_lo vẫn giữ, nên lần nhập tới app sẽ hỏi lô và hạn.

3. Vài dòng trong KiotViet không phải hàng hóa.
   'Ship hàng', 'Phụ phí', 'VAT ( thuế GTGT)' là khoản phí ai đó tạo nhầm
   thành sản phẩm. Để dang_dung=False nên chúng không tính vào tồn kho và
   không vào giá trị tồn. Thêm tên vào KHONG_PHAI_HANG nếu phát hiện thêm.
"""
import sys, os, re, json, datetime, unicodedata

try:
    import openpyxl
except ImportError:
    sys.exit('Thiếu thư viện. Chạy: pip install openpyxl')

MOI_TAP = 100   # phải khớp hằng số MOI_TAP trong kho-drskin.html

KHONG_PHAI_HANG = {'Ship hàng', 'Phụ phí', 'VAT ( thuế GTGT)'}


def ma_id(s):
    """Mã hàng thành id hợp lệ cho đường dẫn: bỏ dấu, viết hoa, chỉ giữ
    chữ số và - _ . ~ : @ +. Phải khớp hàm lamMa trong kho-drskin.html."""
    t = unicodedata.normalize('NFD', str(s)).encode('ascii', 'ignore').decode()
    t = t.upper().strip()
    return re.sub(r'[^A-Z0-9_\-.~:@+]+', '-', t).strip('-')[:60]


def num(x):
    try:
        return float(x or 0)
    except (TypeError, ValueError):
        return 0.0


def doc_file(duong_dan):
    wb = openpyxl.load_workbook(duong_dan, data_only=True)
    ws = wb[wb.sheetnames[0]]
    tieu_de = [ws.cell(1, c).value for c in range(1, ws.max_column + 1)]
    idx = {h: i for i, h in enumerate(tieu_de)}
    can = ['Mã hàng', 'Tên hàng', 'Tồn kho', 'Giá vốn', 'Giá bán']
    thieu = [c for c in can if c not in idx]
    if thieu:
        sys.exit('File thiếu cột bắt buộc: ' + ', '.join(thieu))
    rows = []
    for r in range(2, ws.max_row + 1):
        if ws.cell(r, idx['Mã hàng'] + 1).value:
            rows.append([ws.cell(r, c).value for c in range(1, ws.max_column + 1)])
    return rows, idx


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    nguon = sys.argv[1]
    ra = sys.argv[2] if len(sys.argv) > 2 else 'du-lieu'
    for t in ('danh_muc', 'phieu', 'tien'):
        os.makedirs(os.path.join(ra, t), exist_ok=True)

    rows, idx = doc_file(nguon)
    g = lambda v, k: v[idx[k]] if k in idx else None

    hang, trung = {}, []
    for v in rows:
        mid = ma_id(g(v, 'Mã hàng'))
        if not mid:
            continue
        if mid in hang:
            trung.append(mid)
            continue
        ten = str(g(v, 'Tên hàng') or '').strip()
        dvt_goc = str(g(v, 'ĐVT') or '').strip()
        nhom_day = str(g(v, 'Nhóm hàng(3 Cấp)') or '').strip()
        la_hang = ten not in KHONG_PHAI_HANG
        ghi_chu = ('Chiết khấu NCC ghi trong KiotViet: ' + dvt_goc) if dvt_goc else ''
        if not la_hang:
            ghi_chu = ('Không phải hàng hóa, là khoản phí tạo nhầm thành sản phẩm '
                       'trong KiotViet. ' + ghi_chu).strip()
        hang[mid] = {
            'body': {
                'ma': mid,
                'ten': ten,
                'dvt': '',                      # xem quyết định số 1 ở đầu file
                'nhom': nhom_day.split('>>')[0].strip() if nhom_day else '',
                'nhom_day_du': nhom_day,
                'thuong_hieu': str(g(v, 'Thương hiệu') or '').strip(),
                'gia_ban': num(g(v, 'Giá bán')),
                'ton_toi_thieu': num(g(v, 'Tồn nhỏ nhất')) if num(g(v, 'Tồn nhỏ nhất')) > 0 else 0,
                'theo_doi_lo': num(g(v, 'Quản lý lô-hạn sử dụng')) == 1,
                'dang_dung': num(g(v, 'Đang kinh doanh')) == 1 and la_hang,
                'ghi_chu': ghi_chu,
                'nguon': 'kiotviet',
            },
            'ton': num(g(v, 'Tồn kho')),
            'gia_von': num(g(v, 'Giá vốn')),
        }

    # danh mục chia thành tập
    keys = sorted(hang)
    taps = [keys[i:i + MOI_TAP] for i in range(0, len(keys), MOI_TAP)]
    for n, T in enumerate(taps, 1):
        doc = {'items': {k: hang[k]['body'] for k in T}}
        with open(f'{ra}/danh_muc/k{n:02d}.json', 'w', encoding='utf-8') as f:
            json.dump(doc, f, ensure_ascii=False)

    ngay = datetime.date.today().isoformat()
    luc = datetime.datetime.now(datetime.timezone.utc).isoformat()
    duong = [(m, x) for m, x in hang.items() if x['ton'] > 0]
    am = [(m, x) for m, x in hang.items() if x['ton'] < 0]

    with open(f'{ra}/phieu/TONDAUKY.json', 'w', encoding='utf-8') as f:
        json.dump({
            'loai': 'nhap', 'ngay': ngay, 'ly_do': 'khac',
            'lop': '', 'so_hoc_vien': 0, 'doi_tac': '',
            'ghi_chu': f'Tồn đầu kỳ chuyển từ KiotViet, kết xuất ngày {ngay}. '
                       'Một dòng cho mỗi mặt hàng còn tồn.',
            'dong': [{'ma': m, 'so_luong': x['ton'], 'lo': '', 'han_dung': ''} for m, x in duong],
            'nguoi_lap': '', 'nguoi_lap_ten': 'Nhập từ KiotViet', 'tao_luc': luc,
        }, f, ensure_ascii=False)

    with open(f'{ra}/tien/TONDAUKY.json', 'w', encoding='utf-8') as f:
        json.dump({
            'phieu_id': 'TONDAUKY',
            'gia': [(x['gia_von'] if x['gia_von'] > 0 else None) for _, x in duong],
            'tong_tien': sum(x['ton'] * x['gia_von'] for _, x in duong),
        }, f, ensure_ascii=False)

    with open(f'{ra}/phieu/TONAMDAUKY.json', 'w', encoding='utf-8') as f:
        json.dump({
            'loai': 'xuat', 'ngay': ngay, 'ly_do': 'kiem_thieu',
            'lop': '', 'so_hoc_vien': 0, 'doi_tac': '',
            'ghi_chu': 'Tồn âm chuyển nguyên trạng từ KiotViet. Âm kho nghĩa là đã '
                       'xuất mà chưa ai ghi phiếu nhập. Cần đối chiếu rồi ghi phiếu nhập bù.',
            'dong': [{'ma': m, 'so_luong': abs(x['ton']), 'lo': '', 'han_dung': ''} for m, x in am],
            'nguoi_lap': '', 'nguoi_lap_ten': 'Nhập từ KiotViet', 'tao_luc': luc,
        }, f, ensure_ascii=False)

    gtri = sum(x['ton'] * x['gia_von'] for _, x in duong)
    lon_nhat = max(os.path.getsize(f'{ra}/danh_muc/{f}') for f in os.listdir(f'{ra}/danh_muc'))
    print(f'mặt hàng        : {len(hang)}  (mã trùng bị bỏ: {len(trung)})')
    print(f'tập danh mục    : {len(taps)}  tập lớn nhất {lon_nhat/1024:.1f} KB  (giới hạn 256 KB)')
    print(f'tồn đầu kỳ      : {len(duong)} dòng,  {gtri:,.0f} đ')
    print(f'tồn âm          : {len(am)} dòng')
    print(f'ngừng kinh doanh: {sum(1 for x in hang.values() if not x["body"]["dang_dung"])}')
    print(f'\nĐã ghi vào: {os.path.abspath(ra)}')


if __name__ == '__main__':
    main()
