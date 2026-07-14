import React from 'react';
import {
  AbsoluteFill, TopBar, Logo, Heading, Pill, Caption, AnhHai, Bubble, Arrow, Stack, Counter,
  Timeline, totalFrames, useCurrentFrame, interpolate, Easing,
  NAVY, RED, TEAL, BLUE, INK, GRAY, AMBER, GOLD,
} from './Kit';

const PAL: Record<string, string> = {navy: NAVY, red: RED, teal: TEAL, blue: BLUE, ink: INK, gray: GRAY, amber: AMBER, gold: GOLD, tuan: '#3b6fd6'};
export const col = (c?: string) => (c && PAL[c]) || c || NAVY;

// Segment array: string | {t, c} → colored inline text (dùng cho heading & caption)
type Seg = string | {t: string; c?: string};
const Segs: React.FC<{segs: Seg[]}> = ({segs}) => (
  <>{segs.map((s, i) => typeof s === 'string' ? <span key={i}>{s}</span> : <span key={i} style={{color: col(s.c)}}>{s.t}</span>)}</>
);

// Stack items: pill {text,c} | {arrow:'...'}
type Item = {text: string; c?: string; size?: number} | {arrow: string};
const StackItems: React.FC<{items: Item[]}> = ({items}) => (
  <>{items.map((it, i) => 'arrow' in it
    ? <Arrow key={i} delay={8 + i * 10}>{it.arrow}</Arrow>
    : <Pill key={i} delay={6 + i * 10} color={col(it.c)} size={it.size}>{it.text}</Pill>)}</>
);

// ---------- BLOCK SPEC ----------
export type Block = {
  t: string; bar?: string; sec?: number; d?: number;
  heading?: Seg[]; size?: number; htop?: number;
  items?: Item[]; stackTop?: number; gap?: number;
  caption?: Seg[];
  ah?: {pose?: string; shirt?: string; scale?: number; female?: boolean};
  bubble?: {text: string; x?: number; y?: number};
  // number
  value?: number; suffix?: string; dur?: number; numTop?: number; numSize?: number; numColor?: string; sub?: string; subTop?: number; decimals?: number;
  pills?: Item[]; pillsTop?: number;
  // bars
  bars?: {label: string; v: number}[]; max?: number; barColor?: string;
  // versus
  left?: {pill: string; sub?: string; c?: string}; right?: {pill: string; sub?: string; c?: string};
  // rule
  n?: number; title?: string; color?: string;
  // question
  lines?: Seg[][];
  // cta
  button?: string;
};

