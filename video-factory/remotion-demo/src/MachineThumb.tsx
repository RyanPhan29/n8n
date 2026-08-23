import React from 'react';
import {Img, staticFile} from 'remotion';
import {AbsoluteFill, Logo, AnhHai, NAVY, RED, GOLD} from './Kit';

export const MACHINETHUMB_DURATION = 60;

// outline dày kiểu "over" (Me xừ Đức): stroke đen sau + viền trắng + đổ bóng
const over = (fill: string, size: number): React.CSSProperties => ({
  fontFamily: 'Mont', fontWeight: 900, fontSize: size, color: fill, lineHeight: 0.94, letterSpacing: 1,
  WebkitTextStroke: '10px #10131c', paintOrder: 'stroke fill',
  textShadow: '3px 3px 0 #fff, -3px 3px 0 #fff, 3px -3px 0 #fff, -3px -3px 0 #fff, 0 14px 22px rgba(0,0,0,0.6)',
});

// Thumbnail 16:9 "Cỗ máy in tiền" = nền AI (ChatGPT) + Anh Hai greedy + chữ khối + ribbon
export const MachineThumb: React.FC = () => {
  return (
    <AbsoluteFill style={{background: '#0a1020'}}>
      {/* nền AI bùng nổ */}
      <Img src={staticFile('comay_bg.png')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}} />
      {/* tối nhẹ mép trái để chữ nổi */}
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(6,10,22,0.82) 0%, rgba(6,10,22,0.35) 34%, rgba(6,10,22,0) 52%)'}} />
      <Logo />

      {/* ===== CHỮ KHỐI (trái) ===== */}
      <div style={{position: 'absolute', left: 70, top: 150, transform: 'rotate(-2deg)'}}>
        <div style={over('#f2f6ff', 118)}>CỖ MÁY</div>
        <div style={{...over(GOLD, 216), marginTop: 6}}>IN TIỀN</div>
        <div style={{...over('#f2f6ff', 118), marginTop: 6}}>CÁ NHÂN</div>
      </div>
      {/* ribbon đỏ */}
      <div style={{position: 'absolute', left: 84, top: 636, transform: 'rotate(-2deg)', background: RED, border: '5px solid #fff', borderRadius: 12, padding: '14px 34px', fontFamily: 'Mont', fontWeight: 900, fontSize: 46, color: '#fff', letterSpacing: 1, boxShadow: '0 12px 26px rgba(0,0,0,0.5)'}}>TỪ 0 → TỰ ĐỘNG</div>

      {/* ===== ANH HAI greedy (góc phải-dưới, đứng trước máy hóng tiền) ===== */}
      <AnhHai pose="greedy" x={1330} y={300} delay={0} h={640} />
    </AbsoluteFill>
  );
};
