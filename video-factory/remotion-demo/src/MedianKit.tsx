import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, Easing, OffthreadVideo, staticFile} from 'remotion';
import './median-fonts.css';

/* ===== BỘ KIT MEDIAN dùng chung cho thư viện explainer median-lite =====
   Nền + film grain động · khung archival · chú thích vẽ tay (spotlight/hand-circle/bracket). */
export const INK = '#e8e8ea', GRAY = '#7d7f83', DIM = '#4a4c50', GOLD = '#e9c46a', RED = '#e0603a';
export const FN = "'BVPm','BVP',sans-serif", FH = "'Mont','BVP',sans-serif";
export const CLAMP = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const eOut = Easing.out(Easing.cubic);
export const glowGold = '0 0 10px rgba(233,196,106,.6),0 0 30px rgba(233,196,106,.4),0 0 60px rgba(233,196,106,.2)';
export const glowRed = '0 0 10px rgba(224,96,58,.6),0 0 30px rgba(224,96,58,.4),0 0 60px rgba(224,96,58,.2)';
export const glowW = '0 0 8px rgba(255,255,255,.5),0 0 24px rgba(255,255,255,.3)';
export const fIn = (f: number, a: number, d = 16) => interpolate(f, [a, a + d], [0, 1], CLAMP);

/* Film grain ĐỘNG — seed đổi mỗi frame → nhiễu hạt nhấp nháy như phim. */
export const FilmGrain: React.FC<{opacity?: number}> = ({opacity = 0.14}) => {
  const f = useCurrentFrame();
  const seed = f % 24;
  return <svg width="1920" height="1080" style={{position: 'absolute', inset: 0, opacity, mixBlendMode: 'overlay', pointerEvents: 'none'}}>
    <filter id={`grain${seed}`}>
      <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="2" seed={seed} stitchTiles="stitch" />
      <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0" />
    </filter>
    <rect width="1920" height="1080" filter={`url(#grain${seed})`} />
  </svg>;
};

/* Nền median: radial trôi nhẹ + grain động. */
export const Bg: React.FC<{grain?: number}> = ({grain = 0.14}) => {
  const f = useCurrentFrame();
  const dx = Math.sin(f / 150) * 1.3, dy = Math.cos(f / 190) * 1.0;
  return <>
    <AbsoluteFill style={{background: `radial-gradient(120% 92% at ${50 + dx}% ${44 + dy}%, #0d0d0e 0%, #0b0b0c 46%, #080809 100%)`}} />
    <FilmGrain opacity={grain} />
  </>;
};

/* Spotlight: tối xung quanh, chừa 1 vùng sáng ở (fx,fy). */
export const Spotlight: React.FC<{fx: number; fy: number; r: number; o: number; dark?: number}> =
  ({fx, fy, r, o, dark = 0.7}) =>
    <AbsoluteFill style={{opacity: o, background: `radial-gradient(circle ${r}px at ${fx}px ${fy}px, transparent 0%, transparent 62%, rgba(8,8,10,${dark}) 100%)`, pointerEvents: 'none'}} />;

/* Vòng khoanh VẼ TAY — 2 lớp lệch nhẹ + hơi lố (đuôi), vẽ dần. */
export const HandCircle: React.FC<{cx: number; cy: number; rx: number; ry: number; color?: string; start: number; dur?: number; rot?: number}> =
  ({cx, cy, rx, ry, color = GOLD, start, dur = 26, rot = -6}) => {
    const f = useCurrentFrame();
    const PER = 2 * Math.PI * Math.sqrt((rx * rx + ry * ry) / 2);
    const p = interpolate(f, [start, start + dur], [0, 1], {easing: eOut, ...CLAMP});
    const o = fIn(f, start, 8);
    if (o <= 0.001) return null;
    const off = PER * 1.08 * (1 - p);              // 1.08 = hơi lố cho có đuôi
    const glow = color === RED ? 'drop-shadow(0 0 8px rgba(224,96,58,.7))' : 'drop-shadow(0 0 8px rgba(233,196,106,.7))';
    return <g opacity={o} style={{filter: glow}}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={color} strokeWidth={4} strokeLinecap="round"
        strokeDasharray={PER * 1.1} strokeDashoffset={off} transform={`rotate(${rot} ${cx} ${cy})`} />
      <ellipse cx={cx + 3} cy={cy - 2} rx={rx * 0.99} ry={ry * 1.02} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round"
        opacity={0.5} strokeDasharray={PER * 1.1} strokeDashoffset={off * 1.02} transform={`rotate(${rot + 2} ${cx} ${cy})`} />
    </g>;
  };