const BlockView: React.FC<{b: Block}> = ({b}) => {
  const f = useCurrentFrame();
  const hasAH = !!b.ah;
  const bar = col(b.bar || 'navy');
  const cap = b.caption ? <Caption delay={30} ah={hasAH}><Segs segs={b.caption} /></Caption> : null;
  const ah = b.ah ? <AnhHai pose={b.ah.pose || 'point'} x={1380} y={470} delay={10} scale={b.ah.scale} shirt={col(b.ah.shirt || 'gold')} female={b.ah.female} /> : null;
  const bub = b.bubble ? <Bubble x={b.bubble.x ?? 980} y={b.bubble.y ?? 648} delay={22}>{b.bubble.text}</Bubble> : null;

  switch (b.t) {
    case 'hook':
    case 'char':
    case 'list':
      return (
        <AbsoluteFill><TopBar color={bar} /><Logo />
          {b.heading && <Heading top={b.htop} size={b.size}><Segs segs={b.heading} /></Heading>}
          {b.items && <Stack top={b.stackTop ?? 390} right={hasAH ? 600 : 0} gap={b.gap ?? 26}><StackItems items={b.items} /></Stack>}
          {ah}{bub}{cap}
        </AbsoluteFill>
      );
    case 'number':
      return (
        <AbsoluteFill><TopBar color={bar} /><Logo />
          {b.heading && <Heading top={b.htop ?? 130} size={b.size ?? 60}><Segs segs={b.heading} /></Heading>}
          <div style={{position: 'absolute', top: b.numTop ?? 260, left: 0, right: hasAH ? 600 : 0, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: b.numSize ?? 118, color: col(b.numColor || 'navy'), lineHeight: 1}}>
            <Counter to={b.value ?? 0} suffix={b.suffix ?? ''} delay={8} dur={b.dur ?? 50} decimals={b.decimals ?? 0} />
          </div>
          {b.sub && <div style={{position: 'absolute', top: b.subTop ?? 430, left: 0, right: hasAH ? 600 : 0, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 40, color: GRAY}}>{b.sub}</div>}
          {b.pills && <div style={{position: 'absolute', top: b.pillsTop ?? 470, left: 0, right: hasAH ? 600 : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 26}}><StackItems items={b.pills} /></div>}
          {ah}{cap}
        </AbsoluteFill>
      );
    case 'bars': {
      const max = b.max ?? Math.max(...(b.bars ?? []).map(x => x.v));
      return (
        <AbsoluteFill><TopBar color={bar} /><Logo />
          {b.heading && <Heading top={b.htop ?? 130} size={b.size ?? 66}><Segs segs={b.heading} /></Heading>}
          <div style={{position: 'absolute', top: 460, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 90, height: 300}}>
            {(b.bars ?? []).map((bb, i) => {
              const d = 18 + i * 12;
              const h = interpolate(f, [d, d + 16], [0, (bb.v / max) * 280], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
              const o = interpolate(f, [d, d + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
              return (
                <div key={i} style={{textAlign: 'center', opacity: o, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 34, color: INK, marginBottom: 8}}>{bb.v}tr</div>
                  <div style={{width: 120, height: h, background: col(b.barColor || 'blue'), borderRadius: '12px 12px 0 0'}} />
                  <div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 30, color: GRAY, marginTop: 12}}>{bb.label}</div>
                </div>
              );
            })}
          </div>
          {cap}
        </AbsoluteFill>
      );
    }
    case 'versus':
      return (
        <AbsoluteFill><TopBar color={bar} /><Logo />
          {b.heading && <Heading size={b.size ?? 60}><Segs segs={b.heading} /></Heading>}
          <div style={{position: 'absolute', top: 400, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 56}}>
            <div style={{textAlign: 'center'}}><Pill delay={8} color={col(b.left?.c || 'teal')}>{b.left?.pill}</Pill>{b.left?.sub && <div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 32, color: col(b.left?.c || 'teal'), marginTop: 18}}>{b.left.sub}</div>}</div>
            <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 44, color: INK}}>VS</div>
            <div style={{textAlign: 'center'}}><Pill delay={20} color={col(b.right?.c || 'red')}>{b.right?.pill}</Pill>{b.right?.sub && <div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 32, color: col(b.right?.c || 'red'), marginTop: 18}}>{b.right.sub}</div>}</div>
          </div>
          {cap}
        </AbsoluteFill>
      );
    case 'rule': {
      const o = interpolate(f, [4, 14], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      const x = interpolate(f, [4, 16], [-40, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      const c = col(b.color || 'teal');
      return (
        <AbsoluteFill><TopBar color={bar} /><Logo />
          {b.heading && <Heading size={b.size ?? 56}><Segs segs={b.heading} /></Heading>}
          <div style={{position: 'absolute', top: 400, left: 200, right: 200, display: 'flex', alignItems: 'center', gap: 40, opacity: o, transform: `translateX(${x}px)`}}>
            <div style={{flex: '0 0 auto', width: 150, height: 150, borderRadius: '50%', background: c, color: '#fff', fontFamily: 'Mont', fontWeight: 900, fontSize: 90, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{b.n}</div>
            <div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 60, color: INK, lineHeight: 1.2}}>{b.title}</div>
          </div>
          {cap}
        </AbsoluteFill>
      );
    }
    case 'question':
      return (
        <AbsoluteFill><TopBar color={bar} /><Logo />
          {b.heading && <Heading size={b.size ?? 54}><Segs segs={b.heading} /></Heading>}
          <div style={{position: 'absolute', top: 380, left: 200, right: 200, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 60, color: INK, lineHeight: 1.3}}>
            {(b.lines ?? []).map((ln, i) => <div key={i}><Segs segs={ln} /></div>)}
          </div>
          {cap}
        </AbsoluteFill>
      );
    case 'cta': {
      const bs = interpolate(f, [12, 26], [0.6, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
      return (
        <AbsoluteFill><TopBar color={col(b.bar || 'navy')} /><Logo />
          {b.heading && <Heading top={b.htop ?? 150} size={b.size ?? 54}><Segs segs={b.heading} /></Heading>}
          <div style={{position: 'absolute', top: 300, left: 0, right: 0, textAlign: 'center', transform: `scale(${bs})`}}>
            <div style={{display: 'inline-block', background: RED, color: '#fff', fontFamily: 'Mont', fontWeight: 900, fontSize: 58, padding: '24px 60px', borderRadius: 999, boxShadow: '0 12px 0 rgba(0,0,0,.15)'}}>🔔 {b.button ?? 'ĐĂNG KÝ KÊNH'}</div>
          </div>
          <AnhHai pose="celebrate" x={760} y={640} delay={6} h={560} />
        </AbsoluteFill>
      );
    }
    default:
      return <AbsoluteFill><TopBar color={bar} /><Logo /></AbsoluteFill>;
  }
};

const FPS = 30;
export type VideoSpec = {slug: string; scenes: Block[]};
export const specDuration = (spec: VideoSpec) => totalFrames(spec.scenes.map(b => ({c: () => null as any, d: b.d ?? Math.round((b.sec ?? 8) * FPS)})));
export const LongForm: React.FC<{spec: VideoSpec}> = ({spec}) => {
  const scenes = spec.scenes.map((b) => ({c: () => <BlockView b={b} />, d: b.d ?? Math.round((b.sec ?? 8) * FPS)}));
  return <Timeline scenes={scenes} />;
};
