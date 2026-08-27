import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, interpolate, Easing, OffthreadVideo, Img, staticFile} from 'remotion';
import './median-fonts.css';

/* ===================================================================
   MUA NHÀ vs THUÊ NHÀ — median craft (bóc frame-by-frame, đo thật)
   - 1 canvas liên tục, KHÔNG hard cut; cảnh cross-dissolve chồng nhau.
   - Nền vignette radial + grain ~ nhẹ, KHÔNG bao giờ tắt.
   - Chữ #e8e8ea + xám phân tầng (grey-demotion). ĐỎ=nợ/lãi vay, VÀNG=thắng+annotation.
   - Glow chỉ ở hero number. Typewriter caret cho từ khoá chốt.
   - Reveal đồng bộ mốc giọng (mảng anchor local-frame theo từng cảnh).
=================================================================== */

const INK = '#e8e8ea';      // trắng ngà (không chói)
const GRAY = '#7d7f83';     // phụ / gloss / trục
const DIM = '#4a4c50';      // đã qua / mờ sâu
const RED = '#e5484d';      // nợ / lãi vay / mất tiền  (1 phần tử/khung)
const GOLD = '#e9c46a';     // phương án thắng / annotation chốt
const FN = "'BVPm','BVP',sans-serif";        // narration/label (weight nhẹ)
const FH = "'Mont','BVP',sans-serif";        // hero number/wordmark (nặng)

const D = [864, 692, 591, 437, 583, 862, 891, 822, 467];
export const MUATHUE_DURATION = D.reduce((a, b) => a + b, 0); // 6209
const OV = 13; // overlap cross-dissolve (~0.43s)

// ---- mốc giọng (local-frame mỗi cảnh) ----
const A: number[][] = [
  [28, 61, 109, 162, 210, 244, 317, 393, 445, 477, 577, 662, 740, 785, 864],
  [58, 139, 190, 235, 272, 319, 362, 424, 450, 508, 540, 580, 622],
  [0, 47, 90, 144, 184, 204, 233, 275, 310, 373, 419, 466, 489, 527],
  [0, 55, 94, 126, 190, 219, 284, 345, 374],
  [0, 52, 107, 174, 221, 256, 317, 366, 431, 462, 504, 582],
  [45, 90, 138, 187, 235, 279, 342, 384, 414, 444, 559, 597, 663, 719, 752, 788],
  [0, 32, 63, 86, 130, 170, 209, 244, 307, 396, 421, 514, 536, 570, 602, 637, 669, 716, 752, 803, 891],
  [64, 108, 160, 232, 272, 321, 331, 388, 422, 440, 474, 556, 602, 673, 714, 748],
  [0, 58, 118, 163, 217, 254, 310, 387, 406, 466],
];

// ---- helpers ----
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const eOut = Easing.out(Easing.cubic);
const fIn = (lf: number, at: number, dur = 8) => interpolate(lf, [at, at + dur], [0, 1], clamp);
const riseY = (lf: number, at: number, dur = 13, px = 11) => interpolate(lf, [at, at + dur], [px, 0], {easing: eOut, ...clamp});
// cửa sổ cross-fade 1 phần tử: hiện ở inAt, tắt ở outAt
const win = (lf: number, inAt: number, outAt = 1e9, ind = 8, outd = 11) => Math.min(fIn(lf, inAt, ind), 1 - fIn(lf, outAt, outd));
const appear = (lf: number, at: number) => ({opacity: fIn(lf, at), transform: `translateY(${riseY(lf, at)}px)`});

const glowW = '0 0 7px rgba(255,255,255,.5), 0 0 22px rgba(255,255,255,.34), 0 0 46px rgba(233,233,238,.18)';
const glowOf = (r: number, g: number, b: number) => `0 0 8px rgba(${r},${g},${b},.55), 0 0 24px rgba(${r},${g},${b},.4), 0 0 52px rgba(${r},${g},${b},.2)`;
const glowGold = glowOf(233, 196, 106);
const glowRed = glowOf(229, 72, 77);

// ---- typewriter (gõ ~9 ký tự/s) ----
const TW: React.FC<{lf: number; at: number; text: string; size: number; color?: string; weight?: number; ls?: number; font?: string; glow?: string}> =
  ({lf, at, text, size, color = INK, weight = 500, ls = 0, font = FN, glow}) => {
    const fpc = 30 / 9;
    const n = Math.max(0, Math.floor((lf - at) / fpc));
    const shown = text.slice(0, Math.min(text.length, n));
    const done = n >= text.length;
    const caret = lf >= at && (!done || Math.floor(lf / 14) % 2 === 0);
    return <span style={{fontFamily: font, fontWeight: weight, fontSize: size, color, letterSpacing: ls, textShadow: glow}}>
      {shown}<span style={{opacity: caret ? 0.85 : 0, color: GOLD}}>|</span>
    </span>;
  };

