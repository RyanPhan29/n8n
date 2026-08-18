import React from 'react';
import {
  AbsoluteFill, TopBar, Logo, Heading, Pill, Caption, K, AnhHai, Sfx,
  Timeline, totalFrames, Sc, useCurrentFrame, useVideoConfig, interpolate, Easing, pop,
  NAVY, RED, TEAL, BLUE, INK, GOLD, GRAY, AMBER,
} from './Kit';

// =====================================================================
// DEMO "bản sắc qua edit" — 3 element giữ chân MỚI, áp lên mở màn 7 BẪY.
// 1) Thanh tiến độ BẪY x/7 (vòng lặp mở)  2) Thẻ ẩn dụ động  3) Kinetic keyword
// KHÔNG sửa engine khoá (Kit/Blocks/Short) — file MG riêng như LaiKepMG.
// =====================================================================

// (1) THANH TIẾN ĐỘ "BẪY x / 7" — mở vòng lặp, khán giả phải xem hết
const BayProgress: React.FC<{n: number; total?: number; delay?: number}> = ({n, total = 7, delay = 0}) => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', top: 66, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>
      <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 34, color: RED, letterSpacing: 1}}>
        BẪY {n} <span style={{color: GRAY}}>/ {total}</span>
      </div>
      <div style={{display: 'flex', gap: 10}}>
        {Array.from({length: total}).map((_, i) => {
          const fill = i < n - 1 ? 1 : i === n - 1 ? interpolate(f, [delay, delay + 18], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)}) : 0;
          return (
            <div key={i} style={{width: 74, height: 12, borderRadius: 8, background: '#d9d5cd', overflow: 'hidden'}}>
              <div style={{width: `${fill * 100}%`, height: '100%', background: RED, borderRadius: 8}} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// (3) KINETIC HEADING — chữ hiện theo nhịp, từ khoá bật màu + nảy
type Tok = {w: string; c?: string; hl?: boolean};
const Kinetic: React.FC<{toks: Tok[]; top?: number; size?: number; delay?: number; ah?: boolean; step?: number}> = ({toks, top = 168, size = 72, delay = 2, ah = false, step = 4}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  return (
    <div style={{position: 'absolute', top, left: 60, right: ah ? 500 : 60, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: size, lineHeight: 1.14, color: INK, textWrap: 'balance'}}>
      {toks.map((t, i) => {
        const d = delay + i * step;
        const s = pop(f, fps, d);
        const o = interpolate(f, [d, d + 5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        const sc = t.hl ? 0.6 + s * 0.55 : 0.75 + s * 0.25;
        return <span key={i} style={{display: 'inline-block', margin: '0 16px', color: t.c || INK, opacity: o, transform: `scale(${sc})`}}>{t.w}</span>;
      })}
    </div>
  );
};

// (open loop) CHIP mồi "1,5 tỷ" — treo suốt, nhấp nháy nhẹ
const LoopChip: React.FC<{delay?: number; text: string; top?: number; rightPad?: number}> = ({delay = 30, text, top = 560, rightPad = 520}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, delay);
  const pulse = 1 + Math.sin(f / 9) * 0.02;
  return (
    <div style={{position: 'absolute', top, left: 60, right: rightPad, display: 'flex', justifyContent: 'center', opacity: interpolate(f, [delay, delay + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `scale(${s * pulse})`, transformOrigin: 'center'}}>
      <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, background: NAVY, color: '#fff', fontFamily: 'BVP', fontWeight: 800, fontSize: 40, padding: '16px 34px', borderRadius: 999, boxShadow: '0 8px 0 rgba(0,0,0,.14)'}}>
        🔓 {text}
      </div>
    </div>
  );
};

// (2) THẺ ẨN DỤ ĐỘNG — "cỗ máy ẩn dụ" thành hình, vừa chữ ký vừa pattern-interrupt
const BuffetCard: React.FC<{delay?: number}> = ({delay = 6}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, delay);
  const row = (emojis: string[], base: number) => emojis.map((e, i) => {
    const d = base + i * 5; const es = pop(f, fps, d);
    return <span key={i} style={{fontSize: 74, display: 'inline-block', margin: '0 6px', transform: `scale(${es})`}}>{e}</span>;
  });
  return (
    <div style={{position: 'absolute', top: 322, left: 110, right: 690, transform: `scale(${0.9 + s * 0.1})`, transformOrigin: 'center', opacity: interpolate(f, [delay, delay + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
      <Sfx name="pop" at={delay} vol={0.22} len={10} />
      <div style={{border: `6px solid ${NAVY}`, borderRadius: 30, background: 'rgba(255,255,255,0.86)', padding: '30px 40px 36px'}}>
        <div style={{display: 'inline-block', background: NAVY, color: '#fff', fontFamily: 'BVP', fontWeight: 800, fontSize: 32, padding: '9px 24px', borderRadius: 999, marginBottom: 24}}>🍽️ ẨN DỤ: ĐI ĂN BUFFET</div>
        <div style={{display: 'flex', gap: 30, alignItems: 'stretch'}}>
          <div style={{flex: 1, border: `4px solid ${TEAL}`, borderRadius: 22, padding: '18px 20px 22px', textAlign: 'center'}}>
            <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 30, color: TEAL, marginBottom: 8}}>NGƯỜI KHÔN</div>
            <div>{row(['🦐', '🦀', '🥩'], delay + 10)}</div>
            <div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 30, color: '#20242b', marginTop: 8}}>gắp món chính TRƯỚC</div>
          </div>
          <div style={{flex: 1, border: `4px solid ${RED}`, borderRadius: 22, padding: '18px 20px 22px', textAlign: 'center'}}>
            <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 30, color: RED, marginBottom: 8}}>NGƯỜI NON</div>
            <div>{row(['🍟', '🥤', '🍬'], delay + 22)}</div>
            <div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 30, color: '#20242b', marginTop: 8}}>no vì mấy món vặt</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ================= SCENES =================
