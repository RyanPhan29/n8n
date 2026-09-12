import React from 'react';
import {
  AbsoluteFill, TopBar, Logo, Heading, Pill, Caption, K, AnhHai, Bubble, Arrow, Stack, Counter,
  Timeline, totalFrames, useCurrentFrame, interpolate, Easing,
  NAVY, RED, TEAL, BLUE, INK, GRAY, AMBER,
} from './Kit';

const TUAN = '#3b6fd6'; // áo anh Tuấn (xanh dương) — phân biệt Anh Hai host (vàng)

const RuleCard: React.FC<{n: number; title: string; color?: string}> = ({n, title, color = TEAL}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [4, 14], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const x = interpolate(f, [4, 16], [-40, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', top: 400, left: 200, right: 200, display: 'flex', alignItems: 'center', gap: 40, opacity: o, transform: `translateX(${x}px)`}}>
      <div style={{flex: '0 0 auto', width: 150, height: 150, borderRadius: '50%', background: color, color: '#fff', fontFamily: 'Mont', fontWeight: 900, fontSize: 90, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{n}</div>
      <div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 60, color: INK, lineHeight: 1.2}}>{title}</div>
    </div>
  );
};

// ① BỐI CẢNH
const S1: React.FC = () => (
  <AbsoluteFill><TopBar color={NAVY} /><Logo />
    <Heading size={64}>"Thuê nhà là <span style={{color: RED}}>ném tiền qua cửa sổ</span>"?</Heading>
    <div style={{position: 'absolute', top: 400, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 60}}>
      <Pill delay={8} color={GRAY}>🏠 THUÊ</Pill>
      <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 44, color: INK, alignSelf: 'center'}}>hay</div>
      <Pill delay={18} color={BLUE}>🔑 MUA TRẢ GÓP</Pill>
    </div>
    <AnhHai pose="point" x={1380} y={470} delay={10} />
    <Bubble x={980} y={648} delay={22}>Nghe câu chuyện này đã…</Bubble>
    <Caption delay={30} ah>Câu chuyện của <K c={TUAN}>anh Tuấn</K> có thể<br/>khiến bạn nghĩ lại 👇</Caption>
  </AbsoluteFill>
);

// ① tiếp — setup nhân vật
const S2: React.FC = () => (
  <AbsoluteFill><TopBar color={NAVY} /><Logo />
    <Heading>Gặp <span style={{color: TUAN}}>anh Tuấn</span>, 30 tuổi</Heading>
    <Stack top={390} gap={24}>
      <Pill delay={8} color={GRAY}>🏚️ Thuê trọ 5 năm</Pill>
      <Pill delay={18} color={TEAL}>🐷 Dành dụm: 500 triệu</Pill>
      <Pill delay={28} color={RED}>🏦 Vay thêm ngân hàng: 1 tỷ</Pill>
    </Stack>
    <AnhHai pose="smug" x={1380} y={470} delay={12} shirt={TUAN} />
    <Caption delay={36} ah>Giá nhà cứ leo, ai cũng giục<br/>"mua nhanh kẻo hết cơ hội"</Caption>
  </AbsoluteFill>
);

// ② KỲ VỌNG
const S3: React.FC = () => (
  <AbsoluteFill><TopBar color={TEAL} /><Logo />
    <Heading size={66}>Giấc mơ <span style={{color: TEAL}}>an cư</span> ☁️</Heading>
    <Stack top={400} gap={26}>
      <Pill delay={8} color={TEAL}>Trả góp ~ như tiền thuê nhà</Pill>
      <Arrow delay={18}>vài năm sau…</Arrow>
      <Pill delay={26} color={TEAL}>🔑 Nhà là của mình!</Pill>
    </Stack>
    <AnhHai pose="smug" x={1380} y={470} delay={12} shirt={TUAN} />
    <Bubble x={900} y={706} delay={22}>Nhẹ tênh mà anh!</Bubble>
    <Caption delay={36} ah>Nhân viên ngân hàng cười tươi:<br/>"chỉ 8–9 triệu một tháng thôi"</Caption>
  </AbsoluteFill>
);

