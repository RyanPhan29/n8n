import React from 'react';
import {OffthreadVideo, Img, staticFile, Sequence} from 'remotion';
import {
  AbsoluteFill, AnhHai, Sfx, K, pop,
  useCurrentFrame, useVideoConfig, interpolate,
  NAVY, RED, TEAL, GOLD, INK,
} from './Kit';

export const COMAY_DURATION = 7182; // 3:59 @30fps — khớp comay.mp3

type Beat = {
  dur: number; src: string; video?: boolean; pose: string; ahH?: number;
  label?: string; keyword?: string; kwColor?: string; sub?: string; bubble?: React.ReactNode;
};

// 12 nhịp b-roll, tổng = 7182 (9 khối auto-time, tách 3 khối dài thành 2)
const BEATS: Beat[] = [
  {dur: 456, src: 'broll/people.mp4', video: true, pose: 'sly', keyword: 'NGƯỜI GIÀU\nKHÔNG BÁN SỨC', kwColor: '#fff',
    bubble: <>Họ xây một <K c={GOLD}>cỗ máy</K>… rồi để nó kiếm hộ, cả lúc <K c={GOLD}>đang ngủ</K>.</>},
  {dur: 296, src: 'comay_bg.png', pose: 'present', label: 'CỖ MÁY 5 BỘ PHẬN', keyword: 'LẮP SAI 1 CÁI\n= CHÁY MÁY', kwColor: RED},
  {dur: 486, src: 'emergency.jpg', pose: 'warning', label: 'BỘ PHẬN 1 · VAN AN TOÀN', keyword: 'QUỸ KHẨN CẤP', kwColor: GOLD, sub: '3–6 tháng chi phí để riêng'},
  {dur: 487, src: 'emo_stress.jpg', pose: 'worried', keyword: 'Thiếu van =\ncháy cả máy', kwColor: RED, sub: 'phải bán lỗ · vay nóng'},
  {dur: 830, src: 'phone_new.jpg', pose: 'point', label: 'BỘ PHẬN 2 · NHIÊN LIỆU', keyword: 'TRÍCH TRƯỚC', kwColor: TEAL, sub: 'Lương về là tự động chuyển vào máy'},
  {dur: 598, src: 'money_calc.jpg', pose: 'point', label: 'BỘ PHẬN 3 · ĐỘNG CƠ', keyword: 'ĐẦU TƯ ĐỀU', kwColor: TEAL, sub: '“Chán” chính là tính năng, không phải lỗi'},
  {dur: 598, src: 'broll_coins.jpg', pose: 'cash', keyword: '3TR/THÁNG →\n≈ 1,5 TỶ', kwColor: GOLD, sub: '20 năm · ~7%/năm · gốc chỉ ~720tr'},
  {dur: 476, src: 'save_money.jpg', pose: 'point', label: 'BỘ PHẬN 4 · BÁNH ĐÀ', keyword: 'TÁI ĐẦU TƯ', kwColor: TEAL, sub: 'Lời đẻ ra lời — quả cầu tuyết'},
  {dur: 477, src: 'broll_coins.jpg', pose: 'excited', keyword: 'ĐỪNG RÚT\nGIỮA CHỪNG', kwColor: RED, sub: 'rút 1 lần = ghì bánh đà đứng lại'},
  {dur: 800, src: 'cash.jpg', pose: 'cool', label: 'BỘ PHẬN 5 · ỐNG XẢ', keyword: 'DÒNG TIỀN\nTHỤ ĐỘNG', kwColor: GOLD, sub: 'Tiền làm việc thay bạn — cả lúc ngủ'},
  {dur: 936, src: 'crowd.jpg', pose: 'warning', keyword: '3 KẺ THÙ\nCỦA CỖ MÁY', kwColor: RED, sub: 'bỏ van · rút bánh đà · đầu tư phong trào'},
  {dur: 742, src: 'comay_bg.png', pose: 'present', keyword: 'BẠN ĐANG Ở\nBỘ PHẬN MẤY?', kwColor: '#fff', sub: 'Gõ 1 → 5 cho anh Hai',
    bubble: <>Ở <K c={GOLD}>số 0</K>? Lắp cái <K c={GOLD}>van</K> đầu tiên hôm nay là máy đã khởi động.</>},
];

const Broll: React.FC<{b: Beat}> = ({b}) => {
  const f = useCurrentFrame();
  const sc = interpolate(f, [0, b.dur], [1.08, 1.2], {extrapolateRight: 'clamp'});
  const style: React.CSSProperties = {width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.6) contrast(1.06) brightness(0.66) saturate(0.9)', transform: `scale(${sc})`};
  return <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
    {b.video ? <OffthreadVideo src={staticFile(b.src)} muted style={style} /> : <Img src={staticFile(b.src)} style={style} />}
  </div>;
};

