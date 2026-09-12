import React from 'react';
import {OffthreadVideo, staticFile, Sequence, Loop} from 'remotion';
import {
  AbsoluteFill, AnhHai, Sfx, K, pop,
  useCurrentFrame, useVideoConfig, interpolate, Easing,
  NAVY, RED, TEAL, GOLD, INK,
} from './Kit';

export const NOTOT_DURATION = 6825; // 3:47.5 @30fps — khớp notot.mp3

type Fx = 'stamp' | 'punch' | 'sparkle';
type Beat = {
  dur: number; src: string; clip: number; pose: string; ahH?: number;
  label?: string; icon?: string; chips?: boolean; keyword?: string; kwColor?: string; hi?: boolean; fx?: Fx;
  count?: {to: number; pre?: string; suf?: string}; sub?: string; bubble?: React.ReactNode;
};

// neo theo giọng (8 pause ~1,4s = 9 đoạn; tách nhịp dài thành sub-beat)
const BEATS: Beat[] = [
  {dur: 569, src: 'broll/handsbill.mp4', clip: 11, pose: 'worried', keyword: 'NGƯỜI VIỆT\nSỢ NỢ', kwColor: '#fff', hi: true,
    sub: '“Không nợ nần ai” = niềm tự hào'},
  {dur: 339, src: 'broll/people.mp4', clip: 24, pose: 'sly', keyword: 'NGƯỜI GIÀU\nVAY NHIỀU HƠN?', kwColor: '#fff', hi: true, fx: 'punch',
    bubble: <>Với họ, nợ là <K c={GOLD}>công cụ</K> — không phải <K c={RED}>gánh nặng</K>.</>},
  {dur: 210, src: 'broll/budget.mp4', clip: 17, pose: 'point', keyword: 'VAY ĐỂ MUA\nCÁI GÌ?', kwColor: GOLD, hi: true},
  {dur: 412, src: 'broll/cashspin.mp4', clip: 10, pose: 'worried', label: 'NỢ XẤU · TIỀN CHẢY RA', icon: '💸', keyword: 'NỢ ĐỂ TIÊU', kwColor: RED, hi: true,
    sub: 'mua thứ mất giá · không đẻ ra tiền'},
  {dur: 468, src: 'broll/handsbill.mp4', clip: 11, pose: 'warning', keyword: 'LÃI 20–40%\nMỖI NĂM', kwColor: RED, hi: true, fx: 'stamp',
    sub: 'thẻ tín dụng · vay tiêu dùng · app vay'},
  {dur: 575, src: 'broll/coinstack.mp4', clip: 29, pose: 'point', label: 'NỢ TỐT · TIỀN CHẢY VÀO', icon: '📈', keyword: 'NỢ ĐỂ XÂY', kwColor: TEAL, hi: true,
    sub: 'tài sản tự trả nợ cho chính nó'},
  {dur: 476, src: 'broll/piggy.mp4', clip: 15, pose: 'cash', keyword: 'TIỀN THUÊ\nTRẢ HẾT LÃI', kwColor: TEAL, hi: true, fx: 'sparkle',
    sub: 'vay 500tr → thu 6tr/tháng · còn dư'},
  {dur: 790, src: 'broll/richwave.mp4', clip: 17, pose: 'present', label: 'VŨ KHÍ THẬT · ĐÒN BẨY', icon: '⚡', keyword: 'ĐÒN BẨY', kwColor: GOLD, hi: true,
    sub: 'mượn sức tiền ngân hàng để đi nhanh hơn'},
  {dur: 294, src: 'broll/machine.mp4', clip: 21, pose: 'warning', keyword: 'CON DAO\n2 LƯỠI', kwColor: RED, hi: true, fx: 'stamp',
    sub: 'khoan đã hào hứng…'},
  {dur: 720, src: 'broll/crowd.mp4', clip: 37, pose: 'worried', keyword: 'LỜI TO\nLỖ CŨNG TO', kwColor: RED, hi: true,
    sub: 'rớt giá · bỏ trống · lãi tăng = mất tài sản'},
  {dur: 572, src: 'broll/stocks.mp4', clip: 18, pose: 'worried', label: 'VIỆT NAM 2026', icon: '📍', keyword: 'NỢ XẤU\nTRÁ HÌNH', kwColor: RED, hi: true, fx: 'stamp',
    sub: 'vay 10% ôm tài sản chỉ sinh 3–4%'},
  {dur: 743, src: 'broll/budget.mp4', clip: 17, pose: 'point', keyword: 'HỎI 3 CÂU\nTRƯỚC KHI VAY', kwColor: '#fff', hi: true,
    sub: '1· sinh tiền?   2· hơn lãi vay?   3· còn trả nổi?'},
  {dur: 657, src: 'broll/richwave.mp4', clip: 17, pose: 'cool', keyword: 'NỢ ĐỂ XÂY\nHAY ĐỂ TIÊU?', kwColor: GOLD, hi: true,
    bubble: <>Món nợ gần nhất của bạn — <K c={TEAL}>để xây</K> hay <K c={RED}>để tiêu</K>? Gõ cho anh Hai 👇</>},
];

