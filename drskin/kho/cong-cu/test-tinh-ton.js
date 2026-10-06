/** Chạy thử phần tính tồn kho và tiêu hao bằng DOM giả lập. */
const fs = require('fs');
const path = require('path');
const DIR = __dirname;

// ---- DOM giả, vừa đủ để script nạp được ----
function node(tag) {
  const n = {
    tagName: tag, children: [], attrs: {}, _txt: '', hidden: false,
    style: {}, dataset: {}, classList: { add(){}, remove(){} },
    set textContent(v){ this._txt = String(v); },
    get textContent(){ return this._txt; },
    set className(v){ this.attrs.class = v; },
    get firstChild(){ return this.children[0] || null; },
    append(...k){ for (const c of k) if (c!==null && c!==undefined && c!==false) this.children.push(c); },
    replaceChildren(...k){ this.children = k.filter(c=>c!==null&&c!==undefined&&c!==false); },
    setAttribute(k,v){ this.attrs[k]=v; },
    addEventListener(){}, removeEventListener(){},
    closest(){ return null; }, scrollTo(){}, scrollIntoView(){}, focus(){},
    querySelector(){ return node('div'); },
  };
  return n;
}
const stash = {};
global.document = {
  createElement: node,
  querySelector(sel){ if (!stash[sel]) stash[sel] = node('div'); return stash[sel]; },
  addEventListener(){},
  body: node('body'),
};
global.window = { claude: null };

// ---- nạp script của trang ----
const html = fs.readFileSync(path.join(DIR,'..','kho-drskin.html'),'utf8');
const src = /<script>([\s\S]*)<\/script>/.exec(html)[1];
// bỏ khối khởi động async cuối (nó gọi claude.use) để test chỉ chạy phần thuần
const cut = src.indexOf('(async ()=>{');
const code = src.slice(0, cut);
const mod = {};
new Function('module','exports', code + '\nmodule.exports={S,tinhTon,trangThaiTon,canhBaoHan,lamMa,soNgayToi,ngayVN,so};')(mod, {});
const { S, tinhTon, trangThaiTon, canhBaoHan, lamMa, soNgayToi } = mod.exports;

let pass = 0, fail = 0;
const ok = (dk, moTa, them='') => {
  console.log(`${dk ? 'ĐÚNG' : 'SAI '}  ${moTa}${them ? '  ' + them : ''}`);
  dk ? pass++ : fail++;
};

// ---- dữ liệu thử ----
const d = (n) => { const x = new Date(); x.setDate(x.getDate()+n); return x.toLocaleDateString('en-CA'); };

S.hang.set('SR-HA', { ma:'SR-HA', ten:'Serum HA 30ml', dvt:'chai', ton_toi_thieu:5, theo_doi_lo:true });
S.hang.set('KIM-VV',{ ma:'KIM-VV',ten:'Kim vi kim 12 chân', dvt:'cái', ton_toi_thieu:20, theo_doi_lo:false });
S.hang.set('GANG',  { ma:'GANG',  ten:'Găng tay nitrile', dvt:'đôi', ton_toi_thieu:100, theo_doi_lo:false });
S.hang.set('TE',    { ma:'TE',    ten:'Thuốc tê bôi', dvt:'tuýp', ton_toi_thieu:3, theo_doi_lo:true });

S.phieu.set('N1', { loai:'nhap', ngay:'2026-09-01', ly_do:'mua', dong:[
  { ma:'SR-HA', so_luong:20, lo:'L-A', han_dung:d(200) },
  { ma:'KIM-VV',so_luong:100 },
  { ma:'GANG',  so_luong:500 },
]});
S.phieu.set('N2', { loai:'nhap', ngay:'2026-09-10', ly_do:'mua', dong:[
  { ma:'SR-HA', so_luong:10, lo:'L-B', han_dung:d(10) },   // sắp hết hạn
  { ma:'TE',    so_luong:6,  lo:'T-1', han_dung:d(-5) },   // đã hết hạn
]});
S.phieu.set('X1', { loai:'xuat', ngay:'2026-09-15', ly_do:'thuc_hanh', lop:'Mụn K12', so_hoc_vien:10, dong:[
  { ma:'SR-HA', so_luong:4, lo:'L-A', han_dung:d(200) },
  { ma:'KIM-VV',so_luong:40 },
  { ma:'GANG',  so_luong:200 },
]});
S.phieu.set('X2', { loai:'xuat', ngay:'2026-09-20', ly_do:'thuc_hanh', lop:'DMP K7', so_hoc_vien:8, dong:[
  { ma:'SR-HA', so_luong:6, lo:'L-A', han_dung:d(200) },
  { ma:'KIM-VV',so_luong:64 },   // tốn nhiều hơn mỗi học viên
]});
S.phieu.set('X3', { loai:'xuat', ngay:'2026-09-22', ly_do:'hong_huy', dong:[
  { ma:'GANG', so_luong:300 },   // đẩy găng về 0
]});

