import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, interpolate, Easing} from 'remotion';
import {Bg as MedianBg, FramedShot, HandCircle, Spotlight, fIn as kfIn} from './MedianKit';
import './median-fonts.css';

/* median-sim #2: ĐÒN BẨY — CON DAO 2 LƯỠI.
   Nợ (xám) CỐ ĐỊNH → mọi biến động tài sản dồn hết vào VỐN của bạn (vàng).
   Tài sản ±10% → vốn bạn đu ±33%. Tài sản −30% → vốn = 0 (mất trắng). */
const INTRO_LEN = 100, CROSS = 20;
export const DONBAY_DURATION = INTRO_LEN - CROSS + 500;

const INK = '#e8e8ea', GRAY = '#7d7f83', DIM = '#4a4c50', GOLD = '#e9c46a', RED = '#e0603a';
const FN = "'BVPm','BVP',sans-serif", FH = "'Mont','BVP',sans-serif";
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const eOut = Easing.out(Easing.cubic);
const glowGold = '0 0 10px rgba(233,196,106,.6),0 0 30px rgba(233,196,106,.4),0 0 60px rgba(233,196,106,.2)';
const glowRed = '0 0 10px rgba(224,96,58,.6),0 0 30px rgba(224,96,58,.4),0 0 60px rgba(224,96,58,.2)';
const glowW = '0 0 8px rgba(255,255,255,.5),0 0 24px rgba(255,255,255,.3)';
const fIn = (f: number, a: number, d = 16) => interpolate(f, [a, a + d], [0, 1], clamp);
const fmt = (v: number) => Math.abs(v) >= 1000 ? (v / 1000).toFixed(2).replace('.', ',').replace(',00', '') + ' tỷ' : Math.round(v) + ' tr';

// toán: tài sản 1 tỷ = vốn 300tr + vay 700tr (cố định)
const DEBT = 700, EQ0 = 300, ASSET0 = 1000;
const H = 560, YB = 880, BX = 690, BW = 210;

const sy = (v: number) => YB - (v / ASSET0) * H;

