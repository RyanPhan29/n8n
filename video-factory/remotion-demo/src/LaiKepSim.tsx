import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, interpolate, Easing} from 'remotion';
import {Bg as MedianBg, FramedShot, HandCircle, Spotlight, Bracket, fIn, eOut} from './MedianKit';
import './median-fonts.css';

/* PROOF median-sim: LÃI KÉP — mô phỏng cơ chế bằng code (không phải chữ trên nền).
   Vốn góp (xám, tuyến tính) vs Lãi đẻ lãi (vàng, phồng lên) — đường cong vẽ dần, số đếm glow.
   MỞ ĐẦU: khung footage THẬT B&W + chú thích vẽ tay (kiểu median) → cross-dissolve vào biểu đồ. */
const INTRO_LEN = 100, CROSS = 20;
export const LAIKEPSIM_DURATION = INTRO_LEN - CROSS + 480; // intro + chart(16s)

const INK = '#e8e8ea', GRAY = '#7d7f83', DIM = '#4a4c50', GOLD = '#e9c46a';
const FN = "'BVPm','BVP',sans-serif", FH = "'Mont','BVP',sans-serif";
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const glowW = '0 0 8px rgba(255,255,255,.5),0 0 24px rgba(255,255,255,.3)';
const glowGold = '0 0 10px rgba(233,196,106,.6),0 0 30px rgba(233,196,106,.4),0 0 60px rgba(233,196,106,.2)';

// toán: 3tr/tháng, 7%/năm, 20 năm
const M = 3, R = 0.07 / 12;
const contrib = (t: number) => M * 12 * t;                                   // triệu
const total = (t: number) => t <= 0 ? 0 : M * ((Math.pow(1 + R, 12 * t) - 1) / R);
const YEARS = 20, MAXV = 1650;
const X0 = 360, X1 = 1560, YB = 900, YT = 230;
const sx = (t: number) => X0 + (t / YEARS) * (X1 - X0);
const sy = (v: number) => YB - (v / MAXV) * (YB - YT);
const fmt = (v: number) => v >= 1000 ? (v / 1000).toFixed(2).replace('.', ',') + ' tỷ' : Math.round(v) + ' tr';

const arr = (n: number) => Array.from({length: n}, (_, i) => i);

