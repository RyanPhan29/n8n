import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import './median-fonts.css';

export const MTTHUMB_DURATION = 60;

const GRAY = '#8a8d92', GOLD = '#e9c46a', RED = '#e5484d';
const FN = "'BVPm','BVP',sans-serif", FH = "'Mont','BVP',sans-serif";
const glowW = '0 0 10px rgba(255,255,255,.5), 0 0 30px rgba(255,255,255,.28)';
const glowGold = '0 0 12px rgba(233,196,106,.6), 0 0 34px rgba(233,196,106,.4), 0 0 66px rgba(233,196,106,.22)';

const Bg: React.FC<{img?: string; imgOp?: number}> = ({img, imgOp = 0.16}) => <>
  <AbsoluteFill style={{background: 'radial-gradient(120% 95% at 38% 40%, #101012 0%, #0b0b0d 46%, #060607 100%)'}} />
  {img && <AbsoluteFill style={{opacity: imgOp}}><Img src={staticFile(img)} style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.7) brightness(0.5) contrast(1.1)'}} /></AbsoluteFill>}
  <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(6,6,7,0.9) 30%, transparent 75%)'}} />
  <AbsoluteFill style={{background: 'radial-gradient(60% 60% at 50% 50%, transparent 55%, rgba(0,0,0,0.5) 100%)'}} />
</>;

// mini biểu đồ 2 đường (gold thắng trắng)
const MiniChart: React.FC<{x: number; y: number; w: number; h: number}> = ({x, y, w, h}) => {
  const N = 40;
  const gold = (t: number) => Math.pow(t, 1.7);
  const white = (t: number) => Math.pow(t, 1.25) * 0.62;
  const pts = (fn: (t: number) => number) => Array.from({length: N + 1}, (_, i) => {const t = i / N; return `${x + t * w},${y + h - fn(t) * h}`;}).join(' ');
  return <svg width="1280" height="720" style={{position: 'absolute', inset: 0}}>
    <line x1={x} y1={y + h} x2={x + w} y2={y + h} stroke="#3a3c40" strokeWidth={2} />
    <line x1={x} y1={y} x2={x} y2={y + h} stroke="#3a3c40" strokeWidth={2} />
    <polyline points={pts(white)} fill="none" stroke="#e8e8ea" strokeWidth={5} strokeLinecap="round" opacity={0.9} />
    <polyline points={pts(gold)} fill="none" stroke={GOLD} strokeWidth={7} strokeLinecap="round" style={{filter: 'drop-shadow(0 0 8px rgba(233,196,106,.8))'}} />
    <circle cx={x + w} cy={y + h - white(1) * h} r={8} fill="#e8e8ea" />
    <circle cx={x + w} cy={y + h - gold(1) * h} r={11} fill={GOLD} style={{filter: 'drop-shadow(0 0 10px rgba(233,196,106,1))'}} />
  </svg>;
};

const V1: React.FC = () => <>
  <Bg />
  <div style={{position: 'absolute', left: 70, top: 96}}>
    <div style={{fontFamily: FH, fontWeight: 800, fontSize: 128, color: '#f0f0f2', letterSpacing: 1, textShadow: glowW, lineHeight: 1.02}}>THUÊ NHÀ</div>
    <div style={{fontFamily: FH, fontWeight: 800, fontSize: 128, color: GOLD, letterSpacing: 1, textShadow: glowGold, lineHeight: 1.04}}>GIÀU HƠN?</div>
    <div style={{marginTop: 26, fontFamily: FN, fontWeight: 400, fontSize: 40, color: GRAY, letterSpacing: 1}}>Sau <span style={{color: '#e8e8ea'}}>20 năm</span>, ai cầm nhiều tiền hơn?</div>
  </div>
  <MiniChart x={812} y={300} w={360} h={300} />
  <div style={{position: 'absolute', left: 1112, top: 268, fontFamily: FH, fontWeight: 800, fontSize: 52, color: GOLD, textShadow: glowGold, transform: 'rotate(-6deg)'}}>+7 tỷ</div>
  <div style={{position: 'absolute', left: 70, bottom: 46, fontFamily: FN, fontWeight: 500, fontSize: 27, color: GRAY, letterSpacing: 6}}>SỰ THẬT CON SỐ · 2026</div>
