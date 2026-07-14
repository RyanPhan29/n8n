import React from 'react';
import {
  AbsoluteFill, Pill, AnhHai, Counter,
  totalFrames, Sc, useCurrentFrame, interpolate, Easing, pop,
  NAVY, RED, TEAL, BLUE, INK, GRAY, AMBER, GOLD,
} from './Kit';
import {useVideoConfig, Sequence, OffthreadVideo, Loop, staticFile, spring} from 'remotion';

// ===================== NGUYÊN TẮC BỐ CỤC SHORT =====================
// 1) Nội dung chính (SỐ / HÌNH 2D) LUÔN ở GIỮA, to, KHÔNG gì che.
// 2) Anh Hai = tạo cảm xúc -> NHỎ, nép GÓC dưới, thứ yếu.
// 3) Minh hoạ bằng icon/card 2D dễ liên tưởng, hạn chế text khô.
// 4) SAFE ZONE: chừa đáy ~360, phải ~130 (nút), đỉnh ~120 (UI nền tảng).
const SZ = {top: 250, sideL: 60, sideR: 60, bottomReserve: 360, qRight: 150};

// Nền GIẤY ĐỘNG (video anh gửi) — phủ full khung dọc bằng objectFit cover
const VPaper: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#f4f1ec'}}>
    <Loop durationInFrames={2400}>
      <OffthreadVideo src={staticFile('paper_bg.mp4')} muted style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover'}} />
    </Loop>
    <AbsoluteFill style={{background: 'rgba(255,255,255,0.30)'}} />
  </AbsoluteFill>
);

const PAL: Record<string, string> = {navy: NAVY, red: RED, teal: TEAL, blue: BLUE, ink: INK, gray: GRAY, amber: AMBER, gold: GOLD};
const col = (c?: string) => (c && PAL[c]) || c || INK;
type Seg = string | {t: string; c?: string};
const Segs: React.FC<{segs: Seg[]}> = ({segs}) => (<>{segs.map((s, i) => typeof s === 'string' ? <span key={i}>{s}</span> : <span key={i} style={{color: col(s.c)}}>{s.t}</span>)}</>);

const VLogo: React.FC = () => (
  <div style={{position: 'absolute', top: 130, left: 0, width: '100%', textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, color: NAVY, fontSize: 36}}>CHUYỆN TIỀN <span style={{color: '#c99700'}}>· ANH HAI KỂ</span></div>
);
const VTopBar: React.FC<{color: string}> = ({color}) => {
  const f = useCurrentFrame();
  const w = interpolate(f, [0, 14], [0, 100], {extrapolateRight: 'clamp'});
  return <div style={{position: 'absolute', top: 0, left: 0, height: 16, width: `${w}%`, background: color}} />;
};

const VHead: React.FC<{segs: Seg[]; top?: number; size?: number}> = ({segs, top = SZ.top, size = 92}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, 2);
  return <div style={{position: 'absolute', top, left: SZ.sideL, right: SZ.sideR, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: size, lineHeight: 1.08, color: INK, transform: `scale(${0.92 + s * 0.08})`, opacity: interpolate(f, [0, 8], [0, 1], {extrapolateRight: 'clamp'})}}><Segs segs={segs} /></div>;
};

// Anh Hai căn GIỮA đáy, full người (không gọt) — tạo cảm xúc, đứng dưới nội dung chính.
const VAnhHai: React.FC<{pose: string; h?: number; delay?: number}> = ({pose, h = 780, delay = 8}) =>
  <AnhHai pose={pose} x={0} y={0} delay={delay} h={h} bottom={SZ.bottomReserve} cx />;

// Icon 2D lớn ở giữa (metaphor)
const VIcon: React.FC<{icon: string; top?: number; size?: number; delay?: number}> = ({icon, top = 470, size = 200, delay = 6}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, delay);
  return <div style={{position: 'absolute', top, left: 0, right: 0, textAlign: 'center', fontSize: size, transform: `scale(${s})`, lineHeight: 1}}>{icon}</div>;
};

// Pill nhãn dưới số/hình
const VLabel: React.FC<{segs: Seg[]; top: number; c?: string; delay?: number}> = ({segs, top, c = 'navy', delay = 14}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, delay);
  return <div style={{position: 'absolute', top, left: SZ.sideL, right: SZ.sideR, textAlign: 'center', transform: `scale(${s})`}}>
    <span style={{display: 'inline-block', border: `5px solid ${col(c)}`, color: col(c), background: 'rgba(255,255,255,0.92)', borderRadius: 999, padding: '16px 40px', fontFamily: 'BVP', fontWeight: 800, fontSize: 46}}><Segs segs={segs} /></span>
  </div>;
};

