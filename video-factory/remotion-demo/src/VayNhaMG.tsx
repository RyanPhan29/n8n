import React from 'react';
import {
  AbsoluteFill, TopBar, Logo, Heading, Pill, Caption, K, AnhHai, Bubble, Arrow, Stack, Counter,
  Timeline, totalFrames, useCurrentFrame, interpolate, Easing,
  NAVY, RED, TEAL, BLUE, INK, GRAY, AMBER,
} from './Kit';

// ===== SCENES =====
const V_Hook: React.FC = () => (
  <AbsoluteFill><TopBar color={RED} /><Logo />
    <Heading size={70}>Mua nhà <span style={{color: BLUE}}>1 tỷ</span> — trả đúng 1 tỷ?</Heading>
    <Stack top={380} gap={26}>
      <Pill delay={6}>🏠 Giá nhà: 1.000.000.000₫</Pill>
      <Arrow delay={16}>trả góp ngân hàng…</Arrow>
      <Pill delay={26} color={RED}>💸 Thực trả: ~1.734.000.000₫</Pill>
    </Stack>
    <AnhHai pose="point" x={1380} y={470} delay={10} />
    <Bubble x={980} y={648} delay={22}>Để tui bóc cho!</Bubble>
    <Caption delay={30} ah>Con số thật <K c={RED}>khác xa</K> những gì<br/>bạn tưởng 👇</Caption>
  </AbsoluteFill>
);

const V_Base: React.FC = () => (
  <AbsoluteFill><TopBar color={NAVY} /><Logo />
    <Heading>Bài toán gốc</Heading>
    <Stack top={400} gap={30}>
      <Pill delay={6}>Vay 1 tỷ · kỳ hạn 20 năm</Pill>
      <Arrow delay={16}>= 240 tháng</Arrow>
      <Pill delay={26} color={BLUE}>Gốc cố định: 4.166.667₫/tháng</Pill>
    </Stack>
    <AnhHai pose="think" x={1380} y={470} delay={12} />
    <Caption delay={30} ah>Tiền gốc chia đều —<br/>ai cũng thấy phần này</Caption>
  </AbsoluteFill>
);

const V_Month1: React.FC = () => (
  <AbsoluteFill><TopBar color={AMBER} /><Logo />
    <Heading top={130}>Còn tiền lãi thì sao?</Heading>
    <div style={{position: 'absolute', top: 300, left: 0, right: 0, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 120, color: NAVY, lineHeight: 1}}>
      <Counter to={8750000} suffix="₫" delay={8} dur={45} />
    </div>
    <div style={{position: 'absolute', top: 470, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 30}}>
      <Pill delay={20} color={BLUE} size={36}>Gốc 4.166.667₫</Pill>
      <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 46, color: INK, alignSelf: 'center'}}>+</div>
      <Pill delay={30} color={RED} size={36}>Lãi 4.583.333₫</Pill>
    </div>
    <AnhHai pose="shock" x={1380} y={470} delay={14} />
    <Caption delay={40} ah>Tháng đầu trả <K c={RED}>gần gấp đôi</K><br/>tiền gốc — vì lãi tính trên cả 1 tỷ</Caption>
  </AbsoluteFill>
);

