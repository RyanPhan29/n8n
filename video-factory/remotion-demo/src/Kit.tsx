import React from 'react';
import {
  AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig,
  interpolate, spring, OffthreadVideo, Img, Audio, staticFile, Loop, Easing,
} from 'remotion';

// SFX helper — phát 1 tiếng tại frame `at` (layout none: không chèn DOM, chỉ âm thanh)
export const Sfx: React.FC<{name: string; at: number; vol?: number; len?: number}> = ({name, at, vol = 0.25, len = 24}) => (
  <Sequence from={Math.max(0, Math.round(at))} durationInFrames={len} layout="none">
    <Audio src={staticFile('sfx/' + name + '.wav')} volume={vol} />
  </Sequence>
);
import './fonts.css';

export const NAVY = '#16305c', RED = '#e11d2a', TEAL = '#159a86', BLUE = '#1657d6', INK = '#16223a', GOLD = '#f2c230', GRAY = '#6b7280', AMBER = '#f59e0b';
export const CONTENT_R_AH = 640; // caption né Anh Hai góc phải

export const Paper: React.FC = () => (
  <AbsoluteFill>
    <Loop durationInFrames={2400}><OffthreadVideo src={staticFile('paper_bg.mp4')} muted /></Loop>
    <AbsoluteFill style={{background: 'rgba(255,255,255,0.28)'}} />
  </AbsoluteFill>
);

export const TopBar: React.FC<{color: string}> = ({color}) => {
  const f = useCurrentFrame();
  const w = interpolate(f, [0, 14], [0, 100], {extrapolateRight: 'clamp'});
  return <div style={{position: 'absolute', top: 0, left: 0, height: 14, width: `${w}%`, background: color}} />;
};

export const Logo: React.FC = () => (
  <div style={{position: 'absolute', top: 40, left: 60, fontFamily: 'Mont', fontWeight: 900, color: NAVY, fontSize: 30, letterSpacing: 0.5}}>
    CHUYỆN TIỀN <span style={{color: '#c99700'}}>· ANH HAI KỂ</span>
  </div>
);

export const pop = (f: number, fps: number, delay = 0) => spring({frame: f - delay, fps, config: {damping: 14, mass: 0.7}});

export const Heading: React.FC<{children: React.ReactNode; top?: number; size?: number; ah?: boolean}> = ({children, top = 150, size = 76, ah = false}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, 2);
  // khi có Anh Hai: thu mép phải để title KHÔNG tràn vào nhân vật; balance = không mồ côi chữ
  return <div style={{position: 'absolute', top, left: 60, right: ah ? 500 : 60, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: size, lineHeight: 1.12, color: INK, textWrap: 'balance', transform: `scale(${0.9 + s * 0.1})`, opacity: interpolate(f, [0, 8], [0, 1], {extrapolateRight: 'clamp'})}}>{children}</div>;
};

