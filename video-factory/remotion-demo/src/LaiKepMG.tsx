import React from 'react';
import {
  AbsoluteFill, TopBar, Logo, Heading, Pill, Caption, K, AnhHai, Bubble, Arrow, Stack, Counter,
  Timeline, totalFrames, Sc, useCurrentFrame, useVideoConfig, interpolate, Easing, pop,
  NAVY, RED, TEAL, BLUE, INK,
} from './Kit';

// ================= SCENES (dùng chung Kit: Anh Hai hoạt hình + SFX tự động) =================
const Emoji: React.FC<{e: string; delay: number}> = ({e, delay}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const s = pop(f, fps, delay);
  return <div style={{fontSize: 90, transform: `scale(${s})`}}>{e}</div>;
};

const S_Hook: React.FC = () => (
  <AbsoluteFill><TopBar color={RED} /><Logo />
    <Heading>Bạn đang <span style={{color: RED}}>NUÔI</span> một con quái vật?</Heading>
    <Stack top={360} right={620}>
      <Pill delay={6}>🧍 Bạn vay 10.000.000₫</Pill>
      <Arrow delay={16}>↓ lãi 30%/năm, để kệ đó</Arrow>
      <Pill delay={26} color={RED}>👹 3 năm sau ≈ 22.000.000₫</Pill>
    </Stack>
    <AnhHai pose="point" x={1380} y={470} delay={10} />
    <Bubble x={1000} y={560} delay={22}>Để tui bóc cho!</Bubble>
    <Caption delay={30} ah>Nợ cũng có <K c={RED}>lãi kép</K> —<br/>mỗi năm tự phình, <K>gặm sạch ví bạn</K></Caption>
  </AbsoluteFill>
);

const S_Rich: React.FC = () => (
  <AbsoluteFill><TopBar color={RED} /><Logo />
    <Heading>Nhưng có mấy ông <span style={{color: BLUE}}>ngồi không</span>…</Heading>
    <AnhHai pose="smug" x={1380} y={470} delay={6} />
    <div style={{position: 'absolute', top: 430, left: 0, right: 620, display: 'flex', justifyContent: 'center', gap: 60}}>
      {['💰', '💸', '🪙'].map((e, i) => <Emoji key={i} e={e} delay={14 + i * 6} />)}
    </div>
    <Caption delay={20} ah>…mà tiền vẫn <K>tự đẻ ra tiền</K>.<br/>Bí mật tên là <K c={BLUE}>lãi kép</K></Caption>
  </AbsoluteFill>
);

const S_Don: React.FC = () => (
  <AbsoluteFill><TopBar color={'#f59e0b'} /><Logo />
    <Heading>Trước tiên: <span style={{color: '#6b7280'}}>Lãi đơn</span></Heading>
    <Stack top={400} right={620} gap={30}>
      <Pill delay={6} color={'#6b7280'}>😴 Gửi 10 triệu · rút lãi ra tiêu</Pill>
      <Arrow delay={16}>10 năm sau…</Arrow>
      <Pill delay={26} color={'#6b7280'}>Vẫn y nguyên 20 triệu · phẳng lì</Pill>
    </Stack>
    <AnhHai pose="smug" x={1380} y={470} delay={12} />
    <Caption delay={30} ah>Đều như vắt chanh,<br/><K c={'#6b7280'}>chán chả buồn nói</K></Caption>
  </AbsoluteFill>
);

const S_Kep: React.FC = () => (
  <AbsoluteFill><TopBar color={BLUE} /><Logo />
    <Heading><span style={{color: BLUE}}>Lãi kép</span> thì ranh hơn</Heading>
    <Stack top={390} right={620} gap={26}>
      <Pill delay={6} color={BLUE}>Không rút lãi ra</Pill>
      <Arrow delay={14}>năm sau lãi tính trên…</Arrow>
      <Pill delay={22} color={BLUE}>11 triệu → 12,1 triệu → …</Pill>
      <Arrow delay={30}>lãi đẻ ra lãi con 🌀</Arrow>
    </Stack>
    <AnhHai pose="sly" x={1380} y={470} delay={12} />
    <Caption delay={36} ah>Như <K c={BLUE}>quả cầu tuyết</K> lăn xuống<br/>dốc — càng lăn càng phình</Caption>
  </AbsoluteFill>
);

