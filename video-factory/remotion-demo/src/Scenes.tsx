import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';
import {Paper, TopBar, Logo, NAVY, RED, TEAL, BLUE, GOLD, GRAY, AMBER, INK} from './Kit';

// ===== CẢNH VẼ TẢ THỰC (câu chuyện thật) — nền giấy cũ, tông brand, đáy chừa cho phụ đề =====
const Mont = 'Mont, sans-serif';
const BVP = 'BVP, sans-serif';

const Cap: React.FC<{children: React.ReactNode}> = ({children}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [4, 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <div style={{position: 'absolute', top: 120, left: 60, right: 60, textAlign: 'center', fontFamily: Mont, fontWeight: 900, fontSize: 58, color: INK, textWrap: 'balance', opacity: o}}>{children}</div>;
};

// ---------- STREET ----------
const Shop: React.FC<{x: number; w: number; h: number; body: string; sign: string; name: string; delay?: number}> =
({x, w, h, body, sign, name, delay = 0}) => {
  const f = useCurrentFrame();
  const rise = interpolate(f, [delay, delay + 10], [40, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const op = interpolate(f, [delay, delay + 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const shut = interpolate(f, [delay + 8, delay + 26], [0.06, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const winRows = Math.max(2, Math.round((h - 300) / 120));
  const cols = Math.max(2, Math.round(w / 95));
  return (
    <div style={{position: 'absolute', bottom: 200, left: x, width: w, height: h, opacity: op, transform: `translateY(${rise}px)`}}>
      <div style={{position: 'absolute', bottom: -26, left: '4%', width: '92%', height: 40, background: 'radial-gradient(closest-side, rgba(22,34,58,.20), transparent)'}} />
      <div style={{position: 'absolute', bottom: 0, width: w, height: h, background: body, borderRadius: '10px 10px 0 0', border: '3px solid rgba(22,34,58,.14)', boxShadow: 'inset -24px 0 46px rgba(22,34,58,.10)'}} />
      <div style={{position: 'absolute', bottom: h - 16, left: -6, width: w + 12, height: 18, background: 'rgba(22,34,58,.28)', borderRadius: 6}} />
      {Array.from({length: winRows}).map((_, r) => (
        <div key={r} style={{position: 'absolute', bottom: 210 + r * 118, left: 24, right: 24, display: 'flex', justifyContent: 'space-around'}}>
          {Array.from({length: cols}).map((__, c) => (
            <div key={c} style={{width: 44, height: 62, background: 'rgba(255,255,255,.55)', border: '3px solid rgba(22,34,58,.22)', borderRadius: 4}} />
          ))}
        </div>
      ))}
      <div style={{position: 'absolute', bottom: 148, left: 6, right: 6, height: 62, background: sign, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: '0 4px 0 rgba(22,34,58,.22)'}}>
        <span style={{fontSize: 26}}>💎</span>
        <span style={{fontFamily: Mont, fontWeight: 900, fontSize: 34, color: GOLD, letterSpacing: 1, whiteSpace: 'nowrap'}}>{name}</span>
      </div>
      <div style={{position: 'absolute', bottom: 0, left: 6, right: 6, height: 148 * shut, background: 'repeating-linear-gradient(#d3d7dd,#d3d7dd 7px,#b7bcc4 7px,#b7bcc4 14px)', borderRadius: '4px 4px 0 0', borderTop: '3px solid #9aa0a8'}} />
      {shut > 0.9 && <div style={{position: 'absolute', bottom: 52, left: 6, right: 6, textAlign: 'center', fontFamily: BVP, fontWeight: 800, fontSize: 22, color: RED, letterSpacing: 1}}>● ĐÓNG CỬA</div>}
    </div>
  );
};
export const StreetScene: React.FC = () => (
  <AbsoluteFill><Paper /><TopBar color={RED} /><Logo />
    <Cap>Phố vàng bạc Sài Gòn — <span style={{color: RED}}>cửa đóng then cài</span></Cap>
    <Shop x={175} w={340} h={560} body="#e7e0d2" sign={RED} name="KIM LÝ" delay={6} />
    <Shop x={545} w={310} h={490} body="#dfe4ea" sign={NAVY} name="NGỌC TÂM" delay={12} />
    <Shop x={885} w={370} h={600} body="#e6dad7" sign="#8a1f2b" name="NGỌC CHÂU ÂU" delay={18} />
    <Shop x={1290} w={300} h={450} body="#dde5e0" sign={TEAL} name="BẢO TRÂM" delay={24} />
  </AbsoluteFill>
);

// ---------- LOUPE + 4C (loupe trái, 4C phải — hết chồng chữ) ----------
export const LoupeScene: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const s = spring({frame: f - 6, fps, config: {damping: 10}});
  const cx = 560, cy = 600, R = 230;
  const cs = [
    {t: 'GIÁC CẮT', s: 'Cut', c: RED},
    {t: 'MÀU SẮC', s: 'Color', c: BLUE},
    {t: 'ĐỘ TINH KHIẾT', s: 'Clarity', c: AMBER},
    {t: 'TRỌNG LƯỢNG', s: 'Carat', c: TEAL},
  ];
  return (
    <AbsoluteFill><Paper /><TopBar color={NAVY} /><Logo />
      <Cap>Kim cương định giá theo <span style={{color: RED}}>CẢM TÍNH</span></Cap>
      {/* kính lúp trái, cán chĩa xuống-trái (vùng trống) */}
      <div style={{position: 'absolute', left: cx - R, top: cy - R, width: R * 2, height: R * 2, transform: `scale(${s})`, transformOrigin: 'center'}}>
        <div style={{position: 'absolute', bottom: -110, left: -70, width: 54, height: 190, background: NAVY, borderRadius: 27, transform: 'rotate(38deg)'}} />
        <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%, #ffffff, #eef3f7 60%, #dbe6ef)', border: `15px solid ${NAVY}`, boxShadow: '0 20px 50px rgba(0,0,0,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 190}}>💎</div>
      </div>
      {/* 4C xếp dọc bên phải */}
      <div style={{position: 'absolute', right: 130, top: 330, width: 560, display: 'flex', flexDirection: 'column', gap: 22}}>
        {cs.map((c, i) => {
          const o = interpolate(f, [18 + i * 6, 26 + i * 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          const x = interpolate(f, [18 + i * 6, 26 + i * 6], [40, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          return (
            <div key={i} style={{border: `5px solid ${c.c}`, borderRadius: 16, background: 'rgba(255,255,255,.92)', padding: '14px 26px', display: 'flex', alignItems: 'baseline', gap: 16, opacity: o, transform: `translateX(${x}px)`}}>
              <span style={{fontFamily: Mont, fontWeight: 900, fontSize: 40, color: c.c}}>{c.t}</span>
              <span style={{fontFamily: BVP, fontWeight: 800, fontSize: 28, color: GRAY}}>({c.s})</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ---------- RED FLAG ----------
export const RedFlagScene: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const s = spring({frame: f - 8, fps, config: {damping: 9}});
  const flag = interpolate(f, [24, 34], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill><Paper /><TopBar color={RED} /><Logo />
      <Cap>Rẻ hơn thị trường <span style={{color: RED}}>1/3</span> — hời hay bẫy?</Cap>
      <div style={{position: 'absolute', top: 400, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 60, transform: `scale(${s})`, transformOrigin: 'center'}}>
        <div style={{textAlign: 'center'}}>
          <div style={{fontFamily: Mont, fontWeight: 900, fontSize: 70, color: GRAY, textDecoration: 'line-through'}}>100 triệu</div>
          <div style={{fontFamily: BVP, fontWeight: 800, fontSize: 34, color: GRAY}}>giá thị trường</div>
        </div>
        <div style={{fontSize: 90}}>➜</div>
        <div style={{textAlign: 'center'}}>
          <div style={{fontFamily: Mont, fontWeight: 900, fontSize: 96, color: RED}}>~67 triệu</div>
          <div style={{fontFamily: BVP, fontWeight: 800, fontSize: 34, color: RED}}>“giá hữu nghị”</div>
        </div>
      </div>
      <div style={{position: 'absolute', top: 640, left: 0, right: 0, textAlign: 'center', fontSize: 120, opacity: flag}}>🚩</div>
    </AbsoluteFill>
  );
};

// ---------- CERT TAMPER ----------
export const CertScene: React.FC = () => {
  const f = useCurrentFrame();
  const grind = interpolate(f, [16, 40], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const spark = (f % 10) < 5;
  return (
    <AbsoluteFill><Paper /><TopBar color={RED} /><Logo />
      <Cap>Cú sốc: giấy kiểm định bị <span style={{color: RED}}>CAN THIỆP</span></Cap>
      <div style={{position: 'absolute', top: 380, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 50}}>
        <div style={{width: 420, height: 300, background: '#fff', borderRadius: 12, border: '4px solid #cfd5dc', boxShadow: '0 14px 34px rgba(0,0,0,.14)', padding: 24}}>
          <div style={{fontFamily: Mont, fontWeight: 900, fontSize: 34, color: NAVY}}>GIẤY KIỂM ĐỊNH</div>
          <div style={{marginTop: 14, fontSize: 78, textAlign: 'center'}}>💎</div>
          <div style={{marginTop: 10, textAlign: 'center', position: 'relative'}}>
            <span style={{fontFamily: 'monospace', fontWeight: 800, fontSize: 40, color: INK}}>GIA&nbsp;12345</span>
            <div style={{position: 'absolute', top: '50%', left: '18%', width: `${grind * 64}%`, height: 8, background: RED}} />
          </div>
        </div>
        <div style={{fontSize: 80, opacity: grind}}>➜</div>
        <div style={{width: 420, height: 300, background: '#fff', borderRadius: 12, border: `4px solid ${RED}`, boxShadow: '0 14px 34px rgba(0,0,0,.14)', padding: 24, opacity: grind}}>
          <div style={{fontFamily: Mont, fontWeight: 900, fontSize: 34, color: RED}}>GIẤY “MỚI”</div>
          <div style={{marginTop: 14, fontSize: 78, textAlign: 'center'}}>💎 {spark ? '✨' : ''}</div>
          <div style={{marginTop: 10, textAlign: 'center', fontFamily: 'monospace', fontWeight: 800, fontSize: 40, color: RED}}>P-LAB&nbsp;67890</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- GOLD vs DIAMOND ----------
export const GoldVsScene: React.FC = () => {
  const f = useCurrentFrame();
  const oL = interpolate(f, [8, 18], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const oR = interpolate(f, [16, 26], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const card: React.CSSProperties = {width: 620, borderRadius: 22, padding: '34px 30px', textAlign: 'center', background: 'rgba(255,255,255,.92)'};
  return (
    <AbsoluteFill><Paper /><TopBar color={NAVY} /><Logo />
      <Cap>Vàng <span style={{color: TEAL}}>KHÁC</span> kim cương ở đâu?</Cap>
      <div style={{position: 'absolute', top: 380, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 60}}>
        <div style={{...card, border: `5px solid ${TEAL}`, opacity: oL}}>
          <div style={{fontSize: 116}}>🥇</div>
          <div style={{fontFamily: Mont, fontWeight: 900, fontSize: 50, color: TEAL}}>VÀNG</div>
          <div style={{fontFamily: BVP, fontWeight: 800, fontSize: 36, color: INK, marginTop: 10, lineHeight: 1.35}}>Giá công khai mỗi ngày<br/>✅ Ai cũng tra · bán ngay</div>
        </div>
        <div style={{...card, border: `5px solid ${GRAY}`, opacity: oR}}>
          <div style={{fontSize: 116, filter: 'grayscale(.4)'}}>💎</div>
          <div style={{fontFamily: Mont, fontWeight: 900, fontSize: 50, color: GRAY}}>KIM CƯƠNG</div>
          <div style={{fontFamily: BVP, fontWeight: 800, fontSize: 36, color: GRAY, marginTop: 10, lineHeight: 1.35}}>Mỗi viên một giá “???”<br/>✖ Mờ · khó bán</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const SCENE_MAP: Record<string, React.FC> = {
  street: StreetScene, loupe: LoupeScene, redflag: RedFlagScene, cert: CertScene, goldvs: GoldVsScene,
};