const Chart: React.FC = () => {
  const f = useCurrentFrame();
  const introFade = interpolate(f, [0, CROSS], [0, 1], clamp);
  // biến động tài sản a(%): lên +10 → về 0 → xuống −10 → về 0 → sập −30
  const a = interpolate(f,
    [120, 190, 220, 250, 320, 355, 385, 470],
    [0, 10, 10, 0, -10, -10, 0, -30], clamp);
  const asset = ASSET0 * (1 + a / 100);
  const equity = Math.max(0, asset - DEBT);
  const eqPct = ((equity - EQ0) / EQ0) * 100;      // ±33% ... −100%
  const gaining = a >= 0;
  const eqColor = a > 0.2 ? GOLD : a < -0.2 ? RED : INK;
  const eqGlow = a > 0.2 ? glowGold : a < -0.2 ? glowRed : glowW;
  const wiped = equity <= 1;

  const axisO = fIn(f, 12, 20);
  const eqTop = sy(asset), debtTop = sy(DEBT);
  const barGlow = a > 0.2 ? 'drop-shadow(0 0 14px rgba(233,196,106,.55))' : a < -0.2 ? 'drop-shadow(0 0 14px rgba(224,96,58,.55))' : 'none';
  const shake = wiped ? Math.sin(f * 1.7) * interpolate(f, [430, 445, 470], [0, 3, 0], clamp) : 0;
  const chotO = fIn(f, 452, 16);

  return <AbsoluteFill style={{opacity: introFade}}>
    {/* tiêu đề */}
    <div style={{position: 'absolute', top: 66, left: 0, right: 0, textAlign: 'center', opacity: fIn(f, 6, 20)}}>
      <div style={{fontFamily: FN, fontWeight: 500, fontSize: 26, color: GRAY, letterSpacing: 8}}>ĐÒN BẨY · CON DAO 2 LƯỠI</div>
      <div style={{marginTop: 12, fontFamily: FN, fontWeight: 400, fontSize: 40, color: INK}}>Nợ <span style={{color: GRAY}}>đứng yên</span> — biến động dồn hết vào <span style={{color: GOLD}}>vốn của bạn</span></div>
    </div>

    <svg width="1920" height="1080" style={{position: 'absolute', inset: 0, transform: `translateX(${shake}px)`}}>
      <defs>
        <linearGradient id="goldb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f2cf78" /><stop offset="100%" stopColor="#c99a3f" />
        </linearGradient>
        <linearGradient id="redb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8734d" /><stop offset="100%" stopColor="#b8442a" />
        </linearGradient>
      </defs>
      {/* nền cột + đáy */}
      <line x1={BX - 60} y1={YB} x2={BX + BW + 60} y2={YB} stroke={DIM} strokeWidth={2} opacity={axisO} />
      {/* NỢ cố định (xám) */}
      <rect x={BX} y={debtTop} width={BW} height={YB - debtTop} fill="rgba(125,127,131,0.28)" stroke="rgba(125,127,131,0.5)" strokeWidth={1.5} opacity={axisO} />
      {/* VỐN của bạn (vàng/đỏ) — ngồi trên nợ, co giãn theo tài sản */}
      <rect x={BX} y={eqTop} width={BW} height={Math.max(0, debtTop - eqTop)} fill={gaining ? 'url(#goldb)' : 'url(#redb)'} opacity={fIn(f, 40, 20)} style={{filter: barGlow}} />
      {/* vạch mốc vốn gốc 300 */}
      <line x1={BX - 14} y1={sy(ASSET0)} x2={BX + BW + 14} y2={sy(ASSET0)} stroke={INK} strokeWidth={1.5} strokeDasharray="6 6" opacity={axisO * 0.5} />
      {/* đường tài sản (đỉnh cột) */}
      <line x1={BX - 30} y1={eqTop} x2={BX + BW + 30} y2={eqTop} stroke={eqColor} strokeWidth={2.5} opacity={fIn(f, 40, 20)} />
    </svg>

    {/* nhãn trong cột */}
    <div style={{position: 'absolute', left: BX + BW / 2 - 100, top: (debtTop + YB) / 2 - 24, width: 200, textAlign: 'center', opacity: fIn(f, 55, 16)}}>
      <div style={{fontFamily: FN, fontWeight: 600, fontSize: 26, color: GRAY, letterSpacing: 1}}>NỢ VAY</div>
      <div style={{fontFamily: FN, fontWeight: 400, fontSize: 22, color: DIM}}>700 tr · cố định</div>
    </div>
    <div style={{position: 'absolute', left: BX + BW + 34, top: eqTop - 10, opacity: fIn(f, 60, 16), transition: 'none'}}>
      <div style={{fontFamily: FN, fontWeight: 600, fontSize: 24, color: eqColor, letterSpacing: 1, textShadow: eqGlow}}>← VỐN CỦA BẠN</div>
    </div>

    {/* bảng số bên phải */}
    <div style={{position: 'absolute', top: 300, right: 96, textAlign: 'right', opacity: fIn(f, 70, 18)}}>
      <div style={{fontFamily: FN, fontWeight: 500, fontSize: 24, color: GRAY, letterSpacing: 2}}>TÀI SẢN</div>
      <div style={{fontFamily: FH, fontWeight: 800, fontSize: 58, color: INK, lineHeight: 1}}>{fmt(asset)}</div>
      <div style={{fontFamily: FN, fontWeight: 500, fontSize: 30, color: gaining ? (a > 0.2 ? GOLD : GRAY) : RED, marginTop: 2}}>{a > 0.2 ? '+' : ''}{a.toFixed(0)}%</div>

      <div style={{marginTop: 40, fontFamily: FN, fontWeight: 500, fontSize: 24, color: GRAY, letterSpacing: 2}}>VỐN CỦA BẠN</div>
      <div style={{fontFamily: FH, fontWeight: 800, fontSize: 92, color: eqColor, textShadow: eqGlow, lineHeight: 1}}>{wiped ? '0' : fmt(equity)}</div>
      <div style={{fontFamily: FH, fontWeight: 800, fontSize: 40, color: eqColor, marginTop: 2, textShadow: eqGlow}}>{eqPct > 0.5 ? '+' : ''}{eqPct.toFixed(0)}%</div>
    </div>

    {/* chip đòn bẩy */}
    <div style={{position: 'absolute', top: 300, left: 110, opacity: fIn(f, 80, 16)}}>
      <div style={{display: 'inline-block', padding: '10px 22px', border: `1.5px solid ${GOLD}`, borderRadius: 40, fontFamily: FN, fontWeight: 600, fontSize: 30, color: GOLD, textShadow: glowGold}}>ĐÒN BẨY 3,3×</div>
      <div style={{marginTop: 16, fontFamily: FN, fontWeight: 400, fontSize: 26, color: INK, width: 300}}>Vốn 300tr điều khiển tài sản 1 tỷ.</div>
    </div>

    {/* nhãn trạng thái động */}
    {a > 5 && <div style={{position: 'absolute', top: 560, left: 110, opacity: interpolate(a, [5, 10], [0, 1], clamp), fontFamily: FN, fontWeight: 500, fontSize: 30, color: GOLD, textShadow: glowGold}}>Tài sản +10% → bạn +33% 🡅</div>}
    {a < -5 && a > -20 && <div style={{position: 'absolute', top: 560, left: 110, opacity: interpolate(a, [-10, -5], [1, 0], clamp), fontFamily: FN, fontWeight: 500, fontSize: 30, color: RED, textShadow: glowRed}}>Tài sản −10% → bạn −33% 🡇</div>}
    {wiped && <div style={{position: 'absolute', top: 540, left: 110, width: 340, opacity: fIn(f, 432, 12)}}>
      <div style={{fontFamily: FH, fontWeight: 800, fontSize: 52, color: RED, textShadow: glowRed}}>MẤT TRẮNG</div>
      <div style={{fontFamily: FN, fontWeight: 400, fontSize: 25, color: INK, marginTop: 6}}>Tài sản chỉ rớt <b style={{color: RED, fontWeight: 700}}>30%</b> — vốn về 0, nợ 700tr vẫn còn.</div>
    </div>}

    {/* chốt */}
    <div style={{position: 'absolute', bottom: 60, left: 0, right: 0, textAlign: 'center', opacity: chotO}}>
      <span style={{fontFamily: FN, fontWeight: 400, fontSize: 38, color: INK}}>
        Đòn bẩy không làm bạn giỏi hơn — nó <span style={{color: GOLD, fontWeight: 700, textShadow: glowGold}}>phóng to</span> cả <span style={{color: GOLD}}>đúng</span> lẫn <span style={{color: RED, fontWeight: 700, textShadow: glowRed}}>sai</span>.
      </span>
    </div>
  </AbsoluteFill>;
};

