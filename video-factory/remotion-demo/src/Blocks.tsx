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
    ? <Arrow key={i} delay={3 + i * 7}>{it.arrow}</Arrow>
    : <Pill key={i} delay={2 + i * 7} color={col(it.c)} size={it.size}>{it.text}</Pill>)}</>
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
  // MỞ RỘNG:
  capTop?: number;                  // vị trí chú thích (mặc định ngay dưới title)
  center?: boolean;                 // title canh giữa khung (khi cảnh thưa chữ)
  deco?: string; decoSide?: 'l' | 'r'; // emoji trang trí lớn (vd '🪙') lấp khung trống
  points?: {label: string; v: number}[]; lineColor?: string; unit?: string; // biểu đồ ĐƯỜNG
  colL?: Col; colR?: Col; midVS?: boolean; // bảng 2 CỘT (quá khứ↔hiện tại, được↔mất)
  comments?: {name?: string; text: string; c?: string; side?: 'l' | 'r'}[]; // bong bóng comment
};
type Col = {title: string; big?: string; sub?: string; items?: string[]; c?: string; dim?: boolean};

// Emoji trang trí lớn lấp khung trống (vd vàng 🪙)
const Deco: React.FC<{icon: string; side?: 'l' | 'r'}> = ({icon, side = 'l'}) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [6, 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.4))});
  const bob = Math.sin(f / 15) * 10;
  return <div style={{position: 'absolute', bottom: 150, [side === 'l' ? 'left' : 'right']: 110, fontSize: 240, transform: `scale(${s}) translateY(${bob}px)`, transformOrigin: 'bottom center', pointerEvents: 'none'}}>{icon}</div>;
};

