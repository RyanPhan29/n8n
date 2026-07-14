import React from 'react';
import {
  AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig,
  staticFile, Easing,
} from 'remotion';

const NAVY = '#16305c';
const NAVY2 = '#0b1730';
const GOLD = '#e0a400';
const YELLOW = '#FFD400';
const INK = '#17171a';
const ORANGE = '#ff6a3d';
const FONT = 'DejaVu Sans, sans-serif';

const fmt = (n: number) =>
  Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';

// 16:9 LANDSCAPE 1920x1080 — full-bleed footage + overlay text + corner character
export const Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const p1 = interpolate(frame, [135, 150], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const p2 = interpolate(frame, [140, 156], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  // ---- BEAT 1 (full-bleed footage) ----
  const kb = interpolate(frame, [0, 150], [1.05, 1.22]); // Ken Burns zoom
  const num1 = interpolate(frame, [16, 82], [0, 100_000_000], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });
  const numPop = spring({frame: frame - 12, fps, config: {damping: 12}});
  const cap1 = spring({frame: frame - 8, fps, config: {damping: 15}});
  const heroX1 = interpolate(frame, [26, 50], [520, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });

  // ---- BEAT 2 (data panel, dark premium bg) ----
  const f2 = frame - 145;
  const cap2 = spring({frame: f2 - 2, fps, config: {damping: 15}});
  const barA = spring({frame: f2 - 8, fps, config: {damping: 13}});
  const num2 = interpolate(f2, [12, 74], [100_000_000, 60_000_000], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });
  const heroX2 = interpolate(f2, [6, 28], [520, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{backgroundColor: '#000', fontFamily: FONT}}>
      {/* ============ BEAT 1 — footage full màn hình ============ */}
      <AbsoluteFill style={{opacity: p1}}>
        <AbsoluteFill>
          <Img
            src={staticFile('cash.jpg')}
            style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${kb})`}}
          />
        </AbsoluteFill>
        {/* dark gradients so overlay text always reads */}
        <AbsoluteFill style={{background: 'linear-gradient(to top, rgba(0,0,0,.88) 2%, rgba(0,0,0,.35) 24%, rgba(0,0,0,0) 44%)'}} />
        <AbsoluteFill style={{background: 'linear-gradient(to bottom, rgba(0,0,0,.55) 0%, rgba(0,0,0,0) 20%)'}} />

        {/* big number — top */}
        <div style={{position: 'absolute', top: 60, width: '100%', textAlign: 'center', transform: `scale(${numPop})`}}>
          <span style={{color: '#fff', fontWeight: 900, fontSize: 118, fontFamily: FONT, textShadow: '0 8px 26px rgba(0,0,0,.75)'}}>
            {fmt(num1)}
          </span>
        </div>

        {/* caption — bottom lower-third */}
        <div style={{position: 'absolute', bottom: 110, left: 80, right: 560, transform: `translateY(${(1 - cap1) * 40}px)`, opacity: cap1}}>
          <span style={{color: YELLOW, fontWeight: 900, fontSize: 90, lineHeight: 1.08, fontFamily: FONT, WebkitTextStroke: `8px ${INK}`, paintOrder: 'stroke fill', textShadow: '0 6px 0 rgba(0,0,0,.45)'}}>
            100 TRIỆU GỬI KÉT NĂM 2015
          </span>
        </div>

        {/* Anh Hai — corner, pointing toward content */}
        <Img
          src={staticFile('anhhai_point_t.png')}
          style={{position: 'absolute', bottom: -6, right: 20, height: 560, transform: `translateX(${heroX1}px)`, filter: 'drop-shadow(0 10px 16px rgba(0,0,0,.5))'}}
        />
      </AbsoluteFill>

      {/* ============ BEAT 2 — data panel nền tối premium ============ */}
      <AbsoluteFill style={{opacity: p2, background: `radial-gradient(circle at 42% 26%, ${NAVY} 0%, ${NAVY2} 72%)`}}>
        <div style={{position: 'absolute', top: 66, width: '100%', textAlign: 'center', transform: `scale(${cap2})`}}>
          <span style={{color: YELLOW, fontWeight: 900, fontSize: 74, fontFamily: FONT, WebkitTextStroke: `6px ${INK}`, paintOrder: 'stroke fill'}}>
            10 NĂM SAU CHỈ CÒN NHƯ 60 TRIỆU
          </span>
        </div>

        {/* hero stat — centered under caption */}
        <div style={{position: 'absolute', top: 250, width: '100%', textAlign: 'center'}}>
          <div style={{color: '#9fb0c9', fontSize: 40, fontWeight: 700, letterSpacing: 2, fontFamily: FONT}}>GIÁ TRỊ THẬT CÒN LẠI</div>
          <div style={{color: '#fff', fontWeight: 900, fontSize: 120, marginTop: 6, fontFamily: FONT}}>{fmt(num2)}</div>
        </div>

        {/* bars — bottom center */}
        <div style={{position: 'absolute', bottom: 120, width: '100%', height: 470, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 130}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{fontSize: 46, fontWeight: 900, color: '#fff', marginBottom: 12, fontFamily: FONT}}>100tr</div>
            <div style={{width: 200, height: 380 * barA, background: GOLD, borderRadius: '18px 18px 0 0', boxShadow: '0 0 0 4px rgba(255,255,255,.14)'}} />
            <div style={{fontSize: 44, fontWeight: 800, marginTop: 14, color: '#cdd6e6', fontFamily: FONT}}>2015</div>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{fontSize: 46, fontWeight: 900, color: ORANGE, marginBottom: 12, fontFamily: FONT}}>60tr</div>
            <div style={{width: 200, height: 228 * barA, background: ORANGE, borderRadius: '18px 18px 0 0', boxShadow: '0 0 0 4px rgba(255,255,255,.14)'}} />
            <div style={{fontSize: 44, fontWeight: 800, marginTop: 14, color: '#cdd6e6', fontFamily: FONT}}>2025</div>
          </div>
        </div>

        {/* Anh Hai — corner */}
        <Img
          src={staticFile('anhhai_think_t.png')}
          style={{position: 'absolute', bottom: -6, right: 20, height: 520, transform: `translateX(${heroX2}px)`, filter: 'drop-shadow(0 10px 16px rgba(0,0,0,.55))'}}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
