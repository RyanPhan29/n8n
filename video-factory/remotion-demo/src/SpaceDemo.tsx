import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {TopBar, Logo, AnhHai, K, pop, NAVY, RED, TEAL, BLUE, INK, GOLD, AMBER} from './Kit';

// =====================================================================
// DEMO "KHÔNG GIAN" — bỏ nền giấy phẳng, cho Anh Hai đứng trong không gian
// có CHIỀU SÂU (sàn phối cảnh + bokeh + đổ bóng + push-in). Giữ nhân vật + màu.
// 2 hướng: A) Studio sáng   B) Sân khấu tối / spotlight
// =====================================================================

const Bokeh: React.FC<{x: number; y: number; size: number; color: string; rate?: number; op?: number}> = ({x, y, size, color, rate = 30, op = 0.5}) => {
  const f = useCurrentFrame();
  return <div style={{position: 'absolute', left: x + Math.sin(f / 60) * rate, top: y + Math.cos(f / 70) * rate * 0.6, width: size, height: size, borderRadius: '50%', background: color, filter: 'blur(70px)', opacity: op}} />;
};

// sàn lưới phối cảnh — tín hiệu "không gian" mạnh nhất mà rẻ nhất
const Floor: React.FC<{line: string; light?: boolean}> = ({line, light = true}) => (
  <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: '50%', perspective: '900px', overflow: 'hidden'}}>
    <div style={{position: 'absolute', inset: '-20% -30% 0 -30%', transform: 'rotateX(62deg)', transformOrigin: 'bottom center',
      backgroundImage: `linear-gradient(${line} 3px, transparent 3px), linear-gradient(90deg, ${line} 3px, transparent 3px)`,
      backgroundSize: '130px 130px',
      WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 15%, transparent 85%)',
      maskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 15%, transparent 85%)'}} />
  </div>
);

const Shadow: React.FC<{cx: number; w?: number}> = ({cx, w = 360}) => (
  <div style={{position: 'absolute', left: cx, bottom: 46, width: w, height: 64, transform: 'translateX(-50%)', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(15,25,45,0.30), rgba(15,25,45,0) 70%)'}} />
);

const PushIn: React.FC<{children: React.ReactNode; amt?: number}> = ({children, amt = 0.05}) => {
  const f = useCurrentFrame(); const {durationInFrames} = useVideoConfig();
  const s = interpolate(f, [0, durationInFrames], [1, 1 + amt], {extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{transform: `scale(${s})`, transformOrigin: 'center 60%'}}>{children}</AbsoluteFill>;
};

const Card: React.FC<{children: React.ReactNode; color: string; delay?: number; top: number; left: number; right: number}> = ({children, color, delay = 8, top, left, right}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, delay);
  return (
    <div style={{position: 'absolute', top, left, right, transform: `translateY(${(1 - s) * 30}px) scale(${0.96 + s * 0.04})`, opacity: interpolate(f, [delay, delay + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
      <div style={{border: `5px solid ${color}`, borderRadius: 26, background: 'rgba(255,255,255,0.96)', padding: '30px 40px', boxShadow: '0 30px 60px rgba(15,25,45,0.28), 0 8px 16px rgba(15,25,45,0.16)'}}>
        {children}
      </div>
    </div>
  );
};

// ---------- A) STUDIO SÁNG ----------
export const SpaceLight: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #eef3fb 0%, #dde6f3 52%, #c3d1e6 100%)'}}>
      <Bokeh x={180} y={180} size={340} color={TEAL} op={0.22} />
      <Bokeh x={1380} y={120} size={420} color={GOLD} op={0.25} rate={40} />
      <Floor line="rgba(22,48,92,0.16)" />
      <PushIn>
        <TopBar color={NAVY} /><Logo />
        <div style={{position: 'absolute', top: 150, left: 60, right: 60, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 74, color: INK, textWrap: 'balance', opacity: interpolate(f, [2, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
          Bẫy 1: để dành phần <span style={{color: RED}}>THỪA</span>
        </div>
        <Card color={NAVY} top={360} left={130} right={720} delay={12}>
          <div style={{display: 'inline-block', background: NAVY, color: '#fff', fontFamily: 'BVP', fontWeight: 800, fontSize: 30, padding: '8px 22px', borderRadius: 999, marginBottom: 18}}>🍽️ ẨN DỤ: ĐI ĂN BUFFET</div>
          <div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 40, color: '#20242b', lineHeight: 1.3}}>Gắp <K c={TEAL}>món chính</K> trước —<br/>đừng no vì <K c={RED}>món vặt</K></div>
        </Card>
        <Shadow cx={1560} w={380} />
        <AnhHai pose="sly" x={1380} y={0} delay={10} h={600} />
      </PushIn>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(15,25,45,0.16) 100%)', pointerEvents: 'none'}} />
    </AbsoluteFill>
  );
};

// ---------- B) SÂN KHẤU TỐI / SPOTLIGHT ----------
export const SpaceDark: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 38%, #23406e 0%, #12233d 58%, #0a1526 100%)'}}>
      <Bokeh x={220} y={200} size={360} color={'#3a6ea8'} op={0.4} />
      <Bokeh x={1360} y={150} size={440} color={GOLD} op={0.22} rate={44} />
      <Floor line="rgba(120,160,220,0.18)" light={false} />
      {/* spotlight sau Anh Hai để nhân vật nổi trên nền tối */}
      <div style={{position: 'absolute', left: '72%', top: '30%', width: 620, height: 620, transform: 'translate(-50%,-30%)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,247,220,0.5), rgba(255,247,220,0) 66%)', filter: 'blur(10px)'}} />
      <PushIn>
        <TopBar color={GOLD} />
        <div style={{position: 'absolute', top: 44, left: 60, fontFamily: 'Mont', fontWeight: 900, fontSize: 30, color: '#fff', letterSpacing: 0.5}}>CHUYỆN TIỀN <span style={{color: GOLD}}>· ANH HAI KỂ</span></div>
        <div style={{position: 'absolute', top: 155, left: 60, right: 60, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 76, color: '#fff', textWrap: 'balance', textShadow: '0 6px 30px rgba(0,0,0,0.4)', opacity: interpolate(f, [2, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
          Đi làm 10 năm — vẫn <span style={{color: GOLD}}>KHÔNG</span> có dư?
        </div>
        <div style={{position: 'absolute', top: 430, left: 150, right: 760}}>
          <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 150, color: GOLD, textShadow: '0 8px 40px rgba(242,194,48,0.45)', opacity: interpolate(f, [14, 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>1,5 tỷ</div>
          <div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 40, color: '#cdd9ee', marginTop: 6}}>đang trốn đâu đó — Anh Hai chỉ</div>
        </div>
        <div style={{position: 'absolute', left: 1560, bottom: 60, width: 380, height: 62, transform: 'translateX(-50%)', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,0,0,0.5), rgba(0,0,0,0) 70%)'}} />
        <AnhHai pose="think" x={1380} y={0} delay={10} h={620} />
      </PushIn>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, transparent 48%, rgba(0,0,0,0.45) 100%)', pointerEvents: 'none'}} />
    </AbsoluteFill>
  );
};

export const SPACE_DURATION = 150;