// ③ XUNG ĐỘT — tháng đầu
const S4: React.FC = () => (
  <AbsoluteFill><TopBar color={RED} /><Logo />
    <Heading top={130}>Nhưng con số thật là… 😨</Heading>
    <div style={{position: 'absolute', top: 300, left: 0, right: 0, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 118, color: NAVY, lineHeight: 1}}>
      <Counter to={8750000} suffix="₫" delay={8} dur={45} />
    </div>
    <div style={{position: 'absolute', top: 470, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 26}}>
      <Pill delay={22} color={BLUE} size={34}>Gốc 4.166.667₫</Pill>
      <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 44, color: INK, alignSelf: 'center'}}>+</div>
      <Pill delay={32} color={RED} size={34}>Lãi 4.583.333₫</Pill>
    </div>
    <AnhHai pose="shock" x={1380} y={470} delay={14} shirt={TUAN} />
    <Caption delay={42} ah>Tháng đầu tiên đã <K c={RED}>gần gấp đôi</K><br/>tiền gốc — vì lãi tính trên cả 1 tỷ</Caption>
  </AbsoluteFill>
);

// ③ tổng lãi
const S5: React.FC = () => (
  <AbsoluteFill><TopBar color={RED} /><Logo />
    <Heading top={120} size={58}>Cộng hết 20 năm…</Heading>
    <div style={{position: 'absolute', top: 260, left: 0, right: 0, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 108, color: RED, lineHeight: 1}}>
      <Counter to={733800000} suffix="₫" delay={8} dur={60} />
    </div>
    <div style={{position: 'absolute', top: 420, left: 0, right: 0, textAlign: 'center', fontFamily: 'BVP', fontWeight: 800, fontSize: 38, color: GRAY}}>riêng TIỀN LÃI</div>
    <Stack top={510} gap={0}><Pill delay={42} color={RED}>Tổng phải trả ≈ 1.734.000.000₫</Pill></Stack>
    <AnhHai pose="shock" x={1380} y={470} delay={16} shirt={TUAN} />
    <Caption delay={54} ah>Mua 1 căn, mà trả tiền<br/><K c={RED}>gần bằng một căn rưỡi</K></Caption>
  </AbsoluteFill>
);

// ③ twist thả nổi
const S6: React.FC = () => (
  <AbsoluteFill><TopBar color={RED} /><Logo />
    <Heading size={62}>Cú twist: <span style={{color: RED}}>lãi thả nổi</span></Heading>
    <Stack top={390} gap={22}>
      <Pill delay={8} color={TEAL}>😊 3 năm đầu: 5,5%/năm</Pill>
      <Arrow delay={18}>hết ưu đãi…</Arrow>
      <Pill delay={26} color={RED}>😰 Năm thứ 4: thả nổi 8–9%/năm</Pill>
    </Stack>
    <AnhHai pose="shock" x={1380} y={470} delay={12} shirt={TUAN} />
    <Caption delay={36} ah>Có tháng anh Tuấn phải <K c={RED}>vay nóng</K><br/>để đủ tiền trả ngân hàng</Caption>
  </AbsoluteFill>
);

// ③ bẫy dư nợ gốc
const S7: React.FC = () => (
  <AbsoluteFill><TopBar color={AMBER} /><Logo />
    <Heading size={60}>Coi chừng: <span style={{color: RED}}>2 cách tính lãi</span></Heading>
    <div style={{position: 'absolute', top: 400, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 56}}>
      <div style={{textAlign: 'center'}}><Pill delay={8} color={TEAL}>✅ Dư nợ giảm dần</Pill><div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 32, color: TEAL, marginTop: 18}}>công bằng</div></div>
      <div style={{fontFamily: 'Mont', fontWeight: 900, fontSize: 44, color: INK}}>VS</div>
      <div style={{textAlign: 'center'}}><Pill delay={20} color={RED}>👹 Dư nợ gốc</Pill><div style={{fontFamily: 'BVP', fontWeight: 800, fontSize: 32, color: RED, marginTop: 18}}>lãi trên cả 1 tỷ · cắt cổ</div></div>
    </div>
    <Caption delay={32}>Vay mua xe / tiêu dùng hay dính <K c={RED}>dư nợ gốc</K> — nghe rẻ mà đắt</Caption>
  </AbsoluteFill>
);

// ④ GIẢI QUYẾT — intro
const S8: React.FC = () => (
  <AbsoluteFill><TopBar color={TEAL} /><Logo />
    <Heading size={58}>Vay không sai —<br/><span style={{color: RED}}>không hiểu bài toán</span> mới sai</Heading>
    <AnhHai pose="point" x={1380} y={470} delay={10} />
    <Bubble x={940} y={648} delay={20}>5 điều nên biết sớm!</Bubble>
    <Caption delay={30} ah>Đây là 5 điều anh Tuấn<br/>ước gì mình biết trước khi ký</Caption>
  </AbsoluteFill>
);