</>;

const V2: React.FC = () => <>
  <Bg />
  <div style={{position: 'absolute', left: 0, right: 0, top: 74, textAlign: 'center', fontFamily: FH, fontWeight: 800, fontSize: 120, color: '#f0f0f2', letterSpacing: 1, textShadow: glowW}}>
    MUA <span style={{color: GRAY, fontFamily: FN, fontWeight: 300, fontSize: 84}}>hay</span> THUÊ?
  </div>
  <div style={{position: 'absolute', left: 96, top: 300, textAlign: 'center', width: 460}}>
    <div style={{fontFamily: FN, fontWeight: 500, fontSize: 44, color: GRAY, letterSpacing: 2}}>MUA NHÀ</div>
    <div style={{fontFamily: FH, fontWeight: 800, fontSize: 128, color: '#e8e8ea', textShadow: glowW, lineHeight: 1.1}}>10,8<span style={{fontSize: 60, color: GRAY}}> tỷ</span></div>
  </div>
  <div style={{position: 'absolute', left: 0, right: 0, top: 386, textAlign: 'center', fontFamily: FN, fontWeight: 300, fontSize: 56, color: GRAY}}>vs</div>
  <div style={{position: 'absolute', right: 96, top: 300, textAlign: 'center', width: 460}}>
    <div style={{fontFamily: FN, fontWeight: 500, fontSize: 44, color: GOLD, letterSpacing: 2}}>THUÊ + ĐẦU TƯ</div>
    <div style={{fontFamily: FH, fontWeight: 800, fontSize: 128, color: GOLD, textShadow: glowGold, lineHeight: 1.1}}>18<span style={{fontSize: 60, color: GRAY}}> tỷ</span></div>
  </div>
  <div style={{position: 'absolute', left: 0, right: 0, bottom: 44, textAlign: 'center', fontFamily: FN, fontWeight: 500, fontSize: 30, color: GRAY, letterSpacing: 5}}>TUỔI 30 · CON SỐ THẬT 2026</div>
</>;

const V3: React.FC = () => <>
  <Bg />
  <div style={{position: 'absolute', left: 70, top: 120}}>
    <div style={{position: 'relative', display: 'inline-block'}}>
      <div style={{fontFamily: FH, fontWeight: 800, fontSize: 96, color: '#c9cace', letterSpacing: 1, opacity: 0.9}}>AN CƯ LẠC NGHIỆP</div>
      <svg width="820" height="30" style={{position: 'absolute', left: -10, top: 62}}><line x1={0} y1={16} x2={800} y2={12} stroke={RED} strokeWidth={7} strokeLinecap="round" style={{filter: 'drop-shadow(0 0 8px rgba(229,72,77,.7))'}} /></svg>
    </div>
    <div style={{marginTop: 42, fontFamily: FH, fontWeight: 800, fontSize: 116, color: '#f0f0f2', textShadow: glowW, lineHeight: 1.05}}>Còn đúng ở <span style={{color: GOLD, textShadow: glowGold}}>2026?</span></div>
    <div style={{marginTop: 30, fontFamily: FN, fontWeight: 400, fontSize: 40, color: GRAY}}>Mua nhà — hay <span style={{color: '#e8e8ea'}}>thuê + đầu tư</span>?</div>
  </div>
  <div style={{position: 'absolute', left: 70, bottom: 46, fontFamily: FN, fontWeight: 500, fontSize: 27, color: GRAY, letterSpacing: 6}}>CHUYỆN TIỀN · 2026</div>