// ---- kicker chương (nhãn nhỏ tracked-caps trên đỉnh) ----
const Kicker: React.FC<{lf: number; text: string; outAt?: number}> = ({lf, text, outAt = 1e9}) =>
  <div style={{position: 'absolute', top: 92, left: 0, right: 0, textAlign: 'center', opacity: win(lf, 6, outAt) * 0.9,
    fontFamily: FN, fontWeight: 500, fontSize: 24, color: GRAY, letterSpacing: 8}}>{text}</div>;

// ---- annotation vẽ tay (ellipse + mũi tên + ghi chú vàng) ----
const Annot: React.FC<{lf: number; at: number; cx: number; cy: number; rx: number; ry: number; rot?: number;
  ax1?: number; ay1?: number; ax2?: number; ay2?: number; note?: string; nx?: number; ny?: number; nAnchor?: string; noArrow?: boolean; arcOff?: number}> =
  ({lf, at, cx, cy, rx, ry, rot = -7, ax1 = 0, ay1 = 0, ax2 = 0, ay2 = 0, note = '', nx = 0, ny = 0, nAnchor = 'start', noArrow, arcOff = 40}) => {
    const C = 2 * Math.PI * Math.sqrt((rx * rx + ry * ry) / 2);
    // vẽ hơi quá 1 vòng (1.06) cho cảm giác vẽ tay
    const p = fIn(lf, at, 20);
    const pa = fIn(lf, at + 18, 10);
    const pn = fIn(lf, at + 26, 10);
    return <svg width="1920" height="1080" style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} transform={`rotate(${rot} ${cx} ${cy})`} fill="none" stroke={GOLD}
        strokeWidth={4} strokeLinecap="round" strokeDasharray={`${C} ${C}`} strokeDashoffset={C * (1 - p * 1.04)} opacity={0.95}
        style={{filter: 'drop-shadow(0 0 6px rgba(233,196,106,0.5))'}} />
      {!noArrow && <>
        <path d={`M${ax1} ${ay1} Q ${(ax1 + ax2) / 2 + arcOff} ${(ay1 + ay2) / 2} ${ax2} ${ay2}`} fill="none" stroke={GOLD} strokeWidth={3.5} strokeLinecap="round" opacity={pa} />
        <polygon points={`${ax2},${ay2} ${ax2 - 13},${ay2 - 6} ${ax2 - 6},${ay2 + 12}`} fill={GOLD} opacity={pa} transform={`rotate(${Math.atan2(ay2 - ay1, ax2 - ax1) * 57.3} ${ax2} ${ay2})`} />
      </>}
      {note && <text x={nx} y={ny} fill={GOLD} fontFamily={FN} fontWeight={600} fontSize={30} textAnchor={nAnchor as any} opacity={pn} style={{filter: 'drop-shadow(0 0 8px rgba(233,196,106,0.4))'}}>{note}</text>}
    </svg>;
  };

