import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, interpolate, Easing} from 'remotion';

// ===== bảng màu median =====
const BG = '#050607', WHITE = '#ededed', GRAY = '#5c6066', GOLD = '#e9c46a', F = 'Mont, "Montserrat", sans-serif';

// khối lời (khớp mp3 muathue 3:27)
const D = [864, 692, 591, 437, 583, 862, 891, 822, 467];
export const MUATHUE_DURATION = D.reduce((a, b) => a + b, 0); // 6209

const rev = (f: number, at: number, dur = 9) => interpolate(f, [at, at + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
const revY = (f: number, at: number) => interpolate(f, [at, at + 12], [26, 0], {easing: Easing.out(Easing.cubic), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

const Grain: React.FC = () => <>
  <div style={{position: 'absolute', inset: 0, opacity: 0.045, backgroundImage: 'radial-gradient(#fff 0.5px, transparent 0.6px)', backgroundSize: '4px 4px'}} />
  <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 45%, rgba(255,255,255,0.05), rgba(0,0,0,0) 60%)'}} />
</>;

const Logo: React.FC = () => <div style={{position: 'absolute', top: 44, left: 60, fontFamily: F, fontWeight: 700, fontSize: 30, color: GRAY, letterSpacing: 3}}>CHUYỆN TIỀN</div>;

// list "từ chính + phụ" canh trái (kiểu PEMDAS)
const ItemList: React.FC<{header: string; items: [string, string][]; startAt?: number; numbered?: boolean; left?: number}> = ({header, items, startAt = 8, numbered, left = 150}) => {
  const f = useCurrentFrame();
  return <div style={{position: 'absolute', left, top: 250, right: 120}}>
    <div style={{fontFamily: F, fontWeight: 700, fontSize: 34, color: GOLD, letterSpacing: 6, opacity: rev(f, startAt - 6), marginBottom: 40}}>{header}</div>
    {items.map((it, i) => { const at = startAt + 16 + i * 20; return <div key={i} style={{opacity: rev(f, at), transform: `translateY(${revY(f, at)}px)`, marginBottom: 34, display: 'flex', alignItems: 'baseline', gap: 22}}>
      {numbered && <span style={{fontFamily: F, fontWeight: 800, fontSize: 46, color: GOLD, minWidth: 40}}>{i + 1}</span>}
      <div>
        <div style={{fontFamily: F, fontWeight: 700, fontSize: 66, color: WHITE, lineHeight: 1.06}}>{it[0]}</div>
        <div style={{fontFamily: F, fontWeight: 400, fontSize: 34, color: GRAY, marginTop: 4}}>{it[1]}</div>
      </div>
    </div>; })}
  </div>;
};

const House: React.FC<{x: number; y: number; s?: number; op: number}> = ({x, y, s = 1, op}) => (
  <svg width={360 * s} height={320 * s} viewBox="0 0 360 320" style={{position: 'absolute', left: x, top: y, opacity: op}}>
    <g fill="none" stroke={WHITE} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round">
      <path d="M40 150 L180 40 L320 150" /><path d="M70 140 L70 280 L290 280 L290 140" />
      <rect x={150} y={200} width={60} height={80} /><rect x={95} y={165} width={45} height={45} /><rect x={220} y={165} width={45} height={45} />
    </g>
  </svg>
);

const Suitcase: React.FC<{x: number; y: number; op: number}> = ({x, y, op}) => (
  <svg width={340} height={320} viewBox="0 0 340 320" style={{position: 'absolute', left: x, top: y, opacity: op}}>
    <g fill="none" stroke={WHITE} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round">
      <rect x={60} y={110} width={220} height={170} rx={16} /><path d="M130 110 L130 70 L210 70 L210 110" /><line x1={170} y1={110} x2={170} y2={280} />
    </g>
  </svg>
);

// ===== S6: biểu đồ 2 đường (dùng lại toán MedianDemo) =====
const H0 = 6, APP = 0.03, DOWN = 1.8, LOAN = 4.2, MR = 0.10 / 12, N = 240;
const PAY = LOAN * MR / (1 - Math.pow(1 + MR, -N));
const bal = (t: number) => { const k = 12 * t; return LOAN * Math.pow(1 + MR, k) - PAY * (Math.pow(1 + MR, k) - 1) / MR; };
const buy = (t: number) => Math.max(0, H0 * Math.pow(1 + APP, t) - bal(t));
const IR = 0.07, INV_Y = 0.27;
const rent = (t: number) => DOWN * Math.pow(1 + IR, t) + INV_Y * ((Math.pow(1 + IR, t) - 1) / IR);
const X0 = 300, X1 = 1440, YB = 820, YT = 250, MAXV = 19;
const sx = (t: number) => X0 + (t / 20) * (X1 - X0);
const sy = (v: number) => YB - (v / MAXV) * (YB - YT);
const PTS = Array.from({length: 201}, (_, i) => i * 0.1);
const poly = (fn: (t: number) => number, c: number) => PTS.slice(0, c).map((t) => `${sx(t).toFixed(1)},${sy(fn(t)).toFixed(1)}`).join(' ');

const Chart: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [40, 640], [0, 1], {easing: Easing.inOut(Easing.cubic), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const c = Math.max(2, Math.round(p * 200) + 1); const tL = (c - 1) * 0.1;
  const yr = Math.round(tL); const axisO = rev(f, 18);
  const endO = rev(f, 650);
  return <>
    <div style={{position: 'absolute', top: 70, left: 0, right: 0, textAlign: 'center', fontFamily: F, fontWeight: 600, fontSize: 44, color: WHITE, letterSpacing: 3, opacity: rev(f, 4)}}>SAU 20 NĂM · AI CẦM NHIỀU HƠN?</div>
    <div style={{position: 'absolute', top: 150, right: 90, fontFamily: F, fontWeight: 700, fontSize: 40, color: GRAY, opacity: axisO}}>Năm {yr}</div>
    <svg width="1920" height="1080" style={{position: 'absolute', inset: 0}}>
      <g opacity={axisO}>
        <line x1={X0} y1={YB} x2={X1} y2={YB} stroke={GRAY} strokeWidth={2} /><line x1={X0} y1={YB} x2={X0} y2={YT} stroke={GRAY} strokeWidth={2} />
        {[0, 5, 10, 15, 20].map((t) => <text key={t} x={sx(t)} y={YB + 46} fill={GRAY} fontFamily={F} fontSize={26} textAnchor="middle">{t === 20 ? '20 năm' : `${t}`}</text>)}
      </g>
      <g opacity={axisO}>
        <polyline points={poly(buy, c)} fill="none" stroke={WHITE} strokeWidth={4} strokeLinecap="round" opacity={0.85} />
        <circle cx={sx(tL)} cy={sy(buy(tL))} r={9} fill={WHITE} />
        <polyline points={poly(rent, c)} fill="none" stroke={GOLD} strokeWidth={5} strokeLinecap="round" strokeDasharray="2 14" />
        <circle cx={sx(tL)} cy={sy(rent(tL))} r={11} fill={GOLD} />
      </g>
    </svg>
    <div style={{position: 'absolute', left: sx(20) + 30, top: sy(rent(20)) - 62, opacity: endO}}>
      <div style={{fontFamily: F, fontWeight: 700, fontSize: 32, color: GOLD, whiteSpace: 'nowrap'}}>THUÊ + ĐẦU TƯ</div>
      <div style={{fontFamily: F, fontWeight: 800, fontSize: 54, color: GOLD}}>≈ 18 tỷ</div>
    </div>
    <div style={{position: 'absolute', left: sx(20) + 30, top: sy(buy(20)) - 62, opacity: endO}}>
      <div style={{fontFamily: F, fontWeight: 700, fontSize: 32, color: WHITE, whiteSpace: 'nowrap'}}>MUA NHÀ</div>
      <div style={{fontFamily: F, fontWeight: 800, fontSize: 54, color: WHITE}}>≈ 10,8 tỷ</div>
    </div>
    <div style={{position: 'absolute', bottom: 44, left: 0, right: 0, textAlign: 'center', opacity: rev(f, 690)}}>
      <div style={{fontFamily: F, fontWeight: 600, fontSize: 38, color: WHITE, letterSpacing: 2}}>Thuần con số: <span style={{color: GOLD}}>thuê + đầu tư</span> thường thắng</div>
      <div style={{marginTop: 12, fontFamily: F, fontWeight: 400, fontSize: 24, color: GRAY}}>ví dụ minh hoạ · nhà 6 tỷ · vay 10% · đầu tư 7% · 2026</div>
    </div>
  </>;
};

// ===== các cảnh =====
const S1: React.FC = () => { const f = useCurrentFrame();
  const ul = interpolate(f, [20, 54], [0, 340], {easing: Easing.out(Easing.cubic), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const qs = [['Vì sao một căn nhà sinh lời thấp bất ngờ?'], ['Vì sao thuê đôi khi là nước đi khôn hơn?'], ['Vì sao đáp án không giống nhau với mỗi người?']];
  return <><div style={{position: 'absolute', top: 300, left: 0, right: 0, textAlign: 'center', opacity: rev(f, 4)}}>
      <div style={{fontFamily: F, fontWeight: 700, fontSize: 100, color: WHITE, letterSpacing: 4}}>MUA NHÀ <span style={{color: GRAY}}>vs</span> THUÊ NHÀ</div>
      <div style={{margin: '24px auto 0', height: 3, width: ul}} ><div style={{height: 3, width: '100%', background: GOLD}} /></div>
      <div style={{marginTop: 22, fontFamily: F, fontWeight: 400, fontSize: 34, color: GRAY, letterSpacing: 5}}>AN CƯ LẠC NGHIỆP — NGHE RẤT ĐÚNG?</div>
    </div>
    <div style={{position: 'absolute', top: 620, left: 0, right: 0, textAlign: 'center'}}>
      {qs.map((q, i) => { const at = 180 + i * 34; return <div key={i} style={{fontFamily: F, fontWeight: 500, fontSize: 40, color: WHITE, opacity: rev(f, at), transform: `translateY(${revY(f, at)}px)`, marginBottom: 20}}>{q[0]}</div>; })}
    </div></>;
};
const S2: React.FC = () => { const f = useCurrentFrame(); return <><House x={1360} y={360} op={rev(f, 10)} />
  <ItemList header="PHE MUA NHÀ" items={[['An cư', 'một nơi thực sự là của bạn'], ['Không ai đuổi', 'không lo tăng giá thuê'], ['Cỗ máy ép tiết kiệm', 'tháng nào cũng phải bỏ tiền vào']]} /></>; };
const S3: React.FC = () => { const f = useCurrentFrame(); return <><Suitcase x={1380} y={380} op={rev(f, 10)} />
  <ItemList header="PHE THUÊ NHÀ" items={[['Nhẹ gánh', 'không ôm khoản nợ 20 năm'], ['Linh hoạt', 'dọn đồ là đi'], ['Đầu tư phần chênh', 'tiền tự lớn lên']]} /></>; };
const S4: React.FC = () => { const f = useCurrentFrame();
  const rows: [string, string, string][] = [['Lãi vay mua nhà', '8–11%', WHITE], ['Lợi suất cho thuê', '3–4%', GOLD], ['Gửi tiết kiệm', '7%', WHITE]];
  return <><div style={{position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center', fontFamily: F, fontWeight: 600, fontSize: 42, color: WHITE, letterSpacing: 3, opacity: rev(f, 4)}}>CON SỐ THẬT NĂM 2026</div>
    <div style={{position: 'absolute', top: 320, left: 0, right: 0}}>
      {rows.map((r, i) => { const at = 20 + i * 24; return <div key={i} style={{display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 40, marginBottom: 34, opacity: rev(f, at), transform: `translateY(${revY(f, at)}px)`}}>
        <div style={{width: 640, textAlign: 'right', fontFamily: F, fontWeight: 400, fontSize: 46, color: GRAY}}>{r[0]}</div>
        <div style={{width: 360, textAlign: 'left', fontFamily: F, fontWeight: 800, fontSize: 96, color: r[2] as string}}>{r[1]}</div>
      </div>; })}
    </div>
    <div style={{position: 'absolute', bottom: 60, left: 0, right: 0, textAlign: 'center', fontFamily: F, fontWeight: 400, fontSize: 24, color: GRAY, opacity: rev(f, 90)}}>Nguồn: NHNN · Techcombank · Dân trí · Tuổi Trẻ — 2026</div></>; };
const S5: React.FC = () => { const f = useCurrentFrame();
  const bars: [string, number, string, string][] = [['VAY MUA NHÀ', 10, WHITE, '~10%'], ['GỬI TIẾT KIỆM', 7, WHITE, '7%'], ['CHO THUÊ (lợi suất)', 3.5, GOLD, '3–4%']];
  return <><div style={{position: 'absolute', top: 140, left: 150, right: 120, fontFamily: F, fontWeight: 600, fontSize: 44, color: WHITE, letterSpacing: 2, opacity: rev(f, 4)}}>Vay <span style={{color: GOLD}}>đắt</span> — để ôm một tài sản sinh lời <span style={{color: GOLD}}>rẻ</span>.</div>
    <div style={{position: 'absolute', top: 340, left: 150, right: 150}}>
      {bars.map((b, i) => { const at = 24 + i * 26; const w = interpolate(f, [at, at + 24], [0, (b[1] as number) / 10 * 1300], {easing: Easing.out(Easing.cubic), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        return <div key={i} style={{marginBottom: 54, opacity: rev(f, at - 4)}}>
          <div style={{fontFamily: F, fontWeight: 500, fontSize: 34, color: GRAY, marginBottom: 12, letterSpacing: 2}}>{b[0]}</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 26}}>
            <div style={{height: 42, width: w, background: b[2] as string, borderRadius: 6, boxShadow: b[2] === GOLD ? `0 0 20px rgba(233,196,106,0.5)` : 'none'}} />
            <div style={{fontFamily: F, fontWeight: 800, fontSize: 52, color: b[2] as string}}>{b[3]}</div>
          </div>
        </div>; })}
    </div></>; };
const S7: React.FC = () => { const f = useCurrentFrame();
  return <><div style={{position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center', fontFamily: F, fontWeight: 600, fontSize: 46, color: WHITE, letterSpacing: 2, opacity: rev(f, 4)}}>Nhưng con số không phải tất cả.</div>
    <ItemList header="MUA NHÀ CHO BẠN" startAt={80} items={[['Sự an tâm', 'không ai đuổi bạn đi'], ['Không phải dọn nhà', 'mỗi vài năm một lần'], ['Đóng đinh lên tường', 'mà không phải xin phép ai']]} />
    <div style={{position: 'absolute', bottom: 90, left: 150, right: 150, textAlign: 'center', fontFamily: F, fontWeight: 700, fontSize: 40, color: GOLD, opacity: rev(f, 220)}}>Thuê chỉ thắng NẾU bạn thật sự đầu tư phần chênh — đều đặn, suốt 20 năm.</div></>; };
const S8: React.FC = () => { const f = useCurrentFrame();
  return <><div style={{position: 'absolute', top: 140, left: 150, fontFamily: F, fontWeight: 600, fontSize: 42, color: WHITE, letterSpacing: 2, opacity: rev(f, 4)}}>Câu hỏi đúng không phải mua hay thuê — mà là ba câu này.</div>
    <ItemList header="TRƯỚC KHI QUYẾT ĐỊNH" startAt={40} numbered items={[['Giá nhà = bao nhiêu NĂM tiền thuê?', 'trên 25 năm → nghiêng về THUÊ'], ['Bạn ở đó đủ 5–7 năm chứ?', 'không → thuê nhẹ gánh hơn'], ['Có kỷ luật đầu tư phần chênh?', 'không → MUA nhà sẽ ép bạn giàu']]} /></>; };
const S9: React.FC = () => { const f = useCurrentFrame();
  const fade = interpolate(f, [340, 400], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <><div style={{position: 'absolute', top: 300, left: 200, right: 200, textAlign: 'center', opacity: rev(f, 6) * fade}}>
      <div style={{fontFamily: F, fontWeight: 500, fontSize: 46, color: WHITE, lineHeight: 1.5}}>An cư lạc nghiệp — có lẽ vẫn đúng.<br />Chỉ là ở năm 2026, an cư không nhất thiết<br />phải là đứng tên một căn nhà.</div>
      <div style={{marginTop: 60, fontFamily: F, fontWeight: 700, fontSize: 64, color: GOLD, opacity: rev(f, 120)}}>Bạn thuộc đội nào?</div>
    </div>
    <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: interpolate(f, [400, 430], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), fontFamily: F, fontWeight: 700, fontSize: 60, color: WHITE, letterSpacing: 4}}>Chuyện Tiền</div></>; };

const SCENES = [S1, S2, S3, S4, S5, Chart, S7, S8, S9];

export const MuaThue: React.FC = () => {
  let acc = 0;
  return <AbsoluteFill style={{backgroundColor: BG}}>
    {SCENES.map((Sc, i) => { const from = acc; acc += D[i];
      return <Sequence key={i} from={from} durationInFrames={D[i]}><AbsoluteFill><Grain /><Logo /><Sc /></AbsoluteFill></Sequence>; })}
  </AbsoluteFill>;
};
