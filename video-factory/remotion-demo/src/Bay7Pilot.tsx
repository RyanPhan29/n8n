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
const Kin: React.FC<{toks: Tok[]; top?: number; size?: number; delay?: number; ah?: boolean; step?: number}> = ({toks, top = 165, size = 68, delay = 1, ah = false, step = 3}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  return <><Sfx name="pop" at={delay} vol={0.18} len={8} />{toks.map((t, i) => t.hl ? <Sfx key={'s' + i} name="ding" at={delay + i * step} vol={0.26} len={14} /> : null)}
    <div style={{position: 'absolute', top, left: 70, right: ah ? 520 : 70, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: size, lineHeight: 1.16, color: INK, textWrap: 'balance'}}>{toks.map((t, i) => { const d = delay + i * step; const s = pop(f, fps, d); const o = interpolate(f, [d, d + 5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}); const sc = t.hl ? 0.6 + s * 0.55 : 0.78 + s * 0.22; return <span key={i} style={{display: 'inline-block', margin: '0 15px', color: t.c || INK, opacity: o, transform: `scale(${sc})`}}>{t.w}</span>; })}</div></>;
};
const Cap: React.FC<{children: React.ReactNode; delay?: number; ah?: boolean}> = ({children, delay = 8, ah = true}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [delay, delay + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <div style={{position: 'absolute', bottom: 88, left: 90, right: ah ? 620 : 160, textAlign: ah ? 'left' : 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 42, lineHeight: 1.34, color: '#2b2f36', opacity: o}}>{children}</div>;
};
const foodRow = (arr: string[], base: number, f: number, fps: number) => arr.map((e, i) => { const es = pop(f, fps, base + i * 5); return <span key={i} style={{fontSize: 64, display: 'inline-block', margin: '0 5px', transform: `scale(${es})`}}>{e}</span>; });

// -- KHUNG ẢNH đặt tự do (ảnh thật / cảm xúc / meme) --
const Framed: React.FC<{src: string; left: number; top: number; w: number; h: number; delay: number; rot?: number}> = ({src, left, top, w, h, delay, rot = 0}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, delay);
  return <><Sfx name="pop" at={delay} vol={0.2} len={9} /><div style={{position: 'absolute', left, top, width: w, height: h, borderRadius: 20, overflow: 'hidden', border: '5px solid #fff', boxShadow: '0 18px 34px rgba(15,25,45,0.28)', transform: `scale(${0.9 + s * 0.1}) rotate(${rot}deg)`}}><Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div></>;
};
// -- CHÚ THÍCH SỐ TIỀN (pill nghiêng, nảy) --
const MoneyTag: React.FC<{text: string; color: string; x: number; y: number; delay: number; rot?: number; size?: number}> = ({text, color, x, y, delay, rot = -4, size = 50}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, delay);
  return <><Sfx name="coin" at={delay} vol={0.24} len={14} /><div style={{position: 'absolute', left: x, top: y, transform: `scale(${s}) rotate(${rot}deg)`, background: color, color: '#fff', fontFamily: 'Mont', fontWeight: 900, fontSize: size, padding: '12px 28px', borderRadius: 16, boxShadow: '0 9px 0 rgba(0,0,0,0.14)', whiteSpace: 'nowrap'}}>{text}</div></>;
};
// -- BIỂU ĐỒ CỘT tăng/giảm/so sánh --
const BarChart: React.FC<{items: {label: string; value: number; color: string; tag: string}[]; top?: number; maxH?: number; delay?: number; left?: number; right?: number}> = ({items, top = 320, maxH = 360, delay = 6, left = 120, right = 560}) => {
  const f = useCurrentFrame();
  const max = Math.max(...items.map((i) => i.value));
  return <div style={{position: 'absolute', top, left, right, height: maxH + 130, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 100}}>
    {items.map((it, i) => {
      const d = delay + i * 12;
      const h = interpolate(f, [d, d + 22], [0, (it.value / max) * maxH], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
      const o = interpolate(f, [d, d + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      return <div key={i} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: o}}>
        <Sfx name="ticker" at={d} vol={0.16} len={24} />
        <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 46, color: it.color, marginBottom: 12}}>{it.tag}</div>
        <div style={{width: 200, height: h, background: it.color, borderRadius: '18px 18px 0 0'}} />
        <div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 38, color: INK, marginTop: 16, textAlign: 'center'}}>{it.label}</div>
      </div>;
    })}
  </div>;
};