// ---- list "từ chính + phụ" — có spine vẽ dần + gạch chân vẽ tay, canh trái hoặc phải ----
const ItemList: React.FC<{lf: number; header: string; items: [string, string][]; ats: number[]; numbered?: boolean; left?: number; hAt?: number; right?: boolean; width?: number; accent?: string}> =
  ({lf, header, items, ats, numbered, left = 150, hAt = 0, right, width = 900, accent = GOLD}) => {
    const align = right ? 'right' : 'left';
    const lastAt = ats[items.length - 1] ?? hAt + 60;
    const spineH = interpolate(lf, [hAt + 6, lastAt + 30], [0, items.length * 168], {easing: eOut, ...clamp});
    return <div style={{position: 'absolute', [right ? 'right' : 'left']: left, top: 268, width, textAlign: align as any}}>
      <div style={{fontFamily: FN, fontWeight: 500, fontSize: 27, color: GRAY, letterSpacing: 7, opacity: fIn(lf, hAt), marginBottom: 44}}>{header}</div>
      {/* spine dọc vẽ dần */}
      <div style={{position: 'absolute', [right ? 'right' : 'left']: -26, top: 66, width: 2, height: spineH, background: `linear-gradient(${accent}, rgba(233,196,106,0))`, opacity: 0.5}} />
      {items.map((it, i) => {
        const at = ats[i] ?? (hAt + 20 + i * 22);
        const nextAt = ats[i + 1] ?? at + 40;
        const demote = interpolate(lf, [nextAt, nextAt + 14], [1, 0.82], {...clamp});
        const und = interpolate(lf, [at + 6, at + 26], [0, 1], {easing: eOut, ...clamp}); // gạch chân vẽ tay
        const hot = interpolate(lf, [at, at + 10, nextAt, nextAt + 12], [0.4, 1, 1, 0], {...clamp}); // chấm nhấn đang active
        return <div key={i} style={{...appear(lf, at), opacity: fIn(lf, at) * (i < items.length - 1 ? demote : 1),
          marginBottom: 38, display: 'flex', flexDirection: right ? 'row-reverse' : 'row', alignItems: 'baseline', gap: 26, justifyContent: right ? 'flex-start' : 'flex-start'}}>
          {numbered
            ? <span style={{fontFamily: FH, fontWeight: 800, fontSize: 44, color: accent, minWidth: 44, textShadow: glowGold}}>{i + 1}</span>
            : <span style={{width: 12, height: 12, borderRadius: 6, background: accent, alignSelf: 'center', opacity: hot, boxShadow: glowGold, flex: '0 0 auto'}} />}
          <div style={{textAlign: align as any}}>
            <div style={{position: 'relative', display: 'inline-block'}}>
              <div style={{fontFamily: FN, fontWeight: 600, fontSize: 60, color: INK, lineHeight: 1.08}}>{it[0]}</div>
              <div style={{position: 'absolute', left: 0, bottom: -6, height: 2, width: `${und * 100}%`, background: accent, opacity: 0.55, transformOrigin: right ? 'right' : 'left'}} />
            </div>
            <div style={{fontFamily: FN, fontWeight: 300, fontSize: 32, color: GRAY, marginTop: 8}}>{it[1]}</div>
          </div>
        </div>;
      })}
    </div>;
  };

// ---- ảnh/video THẬT đóng khung median: desat + viền trắng mảnh + quầng sáng sau + caption ----
const FramedMedia: React.FC<{lf: number; at: number; src: string; video?: boolean; x: number; y: number; w: number; h: number; caption?: string; sat?: number; bright?: number; outAt?: number}> =
  ({lf, at, src, video, x, y, w, h, caption, sat = 0.5, bright = 0.72, outAt = 1e9}) => {
    const o = win(lf, at, outAt, 16, 14);
    const s = interpolate(lf, [at, at + 22], [0.955, 1], {easing: eOut, ...clamp});
    if (o <= 0.001) return null;
    const filt = `grayscale(${1 - sat}) contrast(1.06) brightness(${bright}) saturate(1.12)`;
    // Ken Burns: media tự zoom + trôi chậm trong khung (khung đứng yên) → luôn có chuyển động, che seam loop
    const t = Math.max(0, lf - at);
    const kb = 1.08 + t * 0.00013;
    const panx = Math.sin(t / 220) * 1.4, pany = Math.cos(t / 260) * 1.0;
    return <div style={{position: 'absolute', left: x, top: y, width: w, height: h, opacity: o, transform: `scale(${s})`, transformOrigin: 'center'}}>
      <div style={{position: 'absolute', inset: -70, background: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,0.07), rgba(233,196,106,0.02) 40%, transparent 72%)'}} />
      <div style={{position: 'absolute', inset: 0, border: '2px solid rgba(232,232,234,0.82)', boxShadow: '0 0 46px rgba(0,0,0,0.65)', overflow: 'hidden', borderRadius: 2}}>
        {video
          ? <OffthreadVideo src={staticFile(src)} muted loop playbackRate={0.55} style={{width: '100%', height: '100%', objectFit: 'cover', filter: filt, transform: `scale(${kb}) translate(${panx}%, ${pany}%)`}} />
          : <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', filter: filt, transform: `scale(${kb}) translate(${panx}%, ${pany}%)`}} />}
        <div style={{position: 'absolute', inset: 0, boxShadow: 'inset 0 0 100px rgba(8,8,10,0.85)'}} />
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 55%, rgba(8,8,10,0.55) 100%)'}} />
      </div>
      {caption && <div style={{position: 'absolute', left: 0, right: 0, top: h + 20, textAlign: 'center', fontFamily: FN, fontWeight: 500, fontSize: 22, color: GRAY, letterSpacing: 5, opacity: fIn(lf, at + 12)}}>{caption}</div>}
    </div>;
  };

