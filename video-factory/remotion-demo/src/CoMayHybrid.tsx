import React from 'react';
import {OffthreadVideo, staticFile, Sequence, Loop} from 'remotion';
import {
  AbsoluteFill, AnhHai, Sfx, K, pop,
  useCurrentFrame, useVideoConfig, interpolate, Easing,
  NAVY, RED, TEAL, GOLD, INK,
} from './Kit';

export const COMAY_DURATION = 7182; // 3:59 @30fps — khớp comay.mp3

type Beat = {
  dur: number; src: string; clip: number; pose: string; ahH?: number;
  label?: string; icon?: string; keyword?: string; kwColor?: string; hi?: boolean;
  count?: {to: number; pre?: string; suf?: string}; sub?: string; bubble?: React.ReactNode;
};

const BEATS: Beat[] = [
  {dur: 456, src: 'broll/people.mp4', clip: 24, pose: 'sly', keyword: 'NGƯỜI GIÀU\nKHÔNG BÁN SỨC', kwColor: '#fff', hi: true,
    bubble: <>Họ xây một <K c={GOLD}>cỗ máy</K>… rồi để nó kiếm hộ, cả lúc <K c={GOLD}>đang ngủ</K>.</>},
  {dur: 296, src: 'broll/machine.mp4', clip: 21, pose: 'present', label: 'CỖ MÁY 5 BỘ PHẬN', icon: '⚙️', keyword: 'LẮP SAI 1 CÁI\n= CHÁY MÁY', kwColor: RED, hi: true},
  {dur: 486, src: 'broll/piggy.mp4', clip: 15, pose: 'warning', label: 'BỘ PHẬN 1 · VAN AN TOÀN', icon: '🛟', keyword: 'QUỸ KHẨN CẤP', kwColor: GOLD, hi: true, sub: '3–6 tháng chi phí để riêng'},
  {dur: 487, src: 'broll/handsbill.mp4', clip: 11, pose: 'worried', keyword: 'Thiếu van =\ncháy cả máy', kwColor: RED, hi: true, sub: 'phải bán lỗ · vay nóng'},
  {dur: 830, src: 'broll/budget.mp4', clip: 17, pose: 'point', label: 'BỘ PHẬN 2 · NHIÊN LIỆU', icon: '⛽', keyword: 'TRÍCH TRƯỚC', kwColor: TEAL, hi: true, sub: 'Lương về là tự động chuyển vào máy'},
  {dur: 598, src: 'broll/stocks.mp4', clip: 18, pose: 'point', label: 'BỘ PHẬN 3 · ĐỘNG CƠ', icon: '📈', keyword: 'ĐẦU TƯ ĐỀU', kwColor: TEAL, hi: true, sub: '“Chán” chính là tính năng, không phải lỗi'},
  {dur: 598, src: 'broll/coinstack.mp4', clip: 30, pose: 'cash', keyword: '3TR/THÁNG →', kwColor: '#fff', count: {to: 1.5, pre: '≈ ', suf: ' TỶ'}, sub: '20 năm · ~7%/năm · gốc chỉ ~720tr'},
  {dur: 476, src: 'broll/coinfigs.mp4', clip: 20, pose: 'point', label: 'BỘ PHẬN 4 · BÁNH ĐÀ', icon: '❄️', keyword: 'TÁI ĐẦU TƯ', kwColor: TEAL, hi: true, sub: 'Lời đẻ ra lời — quả cầu tuyết'},
  {dur: 477, src: 'broll/handsbill.mp4', clip: 11, pose: 'excited', keyword: 'ĐỪNG RÚT\nGIỮA CHỪNG', kwColor: RED, hi: true, sub: 'rút 1 lần = ghì bánh đà đứng lại'},
  {dur: 800, src: 'broll/richwave.mp4', clip: 17, pose: 'cool', label: 'BỘ PHẬN 5 · ỐNG XẢ', icon: '💸', keyword: 'DÒNG TIỀN\nTHỤ ĐỘNG', kwColor: GOLD, hi: true, sub: 'Tiền làm việc thay bạn — cả lúc ngủ'},
  {dur: 936, src: 'broll/crowd.mp4', clip: 37, pose: 'warning', keyword: '3 KẺ THÙ\nCỦA CỖ MÁY', kwColor: RED, hi: true, sub: 'bỏ van · rút bánh đà · đầu tư phong trào'},
  {dur: 742, src: 'broll/machine.mp4', clip: 21, pose: 'present', keyword: 'BẠN ĐANG Ở\nBỘ PHẬN MẤY?', kwColor: '#fff', hi: true, sub: 'Gõ 1 → 5 cho anh Hai',
    bubble: <>Ở <K c={GOLD}>số 0</K>? Lắp cái <K c={GOLD}>van</K> đầu tiên hôm nay là máy đã khởi động.</>},
];

