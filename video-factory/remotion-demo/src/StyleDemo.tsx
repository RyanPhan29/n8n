import React from 'react';
import {OffthreadVideo, staticFile} from 'remotion';
import {
  AbsoluteFill, AnhHai, Sfx, K, pop,
  useCurrentFrame, useVideoConfig, interpolate, Easing,
  NAVY, RED, GOLD, INK,
} from './Kit';

export const STYLEDEMO_DURATION = 200;

// Bong bóng thoại (kiểu kể chuyện, ghép trên video thật)
const Bubble: React.FC<{delay: number; x: number; y: number; w: number; children: React.ReactNode}> = ({delay, x, y, w, children}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, delay);
  return <div style={{position: 'absolute', left: x, top: y, width: w, transform: `scale(${s})`, transformOrigin: 'bottom left'}}>
    <Sfx name="pop" at={delay} vol={0.2} len={9} />
    <div style={{background: '#fff', border: `6px solid ${NAVY}`, borderRadius: 30, padding: '26px 34px', fontFamily: 'Mont', fontWeight: 900, fontSize: 52, color: INK, lineHeight: 1.25, boxShadow: '0 16px 34px rgba(0,0,0,0.4)'}}>{children}</div>
    <div style={{position: 'absolute', left: 60, bottom: -26, width: 0, height: 0, borderLeft: '18px solid transparent', borderRight: '30px solid transparent', borderTop: `30px solid ${NAVY}`}} />
    <div style={{position: 'absolute', left: 66, bottom: -14, width: 0, height: 0, borderLeft: '12px solid transparent', borderRight: '22px solid transparent', borderTop: '20px solid #fff'}} />
  </div>;
};

export const StyleDemo: React.FC = () => {
  const f = useCurrentFrame();
  const sc = interpolate(f, [0, STYLEDEMO_DURATION], [1.1, 1.2], {extrapolateRight: 'clamp'});
  const chy = interpolate(f, [10, 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const chyX = interpolate(f, [10, 24], [-40, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{backgroundColor: '#0b1220'}}>
    {/* B-ROLL THẬT — làm xám, tối nhẹ, Ken Burns */}
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
      <OffthreadVideo src={staticFile('broll/people.mp4')} muted style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.9) contrast(1.06) brightness(0.62)', transform: `scale(${sc})`}} />
    </div>
    {/* gradient cho chữ nổi */}
    <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,12,25,0.5) 0%, rgba(8,12,25,0) 26%, rgba(8,12,25,0.15) 60%, rgba(8,12,25,0.72) 100%)'}} />
    {/* logo góc */}
    <div style={{position: 'absolute', top: 40, left: 54, fontFamily: 'Mont', fontWeight: 900, fontSize: 34, color: '#fff', letterSpacing: 1, textShadow: '0 2px 8px rgba(0,0,0,0.6)'}}>CHUYỆN TIỀN <span style={{color: GOLD}}>· ANH HAI KỂ</span></div>
    {/* bóng nền dưới Anh Hai */}
    <div style={{position: 'absolute', left: 60, bottom: 0, width: 780, height: 300, background: 'radial-gradient(ellipse at 40% 90%, rgba(0,0,0,0.55), rgba(0,0,0,0) 70%)'}} />
    {/* Anh Hai cutout ghép lên video */}
    <AnhHai pose="explain" x={110} y={330} delay={6} h={690} />
    {/* Bong bóng thoại hook */}
    <Bubble delay={22} x={640} y={150} w={1120}>Đi làm <K c={RED}>10 năm</K>… mà tài khoản vẫn <K c={RED}>TRỐNG TRƠN</K>?</Bubble>
    {/* chyron kiểu tin */}
    <div style={{position: 'absolute', bottom: 70, left: 60, right: 300, opacity: chy, transform: `translateX(${chyX}px)`, display: 'flex', alignItems: 'stretch', boxShadow: '0 10px 26px rgba(0,0,0,0.45)'}}>
      <div style={{background: RED, color: '#fff', fontFamily: 'Mont', fontWeight: 900, fontSize: 36, padding: '18px 26px', display: 'flex', alignItems: 'center'}}>BÓC BẪY</div>
      <div style={{flex: 1, background: 'rgba(255,255,255,0.96)', color: INK, fontFamily: 'BVP', fontWeight: 800, fontSize: 40, padding: '18px 30px', display: 'flex', alignItems: 'center'}}>7 cái bẫy âm thầm móc túi bạn mỗi ngày</div>
    </div>
  </AbsoluteFill>;
};