/* ===================== S6 toán biểu đồ 2 đường ===================== */
const H0 = 6, APP = 0.03, DOWN = 1.8, LOAN = 4.2, MR = 0.10 / 12, N = 240;
const PAY = LOAN * MR / (1 - Math.pow(1 + MR, -N));
const bal = (t: number) => {const k = 12 * t; return LOAN * Math.pow(1 + MR, k) - PAY * (Math.pow(1 + MR, k) - 1) / MR;};
const buy = (t: number) => Math.max(0, H0 * Math.pow(1 + APP, t) - bal(t));
const IR = 0.07, INV_Y = 0.27;
const rent = (t: number) => DOWN * Math.pow(1 + IR, t) + INV_Y * ((Math.pow(1 + IR, t) - 1) / IR);
const X0 = 320, X1 = 1440, YB = 812, YT = 250, MAXV = 19;
const sx = (t: number) => X0 + (t / 20) * (X1 - X0);
const sy = (v: number) => YB - (v / MAXV) * (YB - YT);
const PTS = Array.from({length: 201}, (_, i) => i * 0.1);
const poly = (fn: (t: number) => number, c: number) => PTS.slice(0, c).map((t) => `${sx(t).toFixed(1)},${sy(fn(t)).toFixed(1)}`).join(' ');

