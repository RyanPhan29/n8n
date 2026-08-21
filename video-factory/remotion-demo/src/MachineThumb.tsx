import React from 'react';
import {AbsoluteFill, Logo, AnhHai, NAVY, RED, GOLD, INK} from './Kit';

export const MACHINETHUMB_DURATION = 60;

// Thumbnail 16:9 cho video dài #4 "Cỗ máy in tiền cá nhân"
export const MachineThumb: React.FC = () => {
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 34% 38%, #1e3358 0%, #0e1626 62%, #080d18 100%)'}}>
      {/* lưới mờ tạo chất công nghiệp */}
      <div style={{position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '64px 64px'}} />
      <Logo />

      {/* ===== CỖ MÁY IN TIỀN (giữa - dưới) ===== */}
      <div style={{position: 'absolute', left: 1000, bottom: 60, width: 560, height: 470}}>
        {/* tiền phun lên từ khe máy */}
        <div style={{position: 'absolute', left: 150, top: -18, fontSize: 96, transform: 'rotate(-16deg)', filter: 'drop-shadow(0 8px 14px rgba(0,0,0,0.45))'}}>💵</div>
        <div style={{position: 'absolute', left: 260, top: -46, fontSize: 104, transform: 'rotate(8deg)', filter: 'drop-shadow(0 8px 14px rgba(0,0,0,0.45))'}}>💵</div>
        <div style={{position: 'absolute', left: 372, top: -10, fontSize: 92, transform: 'rotate(20deg)', filter: 'drop-shadow(0 8px 14px rgba(0,0,0,0.45))'}}>💵</div>
        {/* thân máy + khe sáng */}
        <div style={{position: 'absolute', left: 40, top: 92, width: 480, height: 250, borderRadius: 30, background: 'linear-gradient(160deg,#9aa6bb,#515d74 68%,#3b4560)', border: '7px solid #c3cddd', boxShadow: '0 24px 46px rgba(0,0,0,0.55), inset 0 5px 12px rgba(255,255,255,0.28)'}}>
          {/* khe in phát sáng vàng */}
          <div style={{position: 'absolute', left: 60, top: 26, right: 60, height: 26, borderRadius: 13, background: 'linear-gradient(90deg,#f2c230,#fff6cf,#f2c230)', boxShadow: '0 0 26px rgba(242,194,48,0.95)'}} />
          <div style={{position: 'absolute', left: 0, right: 0, top: 92, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 84, color: '#eef3fc', letterSpacing: 4}}>$&nbsp;$&nbsp;$</div>
          <div style={{position: 'absolute', left: 26, bottom: 22, width: 46, height: 46, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%,#7fe3b0,#159a86)', boxShadow: '0 0 16px rgba(21,154,134,0.8)'}} />
        </div>
        {/* coin đổ ra khay */}
        <div style={{position: 'absolute', left: 300, top: 330, fontSize: 128, filter: 'drop-shadow(0 0 30px rgba(242,194,48,0.95))'}}>🪙</div>
        <div style={{position: 'absolute', left: 408, top: 372, fontSize: 84, filter: 'drop-shadow(0 0 22px rgba(242,194,48,0.9))'}}>🪙</div>
        <div style={{position: 'absolute', left: 246, top: 392, fontSize: 70, filter: 'drop-shadow(0 0 18px rgba(242,194,48,0.85))'}}>💰</div>
      </div>

      {/* ===== CHỮ (trái - trên) ===== */}
      <div style={{position: 'absolute', left: 84, top: 150}}>
        <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 118, color: '#f2f6ff', lineHeight: 0.98, letterSpacing: 1, textShadow: '4px 4px 0 rgba(0,0,0,0.35)'}}>CỖ MÁY</div>
        <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 232, color: RED, lineHeight: 0.9, letterSpacing: -2, WebkitTextStroke: '4px ' + GOLD, textShadow: '0 0 40px rgba(242,194,48,0.55), 8px 10px 0 #0b111f'}}>IN TIỀN</div>
        <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 118, color: '#f2f6ff', lineHeight: 1, letterSpacing: 1, textShadow: '4px 4px 0 rgba(0,0,0,0.35)'}}>CÁ NHÂN</div>
        {/* pill hook */}
        <div style={{marginTop: 26, display: 'inline-block', background: NAVY, border: '4px solid ' + GOLD, borderRadius: 999, padding: '16px 40px', fontFamily: 'BVP', fontWeight: 800, fontSize: 50, color: GOLD, boxShadow: '0 12px 26px rgba(0,0,0,0.45)'}}>Chạy cả lúc bạn ngủ 💤</div>
      </div>

      {/* ===== ANH HAI (phải, đứng cạnh máy) ===== */}
      <AnhHai pose="present" x={1540} y={300} delay={0} h={820} />
    </AbsoluteFill>
  );
};