const S_Num: React.FC = () => {
  const f = useCurrentFrame();
  const bars = [
    {y: 10, label: '10 năm', v: 26, delay: 20},
    {y: 30, label: '30 năm', v: 175, delay: 34},
    {y: 40, label: '40 năm', v: 450, delay: 48},
  ];
  return (
    <AbsoluteFill><TopBar color={BLUE} /><Logo />
      <Heading top={130} size={64}>Bỏ <span style={{color: BLUE}}>10 triệu</span>, rồi đi ngủ 😴</Heading>
      <div style={{position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 120, color: BLUE, lineHeight: 1}}>
        <Counter to={450} suffix=" triệu" delay={10} dur={70} />
      </div>
      <div style={{position: 'absolute', top: 470, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 110, height: 300}}>
        {bars.map((b, i) => {
          const h = interpolate(f, [b.delay, b.delay + 16], [0, (b.v / 450) * 260], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
          const o = interpolate(f, [b.delay, b.delay + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          return (
            <div key={i} style={{textAlign: 'center', opacity: o, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 38, color: INK, marginBottom: 8}}>{b.v}tr</div>
              <div style={{width: 130, height: h, background: BLUE, borderRadius: '12px 12px 0 0'}} />
              <div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 32, color: '#6b7280', marginTop: 12}}>{b.label}</div>
            </div>
          );
        })}
      </div>
      <Caption delay={56}>Không thêm một xu — chỉ <K>thời gian cày thay bạn</K></Caption>
    </AbsoluteFill>
  );
};

const S_Coffee: React.FC = () => (
  <AbsoluteFill><TopBar color={'#f59e0b'} /><Logo />
    <Heading>Hoặc… ☕ mua cà phê cho sang</Heading>
    <Stack top={420} right={620} gap={30}>
      <Pill delay={8}>Cà phê mỗi sáng ☕</Pill>
      <div style={{fontFamily: 'BVP', fontWeight: 900, fontSize: 60, color: NAVY}}>⚖️</div>
      <Pill delay={20} color={BLUE}>Hay để nó thành 450 triệu?</Pill>
    </Stack>
    <AnhHai pose="sly" x={1380} y={470} delay={12} />
    <Caption delay={28} ah>Người hiểu <K c={BLUE}>ngồi mát ăn bát vàng</K>,<br/>người không hiểu <K c={RED}>cày trả nợ tới già</K></Caption>
  </AbsoluteFill>
);

const S_Dark: React.FC = () => (
  <AbsoluteFill><TopBar color={RED} /><Logo />
    <Heading>Nhưng khoan… <span style={{color: RED}}>mặt tối</span></Heading>
    <Stack top={400} right={620} gap={30}>
      <Pill delay={8} color={RED}>💳 Thẻ tín dụng quẹt cho sướng</Pill>
      <Pill delay={20} color={RED}>📱 App vay bấm lúc nửa đêm</Pill>
    </Stack>
    <AnhHai pose="shock" x={1380} y={470} delay={12} />
    <Caption delay={28} ah>Không trả đúng hạn →<br/><K c={RED}>lãi mẹ đẻ lãi con</K>, y hệt cầu tuyết</Caption>
  </AbsoluteFill>
);

const S_Debt: React.FC = () => (
  <AbsoluteFill><TopBar color={RED} /><Logo />
    <Heading top={140}>Nó lăn thẳng <span style={{color: RED}}>vào mặt bạn</span></Heading>
    <div style={{position: 'absolute', top: 340, left: 0, right: 0, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 140, color: RED}}>
      <Counter to={22} suffix=" triệu" delay={16} dur={40} />
    </div>
    <div style={{position: 'absolute', top: 520, left: 0, right: 0, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 42, color: '#6b7280'}}>Nợ 10 triệu · lãi 30%/năm · để vài năm</div>
    <AnhHai pose="shock" x={1380} y={470} delay={10} />
    <Caption delay={30} ah>Lãi kép giờ là <K c={RED}>con quái vật</K><br/>ngày ngày gặm ví bạn 👹</Caption>
  </AbsoluteFill>
);

const S_Chot: React.FC = () => {
  const f = useCurrentFrame();
  const items = ['Bắt đầu càng SỚM', 'Trả nợ lãi cao TRƯỚC', 'Đừng rút lãi ra tiêu', 'Để thời gian làm việc', 'Tránh vay lãi chồng lãi'];
  return (
    <AbsoluteFill><TopBar color={TEAL} /><Logo />
      <Heading size={70}>Chốt lại <span style={{color: BLUE}}>5 điều</span></Heading>
      <div style={{position: 'absolute', top: 300, left: 360, right: 360}}>
        <div style={{border: `6px solid ${TEAL}`, borderRadius: 28, padding: '44px 56px', background: 'rgba(255,255,255,0.75)'}}>
          <div style={{display: 'inline-block', background: '#0f1830', color: '#fff', fontFamily: 'BVP', fontWeight: 800, fontSize: 40, padding: '12px 32px', borderRadius: 999, marginBottom: 28}}>✅ GHI NHỚ</div>
          {items.map((t, i) => {
            const d = 14 + i * 8;
            const o = interpolate(f, [d, d + 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
            const x = interpolate(f, [d, d + 8], [-30, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
            return <div key={i} style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 48, color: '#20242b', margin: '18px 0', opacity: o, transform: `translateX(${x}px)`}}><span style={{color: TEAL}}>✔</span> {t}</div>;
          })}
        </div>
      </div>
      <Caption delay={58}>Bắt lãi kép làm <K>CHO</K> bạn, đừng để nó làm <K c={RED}>CHỐNG</K> bạn</Caption>
    </AbsoluteFill>
  );
};

const S_CTA: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const bs = pop(f, fps, 12);
  return (
    <AbsoluteFill><TopBar color={NAVY} /><Logo />
      <Heading top={150}>Giữ ví cho chặt nha! 👊</Heading>
      <div style={{position: 'absolute', top: 300, left: 0, right: 0, textAlign: 'center', transform: `scale(${bs})`}}>
        <div style={{display: 'inline-block', background: RED, color: '#fff', fontFamily: 'Mont', fontWeight: 900, fontSize: 62, padding: '26px 64px', borderRadius: 999, boxShadow: '0 12px 0 rgba(0,0,0,.15)'}}>🔔 ĐĂNG KÝ KÊNH</div>
      </div>
      <AnhHai pose="celebrate" x={760} y={640} delay={6} h={560} />
    </AbsoluteFill>
  );
};

// ================= TIMELINE — khớp audio LAI_KEP (93.4s @30fps) =================
const SCENES: Sc[] = [
  {c: S_Hook, d: 208}, {c: S_Rich, d: 188}, {c: S_Don, d: 321}, {c: S_Kep, d: 325},
  {c: S_Num, d: 356}, {c: S_Coffee, d: 264}, {c: S_Dark, d: 269}, {c: S_Debt, d: 336},
  {c: S_Chot, d: 267}, {c: S_CTA, d: 268},
];
export const LAIKEPMG_DURATION = totalFrames(SCENES);
export const LaiKepMG: React.FC = () => <Timeline scenes={SCENES} />;