export const Pill: React.FC<{children: React.ReactNode; color?: string; delay?: number; size?: number}> = ({children, color = NAVY, delay = 0, size = 42}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, delay);
  return (<>
    <Sfx name="pop" at={delay} vol={0.22} len={10} />
    <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, border: `5px solid ${color}`, color, borderRadius: 40, padding: '18px 38px', maxWidth: 1140, textAlign: 'center', whiteSpace: 'normal', lineHeight: 1.18, fontFamily: 'BVP', fontWeight: 800, fontSize: size, background: 'rgba(255,255,255,0.9)', transform: `scale(${s})`, opacity: interpolate(f, [delay, delay + 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>{children}</div>
  </>);
};

export const Caption: React.FC<{children: React.ReactNode; delay?: number; ah?: boolean}> = ({children, delay = 6, ah = false}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [delay, delay + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const y = interpolate(f, [delay, delay + 10], [24, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <div style={{position: 'absolute', bottom: 90, left: 90, right: ah ? CONTENT_R_AH : 160, textAlign: ah ? 'left' : 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 44, lineHeight: 1.35, color: '#2b2f36', opacity: o, transform: `translateY(${y}px)`}}>{children}</div>;
};

export const K: React.FC<{children: React.ReactNode; c?: string}> = ({children, c = TEAL}) => <span style={{color: c}}>{children}</span>;

// ANH HAI CHÍNH THỨC = bộ ảnh cảm xúc (khoá nhân vật). Map pose -> file ảnh.
const AH_IMG: Record<string, string> = {
  point: 'point', host: 'present', present: 'present', approve: 'point',
  smug: 'cool', cool: 'cool', sly: 'sly', shock: 'shock', think: 'think',
  worried: 'worried', greedy: 'greedy', excited: 'excited', broke: 'broke',
  facepalm: 'facepalm', cry: 'cry', laugh: 'laugh', celebrate: 'celebrate', shrug: 'shrug', pointup: 'pointup',
  // 7 pose mới
  angry: 'angry', mad: 'angry', warning: 'warning', stop: 'warning',
  aha: 'aha', idea: 'aha', lightbulb: 'aha',
  secret: 'secret', shh: 'secret', cash: 'cash', money: 'cash',
  chill: 'chill', relax: 'chill', thumbsdown: 'thumbsdown', bad: 'thumbsdown', no: 'thumbsdown',
};
export const AnhHai: React.FC<{pose?: string; x: number; y: number; scale?: number; delay?: number; shirt?: string; h?: number; female?: boolean; bottom?: number; cx?: boolean}> = ({pose = 'point', x, y, scale = 1, delay = 4, shirt = GOLD, h = 600, female = false, bottom = -12, cx = false}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, delay);
  const bob = Math.sin(f / 10) * 4;
  // Nhân vật phụ (áo khác GOLD) -> giữ người-que code để phân biệt người khác Anh Hai
  if (shirt && shirt !== GOLD) return <StickPerson pose={pose} x={x} y={y} scale={scale} delay={delay} shirt={shirt} female={female} />;
  const src = staticFile('ah/' + (AH_IMG[pose] || 'point') + '.png');
  const H = h * scale;
  const pos = cx ? {left: '50%' as const} : {left: x};
  const txx = cx ? 'translateX(-50%) ' : '';
  return (
    <Img src={src} style={{position: 'absolute', ...pos, bottom, height: H, width: 'auto', transform: `${txx}scale(${s}) translateY(${bob}px)`, transformOrigin: 'bottom center'}} />
  );
};

const StickPerson: React.FC<{pose?: string; x: number; y: number; scale?: number; delay?: number; shirt?: string; female?: boolean}> = ({pose = 'point', x, y, scale = 1, delay = 4, shirt = GOLD, female = false}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, delay);
  const bob = Math.sin(f / 10) * 4;
  const stroke = {fill: 'none', stroke: '#1c1c22', strokeWidth: 9, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const};
  const thin = {stroke: '#1c1c22', strokeWidth: 7, fill: 'none', strokeLinecap: 'round' as const};
  let face: React.ReactNode, arm: React.ReactNode;
  if (pose === 'smug') {
    face = (<g {...thin}><path d="M188 145 q17 10 34 0"/><path d="M250 145 q17 10 34 0"/><path d="M200 195 q34 16 66 0"/></g>);
    arm = (<g {...stroke}><path d="M168 300 q-60 30 -70 120"/><path d="M320 300 q60 30 70 120"/></g>);
  } else if (pose === 'shock') {
    face = (<g {...thin}><circle cx="205" cy="140" r="12" fill="#1c1c22"/><circle cx="267" cy="140" r="12" fill="#1c1c22"/><ellipse cx="236" cy="200" rx="26" ry="32" fill="#1c1c22"/></g>);
    arm = (<g {...stroke}><path d="M168 300 q-50 -40 -60 -120"/><path d="M320 300 q50 -40 60 -120"/></g>);
  } else if (pose === 'sly') {
    face = (<g {...thin}><path d="M188 150 q17 -12 34 -2"/><circle cx="267" cy="142" r="10" fill="#1c1c22"/><path d="M205 198 q30 10 58 -4"/></g>);
    arm = (<g {...stroke}><path d="M168 300 q-60 20 -70 110"/><path d="M320 300 q60 30 46 150"/></g>);
  } else if (pose === 'think') {
    face = (<g {...thin}><path d="M188 145 l34 6"/><path d="M250 151 l34 -6"/><circle cx="236" cy="198" r="10" fill="#1c1c22"/></g>);
    arm = (<g {...stroke}><path d="M168 300 q-50 40 -20 120"/><path d="M320 300 q70 -10 40 -110"/><circle cx="360" cy="196" r="10" fill="#1c1c22"/></g>);
  } else {
    face = (<g {...thin}><path d="M188 140 q16 -12 34 0"/><path d="M250 140 q16 -12 34 0"/><path d="M198 195 q34 22 66 2"/></g>);
    arm = (<g {...stroke}><path d="M168 300 q-70 -20 -110 -110"/><circle cx="52" cy="182" r="12" fill="#1c1c22"/><path d="M320 300 q60 40 40 150"/></g>);
  }
  return (
    <div style={{position: 'absolute', left: x, top: y + bob, width: 420 * scale, transform: `scale(${s})`, transformOrigin: 'bottom center'}}>
      <svg width={420} height={520} viewBox="0 0 420 520">
        <ellipse cx={230} cy={150} rx={96} ry={100} fill="#fff" {...stroke} />
        {female && (<g fill="#2b2b30" stroke="#1c1c22" strokeWidth={3} strokeLinejoin="round">
          <path d="M128 154 C 128 14 332 14 332 154 C 302 120 158 120 128 154 Z" />
          <path d="M142 130 q-30 100 -16 210 q20 6 28 -30 q-12 -92 4 -166 z" />
          <path d="M318 130 q30 100 16 210 q-20 6 -28 -30 q12 -92 -4 -166 z" />
        </g>)}
        <path d="M150 250 q80 40 168 0" {...stroke} />
        <path d="M150 255 q80 42 168 0 l30 220 q-115 40 -228 0 z" fill={shirt} stroke="#1c1c22" strokeWidth={9} strokeLinejoin="round" />
        {arm}{face}
      </svg>
    </div>
  );
};

export const Bubble: React.FC<{children: React.ReactNode; x: number; y: number; delay?: number}> = ({children, x, y, delay = 10}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, delay);
  return <div style={{position: 'absolute', left: x, top: y, background: NAVY, color: '#fff', fontFamily: 'BVP', fontWeight: 800, fontSize: 40, padding: '20px 30px', borderRadius: 24, transform: `scale(${s})`, transformOrigin: 'right center'}}>{children}</div>;
};

export const Arrow: React.FC<{children?: React.ReactNode; delay?: number}> = ({children, delay = 8}) => {
  const f = useCurrentFrame();
  return <div style={{fontFamily: 'BVP', fontWeight: 900, fontSize: 52, color: NAVY, opacity: interpolate(f, [delay, delay + 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>{children ?? '↓'}</div>;
};

export const Stack: React.FC<{children: React.ReactNode; top?: number; right?: number; gap?: number}> = ({children, top = 360, right = 0, gap = 34}) => (
  <div style={{position: 'absolute', top, left: 0, right, display: 'flex', flexDirection: 'column', alignItems: 'center', gap}}>{children}</div>
);

export const Counter: React.FC<{to: number; suffix?: string; delay?: number; dur?: number; decimals?: number}> = ({to, suffix = '', delay = 4, dur = 40, decimals = 0}) => {
  const f = useCurrentFrame();
  const v = interpolate(f, [delay, delay + dur], [0, to], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const shown = decimals ? v.toFixed(decimals).replace('.', ',') : Math.round(v).toLocaleString('vi-VN');
  return (<>
    <Sfx name="ticker" at={delay} vol={0.2} len={Math.round(dur) + 8} />
    <Sfx name="ding" at={delay + dur} vol={0.3} len={20} />
    <span>{shown}{suffix}</span>
  </>);
};

// ---- timeline builder: scenes back-to-back, fade in/out lands in silence ----
export type Sc = {c: React.FC; d: number};
const XF = 8;
const SceneWrap: React.FC<{s: Sc; from: number}> = ({s, from}) => {
  const f = useCurrentFrame();
  const local = f - from;
  const o = interpolate(local, [0, XF, s.d - XF, s.d], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const S = s.c;
  return <Sequence from={from} durationInFrames={s.d}><Sfx name="whoosh" at={0} vol={0.16} len={14} /><AbsoluteFill style={{opacity: o}}><S /></AbsoluteFill></Sequence>;
};
export const totalFrames = (scenes: Sc[]) => scenes.reduce((a, s) => a + s.d, 0);
export const Timeline: React.FC<{scenes: Sc[]}> = ({scenes}) => {
  let acc = 0;
  const seqs = scenes.map((s, i) => { const from = acc; acc += s.d; return <SceneWrap key={i} s={s} from={from} />; });
  return <AbsoluteFill style={{backgroundColor: '#f4f1ec'}}><Paper />{seqs}</AbsoluteFill>;
};
export {Easing, useCurrentFrame, useVideoConfig, interpolate, AbsoluteFill};