const HL: Record<string, string> = {[GOLD]: 'rgba(242,194,48,0.30)', [RED]: 'rgba(225,29,42,0.32)', [TEAL]: 'rgba(21,154,134,0.34)', '#fff': 'rgba(255,255,255,0.14)'};
const GLOW: Record<string, string> = {[GOLD]: 'rgba(242,194,48,0.55)', [RED]: 'rgba(225,29,42,0.5)', [TEAL]: 'rgba(21,205,170,0.5)', '#fff': 'rgba(180,205,255,0.4)'};

const Broll: React.FC<{b: Beat}> = ({b}) => {
  const f = useCurrentFrame();
  const sc = interpolate(f, [0, b.dur], [1.06, 1.18], {extrapolateRight: 'clamp'});
  const style: React.CSSProperties = {width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.5) contrast(1.07) brightness(0.66) saturate(1.05)', transform: `scale(${sc})`};
  const loopLen = Math.max(30, Math.round(b.clip * 30) - 5);
  return <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
    <Loop durationInFrames={loopLen}><OffthreadVideo src={staticFile(b.src)} muted style={style} /></Loop>
  </div>;
};

const AWord: React.FC<{delay: number; color: string; children: React.ReactNode}> = ({delay, color, children}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const s = pop(f, fps, delay);
  const o = interpolate(f, [delay, delay + 5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const y = interpolate(f, [delay, delay + 10], [30, 0], {easing: Easing.out(Easing.back(1.6)), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <span style={{display: 'inline-block', opacity: o, transform: `translateY(${y}px) scale(${s})`, color, margin: '0 0.16em', textShadow: `0 0 24px ${GLOW[color] || 'rgba(0,0,0,0.4)'}, 4px 5px 0 #0a0f1c`}}>{children}</span>;
};

const CountUp: React.FC<{to: number; delay: number; color: string; pre?: string; suf?: string}> = ({to, delay, color, pre, suf}) => {
  const f = useCurrentFrame();
  const v = interpolate(f, [delay, delay + 26], [0, to], {easing: Easing.out(Easing.cubic), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const s = pop(f, useVideoConfig().fps, delay);
  return <span style={{display: 'inline-block', color, transform: `scale(${s})`, textShadow: `0 0 30px ${GLOW[color] || GLOW[GOLD]}, 4px 5px 0 #0a0f1c`}}>{pre}{v.toFixed(1).replace('.', ',')}{suf}</span>;
};

const Scribble: React.FC<{color: string; start: number}> = ({color, start}) => {
  const f = useCurrentFrame();
  const off = interpolate(f, [start + 10, start + 30], [640, 0], {easing: Easing.out(Easing.cubic), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <svg viewBox="0 0 620 42" width="60%" height="34" style={{overflow: 'visible', margin: '8px auto 0', display: 'block'}}>
    <path d="M6,24 Q70,6 140,22 T280,22 Q360,30 430,18 T610,20" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
      strokeDasharray="640" strokeDashoffset={off} style={{filter: `drop-shadow(0 0 10px ${GLOW[color] || GLOW[GOLD]})`}} />
  </svg>;
};

const Sparkles: React.FC<{start: number}> = ({start}) => {
  const f = useCurrentFrame();
  const spots = [['14%', 6, 60], ['82%', 20, 74], ['26%', 150, 52], ['72%', 158, 66], ['48%', -20, 44], ['62%', 176, 50]];
  return <>{spots.map((sp, i) => {
    const d = start + 8 + i * 3;
    const s = pop(f, useVideoConfig().fps, d);
    const o = interpolate(f, [d, d + 6, d + 40, d + 52], [0, 1, 1, 0.5], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    const fl = Math.sin((f - d) / 6) * 4;
    return <span key={i} style={{position: 'absolute', left: sp[0] as string, top: sp[1] as number, fontSize: sp[2] as number, opacity: o, transform: `scale(${s}) translateY(${fl}px)`, filter: 'drop-shadow(0 0 12px rgba(242,194,48,0.8))'}}>✨</span>;
  })}</>;
};

const KeywordBlock: React.FC<{b: Beat; start: number}> = ({b, start}) => {
  const f = useCurrentFrame();
  const kwColor = b.kwColor || '#fff';
  const pulse = 1 + 0.012 * Math.sin((f - start) / 9);
  let tf = `scale(${pulse})`;
  if (b.fx === 'stamp') {
    const slam = interpolate(f, [start, start + 7], [1.7, 1], {easing: Easing.out(Easing.back(2)), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    const shk = interpolate(f, [start + 2, start + 20], [8, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    tf = `rotate(-5deg) translateX(${Math.sin((f - start) * 1.7) * shk}px) scale(${pulse * slam})`;
  } else if (b.fx === 'punch') {
    const slam = interpolate(f, [start, start + 8], [1.5, 1], {easing: Easing.out(Easing.back(1.8)), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    tf = `scale(${pulse * slam})`;
  }
  const lines = (b.keyword || '').split('\n');
  let wi = 0;
  return <div style={{position: 'absolute', top: b.label ? 250 : 200, left: 40, right: 40, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 128, lineHeight: 1.08, letterSpacing: 1, transform: tf}}>
    {b.fx === 'sparkle' && <Sparkles start={start} />}
    {lines.map((line, li) => {
      const isLast = li === lines.length - 1;
      const words = line.split(' ');
      return <div key={li}><div style={{position: 'relative', display: 'inline-block', padding: '0 10px'}}>
        {b.hi && isLast && <div style={{position: 'absolute', left: 0, right: 0, top: '14%', bottom: '14%', background: HL[kwColor] || HL['#fff'], borderRadius: 14, transform: `scaleX(${interpolate(f, [start + li * 6 + 3, start + li * 6 + 13], [0, 1], {easing: Easing.out(Easing.cubic), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})})`, transformOrigin: 'left center', zIndex: -1}} />}
        {words.map((w, k) => { const d = start + (wi++) * 2.5; return <AWord key={k} delay={d} color={kwColor}>{w}</AWord>; })}
      </div></div>;
    })}
    {b.count && <div style={{fontSize: 150}}><CountUp to={b.count.to} delay={start + wi * 2.5 + 4} color={GOLD} pre={b.count.pre} suf={b.count.suf} /></div>}
    <Scribble color={kwColor} start={start} />
  </div>;
};

const Bubble: React.FC<{delay: number; x: number; y: number; w: number; children: React.ReactNode}> = ({delay, x, y, w, children}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, delay);
  return <div style={{position: 'absolute', left: x, top: y, width: w, transform: `scale(${s})`, transformOrigin: 'bottom left'}}>
    <Sfx name="pop" at={delay} vol={0.2} len={9} />
    <div style={{background: '#fff', border: `6px solid ${NAVY}`, borderRadius: 28, padding: '24px 32px', fontFamily: 'Mont', fontWeight: 900, fontSize: 48, color: INK, lineHeight: 1.25, boxShadow: '0 16px 34px rgba(0,0,0,0.45)'}}>{children}</div>
    <div style={{position: 'absolute', left: 56, bottom: -24, width: 0, height: 0, borderLeft: '16px solid transparent', borderRight: '28px solid transparent', borderTop: `28px solid ${NAVY}`}} />
  </div>;
};

const Scene: React.FC<{b: Beat}> = ({b}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const labS = pop(f, fps, 3);
  const labX = interpolate(f, [3, 14], [-70, 0], {easing: Easing.out(Easing.back(1.5)), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const subBar = interpolate(f, [30, 40], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const subWords = (b.sub || '').split(' ');
  return <AbsoluteFill>
    <Broll b={b} />
    <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,12,25,0.6) 0%, rgba(8,12,25,0.05) 30%, rgba(8,12,25,0.2) 62%, rgba(8,12,25,0.82) 100%)'}} />
    <div style={{position: 'absolute', top: 40, left: 54, fontFamily: 'Mont', fontWeight: 900, fontSize: 34, color: '#fff', letterSpacing: 1, textShadow: '0 2px 8px rgba(0,0,0,0.7)'}}>CHUYỆN TIỀN <span style={{color: GOLD}}>· ANH HAI KỂ</span></div>

    {b.label && <div style={{position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center', transform: `translateX(${labX}px) scale(${labS})`}}>
      <span style={{display: 'inline-flex', alignItems: 'center', gap: 14, background: RED, color: '#fff', fontFamily: 'Mont', fontWeight: 900, fontSize: 46, padding: '12px 34px', borderRadius: 12, letterSpacing: 1, boxShadow: '0 10px 24px rgba(0,0,0,0.5)'}}>{b.icon && <span style={{fontSize: 50}}>{b.icon}</span>}{b.label}</span>
    </div>}

    {b.keyword && <KeywordBlock b={b} start={12} />}

    {b.sub && <div style={{position: 'absolute', top: 648, left: 470, right: 50, textAlign: 'center'}}>
      <span style={{display: 'inline-flex', alignItems: 'center', gap: 16, fontFamily: 'BVP', fontWeight: 800, fontSize: 46, color: '#eef2fc', textShadow: '0 3px 12px rgba(0,0,0,0.9)'}}>
        <span style={{width: 8, height: 40, background: GOLD, borderRadius: 4, transform: `scaleY(${subBar})`, boxShadow: `0 0 14px ${GLOW[GOLD]}`}} />
        <span>{subWords.map((w, i) => { const d = 32 + i * 1.6; const o = interpolate(f, [d, d + 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}); return <span key={i} style={{opacity: o, margin: '0 0.12em', display: 'inline-block'}}>{w}</span>; })}</span>
      </span>
    </div>}

    <div style={{position: 'absolute', left: 40, bottom: 0, width: 720, height: 280, background: 'radial-gradient(ellipse at 42% 92%, rgba(0,0,0,0.62), rgba(0,0,0,0) 70%)'}} />
    <AnhHai pose={b.pose} x={70} y={330} delay={6} h={b.ahH || 620} />

    {b.bubble && <Bubble delay={20} x={760} y={720} w={1080}>{b.bubble}</Bubble>}
  </AbsoluteFill>;
};

export const NoTot: React.FC = () => {
  let acc = 0;
  return <AbsoluteFill style={{backgroundColor: '#0a0f1c'}}>
    {BEATS.map((b, i) => {
      const from = acc; acc += b.dur;
      return <Sequence key={i} from={from} durationInFrames={b.dur}><Scene b={b} /></Sequence>;
    })}
  </AbsoluteFill>;
};
