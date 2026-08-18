import React from 'react';
import {Img, staticFile} from 'remotion';
import {
  AbsoluteFill, TopBar, Logo, AnhHai, K, Sfx, Counter,
  Timeline, totalFrames, Sc, useCurrentFrame, useVideoConfig, interpolate, Easing, pop,
  NAVY, RED, TEAL, BLUE, INK, GOLD, GRAY, AMBER,
} from './Kit';

// ===== PILOT 7 BẪY — Mở đầu + Bẫy 1, diện mạo mới (giấy động + element) =====
// Khớp giọng 7bay.mp3: cắt cảnh theo mốc lặng. Timeline tự thêm nền giấy động.

// -- nét vẽ tay tự vẽ dần --
const HandDraw: React.FC<{d: string; color: string; delay: number; dur?: number; sw?: number; left: number; top: number; w: number; h: number; vb: string}> = ({d, color, delay, dur = 16, sw = 9, left, top, w, h, vb}) => {
  const f = useCurrentFrame();
  const off = interpolate(f, [delay, delay + dur], [100, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return <svg viewBox={vb} width={w} height={h} style={{position: 'absolute', left, top, overflow: 'visible'}}><path d={d} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" pathLength={100} strokeDasharray={100} strokeDashoffset={off} /></svg>;
};
const Doodle: React.FC<{x: number; y: number; color: string; delay: number; s?: number}> = ({x, y, color, delay, s = 1}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const sc = pop(f, fps, delay);
  return <svg viewBox="0 0 60 60" width={60 * s} height={60 * s} style={{position: 'absolute', left: x, top: y, transform: `scale(${sc}) rotate(${Math.sin(f / 20) * 6}deg)`, overflow: 'visible'}}><path d="M30 4 L36 24 L56 30 L36 36 L30 56 L24 36 L4 30 L24 24 Z" fill={color} /></svg>;
};
// -- thanh tiến độ BẪY x/7 --
const Prog: React.FC<{n: number; delay?: number}> = ({n, delay = 0}) => {
  const f = useCurrentFrame();
  return <div style={{position: 'absolute', top: 60, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
    <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 32, color: RED, letterSpacing: 1}}>BẪY {n} <span style={{color: GRAY}}>/ 7</span></div>
    <div style={{display: 'flex', gap: 9}}>{Array.from({length: 7}).map((_, i) => { const fill = i < n - 1 ? 1 : i === n - 1 ? interpolate(f, [delay, delay + 18], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)}) : 0; return <div key={i} style={{width: 70, height: 11, borderRadius: 7, background: '#d9d5cd', overflow: 'hidden'}}><div style={{width: `${fill * 100}%`, height: '100%', background: RED, borderRadius: 7}} /></div>; })}</div>
  </div>;
};
// -- kinetic heading (từ khoá bật màu + nảy) --
type Tok = {w: string; c?: string; hl?: boolean};
const Kin: React.FC<{toks: Tok[]; top?: number; size?: number; delay?: number; ah?: boolean; step?: number}> = ({toks, top = 165, size = 68, delay = 2, ah = false, step = 4}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  return <div style={{position: 'absolute', top, left: 70, right: ah ? 520 : 70, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: size, lineHeight: 1.16, color: INK, textWrap: 'balance'}}>{toks.map((t, i) => { const d = delay + i * step; const s = pop(f, fps, d); const o = interpolate(f, [d, d + 5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}); const sc = t.hl ? 0.6 + s * 0.55 : 0.78 + s * 0.22; return <span key={i} style={{display: 'inline-block', margin: '0 15px', color: t.c || INK, opacity: o, transform: `scale(${sc})`}}>{t.w}</span>; })}</div>;
};
const Cap: React.FC<{children: React.ReactNode; delay?: number; ah?: boolean}> = ({children, delay = 8, ah = true}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [delay, delay + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <div style={{position: 'absolute', bottom: 88, left: 90, right: ah ? 620 : 160, textAlign: ah ? 'left' : 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 42, lineHeight: 1.34, color: '#2b2f36', opacity: o}}>{children}</div>;
};
const foodRow = (arr: string[], base: number, f: number, fps: number) => arr.map((e, i) => { const es = pop(f, fps, base + i * 5); return <span key={i} style={{fontSize: 64, display: 'inline-block', margin: '0 5px', transform: `scale(${es})`}}>{e}</span>; });

// ================= SCENES =================
// S1 HOOK
const S1: React.FC = () => (
  <AbsoluteFill><TopBar color={RED} /><Logo />
    <Kin top={210} size={72} delay={2} toks={[{w: 'Đi'}, {w: 'làm'}, {w: '10'}, {w: 'năm,'}, {w: 'lương'}, {w: 'vẫn'}, {w: 'tăng'}]} />
    <Kin top={330} size={72} delay={22} toks={[{w: 'mà'}, {w: 'tài'}, {w: 'khoản'}, {w: 'vẫn'}, {w: 'TRỐNG', c: RED, hl: true}, {w: 'TRƠN', c: RED, hl: true}]} />
    <div style={{position: 'absolute', top: 500, left: 0, right: 520, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 120, color: NAVY, opacity: interpolate(useCurrentFrame(), [60, 72], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Vì sao?</div>
    <AnhHai pose="worried" x={1420} y={470} delay={12} h={560} />
  </AbsoluteFill>
);
// S2 — 7 bẫy reveal
const S2: React.FC = () => (
  <AbsoluteFill><TopBar color={RED} /><Logo />
    <Kin top={200} size={62} delay={2} toks={[{w: 'Không'}, {w: 'phải'}, {w: 'lười.'}, {w: 'Không'}, {w: 'phải'}, {w: 'kiếm'}, {w: 'ít.'}]} />
    <div style={{position: 'absolute', top: 360, left: 0, right: 520, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 150, color: RED, opacity: interpolate(useCurrentFrame(), [30, 42], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>7 CÁI BẪY</div>
    <div style={{position: 'absolute', top: 560, left: 90, right: 520, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 42, color: '#2b2f36'}}>núp trong thói quen, ngày nào cũng móc túi bạn</div>
    <AnhHai pose="warning" x={1420} y={470} delay={10} h={560} />
  </AbsoluteFill>
);
// S3 — 1,5 tỷ hook
const S3: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, 8);
  return <AbsoluteFill><TopBar color={GOLD} /><Logo />
    <div style={{position: 'absolute', top: 200, left: 90, right: 520, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 58, color: INK, opacity: interpolate(f, [2, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Né được hết thì để ra được</div>
    <div style={{position: 'absolute', top: 320, left: 0, right: 520, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 190, color: GOLD, textShadow: '0 6px 0 rgba(0,0,0,0.08)', transform: `scale(${0.8 + s * 0.2})`}}>1,5 tỷ</div>
    <Doodle x={430} y={330} color={RED} delay={16} s={1.2} />
    <div style={{position: 'absolute', top: 590, left: 90, right: 520, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 44, color: NAVY, opacity: interpolate(f, [40, 50], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Thôi, vào luôn cái đầu tiên nhé!</div>
    <AnhHai pose="sly" x={1430} y={470} delay={12} h={560} />
  </AbsoluteFill>;
};
// S4 — BẪY 1 title
const S4: React.FC = () => (
  <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={1} delay={6} />
    <div style={{position: 'absolute', top: 300, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 76, color: INK, opacity: interpolate(useCurrentFrame(), [4, 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Bẫy 1: để dành phần <span style={{color: RED}}>THỪA</span></div>
    <HandDraw delay={20} dur={20} color={RED} sw={9} left={1180} top={270} w={340} h={190} vb="0 0 240 130" d="M60 26 C 8 40 16 120 118 118 C 214 116 228 44 168 24 C 132 12 92 18 66 34" />
    <div style={{position: 'absolute', top: 470, left: 90, right: 90, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 44, color: '#2b2f36', opacity: interpolate(useCurrentFrame(), [26, 36], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Cái gốc đẻ ra tất cả mấy cái sau</div>
    <AnhHai pose="point" x={1440} y={520} delay={14} h={480} />
  </AbsoluteFill>
);
// S5 — cơ chế: tiêu trước = 0
const S5: React.FC = () => {
  const f = useCurrentFrame();
  const step = (label: string, sub: string, color: string, delay: number, top: number) => { const o = interpolate(f, [delay, delay + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}); const x = interpolate(f, [delay, delay + 10], [-30, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}); return <div style={{position: 'absolute', top, left: 120, right: 500, opacity: o, transform: `translateX(${x}px)`}}><div style={{display: 'inline-flex', alignItems: 'center', gap: 26, border: `6px solid ${color}`, background: 'rgba(255,255,255,0.92)', borderRadius: 26, padding: '22px 44px', fontFamily: 'BVP', fontWeight: 800, fontSize: 54, color: INK}}><span style={{color}}>{label}</span><span style={{color: '#6b7280', fontSize: 42}}>{sub}</span></div></div>; };
  return <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={1} />
    <Kin top={135} size={56} delay={2} toks={[{w: 'Lương'}, {w: 'về'}, {w: 'cái'}, {w: 'là'}, {w: 'TIÊU', c: RED, hl: true}, {w: 'trước'}, {w: 'đã…'}]} />
    {step('Lương về', 'ăn, cà phê, mua sắm', NAVY, 12, 320)}
    {step('Cuối tháng', 'dư đồng nào mới cất', AMBER, 26, 470)}
    {step('Kết quả', 'chả còn đồng nào mà cất', RED, 42, 620)}
    <HandDraw delay={58} dur={14} color={RED} sw={9} left={260} top={760} w={520} h={80} vb="0 0 430 70" d="M10 40 C 120 10 320 10 420 40" />
    <div style={{position: 'absolute', top: 786, left: 300, fontFamily: 'Mont', fontWeight: 900, fontSize: 52, color: RED, opacity: interpolate(f, [64, 72], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Sai từ gốc!</div>
    <AnhHai pose="facepalm" x={1600} y={560} delay={14} h={420} />
  </AbsoluteFill>;
};
// buffet card — dùng ẢNH THẬT (Pexels free) thay emoji
const Photo: React.FC<{src: string; delay: number; h?: number}> = ({src, delay, h = 340}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, delay);
  return <div style={{height: h, borderRadius: 18, overflow: 'hidden', border: '4px solid #fff', boxShadow: '0 14px 28px rgba(15,25,45,0.24)', transform: `scale(${0.9 + s * 0.1})`}}><Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>;
};
// THẺ TO chiếm khung — Anh Hai che mép cũng được (thứ yếu)
const BuffetCard: React.FC<{showNon: boolean}> = ({showNon}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, 4);
  return <div style={{position: 'absolute', top: 190, left: 70, right: 70, transform: `scale(${0.96 + s * 0.04})`, opacity: interpolate(f, [4, 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
    <div style={{border: `7px solid ${NAVY}`, borderRadius: 32, background: 'rgba(255,255,255,0.92)', padding: '30px 44px 38px'}}>
      <div style={{display: 'inline-block', background: NAVY, color: '#fff', fontFamily: 'BVP', fontWeight: 800, fontSize: 40, padding: '12px 30px', borderRadius: 999, marginBottom: 26}}>🍽️ ẨN DỤ: ĐI ĂN BUFFET</div>
      <div style={{display: 'flex', gap: 44}}>
        <div style={{flex: 1, border: `5px solid ${TEAL}`, borderRadius: 24, padding: '20px 22px 26px', textAlign: 'center'}}>
          <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 42, color: TEAL, marginBottom: 16}}>NGƯỜI KHÔN</div>
          <Photo src="food_main.jpg" delay={10} />
          <div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 40, color: '#20242b', marginTop: 16}}>gắp món chính TRƯỚC</div>
        </div>
        <div style={{flex: 1, border: `5px solid ${RED}`, borderRadius: 24, padding: '20px 22px 26px', textAlign: 'center', opacity: showNon ? interpolate(f, [2, 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 0.22}}>
          <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 42, color: RED, marginBottom: 16}}>NGƯỜI NON</div>
          {showNon ? <Photo src="food_junk.jpg" delay={4} /> : <div style={{height: 340, borderRadius: 18, background: '#f0ece4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 130, color: '#c9c2b6'}}>?</div>}
          <div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 40, color: '#20242b', marginTop: 16}}>{showNon ? 'no vì món vặt, tiếc đứt ruột' : '…'}</div>
        </div>
      </div>
    </div>
  </div>;
};
// S6 — buffet: người khôn
const S6: React.FC = () => (
  <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={1} />
    <BuffetCard showNon={false} />
    <AnhHai pose="cool" x={1600} y={560} delay={12} h={420} />
    <Cap delay={20} ah={false}>Người biết ăn thì <K c={TEAL}>chừa bụng cho món chính</K>, gắp tôm cua trước</Cap>
  </AbsoluteFill>
);
// S7 — buffet: người non
const S7: React.FC = () => (
  <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={1} />
    <BuffetCard showNon={true} />
    <AnhHai pose="facepalm" x={1600} y={560} delay={12} h={420} />
    <Cap delay={16} ah={false}>Người non nhồi <K c={RED}>món vặt</K> cho đầy, món chính bê ra thì <K c={RED}>no căng</K> rồi</Cap>
  </AbsoluteFill>
);
// S8 — bài học TRÍCH TRƯỚC
const S8: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, 8);
  return <AbsoluteFill><TopBar color={TEAL} /><Logo /><Prog n={1} />
    <div style={{position: 'absolute', top: 150, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 60, color: INK, opacity: interpolate(f, [2, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Người biết giữ tiền làm <span style={{color: TEAL}}>ngược lại</span></div>
    <div style={{position: 'absolute', top: 320, left: 110, right: 110, transform: `scale(${0.96 + s * 0.04})`, opacity: interpolate(f, [8, 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
      <div style={{border: `7px solid ${TEAL}`, borderRadius: 30, background: 'rgba(255,255,255,0.94)', padding: '46px 56px', display: 'flex', alignItems: 'center', gap: 44}}>
        <Img src={staticFile('icons/piggy.svg')} style={{width: 150, height: 150, flexShrink: 0}} />
        <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 64, color: INK, lineHeight: 1.24}}>Lương về là <span style={{color: TEAL}}>TRÍCH cất trước</span>, còn lại mới đem tiêu</div>
      </div>
    </div>
    <HandDraw delay={30} dur={14} color={TEAL} sw={9} left={330} top={620} w={430} h={54} vb="0 0 430 54" d="M8 30 q210 -24 420 -6" />
    <AnhHai pose="present" x={1600} y={560} delay={14} h={420} />
    <Cap delay={26} ah={false}>Trích ít hay nhiều không quan trọng bằng <K c={TEAL}>trích TRƯỚC</K></Cap>
  </AbsoluteFill>;
};
// S9 — chênh cả trời + móc bẫy 2
const S9: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={1} />
    <Kin top={150} size={56} delay={2} toks={[{w: 'Cùng'}, {w: 'lương,'}, {w: 'khác'}, {w: 'mỗi'}, {w: 'THỨ', c: BLUE, hl: true}, {w: 'TỰ', c: BLUE, hl: true}]} />
    <div style={{position: 'absolute', top: 330, left: 0, right: 620, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 66, color: INK}}>Vài năm sau chênh nhau <span style={{color: RED}}>cả trời</span></div>
    <div style={{position: 'absolute', top: 470, left: 150, right: 620, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 46, color: '#2b2f36', opacity: interpolate(f, [30, 40], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Mà <K c={RED}>8 trên 10 người</K> đang làm ngược</div>
    <div style={{position: 'absolute', bottom: 96, left: 90, right: 620, fontFamily: 'BVP', fontWeight: 800, fontSize: 44, color: NAVY, opacity: interpolate(f, [300, 320], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Mà đây mới là khởi động thôi… bẫy 2 còn <K c={RED}>đểu hơn</K></div>
    <AnhHai pose="sly" x={1440} y={520} delay={14} h={480} />
  </AbsoluteFill>;
};

const SCENES: Sc[] = [
  {c: S1, d: 255}, {c: S2, d: 171}, {c: S3, d: 210},
  {c: S4, d: 339}, {c: S5, d: 360}, {c: S6, d: 321}, {c: S7, d: 234}, {c: S8, d: 297}, {c: S9, d: 444},
];
export const BAY7PILOT_DURATION = totalFrames(SCENES);
export const Bay7Pilot: React.FC = () => <Timeline scenes={SCENES} />;
