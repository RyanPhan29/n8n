import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, Easing} from 'remotion';
import './median-fonts.css';

/* PROOF median-sim: LÃI KÉP — mô phỏng cơ chế bằng code (không phải chữ trên nền).
   Vốn góp (xám, tuyến tính) vs Lãi đẻ lãi (vàng, phồng lên) — đường cong vẽ dần, số đếm glow. */
export const LAIKEPSIM_DURATION = 480; // 16s

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

const Bg: React.FC = () => {
  const f = useCurrentFrame();
  const dx = Math.sin(f / 150) * 1.3, dy = Math.cos(f / 190) * 1.0;
  const NOISE = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
  return <>
    <AbsoluteFill style={{background: `radial-gradient(120% 92% at ${50 + dx}% ${44 + dy}%, #0d0d0e 0%, #0b0b0c 46%, #080809 100%)`}} />
    <AbsoluteFill style={{backgroundImage: NOISE, backgroundSize: '300px 300px', opacity: 0.05, mixBlendMode: 'overlay'}} />
  </>;
};

const arr = (n: number) => Array.from({length: n}, (_, i) => i);

export const LaiKepSim: React.FC = () => {
  const f = useCurrentFrame();
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

  return <AbsoluteFill style={{backgroundColor: '#08080a'}}>
    <Bg />
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
      {/* chấm dẫn glow ở đầu đường */}
      <circle cx={sx(tNow)} cy={sy(totNow)} r={11} fill={GOLD} style={{filter: `drop-shadow(0 0 ${8 + glowPulse * 10}px rgba(233,196,106,1))`}} />
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