const Chart: React.FC<{lf: number}> = ({lf}) => {
  const p = interpolate(lf, [70, 690], [0, 1], {easing: Easing.inOut(Easing.cubic), ...clamp});
  const c = Math.max(2, Math.round(p * 200) + 1); const tL = (c - 1) * 0.1;
  const yr = Math.round(tL); const axisO = fIn(lf, 40, 16); const endO = fIn(lf, 700, 14);
  return <>
    <Kicker lf={lf} text="VÍ DỤ · NHÀ 6 TỶ · 20 NĂM" outAt={820} />
    <div style={{position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center', fontFamily: FN, fontWeight: 500, fontSize: 40, color: INK, letterSpacing: 1, opacity: win(lf, 6, 60)}}>Đặt lên bàn tính.</div>
    <div style={{position: 'absolute', top: 168, right: 96, fontFamily: FH, fontWeight: 800, fontSize: 46, color: INK, opacity: axisO, textShadow: glowW}}>Năm {yr}</div>
    <svg width="1920" height="1080" style={{position: 'absolute', inset: 0}}>
      <g opacity={axisO}>
        <line x1={X0} y1={YB} x2={X1} y2={YB} stroke={DIM} strokeWidth={2} /><line x1={X0} y1={YB} x2={X0} y2={YT} stroke={DIM} strokeWidth={2} />
        {[0, 5, 10, 15, 20].map((t) => <g key={t}>
          <line x1={sx(t)} y1={YB} x2={sx(t)} y2={YB + 10} stroke={DIM} strokeWidth={2} />
          <text x={sx(t)} y={YB + 44} fill={yr >= t ? GRAY : DIM} fontFamily={FN} fontSize={26} textAnchor="middle">{t === 20 ? '20 năm' : t}</text>
        </g>)}
      </g>
      <g opacity={axisO}>
        <polyline points={poly(buy, c)} fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" opacity={0.85} />
        <circle cx={sx(tL)} cy={sy(buy(tL))} r={8} fill={INK} style={{filter: 'drop-shadow(0 0 6px rgba(255,255,255,.6))'}} />
        <polyline points={poly(rent, c)} fill="none" stroke={GOLD} strokeWidth={5} strokeLinecap="round" />
        <circle cx={sx(tL)} cy={sy(rent(tL))} r={10} fill={GOLD} style={{filter: 'drop-shadow(0 0 10px rgba(233,196,106,.85))'}} />
      </g>
    </svg>
    <div style={{position: 'absolute', left: sx(20) + 26, top: sy(rent(20)) - 64, opacity: endO}}>
      <div style={{fontFamily: FN, fontWeight: 500, fontSize: 30, color: GOLD, whiteSpace: 'nowrap', letterSpacing: 1}}>THUÊ + ĐẦU TƯ</div>
      <div style={{fontFamily: FH, fontWeight: 800, fontSize: 56, color: GOLD, textShadow: glowGold}}>≈ 18 tỷ</div>
    </div>
    <div style={{position: 'absolute', left: sx(20) + 26, top: sy(buy(20)) - 20, opacity: endO}}>
      <div style={{fontFamily: FN, fontWeight: 500, fontSize: 30, color: GRAY, whiteSpace: 'nowrap', letterSpacing: 1}}>MUA NHÀ</div>
      <div style={{fontFamily: FH, fontWeight: 800, fontSize: 56, color: INK, textShadow: glowW}}>≈ 10,8 tỷ</div>
    </div>
    <div style={{position: 'absolute', bottom: 92, left: 0, right: 0, textAlign: 'center', opacity: fIn(lf, 760)}}>
      <div style={{fontFamily: FN, fontWeight: 500, fontSize: 36, color: INK, letterSpacing: 1}}>Thuần con số: <span style={{color: GOLD}}>thuê + đầu tư</span> thường thắng.</div>
      <div style={{marginTop: 12, fontFamily: FN, fontWeight: 300, fontSize: 23, color: GRAY}}>ví dụ minh hoạ · vay 10% · đầu tư 7% · 2026</div>
    </div>
  </>;
};

/* ===================== các cảnh ===================== */
const S1: React.FC<{lf: number}> = ({lf}) => {
  const ul = interpolate(lf, [24, 66], [0, 380], {easing: eOut, ...clamp});
  const a = A[0];
  const vs = [['Vì sao một căn nhà lại sinh lời thấp bất ngờ?'], ['Vì sao thuê đôi khi là nước đi khôn hơn?'], ['Và vì sao đáp án không giống nhau với mỗi người?']];
  return <>
    {/* footage thật: chung cư nhìn từ trên cao (an cư) */}
    <FramedMedia lf={lf} at={a[2] + 10} outAt={a[6] - 6} src="realfx/aerial.mp4" video x={510} y={452} w={900} h={370} caption="AN CƯ — ĐÍCH ĐẾN CỦA CẢ ĐỜI?" />
    <div style={{position: 'absolute', top: 208, left: 0, right: 0, textAlign: 'center', opacity: win(lf, 8, 540)}}>
      <div style={{fontFamily: FH, fontWeight: 800, fontSize: 96, color: INK, letterSpacing: 2, textShadow: glowW}}>MUA NHÀ <span style={{color: GRAY, fontFamily: FN, fontWeight: 400}}>vs</span> THUÊ NHÀ</div>
      <div style={{margin: '26px auto 0', height: 3, width: ul, background: GOLD, boxShadow: glowGold}} />
    </div>
    {/* dòng chuyển ý (cross-fade đơn) */}
    <div style={{position: 'absolute', top: 560, left: 0, right: 0, textAlign: 'center', opacity: win(lf, a[6], a[10] - 14), fontFamily: FN, fontWeight: 400, fontSize: 44, color: INK, padding: '0 200px', lineHeight: 1.4}}>
      Đem đúng số tiền đó đi thuê và đầu tư — sau 20 năm bạn <span style={{color: GOLD}}>giàu hơn</span>, hay <span style={{color: RED}}>nghèo hơn?</span>
    </div>
    {/* 3 câu Vì sao (stack) */}
    <div style={{position: 'absolute', top: 548, left: 0, right: 0, textAlign: 'center'}}>
      {vs.map((q, i) => <div key={i} style={{...appear(lf, a[10 + i]), fontFamily: FN, fontWeight: 400, fontSize: 40, color: i === 2 ? GOLD : INK, marginBottom: 26}}>{q[0]}</div>)}
    </div>
  </>;
};

const S2: React.FC<{lf: number}> = ({lf}) => <>
  <Kicker lf={lf} text="PHE MUA NHÀ" />
  <FramedMedia lf={lf} at={A[1][1]} src="realfx/keys.mp4" video x={1096} y={356} w={720} h={452} caption="CẦM CHÌA KHOÁ NHÀ MÌNH" sat={0.55} bright={0.9} outAt={A[1][12] + 30} />
  <ItemList lf={lf} header="NHỮNG CÁI LỢI BẢNG TÍNH KHÔNG GHI" hAt={A[1][0]} ats={[A[1][1], A[1][4], A[1][8]]} width={860}
    items={[['An cư', 'một nơi thực sự là của bạn'], ['Không ai đuổi', 'không lo tăng giá thuê'], ['Cỗ máy ép tiết kiệm', 'tháng nào cũng phải bỏ tiền vào']]} />
</>;

const S3: React.FC<{lf: number}> = ({lf}) => <>
  <Kicker lf={lf} text="PHE THUÊ NHÀ" />
  {/* MIRROR: footage TRÁI, list PHẢI — phá đơn điệu, tạo cảm giác 2 phe đối nhau */}
  <FramedMedia lf={lf} at={A[2][1]} src="realfx/viewing.mp4" video x={104} y={356} w={720} h={452} caption="ĐỔI CHỖ Ở — NHẸ NHÀNG" outAt={A[2][13] + 30} />
  <ItemList lf={lf} header="THUÊ CŨNG CÓ LÝ" hAt={A[2][0]} ats={[A[2][1], A[2][5], A[2][9]]} right left={150} width={860}
    items={[['Nhẹ gánh', 'không ôm khoản nợ 20 năm'], ['Linh hoạt', 'đổi việc, đổi thành phố — dọn đồ là đi'], ['Đầu tư phần chênh', 'tiền được đầu tư đều cũng biết tự lớn']]} />
</>;

// stat-card row (3 số 2026) — chuẩn median
const S4: React.FC<{lf: number}> = ({lf}) => {
  const a = A[3];
  const cards: {lab: string; sub: string; val: string; unit: string; icon: React.ReactNode; c: string; at: number}[] = [
    {lab: 'Lãi vay mua nhà', sub: 'và đang tăng', val: '8–11', unit: '%', c: RED, at: a[1], icon:
      <path d="M20 60 L45 30 L70 55 L100 20" fill="none" stroke={RED} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />},
    {lab: 'Lợi suất cho thuê', sub: 'căn hộ thành phố lớn', val: '3–4', unit: '%', c: INK, at: a[4], icon:
      <g fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round"><path d="M25 80 L25 40 L60 15 L95 40 L95 80" /><rect x={48} y={52} width={24} height={28} /></g>},
    {lab: 'Gửi tiết kiệm', sub: 'ngân hàng lớn', val: '7', unit: '%', c: INK, at: a[6], icon:
      <g fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round"><rect x={22} y={34} width={76} height={50} rx={6} /><circle cx={60} cy={59} r={13} /></g>},
  ];
  const cx = [430, 960, 1490];
  return <>
    <Kicker lf={lf} text="CON SỐ THẬT NĂM 2026" />
    <svg width="1920" height="1080" style={{position: 'absolute', inset: 0}}>
      {[690, 1225].map((x, i) => <line key={i} x1={x} y1={352} x2={x} y2={734} stroke={DIM} strokeWidth={2} opacity={fIn(lf, a[0], 20)} />)}
    </svg>
    {cards.map((cd, i) => <div key={i} style={{position: 'absolute', top: 360, left: cx[i] - 240, width: 480, textAlign: 'center', ...appear(lf, cd.at)}}>
      <div style={{fontFamily: FN, fontWeight: 500, fontSize: 38, color: INK}}>{cd.lab}</div>
      <div style={{fontFamily: FN, fontWeight: 300, fontSize: 27, color: GRAY, marginTop: 4}}>{cd.sub}</div>
      <svg width={120} height={100} viewBox="0 0 120 100" style={{margin: '26px auto 10px'}}>{cd.icon}</svg>
      <div style={{fontFamily: FH, fontWeight: 800, fontSize: 104, color: cd.c, textShadow: cd.c === RED ? glowRed : glowW, lineHeight: 1}}>
        {cd.val}<span style={{fontSize: 56, color: GRAY, textShadow: 'none'}}>{cd.unit}</span>
      </div>
    </div>)}
    {/* annotation vàng: khoanh đúng số "3–4%" (card giữa), ghi chú ngay dưới */}
    <Annot lf={lf} at={a[7]} cx={cx[1]} cy={628} rx={158} ry={70} rot={-4}
      ax1={cx[1]} ay1={702} ax2={cx[1]} ay2={742} arcOff={0}
      note="thấp hơn cả GỬI TIẾT KIỆM" nx={cx[1]} ny={772} nAnchor="middle" />
    <div style={{position: 'absolute', bottom: 60, left: 0, right: 0, textAlign: 'center', fontFamily: FN, fontWeight: 300, fontSize: 23, color: GRAY, opacity: fIn(lf, a[8])}}>Nguồn: NHNN · Techcombank · Dân trí · Tuổi Trẻ — 2026</div>
  </>;
};

// twist: 3 thanh mức lãi + nghịch lý
const S5: React.FC<{lf: number}> = ({lf}) => {
  const a = A[4];
  const bars: {lab: string; v: number; c: string; tag: string; at: number}[] = [
    {lab: 'VAY MUA NHÀ', v: 10, c: RED, tag: '~10%', at: a[2]},
    {lab: 'GỬI TIẾT KIỆM', v: 7, c: INK, tag: '7%', at: a[3]},
    {lab: 'CHO THUÊ (lợi suất)', v: 3.5, c: GRAY, tag: '3–4%', at: a[4]},
  ];
  return <>
    <Kicker lf={lf} text="NGHỊCH LÝ" />
    <div style={{position: 'absolute', top: 176, left: 150, right: 150, fontFamily: FN, fontWeight: 400, fontSize: 46, color: INK, letterSpacing: 0, opacity: win(lf, a[0], a[9] - 20)}}>
      Vay <span style={{color: RED}}>đắt</span> — để ôm một tài sản sinh lời <span style={{color: GOLD}}>rẻ</span>.
    </div>
    <div style={{position: 'absolute', top: 350, left: 150, right: 150}}>
      {bars.map((b, i) => {
        const w = interpolate(lf, [b.at, b.at + 26], [0, b.v / 10 * 1280], {easing: eOut, ...clamp});
        return <div key={i} style={{marginBottom: 56, opacity: fIn(lf, b.at - 4)}}>
          <div style={{fontFamily: FN, fontWeight: 500, fontSize: 30, color: GRAY, marginBottom: 12, letterSpacing: 3}}>{b.lab}</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 28}}>
            <div style={{height: 40, width: w, background: b.c, borderRadius: 5, boxShadow: b.c === RED ? '0 0 22px rgba(229,72,77,.5)' : 'none'}} />
            <div style={{fontFamily: FH, fontWeight: 800, fontSize: 50, color: b.c, textShadow: b.c === RED ? glowRed : b.c === INK ? glowW : 'none'}}>{b.tag}</div>
          </div>
        </div>;
      })}
    </div>
    {/* annotation vàng khoanh đúng thanh + số CHO THUÊ (thanh thứ 3) */}
    <Annot lf={lf} at={a[9]} cx={430} cy={688} rx={338} ry={48} rot={-2} noArrow />
    <div style={{position: 'absolute', bottom: 96, left: 0, right: 0, textAlign: 'center', fontFamily: FN, fontWeight: 500, fontSize: 38, color: GOLD, opacity: fIn(lf, a[9] + 6), textShadow: glowGold}}>
      Vay 10% để ôm tài sản chỉ sinh 3–4%.
    </div>
  </>;
};

// phản đề: nhưng con số không phải tất cả
const S7: React.FC<{lf: number}> = ({lf}) => {
  const a = A[6];
  return <>
    <div style={{position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center', opacity: win(lf, 4, a[7] - 20), fontFamily: FN, fontWeight: 400, fontSize: 50, color: INK}}>
      Khoan. <span style={{color: GRAY}}>Con số không phải tất cả.</span>
    </div>
    <FramedMedia lf={lf} at={a[8]} src="realfx/cozy.jpg" x={1140} y={318} w={648} h={420} caption="MỘT TỔ ẤM — SỰ AN TÂM" sat={0.62} bright={0.78} />
    <ItemList lf={lf} header="CÁI NGƯỜI MUA NHÀ CÓ" hAt={a[7]} ats={[a[8], a[9], a[11]]} width={860}
      items={[['Sự an tâm', 'không phải chuyển nhà mỗi vài năm'], ['Toàn quyền', 'đóng cái đinh mà không phải xin ai'], ['Vẫn còn căn nhà', 'nếu lỡ tiêu mất phần chênh, bạn trắng tay']]} />
    <div style={{position: 'absolute', bottom: 104, left: 150, right: 150, textAlign: 'center', fontFamily: FN, fontWeight: 500, fontSize: 38, color: GOLD, opacity: fIn(lf, a[17]), textShadow: glowGold, lineHeight: 1.35}}>
      Thuê chỉ thắng NẾU bạn thật sự đầu tư phần chênh — đều đặn, suốt 20 năm.
    </div>
  </>;
};

// 3 câu hỏi đánh số
const S8: React.FC<{lf: number}> = ({lf}) => {
  const a = A[7];
  return <>
    <Kicker lf={lf} text="HỎI ĐÚNG 3 CÂU" />
    <div style={{position: 'absolute', top: 168, left: 150, right: 150, fontFamily: FN, fontWeight: 400, fontSize: 44, color: INK, opacity: win(lf, 4, a[3] - 16)}}>
      Câu hỏi đúng không phải <span style={{color: GRAY}}>mua hay thuê</span> — mà là ba câu này.
    </div>
    <ItemList lf={lf} header="" hAt={a[3]} numbered ats={[a[3], a[7], a[11]]} width={1560}
      items={[['Giá nhà bằng bao nhiêu NĂM tiền thuê?', 'trên 25 năm → cán cân nghiêng về THUÊ'], ['Bạn có chắc ở đó ít nhất 5–7 năm?', 'không → thuê nhẹ gánh, đỡ chi phí mua bán'], ['Có đủ kỷ luật đầu tư phần chênh?', 'nếu không → MUA nhà sẽ ép bạn giàu']]} />
  </>;
};

// kết + outro wordmark
const S9: React.FC<{lf: number}> = ({lf}) => {
  const a = A[8];
  return <>
    <div style={{position: 'absolute', top: 300, left: 200, right: 200, textAlign: 'center', opacity: win(lf, a[0] + 4, 400)}}>
      <div style={{fontFamily: FN, fontWeight: 400, fontSize: 46, color: INK, lineHeight: 1.5}}>
        Không có một đáp án đúng cho tất cả.<br />
        <span style={{opacity: fIn(lf, a[3])}}>Chỉ có đáp án đúng cho <span style={{color: GOLD}}>hoàn cảnh</span> — và <span style={{color: GOLD}}>tính cách</span> của bạn.</span>
      </div>
      <div style={{marginTop: 56, fontFamily: FN, fontWeight: 300, fontSize: 34, color: GRAY, opacity: fIn(lf, a[6])}}>
        Ở năm 2026, an cư không nhất thiết phải là đứng tên một căn nhà.
      </div>
      <div style={{marginTop: 44, opacity: fIn(lf, a[7])}}><TW lf={lf} at={a[7]} text="Bạn thuộc đội nào?" size={62} color={INK} weight={700} glow={glowW} /></div>
    </div>
    {/* outro wordmark */}
    <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18,
      opacity: fIn(lf, 408, 20)}}>
      <div style={{fontFamily: FH, fontWeight: 800, fontSize: 62, color: INK, letterSpacing: 2, textShadow: glowW}}>Chuyện Tiền</div>
      <div style={{width: 60, height: 2, background: GOLD, boxShadow: glowGold}} />
      <div style={{fontFamily: FN, fontWeight: 300, fontSize: 26, color: GRAY, letterSpacing: 6}}>ANH HAI KỂ</div>
    </div>
  </>;
};

/* ===================== canvas liên tục ===================== */
const SCENES: React.FC<{lf: number}>[] = [S1, S2, S3, S4, S5, Chart, S7, S8, S9];

const Bg: React.FC = () => {
  const f = useCurrentFrame();
  const dx = Math.sin(f / 150) * 1.4, dy = Math.cos(f / 190) * 1.1;
  const NOISE = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
  return <>
    <AbsoluteFill style={{background: `radial-gradient(120% 92% at ${50 + dx}% ${42 + dy}%, #0d0d0e 0%, #0b0b0c 46%, #080809 100%)`}} />
    <AbsoluteFill style={{backgroundImage: NOISE, backgroundSize: '300px 300px', opacity: 0.05, mixBlendMode: 'overlay'}} />
    <AbsoluteFill style={{background: `radial-gradient(46% 38% at ${50 - dx}% ${40 + dy}%, rgba(255,255,255,0.03), transparent 72%)`}} />
  </>;
};

const SceneWrap: React.FC<{from: number; dur: number; first: boolean; last: boolean; Sc: React.FC<{lf: number}>}> = ({from, dur, first, last, Sc}) => {
  const lead = first ? 0 : OV;
  return <Sequence from={from - lead} durationInFrames={dur + lead}>
    <Env lead={lead} dur={dur} last={last} Sc={Sc} />
  </Sequence>;
};
const Env: React.FC<{lead: number; dur: number; last: boolean; Sc: React.FC<{lf: number}>}> = ({lead, dur, last, Sc}) => {
  const frame = useCurrentFrame(); // 0 tại (from-lead)
  const lf = frame - lead;
  const inO = lead > 0 ? fIn(frame, 0, lead) : 1;
  const outO = 1 - fIn(frame, lead + dur - OV, OV); // tail cross-fade (kể cả cảnh cuối → về đen)
  return <AbsoluteFill style={{opacity: inO * outO}}><Sc lf={lf} /></AbsoluteFill>;
};

export const MuaThue: React.FC = () => {
  let acc = 0;
  return <AbsoluteFill style={{backgroundColor: '#08080a'}}>
    <Bg />
    {SCENES.map((Sc, i) => {const from = acc; acc += D[i];
      return <SceneWrap key={i} from={from} dur={D[i]} first={i === 0} last={i === SCENES.length - 1} Sc={Sc} />;})}
  </AbsoluteFill>;
};