// Card 2D metaphor (kiểu CƠN SỐT vs SỰ THẬT) — animate mạnh: nảy vào + trôi + icon đập + glow
const MetaCard: React.FC<{header: string; icon: string; label: string; c?: string; dim?: boolean; delay?: number}> = ({header, icon, label, c = 'navy', dim = false, delay = 8}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const lf = f - delay;
  const s = spring({frame: lf, fps, config: {damping: 9, mass: 0.9}}); // nảy hơn
  const rise = interpolate(lf, [0, 14], [70, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const bob = dim ? 0 : Math.sin(lf / 9) * 7;                 // card "tốt" trôi nhẹ
  const iconPulse = 1 + (dim ? 0 : Math.sin(lf / 5) * 0.08);  // icon đập
  const glow = dim ? 0 : 0.35 + Math.sin(lf / 7) * 0.25;      // viền sáng nhấp nháy
  const headBg = dim ? '#c4c8cf' : col(c);
  return (
    <div style={{width: 380, borderRadius: 28, overflow: 'hidden', background: '#fbfaf7', border: `4px solid ${dim ? '#d5d8de' : col(c)}`, transform: `translateY(${rise + bob}px) scale(${s})`, opacity: dim ? 0.92 : 1, boxShadow: dim ? '0 10px 0 rgba(0,0,0,.06)' : `0 10px 0 rgba(0,0,0,.10), 0 0 ${28 * glow}px ${col(c)}`}}>
      <div style={{background: headBg, color: '#fff', fontFamily: 'Mont', fontWeight: 900, fontSize: 44, textAlign: 'center', padding: '20px 0'}}>{header}</div>
      <div style={{padding: '34px 20px 40px', textAlign: 'center'}}>
        <div style={{fontSize: 150, lineHeight: 1, filter: dim ? 'grayscale(1) opacity(0.55)' : 'none', transform: `scale(${iconPulse})`}}>{icon}</div>
        <div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 46, color: dim ? '#9aa0a8' : INK, marginTop: 22}}>{label}</div>
      </div>
    </div>
  );
};

// Badge "VS" nảy giữa 2 card
const VsBadge: React.FC<{delay?: number}> = ({delay = 14}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const s = spring({frame: f - delay, fps, config: {damping: 7, mass: 0.7}});
  const wob = Math.sin((f - delay) / 6) * 6;
  return (
    <div style={{alignSelf: 'center', width: 96, height: 96, borderRadius: '50%', background: RED, color: '#fff', fontFamily: 'Mont', fontWeight: 900, fontSize: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${s}) rotate(${wob}deg)`, boxShadow: '0 6px 0 rgba(0,0,0,.18)', zIndex: 5, margin: '0 -18px'}}>VS</div>
  );
};

const VQuestion: React.FC<{segs: Seg[]; delay?: number}> = ({segs, delay = 8}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [delay, delay + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const y = interpolate(f, [delay, delay + 10], [30, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', bottom: SZ.bottomReserve + 30, left: SZ.sideL, right: SZ.qRight, opacity: o, transform: `translateY(${y}px)`}}>
      <div style={{background: 'rgba(22,48,92,0.96)', borderRadius: 28, padding: '30px 40px', textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 52, lineHeight: 1.28, color: '#fff', boxShadow: '0 10px 0 rgba(0,0,0,.12)'}}>
        <span style={{color: GOLD}}>❓ </span><Segs segs={segs} />
      </div>
    </div>
  );
};

// ===================== KHỐI SHORT =====================
export type VBlock = {
  t?: string; d: number; bar?: string;
  head?: Seg[]; size?: number; htop?: number;
  icon?: string; iconTop?: number; iconSize?: number;
  value?: number; suffix?: string; decimals?: number; numColor?: string; numTop?: number; numSize?: number;
  label?: Seg[]; labelTop?: number; labelC?: string;
  cards?: {header: string; icon: string; label: string; c?: string; dim?: boolean}[]; cardsTop?: number;
  q?: Seg[];
  pose?: string; ahCorner?: 'left' | 'right'; ahH?: number; ah?: boolean;
};

const VView: React.FC<{b: VBlock}> = ({b}) => {
  const bar = col(b.bar || 'navy');
  const showAH = b.ah ?? true;
  return (
    <AbsoluteFill>
      <VTopBar color={bar} /><VLogo />
      {b.head && <VHead segs={b.head} top={b.htop ?? SZ.top} size={b.size ?? 92} />}
      {b.icon && <VIcon icon={b.icon} top={b.iconTop ?? 470} size={b.iconSize ?? 200} />}
      {b.value != null && (
        <div style={{position: 'absolute', top: b.numTop ?? 560, left: SZ.sideL, right: SZ.sideR, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: b.numSize ?? 210, color: col(b.numColor || 'red'), lineHeight: 1}}>
          <Counter to={b.value} suffix={b.suffix ?? ''} delay={8} dur={44} decimals={b.decimals ?? 0} />
        </div>
      )}
      {b.cards && (
        <div style={{position: 'absolute', top: b.cardsTop ?? 470, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 40}}>
          {b.cards.length === 2
            ? [<MetaCard key={0} {...b.cards[0]} delay={8} />, <VsBadge key="vs" delay={16} />, <MetaCard key={1} {...b.cards[1]} delay={12} />]
            : b.cards.map((c, i) => <MetaCard key={i} {...c} delay={8 + i * 8} />)}
        </div>
      )}
      {b.label && <VLabel segs={b.label} top={b.labelTop ?? 850} c={b.labelC} />}
      {showAH && <VAnhHai pose={b.pose || 'point'} h={b.ahH ?? 780} />}
      {b.q && <VQuestion segs={b.q} />}
    </AbsoluteFill>
  );
};

const XF = 8;
const VWrap: React.FC<{b: VBlock}> = ({b}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, XF, b.d - XF, b.d], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{opacity: o}}><VView b={b} /></AbsoluteFill>;
};

export type ShortSpec = {slug: string; scenes: VBlock[]};
export const shortDuration = (s: ShortSpec) => totalFrames(s.scenes.map(b => ({c: () => null as any, d: b.d})));
export const Short: React.FC<{spec: ShortSpec}> = ({spec}) => {
  let acc = 0;
  return (
    <AbsoluteFill style={{backgroundColor: '#f4f1ec'}}>
      <VPaper />
      {spec.scenes.map((b, i) => { const from = acc; acc += b.d; return <Sequence key={i} from={from} durationInFrames={b.d}><VWrap b={b} /></Sequence>; })}
    </AbsoluteFill>
  );
};