const S9: React.FC = () => (<AbsoluteFill><TopBar color={TEAL} /><Logo /><Heading size={56}>Trước khi ký, nhớ…</Heading><RuleCard n={1} title="Hỏi rõ: lãi giảm dần hay dư nợ gốc?" /><Caption delay={26}>Chỉ một câu hỏi này có thể <K>chênh nhau cả trăm triệu</K></Caption></AbsoluteFill>);
const S10: React.FC = () => (<AbsoluteFill><TopBar color={TEAL} /><Logo /><Heading size={56}>Trước khi ký, nhớ…</Heading><RuleCard n={2} title="Tính thử theo lãi THẢ NỔI 8–9%" color={BLUE} /><Caption delay={26}>Mức đó mà vẫn gánh nổi thì <K>hẵng vay</K></Caption></AbsoluteFill>);
const S11: React.FC = () => (<AbsoluteFill><TopBar color={TEAL} /><Logo /><Heading size={56}>Trước khi ký, nhớ…</Heading><RuleCard n={3} title="Trả nợ ≤ 40% thu nhập mỗi tháng" color={AMBER} /><Caption delay={26}>Phần còn lại để sống, để <K>phòng ốm đau, mất việc</K></Caption></AbsoluteFill>);
const S12: React.FC = () => (<AbsoluteFill><TopBar color={TEAL} /><Logo /><Heading size={56}>Trước khi ký, nhớ…</Heading><RuleCard n={4} title="Quỹ dự phòng ít nhất 6 tháng chi phí" color={TEAL} /><Caption delay={26}>Để một cú lãi tăng đột ngột <K>không đẩy bạn vào cảnh vay nóng</K></Caption></AbsoluteFill>);

// ④ điều 5 — câu hỏi tự vấn
const S13: React.FC = () => (
  <AbsoluteFill><TopBar color={NAVY} /><Logo />
    <Heading size={54}>Câu hỏi thật lòng nhất:</Heading>
    <div style={{position: 'absolute', top: 380, left: 200, right: 200, textAlign: 'center', fontFamily: 'Mont', fontWeight: 900, fontSize: 60, color: INK, lineHeight: 1.3}}>
      Mua nhà <span style={{color: TEAL}}>để Ở</span>,<br/>hay vì <span style={{color: RED}}>sợ bị bỏ lại</span>?
    </div>
    <Caption delay={30}>Đôi khi thuê thêm vài năm cho vững, lại <K>khôn ngoan hơn</K> gồng nợ quá sức</Caption>
  </AbsoluteFill>
);

// ⑤ BỐI CẢNH LỚN + CTA
const S14: React.FC = () => {
  const f = useCurrentFrame();
  const bs = interpolate(f, [40, 54], [0.6, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill><TopBar color={NAVY} /><Logo />
      <Heading top={150} size={54}>Nhà là mái ấm khi bạn <span style={{color: TEAL}}>làm chủ</span> nó —<br/>không phải nó làm chủ bạn</Heading>
      <div style={{position: 'absolute', top: 320, left: 0, right: 0, textAlign: 'center', transform: `scale(${bs})`}}>
        <div style={{display: 'inline-block', background: RED, color: '#fff', fontFamily: 'Mont', fontWeight: 900, fontSize: 58, padding: '24px 60px', borderRadius: 999, boxShadow: '0 12px 0 rgba(0,0,0,.15)'}}>🔔 ĐĂNG KÝ KÊNH</div>
      </div>
      <AnhHai pose="celebrate" x={760} y={640} delay={6} h={560} />
    </AbsoluteFill>
  );
};

// Thời lượng khớp audio VAYNHA (168.2s @30fps), biên cảnh = giữa 14 khoảng lặng.
export const VAYNHALONG_SCENES = [
  {c: S1, d: 394}, {c: S2, d: 368}, {c: S3, d: 541}, {c: S4, d: 389}, {c: S5, d: 415},
  {c: S6, d: 572}, {c: S7, d: 286}, {c: S8, d: 245}, {c: S9, d: 220}, {c: S10, d: 215},
  {c: S11, d: 255}, {c: S12, d: 199}, {c: S13, d: 329}, {c: S14, d: 618},
];
export const VAYNHALONG_DURATION = totalFrames(VAYNHALONG_SCENES);
export const VayNhaLong: React.FC = () => <Timeline scenes={VAYNHALONG_SCENES} />;
