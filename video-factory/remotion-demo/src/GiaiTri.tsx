import React from 'react';
import {
  AbsoluteFill, Img, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig,
  staticFile, Easing,
} from 'remotion';

const YELLOW = '#FFD400';
const INK = '#17171a';
const FONT = 'DejaVu Sans, sans-serif';

const fmt = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export const GIAITRI_DURATION = 300; // 10s @30fps

// reactive corner character: pop-in spring + per-mode idle motion
function react(lf: number, fps: number, mode: string) {
  const e = spring({frame: lf, fps, config: {damping: 10, mass: 0.6}});
  const base = interpolate(e, [0, 1], [0.3, 1]);
  const t = Math.max(0, lf - 5);
  let x = 0, y = 0, rot = 0, sMul = 1;
  if (mode === 'money') { sMul = 1 + Math.sin(t / 5) * 0.05; y = Math.sin(t / 6) * 8; }
  else if (mode === 'shake') { x = Math.sin(t * 1.7) * Math.max(0, 22 - t * 0.5); rot = Math.sin(t * 1.7) * 3; }
  else if (mode === 'laugh') { y = -Math.abs(Math.sin(t / 3.5)) * 16; rot = Math.sin(t / 3) * 2.5; }
  else { y = Math.sin(t / 7) * 6; }
  return {x, y, rot: rot + (1 - e) * -8, scale: base * sMul};
}

const Corner: React.FC<{file: string; mode: string; h?: number}> = ({file, mode, h = 620}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const m = react(frame, fps, mode);
  return (
    <Img src={staticFile(`kit/anhhai_${file}.png`)}
      style={{position: 'absolute', bottom: -8, right: 28, height: h,
        transform: `translate(${m.x}px, ${m.y}px) rotate(${m.rot}deg) scale(${m.scale})`,
        transformOrigin: 'bottom center',
        filter: 'drop-shadow(0 12px 20px rgba(0,0,0,.55))'}} />
  );
};

const Caption: React.FC<{text: string; delay?: number; size?: number}> = ({text, delay = 6, size = 82}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const a = spring({frame: frame - delay, fps, config: {damping: 14}});
  return (
    <div style={{position: 'absolute', bottom: 150, left: 70, right: 380,
      transform: `translateY(${(1 - a) * 44}px)`, opacity: a}}>
      <span style={{color: YELLOW, fontWeight: 900, fontSize: size, lineHeight: 1.08, fontFamily: FONT,
        WebkitTextStroke: `8px ${INK}`, paintOrder: 'stroke fill', textShadow: '0 6px 0 rgba(0,0,0,.45)'}}>
        {text}
      </span>
    </div>
  );
};

// ── BEAT A: hook question over full-bleed coins, Anh Hai "hám tiền" ──
const BeatA: React.FC = () => {
  const frame = useCurrentFrame();
  const kb = interpolate(frame, [0, 90], [1.06, 1.2]);
  return (
    <AbsoluteFill>
      <Img src={staticFile('broll_coins.jpg')}
        style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${kb})`}} />
      <AbsoluteFill style={{background: 'linear-gradient(to top, rgba(0,0,0,.9) 3%, rgba(0,0,0,.3) 26%, rgba(0,0,0,0) 46%)'}} />
      <AbsoluteFill style={{background: 'linear-gradient(to bottom, rgba(0,0,0,.5) 0%, rgba(0,0,0,0) 22%)'}} />
      <Caption text="1 TỶ ĐỒNG ĂN ĐƯỢC BAO NHIÊU TÔ PHỞ?" size={76} />
      <Corner file="money" mode="money" />
    </AbsoluteFill>
  );
};

// ── BEAT B: number reveal, Anh Hai "sốc" ──
const BeatB: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const kb = interpolate(frame, [0, 90], [1.14, 1.24]);
  const n = interpolate(frame, [8, 60], [0, 20000], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const pop = spring({frame: frame - 6, fps, config: {damping: 11}});
  return (
    <AbsoluteFill>
      <Img src={staticFile('broll_coins.jpg')}
        style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${kb})`}} />
      <AbsoluteFill style={{background: 'linear-gradient(to top, rgba(0,0,0,.9) 3%, rgba(0,0,0,.35) 30%, rgba(0,0,0,.15) 60%)'}} />
      <div style={{position: 'absolute', top: 120, width: '100%', textAlign: 'center', transform: `scale(${pop})`}}>
        <div style={{color: '#cfe0ff', fontSize: 42, fontWeight: 800, letterSpacing: 2, fontFamily: FONT}}>ĐÁP ÁN</div>
        <div style={{color: YELLOW, fontWeight: 900, fontSize: 168, marginTop: 4, fontFamily: FONT,
          WebkitTextStroke: `9px ${INK}`, paintOrder: 'stroke fill', textShadow: '0 8px 0 rgba(0,0,0,.4)'}}>
          {fmt(n)}
        </div>
        <div style={{color: '#fff', fontWeight: 900, fontSize: 66, fontFamily: FONT, textShadow: '0 4px 14px rgba(0,0,0,.8)'}}>TÔ PHỞ</div>
      </div>
      <Corner file="shocked" mode="shake" />
    </AbsoluteFill>
  );
};

// ── BEAT C: punchline, Anh Hai "cười ha hả" ──
const BeatC: React.FC = () => {
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 40% 34%, #16305c 0%, #0b1730 74%)'}}>
      <div style={{position: 'absolute', top: 150, width: '100%', textAlign: 'center', padding: '0 90px'}}>
        <div style={{color: YELLOW, fontWeight: 900, fontSize: 92, lineHeight: 1.12, fontFamily: FONT,
          WebkitTextStroke: `7px ${INK}`, paintOrder: 'stroke fill'}}>
          MỖI NGÀY 1 TÔ,
        </div>
        <div style={{color: '#fff', fontWeight: 900, fontSize: 118, marginTop: 18, fontFamily: FONT,
          textShadow: '0 6px 20px rgba(0,0,0,.6)'}}>
          ĂN 55 NĂM MỚI HẾT
        </div>
      </div>
      <Corner file="laugh" mode="laugh" h={660} />
    </AbsoluteFill>
  );
};

export const GiaiTri: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#000', fontFamily: FONT}}>
      <Sequence durationInFrames={110}><BeatA /></Sequence>
      <Sequence from={110} durationInFrames={100}><BeatB /></Sequence>
      <Sequence from={210} durationInFrames={90}><BeatC /></Sequence>
    </AbsoluteFill>
  );
};