</>;

// nền ảnh AI + đắp chữ Việt median
const AiBg: React.FC<{src: string}> = ({src}) => <>
  <AbsoluteFill><Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></AbsoluteFill>
  <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(4,4,6,0.72) 0%, rgba(4,4,6,0.25) 34%, transparent 55%)'}} />
  <AbsoluteFill style={{background: 'radial-gradient(70% 55% at 50% 46%, transparent 60%, rgba(0,0,0,0.42) 100%)'}} />
</>;
const tShadow = '0 3px 18px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,1)';

// V4 — ảnh "ngã ba đường": nhà trái vs đường vàng phải
const V4: React.FC = () => <>
  <AiBg src="thumb/ai_cross.png" />
  <div style={{position: 'absolute', left: 0, right: 0, top: 48, textAlign: 'center'}}>
    <div style={{fontFamily: FH, fontWeight: 800, fontSize: 104, color: '#f4f4f6', letterSpacing: 1, textShadow: `${tShadow}, ${glowW}`}}>MUA <span style={{color: GRAY, fontFamily: FN, fontWeight: 300}}>hay</span> THUÊ?</div>
    <div style={{marginTop: 14, fontFamily: FN, fontWeight: 400, fontSize: 40, color: '#dcdce0', textShadow: tShadow}}>Tuổi 30 — bạn đi đường nào?</div>
  </div>
  <div style={{position: 'absolute', left: 150, top: 452, fontFamily: FN, fontWeight: 700, fontSize: 40, color: '#f4f4f6', letterSpacing: 2, textShadow: tShadow}}>AN CƯ</div>
  <div style={{position: 'absolute', right: 150, top: 300, textAlign: 'right', fontFamily: FN, fontWeight: 700, fontSize: 40, color: GOLD, letterSpacing: 1, textShadow: `${tShadow}, ${glowGold}`}}>THUÊ + ĐẦU TƯ</div>
  <div style={{position: 'absolute', left: 66, bottom: 40, fontFamily: FN, fontWeight: 500, fontSize: 26, color: '#c8c9cd', letterSpacing: 6, textShadow: tShadow}}>CHUYỆN TIỀN · 2026</div>
</>;

// V5 — ảnh "chìa khoá vs vàng tăng trưởng"
const V5: React.FC = () => <>
  <AiBg src="thumb/ai_keycoin.png" />
  <div style={{position: 'absolute', left: 0, right: 0, top: 60, textAlign: 'center'}}>
    <div style={{fontFamily: FH, fontWeight: 800, fontSize: 108, color: '#f4f4f6', letterSpacing: 1, textShadow: `${tShadow}, ${glowW}`, lineHeight: 1.0}}>THUÊ NHÀ</div>
    <div style={{fontFamily: FH, fontWeight: 800, fontSize: 108, color: GOLD, letterSpacing: 1, textShadow: `${tShadow}, ${glowGold}`, lineHeight: 1.08}}>GIÀU HƠN MUA?</div>
  </div>
  <div style={{position: 'absolute', left: 0, right: 0, top: 328, textAlign: 'center', fontFamily: FN, fontWeight: 400, fontSize: 40, color: '#dcdce0', textShadow: tShadow}}>Sau 20 năm, ai cầm nhiều tiền hơn?</div>
  <div style={{position: 'absolute', left: 66, bottom: 40, fontFamily: FN, fontWeight: 500, fontSize: 26, color: '#c8c9cd', letterSpacing: 6, textShadow: tShadow}}>SỰ THẬT CON SỐ · 2026</div>
</>;

export const MuaThueThumb: React.FC<{v?: number}> = ({v = 1}) =>
  <AbsoluteFill style={{backgroundColor: '#060607'}}>{v === 2 ? <V2 /> : v === 3 ? <V3 /> : v === 4 ? <V4 /> : v === 5 ? <V5 /> : <V1 />}</AbsoluteFill>;