console.log('--- Tồn kho ---');
const { ton, lo } = tinhTon();
ok(ton.get('SR-HA') === 20, 'SR-HA: nhập 20+10, xuất 4+6 → 20', `nhận ${ton.get('SR-HA')}`);
ok(ton.get('KIM-VV') === -4, 'KIM-VV: nhập 100, xuất 40+64 → -4 (xuất quá tồn, phải hiện số âm chứ không im)', `nhận ${ton.get('KIM-VV')}`);
ok(ton.get('GANG') === 0, 'GANG: nhập 500, xuất 200+300 → 0', `nhận ${ton.get('GANG')}`);
ok(ton.get('TE') === 6, 'TE: nhập 6, chưa xuất → 6', `nhận ${ton.get('TE')}`);

console.log('\n--- Trạng thái tồn ---');
ok(trangThaiTon('GANG', 0).k === 'c', 'tồn 0 → hết hàng');
ok(trangThaiTon('KIM-VV', -4).k === 'c', 'tồn âm → hết hàng');
ok(trangThaiTon('SR-HA', 5).k === 'w', 'tồn bằng đúng định mức 5 → sắp hết');
ok(trangThaiTon('SR-HA', 4).k === 'w', 'tồn dưới định mức → sắp hết');
ok(trangThaiTon('SR-HA', 20).k === 'ok', 'tồn trên định mức → đủ');
ok(trangThaiTon('KIM-VV', 25).k === 'ok', 'trên định mức 20 → đủ');

console.log('\n--- Tồn theo lô ---');
const loSR = lo.get('SR-HA');
const lA = [...loSR.values()].find(x=>x.lo==='L-A');
const lB = [...loSR.values()].find(x=>x.lo==='L-B');
ok(lA && lA.sl === 10, 'lô L-A: nhập 20, xuất 4+6 → 10', `nhận ${lA && lA.sl}`);
ok(lB && lB.sl === 10, 'lô L-B: nhập 10, chưa xuất → 10', `nhận ${lB && lB.sl}`);
ok(lA.sl + lB.sl === ton.get('SR-HA'), 'tổng các lô khớp tổng tồn');

console.log('\n--- Cảnh báo hạn dùng ---');
const cbSR = canhBaoHan('SR-HA', lo);
ok(cbSR && cbSR.k === 'w', 'SR-HA có lô còn 10 ngày → cảnh báo vàng', cbSR ? cbSR.t : 'không có');
ok(cbSR && cbSR.lo === 'L-B', 'cảnh báo chỉ đúng lô gần hạn nhất', cbSR ? cbSR.lo : '');
const cbTE = canhBaoHan('TE', lo);
ok(cbTE && cbTE.k === 'c', 'TE đã quá hạn → cảnh báo đỏ', cbTE ? cbTE.t : 'không có');
ok(canhBaoHan('KIM-VV', lo) === null, 'hàng không theo lô → không cảnh báo hạn');

console.log('\n--- Lô đã xuất hết thì thôi cảnh báo ---');
S.phieu.set('X4', { loai:'xuat', ngay:'2026-09-25', ly_do:'hong_huy', dong:[
  { ma:'SR-HA', so_luong:10, lo:'L-B', han_dung:d(10) },
]});
const r2 = tinhTon();
ok(canhBaoHan('SR-HA', r2.lo) === null, 'xuất hết lô L-B sắp hạn → hết cảnh báo cho SR-HA');
ok(r2.ton.get('SR-HA') === 10, 'tồn SR-HA còn 10 sau khi hủy lô B', `nhận ${r2.ton.get('SR-HA')}`);
S.phieu.delete('X4');

