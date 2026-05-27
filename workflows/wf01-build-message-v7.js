// WF#1 — Build Message v7 (nhãn đúng theo cấu trúc thật)
// Dán đè vào node "Build Message" trong Dashboard v6.
// Khác v6: đổi nhãn "TK Phòng Khám" -> "Tiền mặt cuối ngày (két)", "Két riêng (CTY)" -> "Tiền quản lý giữ"
const di=$('Compute Dates').first().json;
const cash=$('Query Cash (Notion)').first().json.results||[];
const rev=$('Query Revenue (Notion)').first().json.results||[];
const exp=$('Query Expenses (Notion)').first().json.results||[];

const f=(n)=>Math.round(n).toLocaleString('vi-VN')+' đ';
const esc=(s)=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const short=(s,n=30)=>{s=String(s||'').replace(/\s+/g,' ').trim(); return s.length>n?s.slice(0,n)+'…':s;};

let cashVao=0,pkDau=0,pkCuoi=0,ctyDau=0,ctyCuoi=0;
if(cash.length>0){const p=cash[0].properties||{};
  cashVao=p['Tổng tiền vào (VNĐ)']?.number||0;
  pkDau=p['TK Phòng Khám đầu (VNĐ)']?.number||0;
  pkCuoi=p['TK Phòng Khám cuối (VNĐ)']?.number||0;
  ctyDau=p['TK CTY đầu (VNĐ)']?.number||0;
  ctyCuoi=p['TK CTY cuối (VNĐ)']?.number||0;
}

let revTong=0; const revByLoai={};
for(const r of rev){const p=r.properties||{}; const a=p['Số tiền vào (VNĐ)']?.number||0; revTong+=a; const l=p['Loại']?.select?.name||'Khác'; revByLoai[l]=(revByLoai[l]||0)+a;}

let chiThuc=0, chuyenNoiBo=0; const chiByCat={}; const chiList=[];
for(const e of exp){const p=e.properties||{}; const a=p['Số tiền ra (VNĐ)']?.number||0; if(a<=0) continue;
  const cat=p['Hạng mục']?.select?.name||'Khác';
  if(cat==='Chuyển-Rút'){ chuyenNoiBo+=a; continue; }
  chiThuc+=a; chiByCat[cat]=(chiByCat[cat]||0)+a;
  const gc=p['Ghi chú']?.rich_text?.[0]?.plain_text||'';
  chiList.push({a,cat,gc});
}
chiList.sort((x,y)=>y.a-x.a);

let m=`<b>📊 DRSKIN — BÁO CÁO ${di.yesterdayVN}</b>\n<i>(sáng ${di.todayVN}, nguồn: file BC Tài chính)</i>\n\n`;

m+=`<b>💰 DÒNG TIỀN</b>\n`;
if(cash.length>0){
  m+=`• Tiền vào: <b>${f(cashVao)}</b>\n`;
  m+=`• Tiền ra (thực chi): <b>${f(chiThuc)}</b>\n`;
  if(chuyenNoiBo>0) m+=`• <i>Chuyển nội bộ (không tính chi): ${f(chuyenNoiBo)}</i>\n`;
  m+=`• Tiền mặt cuối ngày (két): ${f(pkDau)} → <b>${f(pkCuoi)}</b>\n`;
  m+=`• Tiền quản lý giữ: ${f(ctyDau)} → <b>${f(ctyCuoi)}</b>\n\n`;
}else{ m+=`• ⚠️ Ngày này chưa có data trên Excel (team chưa cập nhật / chưa sync)\n\n`; }

if(cashVao>0){
  m+=`<b>📚 PHÂN LOẠI DOANH THU</b>\n`;
  if(revTong>0) for(const [l,a] of Object.entries(revByLoai).sort((x,y)=>y[1]-x[1])){ if(a>0) m+=`  • ${esc(l)}: ${f(a)}\n`; }
  const cpl=cashVao-revTong;
  if(cpl>1000) m+=`  • <i>Chưa phân loại (SP/trả góp...): ${f(cpl)}</i>\n`;
  m+=`\n`;
}

m+=`<b>💸 CHI TIÊU CHI TIẾT</b>\n`;
if(chiThuc>0){
  m+=`<u>Khoản chi lớn nhất:</u>\n`;
  for(const e of chiList.slice(0,6)){ const note=e.gc?` — ${esc(short(e.gc))}`:''; m+=`  • ${f(e.a)} <i>[${esc(e.cat)}]</i>${note}\n`; }
  m+=`\n<u>Theo hạng mục:</u>\n`;
  for(const [c,a] of Object.entries(chiByCat).sort((x,y)=>y[1]-x[1])) m+=`  • ${esc(c)}: ${f(a)}\n`;
  m+=`• <b>TỔNG THỰC CHI: ${f(chiThuc)}</b> (${chiList.length} khoản)\n\n`;
}else{ m+=`• Không có khoản chi\n\n`; }

m+=`<b>🎯 MARKETING</b>\n• <i>(Phase 2: lead mới theo nguồn + deal chốt — từ file Data học viên)</i>\n`;

const gt=new Date().toLocaleString('vi-VN',{timeZone:'Asia/Ho_Chi_Minh'});
m+=`\n🤖 <i>n8n auto • ${gt}</i>`;
return [{ json:{ message:m } }];
