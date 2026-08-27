import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, Easing} from 'remotion';

export const MEDIANDEMO_DURATION = 660; // 22s @30fps

// ===== bảng màu median: đen / trắng / xám / 1 vàng amber =====
const BG = '#050607', WHITE = '#ededed', GRAY = '#5c6066', GOLD = '#e9c46a';
const F = 'Mont, "Montserrat", sans-serif';

// ===== mô hình tài chính (ví dụ minh hoạ 2026) =====
const H0 = 6, APP = 0.03, DOWN = 1.8, LOAN = 4.2, MR = 0.10 / 12, N = 240;
const PAY = LOAN * MR / (1 - Math.pow(1 + MR, -N));
const bal = (t: number) => { const k = 12 * t; return LOAN * Math.pow(1 + MR, k) - PAY * (Math.pow(1 + MR, k) - 1) / MR; };
const buy = (t: number) => Math.max(0, H0 * Math.pow(1 + APP, t) - bal(t));
const IR = 0.07, INV_Y = 0.27;
const rent = (t: number) => DOWN * Math.pow(1 + IR, t) + INV_Y * ((Math.pow(1 + IR, t) - 1) / IR);

// khung biểu đồ
const X0 = 300, X1 = 1600, YB = 820, YT = 230, MAXV = 19;
const sx = (t: number) => X0 + (t / 20) * (X1 - X0);
const sy = (v: number) => YB - (v / MAXV) * (YB - YT);
const PTS = Array.from({length: 201}, (_, i) => i * 0.1); // t = 0..20

const poly = (fn: (t: number) => number, count: number) => PTS.slice(0, count).map((t) => `${sx(t).toFixed(1)},${sy(fn(t)).toFixed(1)}`).join(' ');

export const MedianDemo: React.FC = () => {
  const f = useCurrentFrame();
  // pha
  const titleO = interpolate(f, [6, 30, 92, 110], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const ulW = interpolate(f, [24, 60], [0, 1], {easing: Easing.out(Easing.cubic), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const topO = interpolate(f, [104, 128], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const axisO = interpolate(f, [110, 140], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const p = interpolate(f, [150, 560], [0, 1], {easing: Easing.inOut(Easing.cubic), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const count = Math.max(2, Math.round(p * 200) + 1);
  const tLead = (count - 1) * 0.1;
  const endO = interpolate(f, [545, 575], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const capO = interpolate(f, [585, 615], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return <AbsoluteFill style={{backgroundColor: BG}}>
    {/* nhiễu hạt rất nhẹ */}
    <div style={{position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(#fff 0.5px, transparent 0.6px)', backgroundSize: '4px 4px'}} />

    {/* TITLE giữa (pha mở) */}
    <div style={{position: 'absolute', top: 430, left: 0, right: 0, textAlign: 'center', opacity: titleO}}>
      <div style={{fontFamily: F, fontWeight: 700, fontSize: 96, color: WHITE, letterSpacing: 4}}>MUA NHÀ <span style={{color: GRAY}}>vs</span> THUÊ NHÀ</div>
      <div style={{margin: '26px auto 0', height: 3, width: `${ulW * 340}px`, background: GOLD}} />
      <div style={{marginTop: 26, fontFamily: F, fontWeight: 400, fontSize: 34, color: GRAY, letterSpacing: 6}}>20 NĂM · AI THẮNG?</div>
    </div>

    {/* tiêu đề trên (pha biểu đồ) */}
    <div style={{position: 'absolute', top: 70, left: 0, right: 0, textAlign: 'center', opacity: topO, fontFamily: F, fontWeight: 600, fontSize: 44, color: WHITE, letterSpacing: 4}}>MUA NHÀ <span style={{color: GRAY}}>vs</span> THUÊ + ĐẦU TƯ</div>

    <svg width="1920" height="1080" style={{position: 'absolute', inset: 0}}>
      {/* trục */}
      <g opacity={axisO}>
        <line x1={X0} y1={YB} x2={X1} y2={YB} stroke={GRAY} strokeWidth={2} />
        <line x1={X0} y1={YB} x2={X0} y2={YT} stroke={GRAY} strokeWidth={2} />
        {[0, 5, 10, 15, 20].map((t) => <g key={t}>
          <line x1={sx(t)} y1={YB} x2={sx(t)} y2={YB + 12} stroke={GRAY} strokeWidth={2} />
          <text x={sx(t)} y={YB + 46} fill={GRAY} fontFamily={F} fontSize={26} fontWeight={400} textAnchor="middle">{t === 20 ? '20 năm' : `${t}`}</text>
        </g>)}
      </g>
      <g opacity={axisO}>
        {/* đường MUA (xám/trắng) */}
        <polyline points={poly(buy, count)} fill="none" stroke={WHITE} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" opacity={0.85} />
        <circle cx={sx(tLead)} cy={sy(buy(tLead))} r={9} fill={WHITE} />
        {/* đường THUÊ+ĐẦU TƯ (vàng — nét đứt kiểu median) */}
        <polyline points={poly(rent, count)} fill="none" stroke={GOLD} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 14" />
        <polyline points={poly(rent, count)} fill="none" stroke={GOLD} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" opacity={0.28} />
        <circle cx={sx(tLead)} cy={sy(rent(tLead))} r={11} fill={GOLD} />
      </g>
    </svg>

    {/* nhãn cuối 2 đường */}
    <div style={{position: 'absolute', left: sx(20) - 470, top: sy(rent(20)) - 122, width: 470, textAlign: 'right', opacity: endO}}>
      <div style={{fontFamily: F, fontWeight: 700, fontSize: 32, color: GOLD, letterSpacing: 2, whiteSpace: 'nowrap'}}>THUÊ + ĐẦU TƯ</div>
      <div style={{fontFamily: F, fontWeight: 800, fontSize: 54, color: GOLD}}>≈ 18 tỷ</div>
    </div>
    <div style={{position: 'absolute', left: sx(20) - 400, top: sy(buy(20)) - 6, width: 400, textAlign: 'right', opacity: endO}}>
      <div style={{fontFamily: F, fontWeight: 700, fontSize: 32, color: WHITE, letterSpacing: 2, whiteSpace: 'nowrap'}}>MUA NHÀ</div>
      <div style={{fontFamily: F, fontWeight: 800, fontSize: 54, color: WHITE}}>≈ 10,8 tỷ</div>
    </div>

    {/* caption chốt + disclaimer */}
    <div style={{position: 'absolute', bottom: 46, left: 0, right: 0, textAlign: 'center', opacity: capO}}>
      <div style={{fontFamily: F, fontWeight: 600, fontSize: 40, color: WHITE, letterSpacing: 3}}>THUẦN CON SỐ: <span style={{color: GOLD}}>THUÊ + ĐẦU TƯ</span> THẮNG</div>
      <div style={{marginTop: 14, fontFamily: F, fontWeight: 400, fontSize: 24, color: GRAY, letterSpacing: 2}}>ví dụ minh hoạ · nhà 6 tỷ · lãi vay 10% · lợi suất đầu tư 7% · 2026</div>
    </div>
  </AbsoluteFill>;
};