const V_Down: React.FC = () => {
  const f = useCurrentFrame();
  const bars = [
    {label: 'Năm 1', v: 8.75, delay: 18}, {label: 'Năm 7', v: 7.2, delay: 30},
    {label: 'Năm 14', v: 5.6, delay: 42}, {label: 'Năm 20', v: 4.2, delay: 54},
  ];
  return (
    <AbsoluteFill><TopBar color={TEAL} /><Logo />
      <Heading top={130} size={66}>Dư nợ <span style={{color: TEAL}}>giảm dần</span> 📉</Heading>
      <div style={{position: 'absolute', top: 430, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 90, height: 300}}>
        {bars.map((b, i) => {
          const h = interpolate(f, [b.delay, b.delay + 16], [0, (b.v / 8.75) * 280], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
          const o = interpolate(f, [b.delay, b.delay + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          return (
            <div key={i} style={{textAlign: 'center', opacity: o, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 34, color: INK, marginBottom: 8}}>{b.v}tr</div>
              <div style={{width: 120, height: h, background: TEAL, borderRadius: '12px 12px 0 0'}} />
              <div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 30, color: GRAY, marginTop: 12}}>{b.label}</div>
            </div>
          );
        })}
      </div>
      <Caption delay={62}>Nợ càng vơi, lãi càng ít — trả tháng <K>tụt dần theo thời gian</K></Caption>
    </AbsoluteFill>
  );
};

const V_Shock: React.FC = () => (
  <AbsoluteFill><TopBar color={RED} /><Logo />
    <Heading top={120} size={60}>Cộng hết lại… 😱</Heading>
    <div style={{position: 'absolute', top: 270, left: 0, right: 0, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 110, color: RED, lineHeight: 1}}>
      <Counter to={733800000} suffix="₫" delay={8} dur={60} />
    </div>
    <div style={{position: 'absolute', top: 430, left: 0, right: 0, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 40, color: GRAY}}>tiền LÃI trong 20 năm</div>
    <Stack top={520} gap={0}>
      <Pill delay={40} color={RED}>Tổng phải trả ≈ 1.734.000.000₫</Pill>
    </Stack>
    <AnhHai pose="shock" x={1380} y={470} delay={16} />
    <Caption delay={52} ah>Mua nhà 1 tỷ, trả ngân hàng thêm<br/><K c={RED}>gần ¾ căn nhà nữa</K></Caption>
  </AbsoluteFill>
);

const V_Twist: React.FC = () => (
  <AbsoluteFill><TopBar color={AMBER} /><Logo />
    <Heading size={62}>Cái bẫy: <span style={{color: RED}}>2 cách tính lãi</span></Heading>
    <div style={{position: 'absolute', top: 400, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 60}}>
      <div style={{textAlign: 'center'}}><Pill delay={8} color={TEAL}>✅ Dư nợ giảm dần</Pill><div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 34, color: TEAL, marginTop: 20}}>công bằng · rẻ hơn</div></div>
      <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 46, color: INK}}>VS</div>
      <div style={{textAlign: 'center'}}><Pill delay={20} color={RED}>👹 Dư nợ gốc</Pill><div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 34, color: RED, marginTop: 20}}>lãi trên cả 1 tỷ · cắt cổ</div></div>
    </div>
    <Caption delay={34}>Vay mua xe / tiêu dùng hay dính <K c={RED}>dư nợ gốc</K> — nghe rẻ mà đắt</Caption>
  </AbsoluteFill>
);

const V_Float: React.FC = () => (
  <AbsoluteFill><TopBar color={RED} /><Logo />
    <Heading size={64}>Bẫy <span style={{color: RED}}>lãi thả nổi</span></Heading>
    <Stack top={400} gap={24}>
      <Pill delay={8} color={TEAL}>😊 3 năm đầu: 5,5%/năm (ưu đãi)</Pill>
      <Arrow delay={20}>hết ưu đãi…</Arrow>
      <Pill delay={30} color={RED}>😰 Sau đó: thả nổi 8–9%/năm</Pill>
    </Stack>
    <AnhHai pose="shock" x={1380} y={470} delay={14} />
    <Caption delay={40} ah>Khoản trả hàng tháng có thể<br/><K c={RED}>vọt lên lúc nào không hay</K></Caption>
  </AbsoluteFill>
);