const Chart: React.FC = () => {
  const f = useCurrentFrame();
  const introFade = interpolate(f, [0, CROSS], [0, 1], clamp); // cross-dissolve từ intro
  // năm chạy 0→20 trong [70,390]
  const yr = interpolate(f, [70, 390], [0, YEARS], clamp);
  const axisO = interpolate(f, [40, 70], [0, 1], clamp);
  const N = 120; // độ mịn
  const upto = Math.max(1, Math.round((yr / YEARS) * N));
  const ts = arr(upto + 1).map((i) => (i / N) * YEARS);

  // vùng VỐN GÓP (xám): dưới đường contrib
  const contribPts = ts.map((t) => `${sx(t).toFixed(1)},${sy(contrib(t)).toFixed(1)}`).join(' ');
  const contribArea = `${sx(0)},${sy(0)} ${contribPts} ${sx(ts[ts.length - 1])},${sy(0)}`;
  // vùng LÃI ĐẺ LÃI (vàng): giữa contrib và total
  const totalPts = ts.map((t) => `${sx(t).toFixed(1)},${sy(total(t)).toFixed(1)}`).join(' ');
  const growthArea = `${contribPts} ${[...ts].reverse().map((t) => `${sx(t).toFixed(1)},${sy(contrib(t)).toFixed(1)}`).join(' ')}`;

  const tNow = ts[ts.length - 1];
  const totNow = total(tNow), conNow = contrib(tNow);
  const endO = interpolate(f, [396, 420], [0, 1], clamp);
  const glowPulse = 0.5 + 0.5 * Math.abs(Math.sin(f / 20));
  // snowball to dần + vòng xung mỗi năm + số nảy
  const snowR = 9 + Math.sqrt(Math.min(1, totNow / 1560)) * 18;
  const yrFrac = yr - Math.floor(yr);
  const ringR = snowR + yrFrac * 58;
  const ringO = axisO * (1 - yrFrac) * 0.45;
  const numPop = 1 + Math.max(0, 1 - yrFrac / 0.16) * 0.12;
  // hạt vàng bay lên từ đầu đường (lãi tự sinh)
  const parts: {px: number; py: number; o: number; r: number}[] = [];
  for (let i = 0; i < 42; i++) {
    const sp = 82 + i * 7; if (f < sp) continue; const age = f - sp; if (age > 58) continue;
    const t = interpolate(sp, [70, 390], [0, YEARS], clamp);
    parts.push({
      px: sx(t) + Math.sin((age + i) / 7) * 16, py: sy(total(t)) - age * 3.4,
      o: interpolate(age, [0, 6, 46, 58], [0, 0.9, 0.65, 0], clamp), r: interpolate(age, [0, 58], [6, 2], clamp),
    });
  }

  return <AbsoluteFill style={{opacity: introFade}}>
    {/* tiêu đề nhỏ */}
    <div style={{position: 'absolute', top: 70, left: 0, right: 0, textAlign: 'center', opacity: interpolate(f, [6, 26], [0, 1], clamp)}}>
      <div style={{fontFamily: FN, fontWeight: 500, fontSize: 26, color: GRAY, letterSpacing: 8}}>SỨC MẠNH LÃI KÉP</div>
      <div style={{marginTop: 12, fontFamily: FN, fontWeight: 400, fontSize: 40, color: INK}}>Vì sao <span style={{color: GOLD}}>3 triệu/tháng</span> thành <span style={{color: GOLD}}>1,5 tỷ?</span></div>
    </div>

    <svg width="1920" height="1080" style={{position: 'absolute', inset: 0}}>
      <defs>
        <linearGradient id="gld" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(233,196,106,0.55)" /><stop offset="100%" stopColor="rgba(233,196,106,0.08)" />
        </linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <g opacity={axisO}>
        <line x1={X0} y1={YB} x2={X1} y2={YB} stroke={DIM} strokeWidth={2} />
        <line x1={X0} y1={YB} x2={X0} y2={YT} stroke={DIM} strokeWidth={2} />
        {[0, 5, 10, 15, 20].map((t) => <g key={t}>
          <line x1={sx(t)} y1={YB} x2={sx(t)} y2={YB + 10} stroke={DIM} strokeWidth={2} />
          <text x={sx(t)} y={YB + 46} fill={yr >= t ? GRAY : DIM} fontFamily={FN} fontSize={26} textAnchor="middle">{t === 20 ? '20 năm' : t}</text>
        </g>)}
      </g>
      {/* VÙNG VỐN GÓP — xám (grey-demotion) */}
      <polygon points={contribArea} fill="rgba(125,127,131,0.22)" opacity={axisO} />
      {/* VÙNG LÃI ĐẺ LÃI — vàng phồng lên */}
      <polygon points={growthArea} fill="url(#gld)" opacity={axisO} />
      {/* đường tổng — vàng glow + đường gốc — xám */}
      <polyline points={contribPts} fill="none" stroke={GRAY} strokeWidth={3} opacity={axisO * 0.9} />
      <polyline points={totalPts} fill="none" stroke={GOLD} strokeWidth={5} strokeLinecap="round" opacity={axisO} filter="url(#glow)" />
      {/* hạt vàng bay lên — lãi tự sinh */}
      {parts.map((p, i) => <circle key={i} cx={p.px} cy={p.py} r={p.r} fill={GOLD} opacity={p.o} style={{filter: 'drop-shadow(0 0 6px rgba(233,196,106,.9))'}} />)}
      {/* vòng xung mỗi năm */}
      <circle cx={sx(tNow)} cy={sy(totNow)} r={ringR} fill="none" stroke={GOLD} strokeWidth={2.5} opacity={ringO} />
      {/* quả cầu tuyết to dần + glow */}
      <circle cx={sx(tNow)} cy={sy(totNow)} r={snowR} fill={GOLD} style={{filter: `drop-shadow(0 0 ${10 + glowPulse * 14}px rgba(233,196,106,1))`}} />
      <circle cx={sx(tNow)} cy={sy(totNow)} r={snowR * 0.45} fill="#fff6df" opacity={0.9} />
    </svg>

    {/* số đếm — tổng (glow) */}
    <div style={{position: 'absolute', top: 250, right: 90, textAlign: 'right', opacity: axisO}}>
      <div style={{fontFamily: FN, fontWeight: 500, fontSize: 26, color: GRAY, letterSpacing: 2}}>NĂM {Math.round(yr)}</div>
      <div style={{fontFamily: FH, fontWeight: 800, fontSize: 92, color: GOLD, textShadow: glowGold, lineHeight: 1}}>{fmt(totNow)}</div>
    </div>

    {/* nhãn 2 vùng (hiện dần) */}
    <div style={{position: 'absolute', left: sx(11), top: sy(total(15)) - 20, opacity: interpolate(f, [200, 230], [0, 1], clamp)}}>
      <div style={{fontFamily: FN, fontWeight: 600, fontSize: 32, color: GOLD, textShadow: glowGold}}>LÃI ĐẺ LÃI</div>
      <div style={{fontFamily: FN, fontWeight: 300, fontSize: 24, color: GRAY}}>phần máy tự sinh</div>
    </div>
    <div style={{position: 'absolute', left: sx(12), top: sy(contrib(12)) + 8, opacity: interpolate(f, [150, 180], [0, 1], clamp)}}>
      <div style={{fontFamily: FN, fontWeight: 500, fontSize: 28, color: GRAY}}>VỐN GÓP</div>
    </div>

    {/* chốt cuối: tách gốc vs lãi */}
    <div style={{position: 'absolute', bottom: 70, left: 0, right: 0, textAlign: 'center', opacity: endO}}>
      <span style={{fontFamily: FN, fontWeight: 400, fontSize: 38, color: INK}}>
        Gốc bạn bỏ vào: <span style={{color: GRAY, fontWeight: 600}}>{fmt(conNow)}</span>
        <span style={{color: DIM}}>  ·  </span>
        Lãi tự đẻ ra: <span style={{color: GOLD, fontWeight: 700, textShadow: glowGold}}>{fmt(totNow - conNow)}</span>
      </span>
    </div>
  </AbsoluteFill>;
};