const kinLines = (text: string, color: string, delay: number) => {
  return text.split('\n').map((ln, i) => <div key={i}>{ln === '' ? ' ' : <span style={{color}}>{ln}</span>}</div>);
};

const Scene: React.FC<{b: Beat}> = ({b}) => {
  const f = useCurrentFrame();
  const lab = interpolate(f, [4, 14], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const kw = interpolate(f, [12, 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const kwY = interpolate(f, [12, 24], [30, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const subO = interpolate(f, [26, 38], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill>
    <Broll b={b} />
    {/* gradient nền cho chữ nổi */}
    <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,12,25,0.62) 0%, rgba(8,12,25,0.05) 30%, rgba(8,12,25,0.2) 62%, rgba(8,12,25,0.8) 100%)'}} />
    {/* logo */}
    <div style={{position: 'absolute', top: 40, left: 54, fontFamily: 'Mont', fontWeight: 900, fontSize: 34, color: '#fff', letterSpacing: 1, textShadow: '0 2px 8px rgba(0,0,0,0.7)'}}>CHUYỆN TIỀN <span style={{color: GOLD}}>· ANH HAI KỂ</span></div>

    {/* label pill (bộ phận) */}
    {b.label && <div style={{position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center', opacity: lab}}>
      <span style={{display: 'inline-block', background: RED, color: '#fff', fontFamily: 'Mont', fontWeight: 900, fontSize: 46, padding: '12px 34px', borderRadius: 12, letterSpacing: 1, boxShadow: '0 10px 24px rgba(0,0,0,0.5)'}}>{b.label}</span>
    </div>}

    {/* keyword giữa */}
    {b.keyword && <div style={{position: 'absolute', top: b.label ? 250 : 210, left: 60, right: 60, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 132, lineHeight: 1.02, letterSpacing: 1, opacity: kw, transform: `translateY(${kwY}px)`, textShadow: '4px 5px 0 #0a0f1c, 0 16px 30px rgba(0,0,0,0.6)'}}>
      {kinLines(b.keyword, b.kwColor || '#fff', 12)}
    </div>}

    {/* sub */}
    {b.sub && <div style={{position: 'absolute', top: 620, left: 60, right: 60, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 46, color: '#e9eefb', opacity: subO, textShadow: '0 3px 12px rgba(0,0,0,0.8)'}}>{b.sub}</div>}

    {/* bóng nền + Anh Hai cutout */}
    <div style={{position: 'absolute', left: 40, bottom: 0, width: 720, height: 280, background: 'radial-gradient(ellipse at 42% 92%, rgba(0,0,0,0.6), rgba(0,0,0,0) 70%)'}} />
    <AnhHai pose={b.pose} x={70} y={330} delay={6} h={b.ahH || 620} />

    {/* bubble thoại (nếu có) */}
    {b.bubble && <Bubble delay={20} x={760} y={720} w={1080}>{b.bubble}</Bubble>}
  </AbsoluteFill>;
};

const Bubble: React.FC<{delay: number; x: number; y: number; w: number; children: React.ReactNode}> = ({delay, x, y, w, children}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, delay);
  return <div style={{position: 'absolute', left: x, top: y, width: w, transform: `scale(${s})`, transformOrigin: 'bottom left'}}>
    <Sfx name="pop" at={delay} vol={0.2} len={9} />
    <div style={{background: '#fff', border: `6px solid ${NAVY}`, borderRadius: 28, padding: '24px 32px', fontFamily: 'Mont', fontWeight: 900, fontSize: 48, color: INK, lineHeight: 1.25, boxShadow: '0 16px 34px rgba(0,0,0,0.45)'}}>{children}</div>
    <div style={{position: 'absolute', left: 56, bottom: -24, width: 0, height: 0, borderLeft: '16px solid transparent', borderRight: '28px solid transparent', borderTop: `28px solid ${NAVY}`}} />
  </div>;
};

export const CoMayHybrid: React.FC = () => {
  let acc = 0;
  return <AbsoluteFill style={{backgroundColor: '#0a0f1c'}}>
    {BEATS.map((b, i) => {
      const from = acc; acc += b.dur;
      return <Sequence key={i} from={from} durationInFrames={b.dur}><Scene b={b} /></Sequence>;
    })}
  </AbsoluteFill>;
};