const V_TenTwenty: React.FC = () => (
  <AbsoluteFill><TopBar color={BLUE} /><Logo />
    <Heading size={64}>Vay <span style={{color: TEAL}}>10 năm</span> hay <span style={{color: RED}}>20 năm</span>?</Heading>
    <div style={{position: 'absolute', top: 400, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 70}}>
      <div style={{textAlign: 'center'}}><Pill delay={8} color={TEAL}>⏳ 10 năm</Pill>
        <div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 32, color: INK, marginTop: 18, lineHeight: 1.5}}>trả tháng NẶNG<br/><K>tổng lãi RẺ</K></div></div>
      <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 44, color: INK, alignSelf: 'center'}}>VS</div>
      <div style={{textAlign: 'center'}}><Pill delay={20} color={RED}>⏳ 20 năm</Pill>
        <div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 32, color: INK, marginTop: 18, lineHeight: 1.5}}>trả tháng NHẸ<br/><K c={RED}>tổng lãi ĐẮT</K></div></div>
    </div>
    <Caption delay={34}>Chọn kỳ hạn nào là <K>tùy túi tiền của bạn</K></Caption>
  </AbsoluteFill>
);

const V_Check: React.FC = () => {
  const f = useCurrentFrame();
  const items = ['Hỏi rõ: giảm dần hay dư nợ gốc?', 'Tính CẢ giai đoạn lãi thả nổi', 'Nhìn TỔNG lãi, đừng chỉ nhìn trả tháng', 'Chừa dự phòng khi lãi tăng', 'Đừng vay quá 40% thu nhập'];
  return (
    <AbsoluteFill><TopBar color={TEAL} /><Logo />
      <Heading size={66}>Chốt lại <span style={{color: BLUE}}>5 điều</span></Heading>
      <div style={{position: 'absolute', top: 290, left: 300, right: 300}}>
        <div style={{border: `6px solid ${TEAL}`, borderRadius: 28, padding: '40px 52px', background: 'rgba(255,255,255,0.78)'}}>
          <div style={{display: 'inline-block', background: '#0f1830', color: '#fff', fontFamily: 'BVP', fontWeight: 800, fontSize: 38, padding: '12px 30px', borderRadius: 999, marginBottom: 24}}>✅ TRƯỚC KHI KÝ</div>
          {items.map((t, i) => {
            const d = 14 + i * 8;
            const o = interpolate(f, [d, d + 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
            const x = interpolate(f, [d, d + 8], [-30, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
            return <div key={i} style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 44, color: '#20242b', margin: '16px 0', opacity: o, transform: `translateX(${x}px)`}}><span style={{color: TEAL}}>✔</span> {t}</div>;
          })}
        </div>
      </div>
      <Caption delay={58}>Vay mua nhà là quyết định <K>của cả chục năm</K></Caption>
    </AbsoluteFill>
  );
};

const V_CTA: React.FC = () => {
  const f = useCurrentFrame();
  const bs = interpolate(f, [12, 24], [0.6, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill><TopBar color={NAVY} /><Logo />
      <Heading top={190}>Đừng ký vội — giữ ví cho chặt! 👊</Heading>
      <div style={{position: 'absolute', top: 400, left: 0, right: 0, textAlign: 'center', transform: `scale(${bs})`}}>
        <div style={{display: 'inline-block', background: RED, color: '#fff', fontFamily: 'Mont', fontWeight: 900, fontSize: 62, padding: '26px 64px', borderRadius: 999, boxShadow: '0 12px 0 rgba(0,0,0,.15)'}}>🔔 ĐĂNG KÝ KÊNH</div>
      </div>
      <AnhHai pose="point" x={745} y={620} delay={6} scale={1.05} />
    </AbsoluteFill>
  );
};

export const VAYNHA_SCENES = [
  {c: V_Hook, d: 390}, {c: V_Base, d: 300}, {c: V_Month1, d: 300}, {c: V_Down, d: 330},
  {c: V_Shock, d: 450}, {c: V_Twist, d: 450}, {c: V_Float, d: 330}, {c: V_TenTwenty, d: 390},
  {c: V_Check, d: 480}, {c: V_CTA, d: 300},
];
export const VAYNHA_DURATION = totalFrames(VAYNHA_SCENES);
export const VayNhaMG: React.FC = () => <Timeline scenes={VAYNHA_SCENES} />;
