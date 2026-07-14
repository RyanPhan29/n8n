import React from 'react';
import {
  AbsoluteFill, Img, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig, staticFile,
} from 'remotion';

const NAVY = '#16305c';
const YELLOW = '#FFD400';
const INK = '#17171a';
const FONT = 'DejaVu Sans, sans-serif';

const EXPR = [
  {file: 'laugh', label: 'Cười ha hả', anim: 'laugh'},
  {file: 'smirk', label: 'Cà khịa', anim: 'sway'},
  {file: 'shocked', label: 'Sốc!', anim: 'shake'},
  {file: 'money', label: 'Hám tiền', anim: 'pulse'},
  {file: 'celebrate', label: 'Ăn mừng', anim: 'jump'},
  {file: 'suspicious', label: 'Nghi ngờ', anim: 'lean'},
  {file: 'warning', label: 'Cảnh báo!', anim: 'emph'},
  {file: 'thumbsup', label: 'Chốt!', anim: 'bob'},
];
const PER = 48;
const TITLE = 42;
export const RIG_DURATION = TITLE + EXPR.length * PER;

function motion(lf: number, fps: number, mode: string) {
  const e = spring({frame: lf, fps, config: {damping: 9, mass: 0.7}});
  const baseScale = interpolate(e, [0, 1], [0.35, 1]);
  const entryRot = (1 - e) * -10;
  let x = 0, y = 0, rot = 0, sMul = 1;
  const t = Math.max(0, lf - 6);
  if (mode === 'laugh') { y = -Math.abs(Math.sin(t / 4)) * 12; rot = Math.sin(t / 3) * 2; }
  else if (mode === 'sway') { rot = Math.sin(t / 14) * 4; y = Math.sin(t / 12) * 4; }
  else if (mode === 'shake') { x = Math.sin(t * 1.6) * Math.max(0, 18 - t * 0.4); }
  else if (mode === 'pulse') { sMul = 1 + Math.sin(t / 6) * 0.045; y = Math.sin(t / 8) * 6; }
  else if (mode === 'jump') { y = -Math.abs(Math.sin(t / 8)) * 72; }
  else if (mode === 'lean') { rot = Math.sin(t / 16) * 6; }
  else if (mode === 'emph') { y = Math.sin(t / 5) * 10; }
  else { y = Math.sin(t / 7) * 8; }
  return {x, y, rot: rot + entryRot, scale: baseScale * sMul};
}

const Slide: React.FC<{file: string; label: string; anim: string}> = ({file, label, anim}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const m = motion(frame, fps, anim);
  const labelA = spring({frame: frame - 6, fps, config: {damping: 14}});
  return (
    <AbsoluteFill>
      {/* floor shadow */}
      <div style={{position: 'absolute', bottom: 120, left: '50%', width: 360, height: 56, marginLeft: -180,
        borderRadius: '50%', background: 'rgba(0,0,0,.16)', filter: 'blur(7px)', transform: `scaleX(${m.scale})`}} />
      {/* character */}
      <Img src={staticFile(`kit/anhhai_${file}.png`)}
        style={{position: 'absolute', bottom: 110, left: '50%', height: 720, marginLeft: -260,
          transform: `translate(${m.x}px, ${m.y}px) rotate(${m.rot}deg) scale(${m.scale})`,
          transformOrigin: 'bottom center',
          filter: 'drop-shadow(0 12px 18px rgba(0,0,0,.26))'}} />
      {/* label */}
      <div style={{position: 'absolute', top: 130, width: '100%', textAlign: 'center', transform: `scale(${labelA})`}}>
        <span style={{color: YELLOW, fontWeight: 900, fontSize: 90, fontFamily: FONT,
          WebkitTextStroke: `8px ${INK}`, paintOrder: 'stroke fill', textShadow: '0 6px 0 rgba(0,0,0,.35)'}}>{label}</span>
      </div>
    </AbsoluteFill>
  );
};

const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const a = spring({frame, fps, config: {damping: 13}});
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <div style={{textAlign: 'center', transform: `scale(${a})`}}>
        <div style={{color: NAVY, fontWeight: 900, fontSize: 104, fontFamily: FONT}}>KHO BIỂU CẢM ANH HAI</div>
        <div style={{color: '#5b6b86', fontWeight: 800, fontSize: 46, marginTop: 10, fontFamily: FONT}}>animate bằng code · 0 credit</div>
      </div>
    </AbsoluteFill>
  );
};

export const RigDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 30%, #eef2fb 0%, #cdd8ee 80%)', fontFamily: FONT}}>
      <Sequence durationInFrames={TITLE}><TitleCard /></Sequence>
      {EXPR.map((ex, i) => (
        <Sequence key={ex.file} from={TITLE + i * PER} durationInFrames={PER}>
          <Slide {...ex} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