const HL: Record<string, string> = {[GOLD]: 'rgba(242,194,48,0.30)', [RED]: 'rgba(225,29,42,0.32)', [TEAL]: 'rgba(21,154,134,0.34)', '#fff': 'rgba(255,255,255,0.14)'};
const GLOW: Record<string, string> = {[GOLD]: 'rgba(242,194,48,0.55)', [RED]: 'rgba(225,29,42,0.5)', [TEAL]: 'rgba(21,205,170,0.5)', '#fff': 'rgba(180,205,255,0.4)'};

const Broll: React.FC<{b: Beat}> = ({b}) => {
  const f = useCurrentFrame();
  const sc = interpolate(f, [0, b.dur], [1.06, 1.18], {extrapolateRight: 'clamp'});
  const style: React.CSSProperties = {width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.5) contrast(1.07) brightness(0.66) saturate(1.05)', transform: `scale(${sc})`};
  const loopLen = Math.max(30, Math.round(b.clip * 30) - 5);
  return <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
    <Loop durationInFrames={loopLen}><OffthreadVideo src={staticFile(b.src)} muted style={style} /></Loop>
  </div>;
};

// từng chữ nảy vào (spring + trượt lên)
const AWord: React.FC<{delay: number; color: string; children: React.ReactNode}> = ({delay, color, children}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const s = pop(f, fps, delay);
  const o = interpolate(f, [delay, delay + 5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const y = interpolate(f, [delay, delay + 10], [30, 0], {easing: Easing.out(Easing.back(1.6)), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <span style={{display: 'inline-block', opacity: o, transform: `translateY(${y}px) scale(${s})`, color, margin: '0 0.16em', textShadow: `0 0 24px ${GLOW[color] || 'rgba(0,0,0,0.4)'}, 4px 5px 0 #0a0f1c`}}>{children}</span>;
};

const CountUp: React.FC<{to: number; delay: number; color: string; pre?: string; suf?: string}> = ({to, delay, color, pre, suf}) => {
  const f = useCurrentFrame();
  const v = interpolate(f, [delay, delay + 26], [0, to], {easing: Easing.out(Easing.cubic), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const s = pop(f, useVideoConfig().fps, delay);
  return <span style={{display: 'inline-block', color, transform: `scale(${s})`, textShadow: `0 0 30px ${GLOW[color] || GLOW[GOLD]}, 4px 5px 0 #0a0f1c`}}>{pre}{v.toFixed(1).replace('.', ',')}{suf}</span>;
};

const KeywordBlock: React.FC<{b: Beat; start: number}> = ({b, start}) => {
  const f = useCurrentFrame();
  const kwColor = b.kwColor || '#fff';
  const pulse = 1 + 0.012 * Math.sin((f - start) / 9);
  const lines = (b.keyword || '').split('\n');
  let wi = 0;
  return <div style={{position: 'absolute', top: b.label ? 244 : 200, left: 40, right: 40, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 128, lineHeight: 1.08, letterSpacing: 1, transform: `scale(${pulse})`}}>
    {lines.map((line, li) => {
      const isLast = li === lines.length - 1;
      const lineDelay = start + wi * 2.5;
      const hiW = interpolate(f, [lineDelay + 3, lineDelay + 13], [0, 1], {easing: Easing.out(Easing.cubic), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      const words = line.split(' ');
      const block = (
        <div key={li} style={{position: 'relative', display: 'inline-block', padding: '0 10px'}}>
          {b.hi && isLast && <div style={{position: 'absolute', left: 0, right: 0, top: '14%', bottom: '14%', background: HL[kwColor] || HL['#fff'], borderRadius: 14, transform: `scaleX(${hiW})`, transformOrigin: 'left center', zIndex: -1}} />}
          {words.map((w, k) => { const d = start + (wi++) * 2.5; return <AWord key={k} delay={d} color={kwColor}>{w}</AWord>; })}
        </div>
      );
      return <div key={li}>{block}</div>;
    })}
    {b.count && <div style={{fontSize: 150}}><CountUp to={b.count.to} delay={start + wi * 2.5 + 4} color={GOLD} pre={b.count.pre} suf={b.count.suf} /></div>}
    {/* gạch chân vẽ ra */}
    <div style={{margin: '10px auto 0', height: 9, width: `${interpolate(f, [start + 10, start + 26], [0, 62], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}%`, background: kwColor, borderRadius: 6, boxShadow: `0 0 20px ${GLOW[kwColor] || GLOW[GOLD]}`}} />
  </div>;
};

const Scene: React.FC<{b: Beat}> = ({b}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const labS = pop(f, fps, 3);
  const labX = interpolate(f, [3, 14], [-70, 0], {easing: Easing.out(Easing.back(1.5)), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const subBar = interpolate(f, [30, 40], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const subWords = (b.sub || '').split(' ');
  return <AbsoluteFill>
    <Broll b={b} />
    <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,12,25,0.6) 0%, rgba(8,12,25,0.05) 30%, rgba(8,12,25,0.2) 62%, rgba(8,12,25,0.82) 100%)'}} />
    <div style={{position: 'absolute', top: 40, left: 54, fontFamily: 'Mont', fontWeight: 900, fontSize: 34, color: '#fff', letterSpacing: 1, textShadow: '0 2px 8px rgba(0,0,0,0.7)'}}>CHUYỆN TIỀN <span style={{color: GOLD}}>· ANH HAI KỂ</span></div>

    {b.label && <div style={{position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center', transform: `translateX(${labX}px) scale(${labS})`}}>
      <span style={{display: 'inline-flex', alignItems: 'center', gap: 14, background: RED, color: '#fff', fontFamily: 'Mont', fontWeight: 900, fontSize: 46, padding: '12px 34px', borderRadius: 12, letterSpacing: 1, boxShadow: '0 10px 24px rgba(0,0,0,0.5)'}}>{b.icon && <span style={{fontSize: 50}}>{b.icon}</span>}{b.label}</span>
    </div>}

    {b.keyword && <KeywordBlock b={b} start={12} />}

    {b.sub && <div style={{position: 'absolute', top: 632, left: 0, right: 0, textAlign: 'center'}}>
      <span style={{display: 'inline-flex', alignItems: 'center', gap: 16, fontFamily: 'BVP', fontWeight: 800, fontSize: 46, color: '#eef2fc', textShadow: '0 3px 12px rgba(0,0,0,0.9)'}}>
        <span style={{width: 8, height: 40, background: GOLD, borderRadius: 4, transform: `scaleY(${subBar})`, boxShadow: `0 0 14px ${GLOW[GOLD]}`}} />
        <span>{subWords.map((w, i) => { const d = 32 + i * 1.6; const o = interpolate(f, [d, d + 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}); return <span key={i} style={{opacity: o, margin: '0 0.12em', display: 'inline-block'}}>{w}</span>; })}</span>
      </span>
    </div>}

    <div style={{position: 'absolute', left: 40, bottom: 0, width: 720, height: 280, background: 'radial-gradient(ellipse at 42% 92%, rgba(0,0,0,0.62), rgba(0,0,0,0) 70%)'}} />
    <AnhHai pose={b.pose} x={70} y={330} delay={6} h={b.ahH || 620} />

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