/* MỞ ĐẦU: footage máy móc + chú thích median (spotlight → khoanh tay → 2 nhãn: sức mạnh & rủi ro) */
const FramedIntro: React.FC = () => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 16, INTRO_LEN - CROSS, INTRO_LEN], [0, 1, 1, 0], clamp);
  const FX = 660, FY = 250, FW = 600, FH2 = 470;
  const FCX = FX + FW / 2, FCY = FY + FH2 / 2 + 4;
  const spotR = interpolate(f, [16, 40, 66, 82], [520, 210, 210, 620], {easing: Easing.inOut(Easing.cubic), ...clamp});
  const spotO = interpolate(f, [14, 32, 74, 88], [0, 1, 1, 0], clamp);
  const arrowLen = interpolate(f, [44, 60], [0, 1], {easing: eOut, ...clamp});
  const capO = interpolate(f, [70, 86], [0, 1], clamp);
  return <AbsoluteFill style={{opacity: o}}>
    <FramedShot src="broll/machine.mp4" x={FX} y={FY} w={FW} h={FH2} bright={0.6} grayscale={0.72} />
    <Spotlight fx={FCX} fy={FCY} r={spotR} o={spotO} dark={0.66} />
    <svg width="1920" height="1080" style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
      <HandCircle cx={FCX} cy={FCY} rx={200} ry={158} start={30} dur={24} rot={-5} />
      <line x1={520} y1={370} x2={520 + arrowLen * (FCX - 200 - 520)} y2={370 + arrowLen * (FCY - 158 - 370)} stroke={GOLD} strokeWidth={3.2} strokeLinecap="round" opacity={arrowLen} style={{filter: 'drop-shadow(0 0 5px rgba(233,196,106,.5))'}} />
    </svg>
    <div style={{position: 'absolute', left: 150, top: 300, width: 360, opacity: kfIn(f, 40, 14)}}>
      <div style={{fontFamily: FN, fontWeight: 500, fontSize: 24, color: GRAY, letterSpacing: 6}}>DÙNG TIỀN NGÂN HÀNG</div>
      <div style={{fontFamily: FH, fontWeight: 800, fontSize: 78, color: GOLD, textShadow: glowGold, lineHeight: 0.96, marginTop: 4}}>ĐÒN BẨY</div>
      <div style={{fontFamily: FN, fontWeight: 400, fontSize: 25, color: INK, marginTop: 8}}>Vốn nhỏ, điều khiển tài sản <b style={{fontWeight: 600}}>lớn gấp mấy lần</b>.</div>
    </div>
    {/* 2 nhãn con dao 2 lưỡi */}
    <div style={{position: 'absolute', left: FX + FW + 30, top: FY + 40, width: 300, opacity: interpolate(f, [58, 72], [0, 1], clamp)}}>
      <div style={{fontFamily: FN, fontWeight: 600, fontSize: 30, color: GOLD, textShadow: glowGold}}>↑ Lời to hơn</div>
      <div style={{marginTop: 14, fontFamily: FN, fontWeight: 600, fontSize: 30, color: RED, textShadow: glowRed}}>↓ Lỗ cũng to hơn</div>
    </div>
    <div style={{position: 'absolute', left: FX, top: FY + FH2 + 22, width: FW, textAlign: 'center', opacity: capO, fontFamily: FN, fontWeight: 500, fontSize: 22, color: GRAY, letterSpacing: 5}}>SỨC MẠNH · VÀ RỦI RO</div>
  </AbsoluteFill>;
};

export const DonBaySim: React.FC = () => {
  return <AbsoluteFill style={{backgroundColor: '#08080a'}}>
    <MedianBg grain={0.15} />
    <Sequence durationInFrames={INTRO_LEN} name="intro"><FramedIntro /></Sequence>
    <Sequence from={INTRO_LEN - CROSS} name="chart"><Chart /></Sequence>
  </AbsoluteFill>;
};