/* Bracket đo — [__ nhãn __] vẽ dần, dùng để "đo" 1 vùng. */
export const Bracket: React.FC<{x1: number; x2: number; y: number; tick?: number; color?: string; start: number; down?: boolean}> =
  ({x1, x2, y, tick = 16, color = GOLD, start, down = true}) => {
    const f = useCurrentFrame();
    const p = interpolate(f, [start, start + 18], [0, 1], {easing: eOut, ...CLAMP});
    const o = fIn(f, start, 8);
    if (o <= 0.001) return null;
    const dir = down ? 1 : -1;
    const midX = (x1 + x2) / 2, halfW = ((x2 - x1) / 2) * p;
    return <g opacity={o} style={{filter: 'drop-shadow(0 0 5px rgba(233,196,106,.5))'}}>
      <line x1={midX - halfW} y1={y} x2={midX + halfW} y2={y} stroke={color} strokeWidth={3} strokeLinecap="round" />
      <line x1={x1} y1={y} x2={x1} y2={y + dir * tick} stroke={color} strokeWidth={3} strokeLinecap="round" opacity={p > 0.9 ? 1 : 0} />
      <line x1={x2} y1={y} x2={x2} y2={y + dir * tick} stroke={color} strokeWidth={3} strokeLinecap="round" opacity={p > 0.9 ? 1 : 0} />
    </g>;
  };

/* Khung archival B&W bọc footage/ảnh — góc gold, grain phủ, Ken Burns. */
export const FramedShot: React.FC<{src: string; x: number; y: number; w: number; h: number; start?: number; bright?: number; grayscale?: number; rate?: number}> =
  ({src, x, y, w, h, start = 0, bright = 0.64, grayscale = 0.72, rate = 0.5}) => {
    const f = useCurrentFrame();
    const s = interpolate(f, [start, start + 24], [0.955, 1], {easing: eOut, ...CLAMP});
    const kb = 1.1 + f * 0.0006;
    const filt = `grayscale(${grayscale}) contrast(1.08) brightness(${bright}) saturate(1.05)`;
    return <div style={{position: 'absolute', left: x, top: y, width: w, height: h, transform: `scale(${s})`, transformOrigin: 'center'}}>
      <div style={{position: 'absolute', inset: -70, background: 'radial-gradient(circle at 50% 45%, rgba(233,196,106,0.10), rgba(233,196,106,0.02) 42%, transparent 72%)'}} />
      <div style={{position: 'absolute', inset: 0, border: '2px solid rgba(232,232,234,0.82)', boxShadow: '0 0 46px rgba(0,0,0,0.7)', overflow: 'hidden', borderRadius: 2}}>
        <OffthreadVideo src={staticFile(src)} muted playbackRate={rate} style={{width: '100%', height: '100%', objectFit: 'cover', filter: filt, transform: `scale(${kb})`}} />
        <div style={{position: 'absolute', inset: 0, boxShadow: 'inset 0 0 100px rgba(8,8,10,0.85)'}} />
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 52%, rgba(8,8,10,0.6) 100%)'}} />
      </div>
      {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([gx, gy], i) => <div key={i} style={{position: 'absolute', [gx ? 'right' : 'left']: -1, [gy ? 'bottom' : 'top']: -1, width: 22, height: 22, borderTop: gy ? 'none' : '2px solid rgba(233,196,106,.9)', borderBottom: gy ? '2px solid rgba(233,196,106,.9)' : 'none', borderLeft: gx ? 'none' : '2px solid rgba(233,196,106,.9)', borderRight: gx ? '2px solid rgba(233,196,106,.9)' : 'none'}} />)}
    </div>;
  };
