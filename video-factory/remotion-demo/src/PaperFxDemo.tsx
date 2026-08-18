import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing} from 'remotion';
import {Paper, TopBar, Logo, AnhHai, K, Sfx, pop, NAVY, RED, TEAL, BLUE, INK, GOLD, GRAY, AMBER} from './Kit';

// =====================================================================
// DEMO — GIỮ NỀN GIẤY đặc trưng, nhưng "ĐỘNG" bằng nét VIẾT TAY vẽ dần
// (gạch chân, khoanh tròn, mũi tên doodle) + progress + thẻ ẩn dụ + kinetic.
// Chất "sổ tay" mà không đơn điệu.
// =====================================================================

// nét vẽ tay TỰ VẼ DẦN (stroke-dashoffset). pathLength=100 => chuẩn hoá.
const HandDraw: React.FC<{d: string; color: string; delay: number; dur?: number; sw?: number; left: number; top: number; w: number; h: number; vb: string}> = ({d, color, delay, dur = 16, sw = 9, left, top, w, h, vb}) => {
  const f = useCurrentFrame();
  const off = interpolate(f, [delay, delay + dur], [100, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return (
    <svg viewBox={vb} width={w} height={h} style={{position: 'absolute', left, top, overflow: 'visible'}}>
      <Sfx name="whoosh" at={delay} vol={0.08} len={10} />
      <path d={d} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" pathLength={100} strokeDasharray={100} strokeDashoffset={off} />
    </svg>
  );
};

// doodle nhỏ nhấp nháy (ngôi sao / tia nhấn)
const Doodle: React.FC<{x: number; y: number; color: string; delay: number; s?: number}> = ({x, y, color, delay, s = 1}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const sc = pop(f, fps, delay);
  const spin = Math.sin(f / 20) * 6;
  return (
    <svg viewBox="0 0 60 60" width={60 * s} height={60 * s} style={{position: 'absolute', left: x, top: y, transform: `scale(${sc}) rotate(${spin}deg)`, overflow: 'visible'}}>
      <path d="M30 4 L36 24 L56 30 L36 36 L30 56 L24 36 L4 30 L24 24 Z" fill={color} />
    </svg>
  );
};

const BayProgress: React.FC<{n: number; total?: number; delay?: number}> = ({n, total = 7, delay = 0}) => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', top: 66, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>
      <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 34, color: RED, letterSpacing: 1}}>BẪY {n} <span style={{color: GRAY}}>/ {total}</span></div>
      <div style={{display: 'flex', gap: 10}}>
        {Array.from({length: total}).map((_, i) => {
          const fill = i < n - 1 ? 1 : i === n - 1 ? interpolate(f, [delay, delay + 18], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)}) : 0;
          return <div key={i} style={{width: 74, height: 12, borderRadius: 8, background: '#d9d5cd', overflow: 'hidden'}}><div style={{width: `${fill * 100}%`, height: '100%', background: RED, borderRadius: 8}} /></div>;
        })}
      </div>
    </div>
  );
};

