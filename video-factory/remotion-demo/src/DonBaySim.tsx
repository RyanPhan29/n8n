import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, interpolate, Easing, OffthreadVideo, staticFile} from 'remotion';
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

const Bg: React.FC = () => {
  const f = useCurrentFrame();
  const dx = Math.sin(f / 150) * 1.3, dy = Math.cos(f / 190) * 1.0;
  const NOISE = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
  return <>
    <AbsoluteFill style={{background: `radial-gradient(120% 92% at ${50 + dx}% ${44 + dy}%, #0d0d0e 0%, #0b0b0c 46%, #080809 100%)`}} />
    <AbsoluteFill style={{backgroundImage: NOISE, backgroundSize: '300px 300px', opacity: 0.05, mixBlendMode: 'overlay'}} />
  </>;
};

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

/* MỞ ĐẦU: footage máy móc trong khung archival + chú thích vẽ tay */
const FramedIntro: React.FC = () => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 16, INTRO_LEN - CROSS, INTRO_LEN], [0, 1, 1, 0], clamp);
  const s = interpolate(f, [0, 24], [0.955, 1], {easing: eOut, ...clamp});
  const FX = 660, FY = 250, FW = 600, FH2 = 470;
  const kb = 1.1 + f * 0.0006;
  const filt = 'grayscale(0.72) contrast(1.08) brightness(0.6) saturate(1.05)';
  const cx = FX + FW / 2, cy = FY + FH2 / 2 + 8, rx = 232, ry = 176, PER = 1290;
  const drawn = interpolate(f, [30, 58], [PER, 0], {easing: eOut, ...clamp});
  const circO = interpolate(f, [30, 40], [0, 1], clamp);
  const labO = interpolate(f, [50, 66], [0, 1], clamp);
  const arrowLen = interpolate(f, [46, 60], [0, 1], {easing: eOut, ...clamp});
  const capO = interpolate(f, [64, 80], [0, 1], clamp);
  return <AbsoluteFill style={{opacity: o}}>
    <div style={{position: 'absolute', left: FX, top: FY, width: FW, height: FH2, transform: `scale(${s})`, transformOrigin: 'center'}}>
      <div style={{position: 'absolute', inset: -70, background: 'radial-gradient(circle at 50% 45%, rgba(233,196,106,0.10), rgba(233,196,106,0.02) 42%, transparent 72%)'}} />
      <div style={{position: 'absolute', inset: 0, border: '2px solid rgba(232,232,234,0.82)', boxShadow: '0 0 46px rgba(0,0,0,0.7)', overflow: 'hidden', borderRadius: 2}}>
        <OffthreadVideo src={staticFile('broll/machine.mp4')} muted playbackRate={0.5} style={{width: '100%', height: '100%', objectFit: 'cover', filter: filt, transform: `scale(${kb})`}} />
        <div style={{position: 'absolute', inset: 0, boxShadow: 'inset 0 0 100px rgba(8,8,10,0.85)'}} />
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 52%, rgba(8,8,10,0.6) 100%)'}} />
      </div>
      {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([gx, gy], i) => <div key={i} style={{position: 'absolute', [gx ? 'right' : 'left']: -1, [gy ? 'bottom' : 'top']: -1, width: 22, height: 22, borderTop: gy ? 'none' : '2px solid rgba(233,196,106,.9)', borderBottom: gy ? '2px solid rgba(233,196,106,.9)' : 'none', borderLeft: gx ? 'none' : '2px solid rgba(233,196,106,.9)', borderRight: gx ? '2px solid rgba(233,196,106,.9)' : 'none'}} />)}
    </div>
    <svg width="1920" height="1080" style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={GOLD} strokeWidth={4} strokeLinecap="round"
        opacity={circO} strokeDasharray={PER} strokeDashoffset={drawn} transform={`rotate(-6 ${cx} ${cy})`}
        style={{filter: 'drop-shadow(0 0 8px rgba(233,196,106,.7))'}} />
      <line x1={520} y1={330} x2={520 + arrowLen * (cx - rx - 520)} y2={330 + arrowLen * (cy - ry - 330)} stroke={GOLD} strokeWidth={3.5} strokeLinecap="round" opacity={arrowLen} />
      {arrowLen > 0.9 && <polygon points={`${cx - rx - 6},${cy - ry - 6} ${cx - rx - 30},${cy - ry - 2} ${cx - rx - 8},${cy - ry - 30}`} fill={GOLD} opacity={labO} />}
    </svg>
    <div style={{position: 'absolute', left: 150, top: 250, width: 380, opacity: labO}}>
      <div style={{fontFamily: FN, fontWeight: 500, fontSize: 26, color: GRAY, letterSpacing: 6}}>DÙNG TIỀN NGÂN HÀNG</div>
      <div style={{fontFamily: FH, fontWeight: 800, fontSize: 74, color: GOLD, textShadow: glowGold, lineHeight: 0.98, marginTop: 4}}>ĐÒN BẨY</div>
      <div style={{fontFamily: FN, fontWeight: 400, fontSize: 26, color: INK, marginTop: 10}}>Vốn nhỏ, điều khiển tài sản <b style={{color: INK, fontWeight: 600}}>lớn gấp mấy lần</b>.</div>
    </div>
    <div style={{position: 'absolute', left: FX, top: FY + FH2 + 22, width: FW, textAlign: 'center', opacity: capO, fontFamily: FN, fontWeight: 500, fontSize: 22, color: GRAY, letterSpacing: 5}}>SỨC MẠNH · VÀ RỦI RO</div>
  </AbsoluteFill>;
};

export const DonBaySim: React.FC = () => {
  return <AbsoluteFill style={{backgroundColor: '#08080a'}}>
    <Bg />
    <Sequence durationInFrames={INTRO_LEN} name="intro"><FramedIntro /></Sequence>
    <Sequence from={INTRO_LEN - CROSS} name="chart"><Chart /></Sequence>
  </AbsoluteFill>;
};