// ================= SCENES =================
// S1 HOOK
const S1: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={RED} /><Logo />
    <Kin top={140} size={58} delay={2} toks={[{w: 'Đi'}, {w: 'làm'}, {w: '10'}, {w: 'năm,'}, {w: 'lương'}, {w: 'vẫn'}, {w: 'tăng'}]} />
    <Framed src="emo_stress.jpg" left={120} top={300} w={780} h={480} delay={8} rot={-2} />
    <MoneyTag text="Số dư: 0đ 😩" color={RED} x={560} y={330} delay={22} rot={-6} size={52} />
    <div style={{position: 'absolute', top: 360, left: 960, right: 90, fontFamily: 'Mont', fontWeight: 900, fontSize: 66, color: INK, lineHeight: 1.2, opacity: interpolate(f, [16, 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Tài khoản vẫn <span style={{color: RED}}>TRỐNG TRƠN</span>.</div>
    <div style={{position: 'absolute', top: 540, left: 960, right: 90, fontFamily: 'Mont', fontWeight: 900, fontSize: 130, color: NAVY, opacity: interpolate(f, [42, 52], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Vì sao?</div>
    <AnhHai pose="worried" x={1560} y={560} delay={12} h={420} />
  </AbsoluteFill>;
};
// S2 — 7 bẫy reveal
const S2: React.FC = () => (
  <AbsoluteFill><TopBar color={RED} /><Logo />
    <Kin top={200} size={62} delay={2} toks={[{w: 'Không'}, {w: 'phải'}, {w: 'lười.'}, {w: 'Không'}, {w: 'phải'}, {w: 'kiếm'}, {w: 'ít.'}]} />
    <div style={{position: 'absolute', top: 360, left: 0, right: 520, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 150, color: RED, opacity: interpolate(useCurrentFrame(), [18, 28], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>7 CÁI BẪY</div>
    <div style={{position: 'absolute', top: 560, left: 90, right: 520, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 42, color: '#2b2f36'}}>núp trong thói quen, ngày nào cũng móc túi bạn</div>
    <AnhHai pose="warning" x={1420} y={470} delay={10} h={560} />
  </AbsoluteFill>
);
// S3 — 1,5 tỷ hook
const S3: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, 5);
  return <AbsoluteFill><TopBar color={GOLD} /><Logo /><Sfx name="ding" at={5} vol={0.34} len={20} /><Sfx name="coin" at={8} vol={0.3} len={16} />
    <div style={{position: 'absolute', top: 200, left: 90, right: 520, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 58, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Né được hết thì để ra được</div>
    <div style={{position: 'absolute', top: 320, left: 0, right: 520, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 190, color: GOLD, textShadow: '0 6px 0 rgba(0,0,0,0.08)', transform: `scale(${0.8 + s * 0.2})`}}>1,5 tỷ</div>
    <Doodle x={430} y={330} color={RED} delay={11} s={1.2} />
    <div style={{position: 'absolute', top: 590, left: 90, right: 520, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 44, color: NAVY, opacity: interpolate(f, [28, 38], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Thôi, vào luôn cái đầu tiên nhé!</div>
    <AnhHai pose="sly" x={1430} y={470} delay={12} h={560} />
  </AbsoluteFill>;
};
// S4 — BẪY 1 title
const S4: React.FC = () => (
  <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={1} delay={4} />
    <div style={{position: 'absolute', top: 300, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 76, color: INK, opacity: interpolate(useCurrentFrame(), [2, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Bẫy 1: để dành phần <span style={{color: RED}}>THỪA</span></div>
    <HandDraw delay={14} dur={18} color={RED} sw={9} left={1180} top={270} w={340} h={190} vb="0 0 240 130" d="M60 26 C 8 40 16 120 118 118 C 214 116 228 44 168 24 C 132 12 92 18 66 34" />
    <div style={{position: 'absolute', top: 470, left: 90, right: 90, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 44, color: '#2b2f36', opacity: interpolate(useCurrentFrame(), [18, 28], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Cái gốc đẻ ra tất cả mấy cái sau</div>
    <AnhHai pose="point" x={1440} y={520} delay={14} h={480} />
  </AbsoluteFill>
);
// S5 — cơ chế: tiêu trước = 0
const S5: React.FC = () => {
  const f = useCurrentFrame();
  const step = (label: string, sub: string, color: string, delay: number, top: number) => { const o = interpolate(f, [delay, delay + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}); const x = interpolate(f, [delay, delay + 10], [-30, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}); return <div style={{position: 'absolute', top, left: 120, right: 500, opacity: o, transform: `translateX(${x}px)`}}><div style={{display: 'inline-flex', alignItems: 'center', gap: 26, border: `6px solid ${color}`, background: 'rgba(255,255,255,0.92)', borderRadius: 26, padding: '22px 44px', fontFamily: 'BVP', fontWeight: 800, fontSize: 54, color: INK}}><span style={{color}}>{label}</span><span style={{color: '#6b7280', fontSize: 42}}>{sub}</span></div></div>; };
  return <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={1} />
    <Kin top={135} size={56} delay={2} toks={[{w: 'Lương'}, {w: 'về'}, {w: 'cái'}, {w: 'là'}, {w: 'TIÊU', c: RED, hl: true}, {w: 'trước'}, {w: 'đã…'}]} />
    {step('Lương về', 'ăn, cà phê, mua sắm', NAVY, 8, 320)}
    {step('Cuối tháng', 'dư đồng nào mới cất', AMBER, 18, 470)}
    {step('Kết quả', 'chả còn đồng nào mà cất', RED, 30, 620)}
    <HandDraw delay={42} dur={14} color={RED} sw={9} left={260} top={760} w={520} h={80} vb="0 0 430 70" d="M10 40 C 120 10 320 10 420 40" />
    <div style={{position: 'absolute', top: 786, left: 300, fontFamily: 'Mont', fontWeight: 900, fontSize: 52, color: RED, opacity: interpolate(f, [46, 56], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Sai từ gốc!</div>
    <AnhHai pose="facepalm" x={1600} y={560} delay={14} h={420} />
  </AbsoluteFill>;
};
// buffet card — dùng ẢNH THẬT (Pexels free) thay emoji
const Photo: React.FC<{src: string; delay: number; h?: number}> = ({src, delay, h = 340}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, delay);
  return <><Sfx name="pop" at={delay} vol={0.2} len={9} /><div style={{height: h, borderRadius: 18, overflow: 'hidden', border: '4px solid #fff', boxShadow: '0 14px 28px rgba(15,25,45,0.24)', transform: `scale(${0.9 + s * 0.1})`}}><Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div></>;
};
// THẺ TO chiếm khung — Anh Hai che mép cũng được (thứ yếu)
const BuffetCard: React.FC<{showNon: boolean}> = ({showNon}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, 4);
  return <div style={{position: 'absolute', top: 190, left: 70, right: 70, transform: `scale(${0.96 + s * 0.04})`, opacity: interpolate(f, [4, 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
    <Sfx name="pop" at={4} vol={0.24} len={10} />
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
    <Cap delay={12} ah={false}>Người biết ăn thì <K c={TEAL}>chừa bụng cho món chính</K>, gắp tôm cua trước</Cap>
  </AbsoluteFill>
);
// S7 — buffet: người non
const S7: React.FC = () => (
  <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={1} />
    <BuffetCard showNon={true} />
    <AnhHai pose="facepalm" x={1600} y={560} delay={12} h={420} />
    <Cap delay={10} ah={false}>Người non nhồi <K c={RED}>món vặt</K> cho đầy, món chính bê ra thì <K c={RED}>no căng</K> rồi</Cap>
  </AbsoluteFill>
);
// S8 — bài học TRÍCH TRƯỚC
const S8: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, 5);
  return <AbsoluteFill><TopBar color={TEAL} /><Logo /><Prog n={1} /><Sfx name="coin" at={11} vol={0.28} len={16} />
    <div style={{position: 'absolute', top: 150, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 60, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Người biết giữ tiền làm <span style={{color: TEAL}}>ngược lại</span></div>
    <div style={{position: 'absolute', top: 320, left: 110, right: 110, transform: `scale(${0.96 + s * 0.04})`, opacity: interpolate(f, [5, 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
      <div style={{border: `7px solid ${TEAL}`, borderRadius: 30, background: 'rgba(255,255,255,0.94)', padding: '30px 44px', display: 'flex', alignItems: 'center', gap: 44}}>
        <div style={{width: 300, height: 220, borderRadius: 20, overflow: 'hidden', flexShrink: 0, border: '4px solid #fff', boxShadow: '0 12px 24px rgba(15,25,45,0.22)'}}><Img src={staticFile('save_money.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
        <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 60, color: INK, lineHeight: 1.24}}>Lương về là <span style={{color: TEAL}}>TRÍCH cất trước</span>, còn lại mới đem tiêu</div>
      </div>
    </div>
    <HandDraw delay={22} dur={14} color={TEAL} sw={9} left={330} top={620} w={430} h={54} vb="0 0 430 54" d="M8 30 q210 -24 420 -6" />
    <AnhHai pose="present" x={1600} y={560} delay={14} h={420} />
    <Cap delay={18} ah={false}>Trích ít hay nhiều không quan trọng bằng <K c={TEAL}>trích TRƯỚC</K></Cap>
  </AbsoluteFill>;
};
// S9 — chênh cả trời + móc bẫy 2
const S9: React.FC = () => {
  const f = useCurrentFrame();
  const years = [{y: 'Năm 1', v: 36}, {y: 'Năm 2', v: 72}, {y: 'Năm 3', v: 108}, {y: 'Năm 4', v: 144}, {y: 'Năm 5', v: 180}];
  const max = 180;
  return <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={1} />
    <div style={{position: 'absolute', top: 120, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 56, color: INK, opacity: interpolate(f, [2, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Để dành đều <span style={{color: TEAL}}>3tr/tháng</span> — 5 năm sau…</div>
    <div style={{position: 'absolute', top: 300, left: 110, right: 540, height: 440, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 44}}>
      {years.map((it, i) => {
        const d = 12 + i * 14;
        const h = interpolate(f, [d, d + 20], [0, (it.v / max) * 340], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
        const o = interpolate(f, [d, d + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        const gold = i === years.length - 1;
        return <div key={i} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: o}}>
          <Sfx name="ticker" at={d} vol={0.14} len={18} />
          <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 34, color: gold ? '#c9962b' : TEAL, marginBottom: 8}}>{it.v}tr</div>
          <div style={{width: 150, height: h, background: gold ? GOLD : TEAL, borderRadius: '14px 14px 0 0'}} />
          <div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 30, color: INK, marginTop: 12}}>{it.y}</div>
        </div>;
      })}
    </div>
    <MoneyTag text="≈ 180 triệu!" color={NAVY} x={420} y={300} delay={82} rot={-6} size={54} />
    <div style={{position: 'absolute', bottom: 92, left: 90, right: 560, fontFamily: 'BVP', fontWeight: 800, fontSize: 42, color: '#2b2f36', opacity: interpolate(f, [250, 270], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Người <K c={RED}>tiêu trước</K> thì vẫn ≈ 0đ. Bẫy 2 còn <K c={RED}>đểu hơn</K>…</div>
    <AnhHai pose="sly" x={1600} y={560} delay={14} h={420} />
  </AbsoluteFill>;
};

// ============ BẪY 2 — LẠM PHÁT LỐI SỐNG (áo rộng theo người) ============
// -- ảnh có nhãn (hàng 3 ảnh lối sống) --
const PhotoCard: React.FC<{src: string; label: string; color: string; delay: number; w?: number; h?: number}> = ({src, label, color, delay, w = 370, h = 300}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, delay);
  return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${0.9 + s * 0.1})`, opacity: interpolate(f, [delay, delay + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
    <Sfx name="pop" at={delay} vol={0.18} len={9} />
    <div style={{width: w, height: h, borderRadius: 18, overflow: 'hidden', border: '5px solid #fff', boxShadow: '0 14px 28px rgba(15,25,45,0.24)'}}><Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
    <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 34, color, marginTop: 14}}>{label}</div>
  </div>;
};
// S10 — BẪY 2 title
const S10: React.FC = () => (
  <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={2} delay={4} />
    <div style={{position: 'absolute', top: 300, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 74, color: INK, opacity: interpolate(useCurrentFrame(), [2, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Bẫy 2: lạm phát <span style={{color: RED}}>LỐI SỐNG</span></div>
    <HandDraw delay={14} dur={18} color={RED} sw={9} left={1150} top={272} w={360} h={190} vb="0 0 240 130" d="M60 26 C 8 40 16 120 118 118 C 214 116 228 44 168 24 C 132 12 92 18 66 34" />
    <div style={{position: 'absolute', top: 470, left: 90, right: 90, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 44, color: '#2b2f36', opacity: interpolate(useCurrentFrame(), [18, 28], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Tên nghe sang, mà túi thì đau</div>
    <AnhHai pose="warning" x={1440} y={520} delay={14} h={480} />
  </AbsoluteFill>
);
// S11 — lương gấp đôi mà vẫn trắng tay
const S11: React.FC = () => {
  const f = useCurrentFrame();
  const o = (a: number, b: number) => interpolate(f, [a, b], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={2} />
    <div style={{position: 'absolute', top: 130, left: 90, right: 520, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 56, color: INK, opacity: o(1, 8)}}>Lương gần <span style={{color: BLUE}}>gấp đôi</span>… vẫn trắng tay?</div>
    <MoneyTag text="Ra trường: 7–8tr" color={GRAY} x={180} y={330} delay={10} rot={-3} size={46} />
    <div style={{position: 'absolute', top: 420, left: 300, fontFamily: 'Mont', fontWeight: 900, fontSize: 64, color: TEAL, opacity: o(20, 28)}}>↓</div>
    <MoneyTag text="Vài năm sau: 15tr" color={BLUE} x={180} y={500} delay={24} rot={-3} size={52} />
    <MoneyTag text="Cuối tháng: 0đ 😵" color={RED} x={180} y={680} delay={44} rot={-5} size={52} />
    <Framed src="emo_stress.jpg" left={1040} top={330} w={440} h={430} delay={16} rot={2} />
    <AnhHai pose="worried" x={1600} y={560} delay={14} h={420} />
  </AbsoluteFill>;
};
// S12 — tiền chui vào lối sống (3 ảnh thật)
const S12: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={2} />
    <div style={{position: 'absolute', top: 120, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 56, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Tiền chui hết vào <span style={{color: RED}}>lối sống mới</span></div>
    <div style={{position: 'absolute', top: 300, left: 90, right: 490, display: 'flex', justifyContent: 'center', gap: 44}}>
      <PhotoCard src="phone_new.jpg" label="Điện thoại xịn" color={BLUE} delay={8} />
      <PhotoCard src="cafe.jpg" label="Cà phê chảnh" color={AMBER} delay={20} />
      <PhotoCard src="eat_out.jpg" label="Ăn ngoài" color={RED} delay={32} />
    </div>
    <div style={{position: 'absolute', bottom: 110, left: 90, right: 490, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 42, color: '#2b2f36', opacity: interpolate(f, [44, 54], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>“Lâu lâu tự thưởng” — hóa ra <K c={RED}>tuần nào cũng thưởng</K></div>
    <AnhHai pose="point" x={1610} y={620} delay={14} h={360} />
  </AbsoluteFill>;
};
// S13 — ẩn dụ ÁO RỘNG THEO NGƯỜI
const S13: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, 4);
  return <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={2} />
    <div style={{position: 'absolute', top: 180, left: 90, right: 90, transform: `scale(${0.96 + s * 0.04})`, opacity: interpolate(f, [4, 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
      <Sfx name="pop" at={4} vol={0.24} len={10} />
      <div style={{border: `7px solid ${NAVY}`, borderRadius: 32, background: 'rgba(255,255,255,0.92)', padding: '28px 44px 34px'}}>
        <div style={{display: 'inline-block', background: NAVY, color: '#fff', fontFamily: 'BVP', fontWeight: 800, fontSize: 38, padding: '12px 30px', borderRadius: 999, marginBottom: 24}}>👕 ẨN DỤ: CÁI ÁO RỘNG THEO NGƯỜI</div>
        <div style={{display: 'flex', gap: 44, alignItems: 'center'}}>
          <div style={{width: 620, height: 360, borderRadius: 22, overflow: 'hidden', flexShrink: 0, border: '5px solid #fff', boxShadow: '0 14px 28px rgba(15,25,45,0.24)'}}><Img src={staticFile('shirt_rack.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
          <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 50, color: INK, lineHeight: 1.28}}>Lương lên tới đâu, <span style={{color: RED}}>lối sống phình</span> tới đó — mặc mãi vẫn <span style={{color: RED}}>vừa in</span>, chả dư tí vải nào</div>
        </div>
      </div>
    </div>
    <AnhHai pose="cool" x={1640} y={640} delay={14} h={340} />
  </AbsoluteFill>;
};
// S14 — ảo giác giàu lên, tài khoản đứng im
const S14: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={2} />
    <div style={{position: 'absolute', top: 130, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 56, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Cảm giác <span style={{color: BLUE}}>giàu lên</span>, mà số dư <span style={{color: RED}}>đứng im</span></div>
    <BarChart top={300} maxH={330} delay={12} left={110} right={520} items={[
      {label: 'LƯƠNG', value: 15, color: BLUE, tag: '15tr'},
      {label: 'ĐỂ DÀNH', value: 1, color: RED, tag: '≈0đ'},
    ]} />
    <MoneyTag text="Thụt lùi ấy chứ!" color={NAVY} x={640} y={330} delay={46} rot={-6} size={48} />
    <div style={{position: 'absolute', bottom: 92, left: 90, right: 560, fontFamily: 'BVP', fontWeight: 800, fontSize: 42, color: '#2b2f36', opacity: interpolate(f, [200, 220], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Giậm chân tại chỗ, mà trên người <K c={RED}>khoác áo mới</K></div>
    <AnhHai pose="sly" x={1600} y={560} delay={14} h={420} />
  </AbsoluteFill>;
};
// S15 — cách gỡ: lương 10, lối sống vài
const S15: React.FC = () => {
  const f = useCurrentFrame();
  const seg = (i: number) => { const d = 14 + i * 4; const o = interpolate(f, [d, d + 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}); const color = i < 3 ? AMBER : TEAL; return <div key={i} style={{flex: 1, height: 96, borderRadius: 12, background: color, opacity: o, boxShadow: '0 6px 0 rgba(0,0,0,0.10)'}} />; };
  return <AbsoluteFill><TopBar color={TEAL} /><Logo /><Prog n={2} />
    <div style={{position: 'absolute', top: 150, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 56, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Lương lên <span style={{color: TEAL}}>10 phần</span>, lối sống cho lên <span style={{color: AMBER}}>vài phần</span></div>
    <div style={{position: 'absolute', top: 360, left: 120, right: 560, display: 'flex', gap: 14}}>{Array.from({length: 10}).map((_, i) => seg(i))}</div>
    <div style={{position: 'absolute', top: 478, left: 120, fontFamily: 'Mont', fontWeight: 900, fontSize: 34, color: AMBER, opacity: interpolate(f, [40, 48], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>3 phần: lối sống</div>
    <div style={{position: 'absolute', top: 478, left: 620, fontFamily: 'Mont', fontWeight: 900, fontSize: 34, color: TEAL, opacity: interpolate(f, [52, 60], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>7 phần: GIỮ làm của</div>
    <Cap delay={40} ah>Không bắt ăn mì gói — chỉ là <K c={TEAL}>đừng cho áo phình hết cỡ</K></Cap>
    <AnhHai pose="present" x={1600} y={560} delay={14} h={420} />
  </AbsoluteFill>;
};
// S16 — payoff + móc bẫy 3
const S16: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={2} />
    <div style={{position: 'absolute', top: 210, left: 90, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 62, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Bẫy 2: <span style={{color: RED}}>lương tăng mà người không giàu</span></div>
    <div style={{position: 'absolute', top: 440, left: 90, right: 500, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 46, color: NAVY, opacity: interpolate(f, [40, 52], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Bẫy 3 còn lươn lẹo hơn — nó dán chữ <span style={{color: RED, fontFamily: 'Mont', fontWeight: 900}}>“MIỄN PHÍ”</span> lên mặt</div>
    <Doodle x={430} y={250} color={GOLD} delay={20} s={1.1} />
    <AnhHai pose="sly" x={1500} y={470} delay={12} h={540} />
  </AbsoluteFill>;
};

// ============ BẪY 3 — TRẢ GÓP 0% (phô mai bẫy chuột) ============
// -- BẪY CHUỘT: phô mai thật + gọng bẫy sập (animate) --
const MouseTrap: React.FC<{delay: number; snapAt: number}> = ({delay, snapAt}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, delay);
  const barRot = interpolate(f, [snapAt, snapAt + 7], [-102, -5], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.6))});
  return <div style={{position: 'absolute', top: 300, left: 0, right: 500, display: 'flex', justifyContent: 'center', opacity: interpolate(f, [delay, delay + 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `scale(${0.92 + s * 0.08})`}}>
    <Sfx name="pop" at={delay} vol={0.2} len={9} />
    <Sfx name="ding" at={snapAt} vol={0.36} len={16} />
    <div style={{position: 'relative', width: 620, height: 380}}>
      <div style={{position: 'absolute', bottom: 0, left: 0, width: 620, height: 300, borderRadius: 24, background: 'linear-gradient(#b07a43,#8a5a2b)', boxShadow: '0 16px 30px rgba(15,25,45,0.28)', border: '4px solid #6f4620'}} />
      <div style={{position: 'absolute', bottom: 60, left: 210, width: 220, height: 175, borderRadius: 14, overflow: 'hidden', border: '4px solid #fff', boxShadow: '0 8px 16px rgba(0,0,0,0.25)'}}><Img src={staticFile('cheese.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
      <div style={{position: 'absolute', bottom: 40, left: 68, width: 36, height: 36, borderRadius: 999, background: '#3a3f47'}} />
      <div style={{position: 'absolute', bottom: 55, left: 86, width: 480, height: 24, borderRadius: 12, background: 'linear-gradient(#c7ccd3,#8b929c)', transformOrigin: 'left center', transform: `rotate(${barRot}deg)`, boxShadow: '0 4px 10px rgba(0,0,0,0.3)'}} />
    </div>
  </div>;
};
// S17 — hook: trả góp 0% nghe sướng tai
const S17: React.FC = () => {
  const f = useCurrentFrame();
  const o = (a: number, b: number) => interpolate(f, [a, b], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={3} delay={4} />
    <div style={{position: 'absolute', top: 210, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 72, color: INK, opacity: o(2, 10)}}>Bẫy 3: trả góp <span style={{color: RED}}>0% LÃI</span></div>
    <div style={{position: 'absolute', top: 350, left: 90, right: 90, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 44, color: '#2b2f36', opacity: o(20, 30)}}>Nghe sướng tai — không lãi, mua liền trả từ từ, ai chả ham</div>
    <div style={{position: 'absolute', top: 540, left: 90, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 62, color: NAVY, opacity: o(220, 236)}}>Mà… <span style={{color: RED}}>miễn phí</span> thật thì bán cho ai ăn?</div>
    <AnhHai pose="sly" x={1500} y={470} delay={12} h={540} />
  </AbsoluteFill>;
};
// S18 — ẩn dụ phô mai bẫy chuột (SẬP)
const S18: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={3} />
    <div style={{position: 'absolute', top: 120, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 54, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Phô mai <span style={{color: GOLD, WebkitTextStroke: '1px #c9962b'}}>miễn phí</span> duy nhất — nằm trong <span style={{color: RED}}>bẫy chuột</span></div>
    <MouseTrap delay={10} snapAt={150} />
    <MoneyTag text="SẬP!" color={RED} x={560} y={300} delay={150} rot={-8} size={72} />
    <Cap delay={180} ah={false}>Con chuột đớp miếng phô mai — cái giá là <K c={RED}>cái cổ nó</K></Cap>
    <AnhHai pose="warning" x={1610} y={600} delay={14} h={380} />
  </AbsoluteFill>;
};
// S19 — 0% chỉ đổi tên (phí ẩn)
const S19: React.FC = () => {
  const f = useCurrentFrame();
  const row = (label: string, val: string, color: string, delay: number, top: number) => { const o = interpolate(f, [delay, delay + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}); const x = interpolate(f, [delay, delay + 10], [-30, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}); return <div style={{position: 'absolute', top, left: 120, right: 520, opacity: o, transform: `translateX(${x}px)`, display: 'flex', alignItems: 'center', gap: 26}}><Sfx name="coin" at={delay} vol={0.18} len={12} /><div style={{border: `6px solid ${color}`, background: 'rgba(255,255,255,0.92)', borderRadius: 22, padding: '18px 36px', fontFamily: 'BVP', fontWeight: 800, fontSize: 46, color: INK}}>{label} <span style={{color, fontFamily: 'Mont', fontWeight: 900}}>{val}</span></div></div>; };
  return <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={3} />
    <div style={{position: 'absolute', top: 130, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 56, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>“0%” không mất đi — nó chỉ <span style={{color: RED}}>ĐỔI TÊN</span></div>
    {row('Phí chuyển đổi', '2,5–6%', AMBER, 12, 320)}
    {row('Bảo hiểm khoản vay', '3–6%', RED, 30, 470)}
    <div style={{position: 'absolute', top: 630, left: 120, fontFamily: 'Mont', fontWeight: 900, fontSize: 48, color: RED, opacity: interpolate(f, [52, 62], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Cộng lại → đâu có ít!</div>
    <AnhHai pose="point" x={1600} y={560} delay={14} h={420} />
  </AbsoluteFill>;
};
// S20 — cái độc nằm trong ĐẦU
const S20: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={3} />
    <div style={{position: 'absolute', top: 130, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 56, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Cái độc thật nằm trong <span style={{color: RED}}>cái ĐẦU</span> mình</div>
    <div style={{position: 'absolute', top: 260, left: 90, right: 500, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 42, color: '#2b2f36', opacity: interpolate(f, [12, 22], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>“Có vài trăm một tháng ấy mà” → thấy rẻ → quất luôn</div>
    <MoneyTag text="Tivi to hơn: 300k/th" color={AMBER} x={150} y={430} delay={30} rot={-3} size={46} />
    <MoneyTag text="Điện thoại mới: 500k/th" color={BLUE} x={150} y={560} delay={48} rot={-3} size={46} />
    <MoneyTag text="…toàn thứ chả cần!" color={RED} x={150} y={710} delay={72} rot={-5} size={48} />
    <AnhHai pose="facepalm" x={1600} y={560} delay={14} h={420} />
  </AbsoluteFill>;
};
// S21 — gộp lại: nợ một đống
const S21: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, 6);
  return <AbsoluteFill><TopBar color={RED} /><Logo /><Prog n={3} />
    <div style={{position: 'absolute', top: 150, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 58, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Gộp mấy cái “vài trăm” lại…</div>
    <div style={{position: 'absolute', top: 330, left: 0, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 120, color: RED, transform: `scale(${0.8 + s * 0.2})`}}>NỢ một đống</div>
    <Sfx name="pop" at={6} vol={0.3} len={12} />
    <Framed src="emo_stress.jpg" left={150} top={560} w={420} h={300} delay={20} rot={-2} />
    <div style={{position: 'absolute', top: 600, left: 640, right: 500, fontFamily: 'BVP', fontWeight: 800, fontSize: 44, color: '#2b2f36', opacity: interpolate(f, [40, 52], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Lương vừa về là đi trả góp gần sạch, <K c={RED}>chưa kịp thở đã hết</K></div>
    <AnhHai pose="worried" x={1610} y={600} delay={14} h={380} />
  </AbsoluteFill>;
};
// S22 — cách gỡ + chốt
const S22: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, 8);
  return <AbsoluteFill><TopBar color={TEAL} /><Logo /><Prog n={3} />
    <div style={{position: 'absolute', top: 140, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 54, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Trước khi ký, hỏi <span style={{color: TEAL}}>1 câu</span> thôi:</div>
    <div style={{position: 'absolute', top: 300, left: 130, right: 130, transform: `scale(${0.96 + s * 0.04})`, opacity: interpolate(f, [8, 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
      <Sfx name="ding" at={8} vol={0.3} len={16} />
      <div style={{border: `7px solid ${TEAL}`, borderRadius: 30, background: 'rgba(255,255,255,0.94)', padding: '36px 48px', textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 62, color: INK, lineHeight: 1.26}}>Bắt trả <span style={{color: RED}}>HẾT một lần</span> — mình có mua không?</div>
    </div>
    <div style={{position: 'absolute', bottom: 96, left: 90, right: 500, fontFamily: 'BVP', fontWeight: 800, fontSize: 44, color: NAVY, opacity: interpolate(f, [230, 246], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Miễn phí thì <K c={RED}>chỉ có trong bẫy</K> thôi. Sang bẫy 4 nhé…</div>
    <AnhHai pose="present" x={1600} y={560} delay={14} h={420} />
  </AbsoluteFill>;
};

// ============ WOW (~35%) — 1,5 TỶ / lãi kép / quả cầu tuyết ============
// -- quả cầu tuyết vàng lăn xuống dốc, càng lăn càng to --
const Snowball: React.FC<{delay: number}> = ({delay}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [delay, delay + 74], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.quad)});
  const x = 120 + 900 * p; const y = 150 + 320 * p; const r = 34 + 106 * p;
  return <div style={{position: 'absolute', top: 210, left: 80, right: 520, height: 520}}>
    <Sfx name="ticker" at={delay} vol={0.16} len={40} />
    <div style={{position: 'absolute', left: 120, top: 150, width: 1012, height: 16, background: '#d9d5cd', borderRadius: 10, transformOrigin: 'left center', transform: 'rotate(19.3deg)'}} />
    <div style={{position: 'absolute', left: x - r, top: y - r - 10, width: r * 2, height: r * 2, borderRadius: '50%', background: 'radial-gradient(circle at 38% 32%, #ffe79a, #f2c230)', boxShadow: '0 12px 24px rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: r * 0.8, color: '#9a7a12'}}>$</div>
  </div>;
};
// -- cục đá tan dần ngoài nắng, còn mỗi vũng nước --
const MeltIce: React.FC<{delay: number}> = ({delay}) => {
  const f = useCurrentFrame();
  const m = interpolate(f, [delay, delay + 88], [1, 0.28], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const s = 300 * m; const pud = interpolate(f, [delay + 18, delay + 96], [50, 380], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <div style={{position: 'absolute', top: 230, left: 0, right: 520, height: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end'}}>
    <div style={{position: 'absolute', top: 0, left: '52%', fontSize: 96}}>☀️</div>
    <div style={{width: s, height: s, borderRadius: 24, background: 'linear-gradient(135deg,#e4f3ff,#a9d5f5)', border: '5px solid #d3ecfd', boxShadow: '0 12px 22px rgba(0,0,0,0.16), inset 0 0 34px rgba(255,255,255,0.65)', marginBottom: 12}} />
    <div style={{width: pud, height: 36, borderRadius: '50%', background: 'rgba(120,180,225,0.5)'}} />
  </div>;
};
// S23 — callback 1,5 tỷ
const S23: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={GOLD} /><Logo />
    <div style={{position: 'absolute', top: 220, left: 90, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 62, color: INK, opacity: interpolate(f, [2, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Giờ trả cái nợ đầu clip nhé…</div>
    <div style={{position: 'absolute', top: 380, left: 90, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 78, color: NAVY, opacity: interpolate(f, [24, 36], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Con số <span style={{color: '#c9962b'}}>1,5 tỷ</span> — còn nhớ chứ?</div>
    <div style={{position: 'absolute', top: 540, left: 90, right: 500, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 44, color: '#2b2f36', opacity: interpolate(f, [48, 60], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Ngồi cho vững rồi nghe này…</div>
    <AnhHai pose="sly" x={1500} y={470} delay={12} h={540} />
  </AbsoluteFill>;
};
// S24 — để dành 3tr/tháng = ăn ngoài + cà phê
const S24: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={GOLD} /><Logo />
    <div style={{position: 'absolute', top: 120, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 56, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Chỉ cần để dành <span style={{color: TEAL}}>3tr/tháng</span></div>
    <div style={{position: 'absolute', top: 300, left: 90, right: 490, display: 'flex', justifyContent: 'center', gap: 50}}>
      <PhotoCard src="eat_out.jpg" label="1 bữa ăn ngoài" color={AMBER} delay={10} />
      <PhotoCard src="cafe.jpg" label="vài ly cà phê/tuần" color={BLUE} delay={22} />
    </div>
    <div style={{position: 'absolute', bottom: 110, left: 90, right: 490, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 42, color: '#2b2f36', opacity: interpolate(f, [24, 36], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Cỡ đó thôi — <K c={TEAL}>bớt lại một chút</K> mỗi tuần</div>
    <AnhHai pose="point" x={1610} y={620} delay={14} h={360} />
  </AbsoluteFill>;
};
// S25 — bỏ chỗ sinh lời 7%, 20 năm, đừng đụng
const S25: React.FC = () => {
  const f = useCurrentFrame();
  const step = (label: string, color: string, delay: number, top: number) => { const o = interpolate(f, [delay, delay + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}); const x = interpolate(f, [delay, delay + 10], [-30, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}); return <div style={{position: 'absolute', top, left: 120, right: 500, opacity: o, transform: `translateX(${x}px)`}}><Sfx name="pop" at={delay} vol={0.16} len={9} /><div style={{display: 'inline-block', border: `6px solid ${color}`, background: 'rgba(255,255,255,0.92)', borderRadius: 24, padding: '20px 40px', fontFamily: 'BVP', fontWeight: 800, fontSize: 48, color: INK}}>{label}</div></div>; };
  return <AbsoluteFill><TopBar color={GOLD} /><Logo />
    <div style={{position: 'absolute', top: 120, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 54, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Đem bỏ vào chỗ <span style={{color: TEAL}}>sinh lời</span></div>
    {step('📈  ~7% một năm (mức khoảng)', TEAL, 12, 300)}
    {step('⏳  Đều đặn suốt 20 năm', BLUE, 30, 450)}
    {step('✋  Đừng có đụng vào', RED, 50, 600)}
    <AnhHai pose="present" x={1600} y={560} delay={14} h={420} />
  </AbsoluteFill>;
};
// S26 — REVEAL 1,5 tỷ = gốc 720 + lãi kép 780
const S26: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, 6);
  const goc = interpolate(f, [24, 44], [0, 300], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const lai = interpolate(f, [38, 62], [0, 325], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return <AbsoluteFill><TopBar color={GOLD} /><Logo /><Sfx name="ding" at={6} vol={0.34} len={20} /><Sfx name="coin" at={40} vol={0.3} len={16} />
    <div style={{position: 'absolute', top: 110, left: 0, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 150, color: GOLD, textShadow: '0 6px 0 rgba(0,0,0,0.08)', transform: `scale(${0.8 + s * 0.2})`}}>≈ 1,5 tỷ</div>
    <div style={{position: 'absolute', top: 320, left: 150, right: 560, height: 360, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 80}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}><div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 40, color: GRAY, marginBottom: 8, opacity: interpolate(f, [24, 34], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>720tr</div><div style={{width: 190, height: goc, background: GRAY, borderRadius: '14px 14px 0 0'}} /><div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 34, color: INK, marginTop: 12}}>Gốc mình bỏ</div></div>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}><div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 40, color: '#c9962b', marginBottom: 8, opacity: interpolate(f, [38, 50], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>~780tr</div><div style={{width: 190, height: lai, background: GOLD, borderRadius: '14px 14px 0 0'}} /><div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 34, color: INK, marginTop: 12}}>Tiền tự đẻ</div></div>
    </div>
    <MoneyTag text="= LÃI KÉP" color={NAVY} x={470} y={470} delay={58} rot={-6} size={52} />
    <AnhHai pose="greedy" x={1610} y={600} delay={14} h={380} />
  </AbsoluteFill>;
};
// S27 — quả cầu tuyết
const S27: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={GOLD} /><Logo />
    <div style={{position: 'absolute', top: 110, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 56, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Lãi kép = <span style={{color: '#c9962b'}}>quả cầu tuyết</span></div>
    <Snowball delay={12} />
    <Cap delay={43} ah={false}>Càng lăn <K c={TEAL}>càng to</K> — miễn là cho nó <K c={TEAL}>thời gian</K> mà lăn</Cap>
    <AnhHai pose="cool" x={1610} y={620} delay={14} h={360} />
  </AbsoluteFill>;
};
// S28 — điều kiện + cay
const S28: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={RED} /><Logo />
    <div style={{position: 'absolute', top: 200, left: 90, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 58, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>3 cái bẫy lúc nãy ăn mất…</div>
    <div style={{position: 'absolute', top: 350, left: 90, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 96, color: RED, opacity: interpolate(f, [18, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>cả 1,5 tỷ của mình</div>
    <div style={{position: 'absolute', top: 540, left: 90, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 64, color: NAVY, opacity: interpolate(f, [43, 55], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Cay chưa? 😤</div>
    <AnhHai pose="warning" x={1500} y={470} delay={12} h={540} />
  </AbsoluteFill>;
};
// ============ BẪY 4 — QUỸ KHẨN CẤP (phanh dự phòng) ============
// S29 — title
const S29: React.FC = () => (
  <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={4} delay={4} />
    <div style={{position: 'absolute', top: 300, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 70, color: INK, opacity: interpolate(useCurrentFrame(), [2, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Bẫy 4: không có <span style={{color: RED}}>quỹ khẩn cấp</span></div>
    <div style={{position: 'absolute', top: 470, left: 90, right: 90, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 44, color: '#2b2f36', opacity: interpolate(useCurrentFrame(), [18, 28], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Nằm im rình, chờ đúng lúc mình yếu nhất</div>
    <AnhHai pose="warning" x={1440} y={520} delay={14} h={480} />
  </AbsoluteFill>
);
// S30 — quỹ khẩn cấp là gì
const S30: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={4} />
    <div style={{position: 'absolute', top: 130, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 52, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Cục tiền để riêng — chỉ cho lúc <span style={{color: RED}}>bể chuyện</span></div>
    <Framed src="emergency.jpg" left={130} top={310} w={640} h={400} delay={12} rot={-2} />
    <MoneyTag text="Mất việc" color={NAVY} x={840} y={340} delay={19} rot={-3} size={46} />
    <MoneyTag text="Nằm viện" color={AMBER} x={840} y={470} delay={27} rot={-3} size={46} />
    <MoneyTag text="Xe hư, nhà dột" color={RED} x={840} y={600} delay={36} rot={-3} size={46} />
    <AnhHai pose="point" x={1620} y={620} delay={14} h={360} />
  </AbsoluteFill>;
};
// S31 — đa số không có quỹ
const S31: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={4} />
    <div style={{position: 'absolute', top: 200, left: 90, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 60, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Mà đa số mình sống <span style={{color: RED}}>chả có quỹ ấy</span></div>
    <div style={{position: 'absolute', top: 400, left: 90, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 74, color: RED, opacity: interpolate(f, [18, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Tháng nào xài sạch tháng đó</div>
    <div style={{position: 'absolute', top: 560, left: 90, right: 500, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 42, color: '#2b2f36', opacity: interpolate(f, [36, 48], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Bình thường thì cũng phà phà, chả sao…</div>
    <AnhHai pose="cool" x={1560} y={520} delay={14} h={460} />
  </AbsoluteFill>;
};
// S32 — phanh dự phòng (2 panel)
const S32: React.FC = () => {
  const f = useCurrentFrame();
  const panel = (title: string, emoji: string, sub: string, color: string, delay: number, left: boolean) => { const o = interpolate(f, [delay, delay + 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}); const y = interpolate(f, [delay, delay + 12], [30, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}); return <div style={{position: 'absolute', top: 300, left: left ? 90 : 800, width: 620, opacity: o, transform: `translateY(${y}px)`}}><Sfx name="pop" at={delay} vol={0.18} len={9} /><div style={{border: `7px solid ${color}`, borderRadius: 28, background: 'rgba(255,255,255,0.93)', padding: '28px 30px 34px', textAlign: 'center'}}><div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 44, color, marginBottom: 14}}>{title}</div><div style={{fontSize: 120, margin: '6px 0 16px'}}>{emoji}</div><div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 40, color: '#20242b'}}>{sub}</div></div></div>; };
  return <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={4} />
    <div style={{position: 'absolute', top: 130, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 52, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Như đi xe <span style={{color: RED}}>không có phanh dự phòng</span></div>
    {panel('ĐƯỜNG BẰNG', '🚗💨', 'Xe cứ bon bon, chả ai biết', TEAL, 12, true)}
    {panel('XUỐNG DỐC', '🚗💥', 'Đạp phanh… ơ phanh đâu?!', RED, 30, false)}
    <AnhHai pose="facepalm" x={1610} y={640} delay={16} h={340} />
  </AbsoluteFill>;
};
// S33 — thẻ/app (beep)
const S33: React.FC = () => {
  const f = useCurrentFrame();
  const row = (label: string, val: string, color: string, delay: number, top: number) => { const o = interpolate(f, [delay, delay + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}); return <div style={{position: 'absolute', top, left: 120, right: 500, opacity: o}}><Sfx name="coin" at={delay} vol={0.16} len={12} /><div style={{display: 'inline-block', border: `6px solid ${color}`, background: 'rgba(255,255,255,0.92)', borderRadius: 22, padding: '18px 38px', fontFamily: 'BVP', fontWeight: 800, fontSize: 46, color: INK}}>{label} <span style={{color, fontFamily: 'Mont', fontWeight: 900}}>{val}</span></div></div>; };
  return <AbsoluteFill><TopBar color={RED} /><Logo /><Prog n={4} />
    <div style={{position: 'absolute', top: 120, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 52, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Túi rỗng → quẹt thẻ, vay app → <span style={{color: RED}}>dính nặng hơn</span></div>
    {row('Thẻ tín dụng', '20–38%/năm', AMBER, 12, 300)}
    {row('App vay (đủ phí ẩn)', '70–100%/năm', RED, 32, 450)}
    <div style={{position: 'absolute', top: 620, left: 120, fontFamily: 'Mont', fontWeight: 900, fontSize: 52, color: RED, opacity: interpolate(f, [34, 44], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Đúng là quân “BÍP”! 🤬</div>
    <AnhHai pose="warning" x={1610} y={600} delay={14} h={380} />
  </AbsoluteFill>;
};
// S34 — giải pháp 3-6 tháng
const S34: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, 8);
  return <AbsoluteFill><TopBar color={TEAL} /><Logo /><Prog n={4} />
    <div style={{position: 'absolute', top: 140, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 54, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Quỹ này chính là <span style={{color: TEAL}}>cái phanh</span> 🛑</div>
    <div style={{position: 'absolute', top: 320, left: 130, right: 130, transform: `scale(${0.96 + s * 0.04})`, opacity: interpolate(f, [8, 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
      <Sfx name="ding" at={8} vol={0.28} len={16} />
      <div style={{border: `7px solid ${TEAL}`, borderRadius: 30, background: 'rgba(255,255,255,0.94)', padding: '34px 44px', textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 60, color: INK, lineHeight: 1.26}}>Để riêng <span style={{color: TEAL}}>3–6 tháng</span> chi phí sống</div>
    </div>
    <HandDraw delay={19} dur={14} color={TEAL} sw={9} left={330} top={560} w={430} h={54} vb="0 0 430 54" d="M8 30 q210 -24 420 -6" />
    <Cap delay={25} ah={false}>Đâu cần gom một phát — cứ bỏ vào <K c={TEAL}>từ từ mỗi tháng</K></Cap>
    <AnhHai pose="present" x={1600} y={560} delay={14} h={420} />
  </AbsoluteFill>;
};
// S35 — payoff
const S35: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={4} />
    <div style={{position: 'absolute', top: 230, left: 90, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 62, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Bẫy 4: <span style={{color: RED}}>không phanh thì đường bằng cũng thành vực</span></div>
    <div style={{position: 'absolute', top: 470, left: 90, right: 500, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 46, color: NAVY, opacity: interpolate(f, [24, 36], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Mà bẫy 5 mới lạ — nó phạt cả người <span style={{color: RED, fontFamily: 'Mont', fontWeight: 900}}>chăm để dành</span> nhất</div>
    <AnhHai pose="sly" x={1500} y={470} delay={12} h={540} />
  </AbsoluteFill>;
};
// ============ BẪY 5 — GIỮ TIỀN SAI CHỖ (cục đá ngoài nắng) ============
// S36 — title
const S36: React.FC = () => (
  <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={5} delay={4} />
    <div style={{position: 'absolute', top: 300, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 70, color: INK, opacity: interpolate(useCurrentFrame(), [2, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Bẫy 5: giữ tiền <span style={{color: RED}}>sai chỗ</span></div>
    <div style={{position: 'absolute', top: 470, left: 90, right: 90, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 44, color: '#2b2f36', opacity: interpolate(useCurrentFrame(), [18, 28], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Để dành cực giỏi mà tiền vẫn chẳng lớn lên</div>
    <AnhHai pose="worried" x={1440} y={520} delay={14} h={480} />
  </AbsoluteFill>
);
// S37 — không kỳ hạn ~0%
const S37: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={5} />
    <div style={{position: 'absolute', top: 200, left: 90, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 56, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Cất trong tài khoản <span style={{color: RED}}>không kỳ hạn</span></div>
    <div style={{position: 'absolute', top: 380, left: 0, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 130, color: RED, opacity: interpolate(f, [18, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>0,1–0,5%/năm</div>
    <div style={{position: 'absolute', top: 560, left: 90, right: 500, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 46, color: NAVY, opacity: interpolate(f, [34, 46], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Gần như bằng <K c={RED}>không</K></div>
    <AnhHai pose="facepalm" x={1560} y={520} delay={14} h={460} />
  </AbsoluteFill>;
};
// S38 — lạm phát vs lãi (chart)
const S38: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={5} />
    <div style={{position: 'absolute', top: 120, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 54, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Tiền đứng im, mà <span style={{color: RED}}>giá cả chạy lên</span></div>
    <BarChart top={310} maxH={320} delay={12} left={110} right={520} items={[
      {label: 'Lãi của bạn', value: 4, color: BLUE, tag: '~0,3%'},
      {label: 'Lạm phát', value: 40, color: RED, tag: '3–4%'},
    ]} />
    <div style={{position: 'absolute', bottom: 96, left: 90, right: 560, fontFamily: 'BVP', fontWeight: 800, fontSize: 42, color: '#2b2f36', opacity: interpolate(f, [48, 62], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Để càng lâu thì <K c={RED}>mua được càng ít đi</K></div>
    <AnhHai pose="warning" x={1600} y={560} delay={14} h={420} />
  </AbsoluteFill>;
};
// S39 — cục đá ngoài nắng
const S39: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={5} />
    <div style={{position: 'absolute', top: 120, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 54, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Như <span style={{color: BLUE}}>cục đá lạnh</span> để ngoài nắng</div>
    <MeltIce delay={14} />
    <Cap delay={62} ah={false}>Nhìn vẫn thấy đó, mà cứ <K c={RED}>teo dần</K> — ngoảnh lại còn mỗi vũng nước</Cap>
    <AnhHai pose="worried" x={1610} y={620} delay={14} h={360} />
  </AbsoluteFill>;
};
// S40 — sức mua tan
const S40: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={5} />
    <div style={{position: 'absolute', top: 150, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 54, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Con số nhìn nguyên, <span style={{color: RED}}>sức mua thì tan</span></div>
    <MoneyTag text="Năm ngoái: mua chừng NÀY 🛒" color={NAVY} x={150} y={360} delay={20} rot={-3} size={46} />
    <MoneyTag text="Năm nay: cùng tiền, ít hơn 🛒" color={RED} x={150} y={520} delay={27} rot={-3} size={46} />
    <div style={{position: 'absolute', top: 690, left: 150, fontFamily: 'BVP', fontWeight: 800, fontSize: 42, color: '#2b2f36', opacity: interpolate(f, [42, 54], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Tan mà mắt thường chẳng nhìn thấy</div>
    <AnhHai pose="point" x={1600} y={560} delay={14} h={420} />
  </AbsoluteFill>;
};
// S41 — giải pháp kỳ hạn + payoff
const S41: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, 8);
  return <AbsoluteFill><TopBar color={TEAL} /><Logo /><Prog n={5} />
    <div style={{position: 'absolute', top: 130, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 52, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Để đúng chỗ — chạy <span style={{color: TEAL}}>kịp lạm phát</span></div>
    <div style={{position: 'absolute', top: 300, left: 130, right: 130, transform: `scale(${0.96 + s * 0.04})`, opacity: interpolate(f, [8, 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
      <Sfx name="ding" at={8} vol={0.28} len={16} />
      <div style={{border: `7px solid ${TEAL}`, borderRadius: 30, background: 'rgba(255,255,255,0.94)', padding: '34px 44px', textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 56, color: INK, lineHeight: 1.26}}>Gửi tiết kiệm có kỳ hạn <span style={{color: TEAL}}>4,7–6%/năm</span></div>
    </div>
    <div style={{position: 'absolute', bottom: 96, left: 90, right: 500, fontFamily: 'BVP', fontWeight: 800, fontSize: 42, color: NAVY, opacity: interpolate(f, [230, 244], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Để dành đúng mà cất sai vẫn tan. <K c={TEAL}>Quá nửa đường rồi đấy!</K></div>
    <AnhHai pose="present" x={1600} y={560} delay={14} h={420} />
  </AbsoluteFill>;
};

// ============ RE-HOOK (~55%) ============
// S42 — khoan đã, bẫy 7 vẫn chờ
const S42: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={AMBER} /><Logo />
    <div style={{position: 'absolute', top: 180, left: 90, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 84, color: RED, opacity: interpolate(f, [2, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Mà khoan đã!</div>
    <div style={{position: 'absolute', top: 340, left: 90, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 56, color: INK, opacity: interpolate(f, [18, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Cái <span style={{color: RED}}>bẫy số 7</span> — đứa âm thầm nhất — vẫn đang chờ</div>
    <div style={{position: 'absolute', top: 520, left: 90, right: 500, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 44, color: NAVY, opacity: interpolate(f, [48, 60], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Ráng thêm tí — nó mới là đứa <K c={RED}>quyết định</K></div>
    <AnhHai pose="point" x={1500} y={470} delay={12} h={540} />
  </AbsoluteFill>;
};
// S43 — xây nhà quên lợp mái + quất bẫy 6
const S43: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={AMBER} /><Logo />
    <div style={{position: 'absolute', top: 220, left: 90, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 58, color: INK, opacity: interpolate(f, [2, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Gỡ 6 cái mà quên số 7…</div>
    <div style={{position: 'absolute', top: 360, left: 90, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 68, color: RED, opacity: interpolate(f, [20, 32], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>= xây nhà mà quên lợp mái 🏠</div>
    <div style={{position: 'absolute', top: 540, left: 90, right: 500, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 44, color: NAVY, opacity: interpolate(f, [43, 55], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Giờ quất cái <K c={AMBER}>bẫy 6</K> đã — đứa đông người nhất!</div>
    <AnhHai pose="sly" x={1500} y={470} delay={12} h={540} />
  </AbsoluteFill>;
};
// ============ BẪY 6 — ĐẦU TƯ PHONG TRÀO (đám đông một hướng) ============
// S44 — title
const S44: React.FC = () => (
  <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={6} delay={4} />
    <div style={{position: 'absolute', top: 300, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 72, color: INK, opacity: interpolate(useCurrentFrame(), [2, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Bẫy 6: đầu tư theo <span style={{color: RED}}>phong trào</span></div>
    <div style={{position: 'absolute', top: 470, left: 90, right: 90, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 44, color: '#2b2f36', opacity: interpolate(useCurrentFrame(), [18, 28], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Thời nào cũng có, thấy hoài à</div>
    <AnhHai pose="warning" x={1440} y={520} delay={14} h={480} />
  </AbsoluteFill>
);
// S45 — cả xóm hô mua đi
const S45: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={6} />
    <div style={{position: 'absolute', top: 150, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 54, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Cả xóm rộ lên, ai cũng <span style={{color: RED}}>khoe lời</span></div>
    <MoneyTag text="Hàng xóm: lời gấp đôi!" color={AMBER} x={150} y={340} delay={14} rot={-3} size={46} />
    <MoneyTag text="Bạn cấp 3: trúng đậm!" color={BLUE} x={150} y={490} delay={19} rot={-3} size={46} />
    <MoneyTag text="Mạng: mua đi, trễ là hết!" color={RED} x={150} y={640} delay={30} rot={-3} size={46} />
    <AnhHai pose="greedy" x={1560} y={520} delay={14} h={460} />
  </AbsoluteFill>;
};
// S46 — nhảy vào không hiểu gì
const S46: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={6} />
    <div style={{position: 'absolute', top: 200, left: 90, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 58, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Sợ bị bỏ lại → nhảy vào, <span style={{color: RED}}>chả hiểu mua gì</span></div>
    <div style={{position: 'absolute', top: 420, left: 90, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 66, color: RED, opacity: interpolate(f, [20, 32], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Chỗ nhiều người cháy túi nhất</div>
    <AnhHai pose="worried" x={1560} y={520} delay={14} h={460} />
  </AbsoluteFill>;
};
// S47 — metaphor đám đông chạy một hướng
const S47: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, 4);
  return <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={6} />
    <div style={{position: 'absolute', top: 130, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 52, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Như <span style={{color: RED}}>cả làng đổ xô</span> chạy về một hướng…</div>
    <div style={{position: 'absolute', top: 290, left: 130, right: 130, transform: `scale(${0.96 + s * 0.04})`, opacity: interpolate(f, [4, 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
      <Sfx name="pop" at={4} vol={0.22} len={10} />
      <div style={{height: 440, borderRadius: 24, overflow: 'hidden', border: '6px solid #fff', boxShadow: '0 16px 30px rgba(15,25,45,0.28)'}}><Img src={staticFile('crowd.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
    </div>
    <Cap delay={37} ah={false}>…vì nghe đồn hướng đó <K c={GOLD}>có vàng</K></Cap>
  </AbsoluteFill>;
};
// S48 — vào sau ôm lỗ (beep)
const S48: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={RED} /><Logo /><Prog n={6} />
    <div style={{position: 'absolute', top: 140, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 52, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Chạy tới nơi → giá đã <span style={{color: RED}}>thổi lên tận nóc</span></div>
    <MoneyTag text="Vào ĐẦU → hốt được tí" color={TEAL} x={150} y={330} delay={16} rot={-3} size={46} />
    <MoneyTag text="Vào SAU → đứng chỗ đắt nhất" color={AMBER} x={150} y={470} delay={25} rot={-3} size={46} />
    <div style={{position: 'absolute', top: 640, left: 150, fontFamily: 'Mont', fontWeight: 900, fontSize: 56, color: RED, opacity: interpolate(f, [42, 54], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Ôm nguyên cục lỗ — cay “BÍP”! 🤬</div>
    <AnhHai pose="facepalm" x={1610} y={600} delay={14} h={380} />
  </AbsoluteFill>;
};
// S49 — đầu tư vì hiểu
const S49: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, 8);
  return <AbsoluteFill><TopBar color={TEAL} /><Logo /><Prog n={6} />
    <div style={{position: 'absolute', top: 150, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 54, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Đầu tư vì mình <span style={{color: TEAL}}>HIỂU</span>, không phải vì người ta <span style={{color: RED}}>HÔ</span></div>
    <div style={{position: 'absolute', top: 340, left: 130, right: 130, transform: `scale(${0.96 + s * 0.04})`, opacity: interpolate(f, [8, 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
      <Sfx name="ding" at={8} vol={0.26} len={16} />
      <div style={{border: `7px solid ${RED}`, borderRadius: 30, background: 'rgba(255,255,255,0.94)', padding: '30px 44px', textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 54, color: INK, lineHeight: 1.26}}>Bỏ tiền vào cái mình chả hiểu = <span style={{color: RED}}>cờ bạc đội lốt</span></div>
    </div>
    <AnhHai pose="present" x={1600} y={560} delay={14} h={420} />
  </AbsoluteFill>;
};
// S50 — payoff bẫy 6
const S50: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={6} />
    <div style={{position: 'absolute', top: 200, left: 90, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 54, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Khi ai cũng <span style={{color: RED}}>chắc mẩm thắng</span>… thường là lúc gần thua nhất</div>
    <div style={{position: 'absolute', top: 430, left: 90, right: 500, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 46, color: NAVY, opacity: interpolate(f, [24, 36], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Rồi… giờ tới cái mình chờ nãy giờ: <span style={{color: RED, fontFamily: 'Mont', fontWeight: 900}}>bẫy 7</span></div>
    <AnhHai pose="sly" x={1500} y={470} delay={12} h={540} />
  </AbsoluteFill>;
};
// ============ BẪY 7 — KHÔNG ĐO LẠI (phòng tối) — PAYOFF ~85% ============
// -- phòng tối, bật đèn mới thấy mất đồ --
const DarkRoom: React.FC<{delay: number; lightAt: number}> = ({delay, lightAt}) => {
  const f = useCurrentFrame();
  const lit = interpolate(f, [lightAt, lightAt + 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const leak = Math.max(0, (lit - 0.4) / 0.6);
  return <div style={{position: 'absolute', top: 280, left: 0, right: 520, display: 'flex', justifyContent: 'center', opacity: interpolate(f, [delay, delay + 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
    <Sfx name="ding" at={lightAt} vol={0.3} len={16} />
    <div style={{position: 'relative', width: 700, height: 400, borderRadius: 22, border: '7px solid #171c28', background: `rgb(${18 + lit * 222},${20 + lit * 218},${28 + lit * 208})`, overflow: 'hidden', boxShadow: '0 16px 30px rgba(0,0,0,0.3)'}}>
      <div style={{position: 'absolute', top: 18, left: '50%', transform: 'translateX(-50%)', fontSize: 58, filter: lit < 0.5 ? 'grayscale(1) brightness(0.55)' : 'none'}}>💡</div>
      <div style={{position: 'absolute', bottom: 46, left: 70, width: 230, height: 110, borderRadius: 16, border: `4px solid rgba(255,255,255,${0.18 + lit * 0.5})`, background: `rgba(255,255,255,${lit * 0.14})`}} />
      <div style={{position: 'absolute', bottom: 64, right: 90, width: 150, height: 92, borderRadius: 12, border: `4px solid rgba(255,255,255,${0.18 + lit * 0.5})`, background: `rgba(255,255,255,${lit * 0.14})`}} />
      <div style={{position: 'absolute', top: 150, left: 130, fontFamily: 'Mont', fontWeight: 900, fontSize: 44, color: RED, opacity: leak}}>−? đ</div>
      <div style={{position: 'absolute', top: 220, right: 160, fontFamily: 'Mont', fontWeight: 900, fontSize: 44, color: RED, opacity: leak}}>−? đ</div>
    </div>
  </div>;
};
// S51 — title
const S51: React.FC = () => (
  <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={7} delay={4} />
    <div style={{position: 'absolute', top: 300, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 70, color: INK, opacity: interpolate(useCurrentFrame(), [2, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Bẫy 7: không bao giờ <span style={{color: RED}}>đo lại</span></div>
    <div style={{position: 'absolute', top: 470, left: 90, right: 90, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 44, color: '#2b2f36', opacity: interpolate(useCurrentFrame(), [18, 28], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Ít ai nói tới — nhưng nó quyết định tất cả</div>
    <AnhHai pose="warning" x={1440} y={520} delay={14} h={480} />
  </AbsoluteFill>
);
// S52 — cứ sống không nhìn lại
const S52: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={7} />
    <div style={{position: 'absolute', top: 180, left: 90, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 58, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Cứ sống, cứ kiếm, cứ tiêu — <span style={{color: RED}}>chả bao giờ nhìn lại</span></div>
    <div style={{position: 'absolute', top: 400, left: 90, right: 500, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 46, color: '#2b2f36', opacity: interpolate(f, [24, 36], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Tháng rồi tiền đi đâu? Dư hay thiếu? Đang tiến hay lùi?</div>
    <div style={{position: 'absolute', top: 560, left: 90, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 60, color: RED, opacity: interpolate(f, [48, 60], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Chả biết — nhắm mắt đi tới 🙈</div>
    <AnhHai pose="worried" x={1560} y={520} delay={14} h={460} />
  </AbsoluteFill>;
};
// S53 — metaphor phòng tối
const S53: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={7} />
    <div style={{position: 'absolute', top: 130, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 52, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Như ở trong <span style={{color: RED}}>phòng tối</span> mà chả chịu bật đèn</div>
    <DarkRoom delay={12} lightAt={215} />
    <Cap delay={248} ah={false}>Bật đèn lên mới hoảng — <K c={RED}>ơ sao mất nhiều thế?</K></Cap>
    <AnhHai pose="warning" x={1610} y={600} delay={14} h={380} />
  </AbsoluteFill>;
};
// S54 — tiền rò rỉ
const S54: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={7} />
    <div style={{position: 'absolute', top: 140, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 54, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Tiền cứ <span style={{color: RED}}>rò chỗ này, rỉ chỗ kia</span></div>
    <MoneyTag text="Phí lặt vặt" color={GRAY} x={150} y={330} delay={16} rot={-3} size={46} />
    <MoneyTag text="Gói đăng ký quên hủy" color={AMBER} x={150} y={470} delay={22} rot={-3} size={46} />
    <MoneyTag text="Mua vô tội vạ" color={RED} x={150} y={610} delay={35} rot={-3} size={46} />
    <div style={{position: 'absolute', top: 760, left: 150, fontFamily: 'Mont', fontWeight: 900, fontSize: 46, color: RED, opacity: interpolate(f, [54, 68], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Gộp cả năm → một mớ!</div>
    <AnhHai pose="facepalm" x={1610} y={600} delay={14} h={380} />
  </AbsoluteFill>;
};
// S55 — lý do 6 bẫy dính
const S55: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={RED} /><Logo /><Prog n={7} />
    <div style={{position: 'absolute', top: 220, left: 90, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 56, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Đây là lý do sâu xa nhất vì sao <span style={{color: RED}}>6 bẫy kia dính hoài</span></div>
    <div style={{position: 'absolute', top: 440, left: 90, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 66, color: RED, opacity: interpolate(f, [20, 32], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Bẫy 7 nuôi sống cả 6 đứa — gốc rễ!</div>
    <AnhHai pose="point" x={1560} y={520} delay={14} h={460} />
  </AbsoluteFill>;
};
// S56 — cách gỡ 15 phút
const S56: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, 8);
  return <AbsoluteFill><TopBar color={TEAL} /><Logo /><Prog n={7} />
    <div style={{position: 'absolute', top: 140, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 54, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Cách gỡ đơn giản đến bất ngờ 💡</div>
    <div style={{position: 'absolute', top: 320, left: 130, right: 130, transform: `scale(${0.96 + s * 0.04})`, opacity: interpolate(f, [8, 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
      <Sfx name="ding" at={8} vol={0.28} len={16} />
      <div style={{border: `7px solid ${TEAL}`, borderRadius: 30, background: 'rgba(255,255,255,0.94)', padding: '34px 44px', textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 54, color: INK, lineHeight: 1.28}}>Mỗi tháng ngồi <span style={{color: TEAL}}>15 phút</span> — soi lại tiền vào / ra / dư</div>
    </div>
    <Cap delay={25} ah={false}>Chả cần app xịn, chả cần giỏi tính — chỉ cần <K c={TEAL}>chịu nhìn</K></Cap>
    <AnhHai pose="present" x={1600} y={560} delay={14} h={420} />
  </AbsoluteFill>;
};
// S57 — payoff bẫy 7
const S57: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={NAVY} /><Logo /><Prog n={7} />
    <div style={{position: 'absolute', top: 210, left: 90, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 56, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Người giàu bền khác ở chỗ: họ <span style={{color: TEAL}}>chịu bật đèn soi</span>, đều đặn</div>
    <div style={{position: 'absolute', top: 440, left: 90, right: 500, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 46, color: NAVY, opacity: interpolate(f, [24, 36], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Bẫy 7: không đo lại thì đồ trong nhà cứ <K c={RED}>mất mà chả hay</K></div>
    <AnhHai pose="present" x={1500} y={470} delay={12} h={540} />
  </AbsoluteFill>;
};
// ============ CALLBACK + CHỐT ============
const RECAP = [
  {n: 1, t: 'Để dành phần thừa', fix: 'chừa bụng cho món chính', c: RED},
  {n: 2, t: 'Lạm phát lối sống', fix: 'đừng cho áo phình theo người', c: AMBER},
  {n: 3, t: 'Trả góp “0%”', fix: 'phô mai nằm trong bẫy', c: RED},
  {n: 4, t: 'Không quỹ khẩn cấp', fix: 'đi xe phải có phanh', c: BLUE},
  {n: 5, t: 'Giữ tiền sai chỗ', fix: 'đừng để đá ngoài nắng', c: TEAL},
  {n: 6, t: 'Đầu tư phong trào', fix: 'vào sau = chỗ đắt nhất', c: AMBER},
  {n: 7, t: 'Không đo lại', fix: 'bật đèn lên mà coi', c: RED},
];
// S58 — recap intro
const S58: React.FC = () => (
  <AbsoluteFill><TopBar color={NAVY} /><Logo />
    <div style={{position: 'absolute', top: 300, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 76, color: INK, opacity: interpolate(useCurrentFrame(), [2, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>7 cái bẫy — <span style={{color: RED}}>nhắc nhanh 1 lượt</span></div>
    <AnhHai pose="present" x={1460} y={520} delay={12} h={480} />
  </AbsoluteFill>
);
// S59 — recap grid 7 bẫy
const S59: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={NAVY} /><Logo />
    {RECAP.map((r, i) => { const d = 8 + i * 68; const o = interpolate(f, [d, d + 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}); const x = interpolate(f, [d, d + 12], [-40, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}); return <div key={i} style={{position: 'absolute', top: 128 + i * 122, left: 90, right: 120, opacity: o, transform: `translateX(${x}px)`, display: 'flex', alignItems: 'center', gap: 24}}>
      <div style={{width: 74, height: 74, flexShrink: 0, borderRadius: '50%', background: r.c, color: '#fff', fontFamily: 'Mont', fontWeight: 900, fontSize: 44, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{r.n}</div>
      <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 46, color: INK, minWidth: 520}}>{r.t}</div>
      <div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 38, color: r.c}}>→ {r.fix}</div>
    </div>; })}
  </AbsoluteFill>;
};
// S60 — vì sao trắng tay
const S60: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={NAVY} /><Logo />
    <div style={{position: 'absolute', top: 200, left: 90, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 58, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Vì sao cày 10 năm vẫn <span style={{color: RED}}>trắng tay</span>?</div>
    <div style={{position: 'absolute', top: 420, left: 90, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 52, color: NAVY, opacity: interpolate(f, [20, 32], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Chả phải lười, chả phải kiếm ít — tại <span style={{color: RED}}>7 cái bẫy này</span></div>
    <AnhHai pose="point" x={1560} y={520} delay={14} h={460} />
  </AbsoluteFill>;
};
// S61 — 1,5 tỷ chả cần trúng số
const S61: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, 6);
  return <AbsoluteFill><TopBar color={GOLD} /><Logo /><Sfx name="ding" at={6} vol={0.32} len={20} />
    <div style={{position: 'absolute', top: 160, left: 90, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 54, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Còn cái <span style={{color: '#c9962b'}}>1,5 tỷ</span> ấy…</div>
    <div style={{position: 'absolute', top: 300, left: 0, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 88, color: GOLD, transform: `scale(${0.85 + s * 0.15})`}}>Chả cần trúng số</div>
    <div style={{position: 'absolute', top: 520, left: 90, right: 500, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 46, color: NAVY, opacity: interpolate(f, [30, 42], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Chỉ cần <K c={TEAL}>né bẫy</K> rồi để tiền yên đó cho nó <K c={TEAL}>lăn</K></div>
    <AnhHai pose="greedy" x={1500} y={470} delay={12} h={540} />
  </AbsoluteFill>;
};
// S62 — CTA gõ số
const S62: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, 8);
  return <AbsoluteFill><TopBar color={RED} /><Logo />
    <div style={{position: 'absolute', top: 150, left: 90, right: 90, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 54, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Bạn đang dính <span style={{color: RED}}>nặng nhất</span> cái nào?</div>
    <div style={{position: 'absolute', top: 320, left: 0, right: 500, textAlign: 'center', transform: `scale(${0.85 + s * 0.15})`}}>
      <Sfx name="pop" at={8} vol={0.3} len={12} />
      <div style={{display: 'inline-block', background: NAVY, color: '#fff', fontFamily: 'Mont', fontWeight: 900, fontSize: 80, padding: '26px 60px', borderRadius: 26}}>Gõ số 1–7 👇</div>
    </div>
    <div style={{position: 'absolute', top: 560, left: 90, right: 500, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 46, color: NAVY, opacity: interpolate(f, [30, 42], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>…dưới bình luận, Anh Hai đọc hết!</div>
    <AnhHai pose="point" x={1500} y={470} delay={12} h={540} />
  </AbsoluteFill>;
};
// S63 — gửi bạn + bật đèn đếm tiền + tạm biệt
const S63: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><TopBar color={NAVY} /><Logo />
    <div style={{position: 'absolute', top: 190, left: 90, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 54, color: INK, opacity: interpolate(f, [1, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Thấy đứa bạn nào <span style={{color: RED}}>y chang</span> → gửi clip cho nó 📲</div>
    <div style={{position: 'absolute', top: 400, left: 90, right: 500, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 62, color: TEAL, opacity: interpolate(f, [24, 36], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Nhớ bật đèn lên mà đếm tiền nghe! 💡</div>
    <AnhHai pose="cool" x={1500} y={470} delay={12} h={540} />
  </AbsoluteFill>;
};

const SCENES: Sc[] = [
  {c: S1, d: 255}, {c: S2, d: 171}, {c: S3, d: 210},
  {c: S4, d: 339}, {c: S5, d: 360}, {c: S6, d: 321}, {c: S7, d: 234}, {c: S8, d: 297}, {c: S9, d: 444},
  {c: S10, d: 164}, {c: S11, d: 372}, {c: S12, d: 365}, {c: S13, d: 391}, {c: S14, d: 454}, {c: S15, d: 385}, {c: S16, d: 190},
  {c: S17, d: 421}, {c: S18, d: 443}, {c: S19, d: 348}, {c: S20, d: 447}, {c: S21, d: 281}, {c: S22, d: 421},
  {c: S23, d: 376}, {c: S24, d: 336}, {c: S25, d: 400}, {c: S26, d: 388}, {c: S27, d: 252}, {c: S28, d: 215},
  {c: S29, d: 308}, {c: S30, d: 417}, {c: S31, d: 307}, {c: S32, d: 414}, {c: S33, d: 442}, {c: S34, d: 482}, {c: S35, d: 194},
  {c: S36, d: 405}, {c: S37, d: 407}, {c: S38, d: 358}, {c: S39, d: 508}, {c: S40, d: 400}, {c: S41, d: 493},
  {c: S42, d: 379}, {c: S43, d: 377},
  {c: S44, d: 175}, {c: S45, d: 297}, {c: S46, d: 309}, {c: S47, d: 435}, {c: S48, d: 513}, {c: S49, d: 354}, {c: S50, d: 357},
  {c: S51, d: 243}, {c: S52, d: 420}, {c: S53, d: 447}, {c: S54, d: 579}, {c: S55, d: 276}, {c: S56, d: 372}, {c: S57, d: 391},
  {c: S58, d: 185}, {c: S59, d: 552}, {c: S60, d: 336}, {c: S61, d: 471}, {c: S62, d: 357}, {c: S63, d: 367},
];
export const BAY7PILOT_DURATION = totalFrames(SCENES);
export const Bay7Pilot: React.FC = () => <Timeline scenes={SCENES} />;