/* ===== MỞ ĐẦU: footage THẬT + chú thích median "trọn vẹn" (spotlight → đo → lặp) =====
   Câu chuyện 1 khung: khoản NHỎ (3tr) · nhân LẶP LẠI (×240 tháng) → thành cỗ máy. */
const FramedIntro: React.FC = () => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 16, INTRO_LEN - CROSS, INTRO_LEN], [0, 1, 1, 0], clamp);
  const FX = 660, FY = 250, FW = 600, FH = 470;
  // focus 1 cọc tiền cụ thể (trái-dưới khung) rồi mở rộng
  const FCX = 820, FCY = 560;
  const spotR = interpolate(f, [18, 40, 62, 80], [520, 150, 150, 640], {easing: Easing.inOut(Easing.cubic), ...clamp});
  const spotO = interpolate(f, [16, 32, 74, 86], [0, 1, 1, 0], clamp);
  // ② mũi tên quét cả cọc (lặp lại)
  const sweep = interpolate(f, [60, 78], [0, 1], {easing: eOut, ...clamp});
  const sx1 = 700, sx2 = 1210, syy = 340;
  const capO = interpolate(f, [80, 92], [0, 1], clamp);
  return <AbsoluteFill style={{opacity: o}}>
    <FramedShot src="broll/coinstack.mp4" x={FX} y={FY} w={FW} h={FH} bright={0.66} grayscale={0.72} />
    <Spotlight fx={FCX} fy={FCY} r={spotR} o={spotO} dark={0.66} />

    <svg width="1920" height="1080" style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
      {/* ① khoanh 1 cọc + bracket "1 tháng" */}
      <HandCircle cx={FCX} cy={FCY} rx={86} ry={118} start={34} dur={22} rot={-8} />
      <Bracket x1={FCX - 92} x2={FCX + 92} y={FY + FH - 6} start={48} tick={14} />
      {/* connector từ nhãn trái tới cọc */}
      <line x1={520} y1={440} x2={520 + fIn(f, 44, 12) * (FCX - 90 - 520)} y2={440 + fIn(f, 44, 12) * (FCY - 520)}
        stroke={GOLD} strokeWidth={3} strokeLinecap="round" opacity={fIn(f, 44, 12)} />
      {/* ② mũi tên quét ngang cả cọc */}
      <line x1={sx1} y1={syy} x2={sx1 + sweep * (sx2 - sx1)} y2={syy} stroke={GOLD} strokeWidth={3.5} strokeDasharray="10 7" strokeLinecap="round" opacity={sweep} style={{filter: 'drop-shadow(0 0 6px rgba(233,196,106,.6))'}} />
      {sweep > 0.9 && <polygon points={`${sx2},${syy} ${sx2 - 22},${syy - 9} ${sx2 - 22},${syy + 9}`} fill={GOLD} />}
    </svg>

    {/* ① nhãn ĐƠN VỊ (trái) */}
    <div style={{position: 'absolute', left: 150, top: 380, width: 340, opacity: fIn(f, 40, 14)}}>
      <div style={{fontFamily: FN, fontWeight: 500, fontSize: 24, color: GRAY, letterSpacing: 6}}>MỖI THÁNG · CHỈ</div>
      <div style={{fontFamily: FH, fontWeight: 800, fontSize: 84, color: GOLD, textShadow: glowGold, lineHeight: 0.96, marginTop: 2}}>3 TRIỆU</div>
      <div style={{fontFamily: FN, fontWeight: 400, fontSize: 25, color: INK, marginTop: 8}}>Một khoản nhỏ. <b style={{fontWeight: 600}}>Không cần giỏi.</b></div>
    </div>
    {/* ② nhãn LẶP LẠI (phải trên) */}
    <div style={{position: 'absolute', left: sx2 + 20, top: syy - 42, width: 300, opacity: interpolate(f, [74, 88], [0, 1], clamp)}}>
      <div style={{fontFamily: FH, fontWeight: 800, fontSize: 52, color: INK, textShadow: glowW, lineHeight: 1}}>× 240</div>
      <div style={{fontFamily: FN, fontWeight: 500, fontSize: 24, color: GRAY, letterSpacing: 1}}>tháng · gửi ĐỀU 20 năm</div>
    </div>
    {/* caption tổng hợp */}
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 96, textAlign: 'center', opacity: capO}}>
      <span style={{fontFamily: FN, fontWeight: 400, fontSize: 30, color: INK}}>Nhỏ <span style={{color: DIM}}>·</span> đều <span style={{color: DIM}}>·</span> lặp lại — để <span style={{color: GOLD, fontWeight: 600, textShadow: glowGold}}>lãi kép</span> làm phần còn lại.</span>
    </div>
  </AbsoluteFill>;
};

export const LaiKepSim: React.FC = () => {
  return <AbsoluteFill style={{backgroundColor: '#08080a'}}>
    <MedianBg grain={0.15} />
    <Sequence durationInFrames={INTRO_LEN} name="intro"><FramedIntro /></Sequence>
    <Sequence from={INTRO_LEN - CROSS} name="chart"><Chart /></Sequence>
  </AbsoluteFill>;
};