// Biểu đồ ĐƯỜNG (vẽ dần) — cho xu hướng tăng/giảm
const LineChart: React.FC<{points: {label: string; v: number}[]; color: string; unit?: string}> = ({points, color, unit}) => {
  const f = useCurrentFrame();
  const W = 1180, H = 360, PADX = 110, PADY = 60;
  const n = points.length;
  const xs = points.map((_, i) => PADX + (i * (W - 2 * PADX)) / Math.max(1, n - 1));
  const mx = Math.max(...points.map(p => p.v)), mn = Math.min(...points.map(p => p.v));
  const ys = points.map(p => PADY + (1 - (p.v - mn) / (mx - mn || 1)) * (H - 2 * PADY));
  const path = xs.map((x, i) => `${i ? 'L' : 'M'}${x},${ys[i]}`).join(' ');
  const LEN = 2600;
  const prog = interpolate(f, [2, 38], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return (
    <div style={{position: 'absolute', top: 420, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
      <svg width={W} height={H + 30}>
        <line x1={PADX} y1={H - PADY} x2={W - PADX} y2={H - PADY} stroke="#d8d5cf" strokeWidth={3} />
        <path d={path} fill="none" stroke={color} strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={LEN} strokeDashoffset={LEN * (1 - prog)} />
        {xs.map((x, i) => {
          const show = interpolate(f, [3 + i * 6, 9 + i * 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          return (
            <g key={i} opacity={show}>
              <circle cx={x} cy={ys[i]} r={13} fill={color} stroke="#fff" strokeWidth={4} />
              <text x={x} y={ys[i] - 28} textAnchor="middle" fontFamily="Mont" fontWeight={900} fontSize={36} fill={INK}>{points[i].v}{unit || ''}</text>
              <text x={x} y={H - PADY + 46} textAnchor="middle" fontFamily="BVP" fontWeight={800} fontSize={30} fill={GRAY}>{points[i].label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const SplitCard: React.FC<{col: Col; delay: number}> = ({col: c, delay}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [delay, delay + 7], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const y = interpolate(f, [delay, delay + 8], [30, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const cc = c.dim ? '#b9bec6' : col(c.c || 'navy');
  return (
    <div style={{width: 520, opacity: o, transform: `translateY(${y}px)`}}>
      <div style={{background: cc, color: '#fff', fontFamily: 'Mont', fontWeight: 900, fontSize: 42, textAlign: 'center', padding: '18px 0', borderRadius: '22px 22px 0 0'}}>{c.title}</div>
      <div style={{background: 'rgba(255,255,255,0.92)', border: `4px solid ${cc}`, borderTop: 'none', borderRadius: '0 0 22px 22px', padding: '30px 30px 34px', minHeight: 300}}>
        {c.big && <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 92, color: cc, textAlign: 'center', lineHeight: 1}}>{c.big}</div>}
        {c.sub && <div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 34, color: GRAY, textAlign: 'center', marginTop: 12}}>{c.sub}</div>}
        {c.items && c.items.map((it, i) => <div key={i} style={{fontFamily: 'BVP', fontWeight: 700, fontSize: 34, color: c.dim ? '#8b909a' : INK, margin: '16px 0', lineHeight: 1.25}}>{it}</div>)}
      </div>
    </div>
  );
};

// Bong bóng comment (chữ do code render — ẩn danh, không lộ tên thật)
const CommentBubbles: React.FC<{comments: {name?: string; text: string; c?: string; side?: 'l' | 'r'}[]}> = ({comments}) => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', top: 330, left: 70, right: 70, display: 'flex', flexDirection: 'column', gap: 26}}>
      {comments.map((c, i) => {
        const d = 1 + i * 6;
        const o = interpolate(f, [d, d + 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        const x = interpolate(f, [d, d + 7], [(c.side === 'r' ? 30 : -30), 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        const cc = col(c.c || 'gray');
        return (
          <div key={i} style={{alignSelf: c.side === 'r' ? 'flex-end' : 'flex-start', maxWidth: '80%', opacity: o, transform: `translateX(${x}px)`, display: 'flex', gap: 16, flexDirection: c.side === 'r' ? 'row-reverse' : 'row'}}>
            <div style={{flex: '0 0 auto', width: 56, height: 56, borderRadius: '50%', background: cc, color: '#fff', fontFamily: 'Mont', fontWeight: 900, fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{(c.name || '?').slice(0, 1).toUpperCase()}</div>
            <div style={{background: '#fff', border: `3px solid ${cc}`, borderRadius: 22, padding: '16px 24px', boxShadow: '0 4px 0 rgba(0,0,0,.07)'}}>
              {c.name && <div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 26, color: cc, marginBottom: 4}}>{c.name}</div>}
              <div style={{fontFamily: 'BVP', fontWeight: 700, fontSize: 36, color: INK, lineHeight: 1.25}}>{c.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const BlockView: React.FC<{b: Block}> = ({b}) => {
  const f = useCurrentFrame();
  const hasAH = !!b.ah;
  const bar = col(b.bar || 'navy');
  // auto-shrink title dài để KHÔNG tràn viền / đụng Anh Hai (room = số ký tự "an toàn")
  const htext = (b.heading || []).map((s) => (typeof s === 'string' ? s : (s.t ?? ''))).join('');
  const hAH = hasAH && !!b.center; // chỉ thu mép phải title ở cảnh center (nơi title xuống thấp, dễ đụng nhân vật)
  const shrink = (base: number) => {
    const room = hAH ? 34 : hasAH ? 40 : 48;
    return htext.length > room ? Math.max(Math.round((base * room) / htext.length), Math.round(base * 0.7)) : base;
  };
  // Chú thích = "phụ đề nhỏ" nằm NGAY DƯỚI title (đáy để trống cho phụ đề lời đọc)
  const capTop = b.capTop ?? (b.center ? 588 : 250);
  const capO = interpolate(f, [5, 13], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const cap = b.caption ? (
    <div style={{position: 'absolute', top: capTop, left: 130, right: hasAH ? 560 : 130, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 42, lineHeight: 1.3, color: '#2b2f36', textWrap: 'balance', opacity: capO}}>
      <Segs segs={b.caption} />
    </div>
  ) : null;
  const ah = b.ah ? <AnhHai pose={b.ah.pose || 'point'} x={1380} y={470} delay={8} scale={b.ah.scale} shirt={col(b.ah.shirt || 'gold')} female={b.ah.female} /> : null;
  const bub = b.bubble ? <Bubble x={b.bubble.x ?? 980} y={b.bubble.y ?? 648} delay={10}>{b.bubble.text}</Bubble> : null;

  switch (b.t) {
    case 'hook':
    case 'char':
    case 'list':
      return (
        <AbsoluteFill><TopBar color={bar} /><Logo />
          {b.deco && <Deco icon={b.deco} side={b.decoSide} />}
          {b.heading && <Heading top={b.center ? 430 : b.htop} size={shrink(b.size ?? 76)} ah={hAH}><Segs segs={b.heading} /></Heading>}
          {b.items && <Stack top={b.stackTop ?? 390} right={hasAH ? 600 : 0} gap={b.gap ?? 26}><StackItems items={b.items} /></Stack>}
          {ah}{bub}{cap}
        </AbsoluteFill>
      );
    case 'number':
      return (
        <AbsoluteFill><TopBar color={bar} /><Logo />
          {b.deco && <Deco icon={b.deco} side={b.decoSide} />}
          {b.heading && <Heading top={b.htop ?? 130} size={shrink(b.size ?? 60)} ah={hAH}><Segs segs={b.heading} /></Heading>}
          <div style={{position: 'absolute', top: b.numTop ?? (b.caption ? 388 : 300), left: 0, right: hasAH ? 600 : 0, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: b.numSize ?? 118, color: col(b.numColor || 'navy'), lineHeight: 1}}>
            <Counter to={b.value ?? 0} suffix={b.suffix ?? ''} delay={3} dur={b.dur ?? 44} decimals={b.decimals ?? 0} />
          </div>
          {b.sub && <div style={{position: 'absolute', top: b.subTop ?? (b.caption ? 560 : 470), left: 0, right: hasAH ? 600 : 0, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 40, color: GRAY}}>{b.sub}</div>}
          {b.pills && <div style={{position: 'absolute', top: b.pillsTop ?? 470, left: 0, right: hasAH ? 600 : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 26}}><StackItems items={b.pills} /></div>}
          {ah}{cap}
        </AbsoluteFill>
      );
    case 'bars': {
      const max = b.max ?? Math.max(...(b.bars ?? []).map(x => x.v));
      return (
        <AbsoluteFill><TopBar color={bar} /><Logo />
          {b.heading && <Heading top={b.htop ?? 130} size={shrink(b.size ?? 66)} ah={hAH}><Segs segs={b.heading} /></Heading>}
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
          {b.heading && <Heading size={shrink(b.size ?? 60)} ah={hAH}><Segs segs={b.heading} /></Heading>}
          <div style={{position: 'absolute', top: 400, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 56}}>
            <div style={{textAlign: 'center'}}><Pill delay={3} color={col(b.left?.c || 'teal')}>{b.left?.pill}</Pill>{b.left?.sub && <div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 32, color: col(b.left?.c || 'teal'), marginTop: 18}}>{b.left.sub}</div>}</div>
            <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 44, color: INK}}>VS</div>
            <div style={{textAlign: 'center'}}><Pill delay={9} color={col(b.right?.c || 'red')}>{b.right?.pill}</Pill>{b.right?.sub && <div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 32, color: col(b.right?.c || 'red'), marginTop: 18}}>{b.right.sub}</div>}</div>
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
          {b.heading && <Heading size={shrink(b.size ?? 56)} ah={hAH}><Segs segs={b.heading} /></Heading>}
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
          {b.heading && <Heading size={shrink(b.size ?? 54)} ah={hAH}><Segs segs={b.heading} /></Heading>}
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
          {b.heading && <Heading top={b.htop ?? 150} size={shrink(b.size ?? 54)} ah={hAH}><Segs segs={b.heading} /></Heading>}
          <div style={{position: 'absolute', top: 300, left: 0, right: 0, textAlign: 'center', transform: `scale(${bs})`}}>
            <div style={{display: 'inline-block', background: RED, color: '#fff', fontFamily: 'Mont', fontWeight: 900, fontSize: 58, padding: '24px 60px', borderRadius: 999, boxShadow: '0 12px 0 rgba(0,0,0,.15)'}}>🔔 {b.button ?? 'ĐĂNG KÝ KÊNH'}</div>
          </div>
          <AnhHai pose="celebrate" x={760} y={640} delay={6} h={560} />
        </AbsoluteFill>
      );
    }
    case 'line':
      return (
        <AbsoluteFill><TopBar color={bar} /><Logo />
          {b.deco && <Deco icon={b.deco} side={b.decoSide} />}
          {b.heading && <Heading top={b.htop ?? 140} size={shrink(b.size ?? 60)} ah={hAH}><Segs segs={b.heading} /></Heading>}
          <LineChart points={b.points ?? []} color={col(b.lineColor || 'amber')} unit={b.unit} />
          {ah}{cap}
        </AbsoluteFill>
      );
    case 'split':
      return (
        <AbsoluteFill><TopBar color={bar} /><Logo />
          {b.heading && <Heading top={b.htop ?? 130} size={shrink(b.size ?? 58)} ah={hAH}><Segs segs={b.heading} /></Heading>}
          <div style={{position: 'absolute', top: 340, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: b.midVS ? 0 : 46}}>
            {b.colL && <SplitCard col={b.colL} delay={2} />}
            {b.midVS && <div style={{alignSelf: 'center', width: 92, height: 92, borderRadius: '50%', background: RED, color: '#fff', fontFamily: 'Mont', fontWeight: 900, fontSize: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 -22px', zIndex: 5, boxShadow: '0 6px 0 rgba(0,0,0,.18)'}}>VS</div>}
            {b.colR && <SplitCard col={b.colR} delay={6} />}
          </div>
          {cap}
        </AbsoluteFill>
      );
    case 'comments':
      return (
        <AbsoluteFill><TopBar color={bar} /><Logo />
          {b.heading && <Heading top={b.htop ?? 140} size={shrink(b.size ?? 58)} ah={hAH}><Segs segs={b.heading} /></Heading>}
          {b.comments && <CommentBubbles comments={b.comments} />}
          {ah}{cap}
        </AbsoluteFill>
      );
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
