// WF#5 — Parse XLSX v3 (mapping chuẩn theo cấu trúc thật của file BC Tài chính)
// Dán đè vào node "Parse XLSX" trong WF#5 v2. Cần env NODE_FUNCTION_ALLOW_EXTERNAL=xlsx
// Mapping:
//   Tiền vào (tongVao)      = B3  (= H1 vào NH + M1 vào TM)
//   TK Phòng Khám đầu/cuối  = B18 (két cũ) / B22 (tiền mặt còn lại cuối ngày)
//   TK CTY đầu/cuối         = B17 ngày trước / B17 (tiền mặt gửi quản lý cầm hộ)
//   Tiền ra thật (tongRa)   = tổng chi TRỪ chuyển nội bộ (mã CTD* hoặc note "chuyển/rút")
const XLSX = require('xlsx');
const buf = await this.helpers.getBinaryDataBuffer(0, 'data');
const wb = XLSX.read(buf, { type: 'buffer', cellDates: false });

const num = (v) => { if (v==null||v==='') return 0; if (typeof v==='number') return v; const n=parseFloat(String(v).replace(/[^0-9.-]/g,'')); return isNaN(n)?0:n; };
const gc = (s, r) => { const c = s[r]; return c ? c.v : null; };
function parseSheetDate(sn){ const s=(sn||'').trim(); if(s.toUpperCase().includes('TỔNG')||s.toUpperCase().includes('TONG')) return null; const m=s.match(/^(\d{1,2})(\d)$/); if(!m) return null; const day=parseInt(m[1],10),month=parseInt(m[2],10); if(day<1||day>31||month<1||month>12) return null; return {day,month,iso:`2026-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`}; }
function hashRow(...p){ const str=p.map(x=>String(x??'')).join('|'); let h=0; for(let i=0;i<str.length;i++){h=((h<<5)-h)+str.charCodeAt(i); h|=0;} return Math.abs(h).toString(36); }

// Phân loại chi: ƯU TIÊN mã giao dịch, rồi mới tới note (note hay ghi sai)
function mapCat(code, note){
  const c=String(code||'').toUpperCase().trim();
  const n=String(note||'').toLowerCase();
  if (c.startsWith('CTD')) return 'Chuyển-Rút';                 // CTD_TTM = nộp tiền mặt lên NH
  if (n.includes('chuyển')||n.includes('rút')||n.includes('chuyen')||n.includes('rut')) return 'Chuyển-Rút';
  if (n.includes('lương')||n.includes('luong')) return 'Lương NV';
  if (n.includes('thuê')||n.includes('thue nha')) return 'Thuê nhà';
  if (n.includes('điện')||n.includes('nước')||n.includes('mạng')||n.includes('rác')) return 'Điện nước';
  if (n.includes('vật tư')||n.includes('vat tu')) return 'Vật tư';
  if (n.includes('bảo hiểm')||n.includes('bao hiem')) return 'Bảo hiểm';
  if (n.includes('fb ads')||n.includes('gg ads')||n.includes('quảng cáo')||n.includes('ads')) return 'Quảng cáo';
  if (n.includes('ncc')||n.includes('nhà cung cấp')) return 'Mua hàng NCC';
  if (n.includes('ship')) return 'Vận chuyển';
  if (n.includes('hoàn')||n.includes('hoan')) return 'Hoàn KH';
  return 'Khác';
}

const days=[];
for (const sn of wb.SheetNames){ const d=parseSheetDate(sn); if(d) days.push({sn,d}); }
days.sort((a,b)=> (a.d.month-b.d.month) || (a.d.day-b.d.day));

const cashRecords=[], leadRecords=[], expenseRecords=[], revenueRecords=[];
const allISO=[];
let prevCTY=0;
for (const {sn,d} of days){
  const ws=wb.Sheets[sn]; if(!ws) continue;
  allISO.push(d.iso);
  const ngayText=`${String(d.day).padStart(2,'0')}/${String(d.month).padStart(2,'0')}/2026`;
  const B3=num(gc(ws,'B3'));
  const B17=num(gc(ws,'B17')), B18=num(gc(ws,'B18')), B22=num(gc(ws,'B22'));

  // ---- Chi tiêu (tách chuyển nội bộ) ----
  let tongRaThuc=0;
  for (let r=14;r<=26;r++){
    const a=num(gc(ws,`H${r}`));
    if (a>0){
      const code=gc(ws,`I${r}`), note=gc(ws,`J${r}`), cat=mapCat(code,note);
      if (cat!=='Chuyển-Rút') tongRaThuc+=a;
      expenseRecords.push({ mota:`${cat} ${d.iso} #${r}-NH`, ngayISO:d.iso, hangMuc:cat, soTien:a, phuongThuc:'Chuyển khoản', taiKhoan:'TK Phòng Khám', ghiChu:String(note||'').trim(), hash:hashRow(d.iso,'NH',r,a,code,note) });
    }
    const a2=num(gc(ws,`M${r}`));
    if (a2>0){
      const code=gc(ws,`N${r}`), note=gc(ws,`O${r}`), note2=gc(ws,`P${r}`), cat=mapCat(code,note);
      const ghi=[note,note2].filter(Boolean).map(s=>String(s).trim()).join(' | ');
      if (cat!=='Chuyển-Rút') tongRaThuc+=a2;
      expenseRecords.push({ mota:`${cat} ${d.iso} #${r}-TM`, ngayISO:d.iso, hangMuc:cat, soTien:a2, phuongThuc:'Tiền mặt', taiKhoan:'TK Phòng Khám', ghiChu:ghi, hash:hashRow(d.iso,'TM',r,a2,code,note) });
    }
  }

  // ---- Cash position (mapping chuẩn) ----
  cashRecords.push({ ngayText, ngayISO:d.iso, tkPKDau:B18, tkPKCuoi:B22, tkCTYDau:prevCTY, tkCTYCuoi:B17, tongVao:B3, tongRa:tongRaThuc });
  prevCTY=B17;

  // ---- Revenue ----
  const rDT=num(gc(ws,'C5')), rDV=num(gc(ws,'C6'));
  if (rDT>0) revenueRecords.push({ mota:`Khóa học ${d.iso}`, ngayISO:d.iso, sale:'Chung', loai:'Khóa học', soTien:rDT, hash:hashRow(d.iso,'REV','DT',rDT) });
  if (rDV>0) revenueRecords.push({ mota:`Dịch vụ & mỹ phẩm ${d.iso}`, ngayISO:d.iso, sale:'Chung', loai:'Dịch vụ', soTien:rDV, hash:hashRow(d.iso,'REV','DV',rDV) });

  // ---- Lead (row 29) ----
  const fb=num(gc(ws,'I29')),yt=num(gc(ws,'J29')),gg=num(gc(ws,'K29')),cu=num(gc(ws,'L29')),kh=num(gc(ws,'M29'));
  if (fb+yt+gg+cu+kh>0) leadRecords.push({ ngayText, ngayISO:d.iso, facebook:fb, youtube:yt, google:gg, khCu:cu, khac:kh });
}
const minISO = allISO.length ? allISO[0] : '2026-01-01';
const maxISO = allISO.length ? allISO[allISO.length-1] : '2026-12-31';
return [{ json: { summary:{ cashCount:cashRecords.length, leadCount:leadRecords.length, expenseCount:expenseRecords.length, revenueCount:revenueRecords.length }, minISO, maxISO, cashRecords, leadRecords, expenseRecords, revenueRecords } }];