const BuffetCard: React.FC<{delay?: number}> = ({delay = 6}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, delay);
  const food = (arr: string[], base: number) => arr.map((e, i) => { const es = pop(f, fps, base + i * 5); return <span key={i} style={{fontSize: 66, display: 'inline-block', margin: '0 4px', transform: `scale(${es})`}}>{e}</span>; });
  return (
    <div style={{position: 'absolute', top: 340, left: 120, right: 720, transform: `scale(${0.92 + s * 0.08})`, opacity: interpolate(f, [delay, delay + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
      <Sfx name="pop" at={delay} vol={0.2} len={10} />
      <div style={{border: `5px solid ${NAVY}`, borderRadius: 28, background: 'rgba(255,255,255,0.9)', padding: '26px 34px 30px'}}>
        <div style={{display: 'inline-block', background: NAVY, color: '#fff', fontFamily: 'BVP', fontWeight: 800, fontSize: 30, padding: '8px 22px', borderRadius: 999, marginBottom: 20}}>🍽️ ẨN DỤ: ĐI ĂN BUFFET</div>
        <div style={{display: 'flex', gap: 26}}>
          <div style={{flex: 1, border: `4px solid ${TEAL}`, borderRadius: 20, padding: '14px 16px 18px', textAlign: 'center'}}>
            <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 28, color: TEAL, marginBottom: 6}}>NGƯỜI KHÔN</div>
            <div>{food(['🦐', '🦀', '🥩'], delay + 10)}</div>
            <div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 28, color: '#20242b', marginTop: 6}}>món chính TRƯỚC</div>
          </div>
          <div style={{flex: 1, border: `4px solid ${RED}`, borderRadius: 20, padding: '14px 16px 18px', textAlign: 'center'}}>
            <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 28, color: RED, marginBottom: 6}}>NGƯỜI NON</div>
            <div>{food(['🍟', '🥤', '🍬'], delay + 22)}</div>
            <div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 28, color: '#20242b', marginTop: 6}}>no vì món vặt</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PaperFx: React.FC = () => {
  const f = useCurrentFrame();
  const capO = interpolate(f, [40, 48], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: '#f4f1ec'}}>
      <Paper />
      <TopBar color={NAVY} /><Logo />
      <BayProgress n={1} delay={6} />
      {/* heading + KHOANH TRÒN tay quanh "THỪA" (vẽ dần) */}
      <div style={{position: 'absolute', top: 150, left: 60, right: 60, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 62, color: INK, opacity: interpolate(f, [2, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
        Bẫy 1: để dành phần <span style={{color: RED}}>THỪA</span>
      </div>
      <HandDraw delay={14} dur={18} color={RED} sw={8} left={1170} top={132} w={280} h={150} vb="0 0 240 130"
        d="M60 26 C 8 40 16 120 118 118 C 214 116 228 44 168 24 C 132 12 92 18 66 34" />
      {/* thẻ ẩn dụ */}
      <BuffetCard delay={18} />
      {/* MŨI TÊN doodle vẽ tay từ card chỉ xuống caption */}
      <HandDraw delay={40} dur={16} color={NAVY} sw={8} left={250} top={760} w={220} h={170} vb="0 0 200 160"
        d="M12 16 C 70 30 130 66 150 128 M150 128 l -40 -6 M150 128 l -4 -38" />
      {/* doodle nhấn */}
      <Doodle x={150} y={330} color={GOLD} delay={26} s={1.1} />
      <Doodle x={1150} y={560} color={TEAL} delay={34} s={0.8} />
      {/* Anh Hai */}
      <AnhHai pose="sly" x={1400} y={0} delay={10} h={560} />
      {/* caption + GẠCH CHÂN tay dưới từ khoá */}
      <div style={{position: 'absolute', bottom: 96, left: 90, right: 640, fontFamily: 'BVP', fontWeight: 800, fontSize: 44, color: '#2b2f36', lineHeight: 1.35, opacity: capO}}>
        Lương về <span style={{color: RED}}>tiêu trước</span>, cuối tháng chẳng còn gì mà cất
      </div>
      <HandDraw delay={52} dur={14} color={RED} sw={7} left={258} top={956} w={250} h={40} vb="0 0 300 40"
        d="M6 22 q150 -20 300 -6" />
    </AbsoluteFill>
  );
};

// NEWS CUT trên NỀN GIẤY (element thẻ tin giữ nguyên, chỉ đổi nền + thêm nét tay)
export const NewsCutPaper: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const s = pop(f, fps, 6);
  const kb = interpolate(f, [0, 150], [1.04, 1.11], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: '#f4f1ec'}}>
      <Paper />
      <TopBar color={RED} /><Logo />
      {/* thẻ tin: ảnh to + ribbon + chyron (y như bản trước) */}
      <div style={{position: 'absolute', top: 150, left: 90, right: 470, transform: `translateY(${(1 - s) * 26}px) scale(${0.97 + s * 0.03})`, opacity: interpolate(f, [6, 14], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
        <div style={{position: 'relative', borderRadius: 22, overflow: 'hidden', boxShadow: '0 30px 56px rgba(15,25,45,0.28), 0 8px 16px rgba(15,25,45,0.16)', border: '5px solid #fff'}}>
          <div style={{position: 'relative', height: 740, overflow: 'hidden'}}>
            <Img src={staticFile('bg/vnn_dn.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${kb})`}} />
            <div style={{position: 'absolute', top: 22, left: 22, display: 'flex', alignItems: 'center', gap: 10}}>
              <span style={{background: RED, color: '#fff', fontFamily: 'BVP', fontWeight: 800, fontSize: 30, padding: '9px 22px', borderRadius: 10}}>📰 BÁO CHÍ</span>
              <span style={{background: 'rgba(15,25,45,0.86)', color: '#fff', fontFamily: 'BVP', fontWeight: 700, fontSize: 28, padding: '9px 20px', borderRadius: 10}}>Nguồn: VietnamNet · 12/8/2026</span>
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: '80px 40px 34px', background: 'linear-gradient(to top, rgba(10,20,40,0.92) 0%, rgba(10,20,40,0.72) 55%, rgba(10,20,40,0) 100%)'}}>
              <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 62, color: '#fff', lineHeight: 1.14, textShadow: '0 4px 20px rgba(0,0,0,0.5)'}}>
                38.800 doanh nghiệp <span style={{color: '#ff6b74'}}>rời thị trường</span> TP.HCM
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* nét tay: mũi tên doodle từ Anh Hai chỉ vào thẻ tin + ngôi sao nhấn */}
      <HandDraw delay={20} dur={16} color={NAVY} sw={9} left={1440} top={560} w={170} h={150} vb="0 0 170 150"
        d="M158 20 C 96 26 40 58 16 120 M16 120 l 44 -2 M16 120 l 4 -40" />
      <Doodle x={1500} y={470} color={GOLD} delay={26} s={1.1} />
      <div style={{position: 'absolute', left: 1690, bottom: 40, width: 300, height: 50, transform: 'translateX(-50%)', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(15,25,45,0.22), rgba(15,25,45,0) 70%)'}} />
      <AnhHai pose="point" x={1560} y={0} delay={14} h={470} />
    </AbsoluteFill>
  );
};

export const PAPERFX_DURATION = 150;