console.log('\n--- Tiêu hao mỗi học viên ---');
// lặp lại đúng phép tính trong màn báo cáo
const phieuTH = [...S.phieu.values()].filter(p=> p.loai==='xuat' && p.ly_do==='thuc_hanh' && Number(p.so_hoc_vien)>0);
const theoHang = new Map();
for (const p of phieuTH) {
  const hv = Number(p.so_hoc_vien)||0;
  for (const dg of (p.dong||[])) {
    const x = theoHang.get(dg.ma) || {sl:0, hv:0};
    x.sl += Number(dg.so_luong)||0; x.hv += hv;
    theoHang.set(dg.ma, x);
  }
}
const sr = theoHang.get('SR-HA');
ok(sr.sl === 10 && sr.hv === 18, 'SR-HA dùng trong 2 buổi: 4+6=10 chai, 10+8=18 lượt HV', `nhận ${sr.sl}/${sr.hv}`);
ok(Math.abs(sr.sl/sr.hv - 0.5556) < 0.001, 'mỗi học viên khoảng 0,556 chai', `nhận ${(sr.sl/sr.hv).toFixed(4)}`);
const gg = theoHang.get('GANG');
ok(gg.sl === 200 && gg.hv === 10, 'GANG chỉ dùng ở buổi K12 nên chỉ tính 10 lượt HV, không tính 18', `nhận ${gg.sl}/${gg.hv}`);
ok(!theoHang.has('TE'), 'TE chưa dùng cho thực hành → không có trong báo cáo');
const kv = theoHang.get('KIM-VV');
ok(Math.abs(kv.sl/kv.hv - 104/18) < 1e-9, 'KIM-VV: 104 cái / 18 lượt HV', `nhận ${(kv.sl/kv.hv).toFixed(3)}`);

console.log('\n--- Phiếu hủy không được tính vào tiêu hao học viên ---');
ok(!phieuTH.some(p=>p.ly_do==='hong_huy'), 'phiếu hỏng hủy bị loại khỏi phép tính tiêu hao');
ok(phieuTH.length === 2, 'chỉ 2 buổi thực hành được tính', `nhận ${phieuTH.length}`);

console.log('\n--- Làm mã hàng an toàn cho đường dẫn ---');
const ma = [
  ['Serum HA 30ml', 'SERUM-HA-30ML'],
  ['sr-ha-30', 'SR-HA-30'],
  ['Thuốc tê', 'THUOC-TE'],
  ['Đầu máy Hydra', 'DAU-MAY-HYDRA'],
  ['kim  vi   kim', 'KIM-VI-KIM'],
  ['  -A/B\\C-  ', 'A-B-C'],
  ['mụn/đỏ', 'MUN-DO'],
  ['', ''],
];
for (const [vao, ra] of ma) ok(lamMa(vao) === ra, `"${vao}" → ${lamMa(vao)}`, lamMa(vao)===ra?'':`mong ${ra}`);
ok(!/[^A-Z0-9_\-.~:@+]/.test(lamMa('Serum HA 30ml đặc trị')), 'mã sinh ra chỉ chứa ký tự đường dẫn cho phép');

console.log('\n--- Đếm ngày tới hạn ---');
ok(soNgayToi(d(0)) === 0, 'hạn hôm nay → 0 ngày');
ok(soNgayToi(d(7)) === 7, 'hạn sau 7 ngày → 7');
ok(soNgayToi(d(-3)) === -3, 'hạn quá 3 ngày → -3');
ok(soNgayToi('') === null, 'chuỗi rỗng → null');
ok(soNgayToi(null) === null, 'null → null');
ok(soNgayToi('khong phai ngay') === null, 'chuỗi rác → null');

console.log('\n--- Kho rỗng ---');
const S2 = { hang:new Map(), phieu:new Map() };
S.phieu.clear();
const r3 = tinhTon();
ok(r3.ton.size === 0 && r3.lo.size === 0, 'không có phiếu → tồn rỗng, không vỡ');

console.log(`\n================ ${pass} đúng, ${fail} sai ================`);
process.exit(fail === 0 ? 0 : 1);