const S1_Hook: React.FC = () => (
  <AbsoluteFill><TopBar color={RED} /><Logo />
    <Kinetic top={210} size={82} delay={2} step={4} toks={[
      {w: 'Đi'}, {w: 'làm'}, {w: '10'}, {w: 'năm'}, {w: '—'}, {w: 'vẫn'}, {w: 'KHÔNG', c: RED, hl: true}, {w: 'có'}, {w: 'dư?'},
    ]} />
    <AnhHai pose="think" x={1380} y={470} delay={10} />
    <LoopChip delay={40} top={560} rightPad={520} text="1,5 TỶ — cuối video Anh Hai chỉ" />
    <Caption delay={30} ah>Không phải bạn <K c={RED}>lười</K> hay <K c={RED}>kiếm ít</K> —<br/>mà vì <K>7 cái bẫy</K> ẩn trong thói quen</Caption>
  </AbsoluteFill>
);

const S2_Bay1: React.FC = () => (
  <AbsoluteFill><TopBar color={NAVY} /><Logo />
    <BayProgress n={1} delay={6} />
    <Kinetic top={150} size={58} delay={4} step={4} toks={[
      {w: 'Bẫy'}, {w: '1:'}, {w: 'để'}, {w: 'dành'}, {w: 'phần'}, {w: 'THỪA', c: RED, hl: true},
    ]} />
    <BuffetCard delay={16} />
    <AnhHai pose="sly" x={1400} y={520} delay={12} h={540} />
    <Caption delay={40} ah>Lương về <K c={RED}>tiêu trước</K>, dư mới cất →<br/>cuối tháng <K c={RED}>chẳng còn gì</K> mà cất</Caption>
  </AbsoluteFill>
);

const S3_Interrupt: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, 10);
  return (
    <AbsoluteFill><TopBar color={AMBER} /><Logo />
      <BayProgress n={1} delay={4} />
      <Kinetic top={300} size={72} delay={6} step={5} toks={[
        {w: 'Mới'}, {w: '1'}, {w: 'bẫy…'}, {w: 'còn'}, {w: '6', c: RED, hl: true}, {w: 'cái'}, {w: 'nữa'},
      ]} />
      <div style={{position: 'absolute', top: 470, left: 0, right: 0, textAlign: 'center', transform: `scale(${s})`}}>
        <div style={{display: 'inline-block', background: NAVY, color: '#fff', fontFamily: 'Mont', fontWeight: 900, fontSize: 46, padding: '18px 44px', borderRadius: 999}}>
          🔓 1,5 tỷ vẫn đang chờ ở cuối
        </div>
      </div>
      <AnhHai pose="sly" x={1380} y={470} delay={8} />
      <Caption delay={22} ah>Bẫy càng về sau <K c={RED}>càng đắt</K> —<br/>cái số 7 mới là <K>gốc rễ</K></Caption>
    </AbsoluteFill>
  );
};

// ================= TIMELINE (demo im tiếng ~20s) =================
const SCENES: Sc[] = [
  {c: S1_Hook, d: 185},
  {c: S2_Bay1, d: 275},
  {c: S3_Interrupt, d: 170},
];
export const BAYMG_DURATION = totalFrames(SCENES);
export const BayMGDemo: React.FC = () => <Timeline scenes={SCENES} />;
