#!/usr/bin/env node
/**
 * Script kiểm tra nguồn dữ liệu giá cổ phiếu TRƯỚC khi import workflow vào n8n.
 *
 * Nguồn chính:  DNSE/Entrade (services.entrade.com.vn)
 * Nguồn dự phòng: VNDirect dchart (dchart-api.vndirect.com.vn)
 * (TCBS public API cũ đã trả 404 từ 06/2026 — không dùng nữa.)
 *
 * Cách chạy:
 *     node investment-platform/scripts/test-datasource.js
 *     node investment-platform/scripts/test-datasource.js VNM FPT HPG   # tự chọn mã
 *
 * KHÔNG cần cài thêm gì (dùng fetch có sẵn của Node 18+).
 */

const TICKERS    = process.argv.slice(2).length ? process.argv.slice(2)
                                                : ['VNM', 'FPT', 'HPG', 'MWG', 'VCB'];
const VOL_SPIKE  = 2.0;
const PRICE_MOVE = 3.0;
const LOOKBACK   = 20;

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
  'Accept': '*/*',
};

async function fetchBars(ticker) {
  const to   = Math.floor(Date.now() / 1000);
  const from = to - 60 * 60 * 24 * 90;

  // 1) DNSE / Entrade
  try {
    const url = 'https://services.entrade.com.vn/chart-api/v2/ohlcs/stock'
              + `?symbol=${ticker}&from=${from}&to=${to}&resolution=1D`;
    const res = await fetch(url, { headers: HEADERS });
    if (res.ok) {
      const d = await res.json();
      if (d && Array.isArray(d.t) && d.t.length) return { src: 'DNSE', d };
    }
  } catch (e) { /* thử nguồn dự phòng */ }

  // 2) VNDirect dchart
  const url = 'https://dchart-api.vndirect.com.vn/dchart/history'
            + `?symbol=${ticker}&resolution=D&from=${from}&to=${to}`;
  const res = await fetch(url, { headers: { ...HEADERS, Referer: 'https://dchart.vndirect.com.vn/' } });
  if (!res.ok) throw new Error(`VNDirect HTTP ${res.status}`);
  const d = await res.json();
  if (d && Array.isArray(d.t) && d.t.length) return { src: 'VNDirect', d };
  throw new Error('cả 2 nguồn đều không có dữ liệu');
}

function analyze(d) {
  const n = d.t.length;
  if (n < 5) return null;
  const closes = d.c, vols = d.v;
  const start   = Math.max(0, n - 1 - LOOKBACK);
  const histVol = vols.slice(start, n - 1);
  const avgVol  = histVol.reduce((s, v) => s + (v || 0), 0) / (histVol.length || 1);
  const volRatio = avgVol ? vols[n - 1] / avgVol : 0;
  const pct      = closes[n - 2] ? ((closes[n - 1] - closes[n - 2]) / closes[n - 2]) * 100 : 0;

  const reasons = [];
  if (volRatio >= VOL_SPIKE)       reasons.push(`KL đột biến x${volRatio.toFixed(1)}`);
  if (Math.abs(pct) >= PRICE_MOVE) reasons.push(`Giá ${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`);
  return { close: closes[n - 1], volume: vols[n - 1], volRatio, pct, reasons, n };
}

// Tự nhận diện đơn vị: 64.5 (nghìn đồng) hay 64500 (đồng) đều hiển thị đúng
const fmtPrice = (c) => Math.round(c < 500 ? c * 1000 : c).toLocaleString('vi-VN') + 'đ';

(async () => {
  console.log('=== KIỂM TRA NGUỒN DỮ LIỆU (DNSE chính / VNDirect dự phòng) ===\n');
  for (const t of TICKERS) {
    try {
      const { src, d } = await fetchBars(t);
      const r = analyze(d);
      if (!r) { console.log(`${t.padEnd(5)} | ${src}: không đủ dữ liệu`); continue; }
      const flag = r.reasons.length ? '🔔 ' + r.reasons.join(' | ') : '— bình thường';
      console.log(
        `${t.padEnd(5)} | ${src.padEnd(8)} | ${String(r.n).padStart(3)} phiên | ` +
        `giá ${fmtPrice(r.close).padStart(10)} | KL x${r.volRatio.toFixed(1)} TB | ` +
        `${r.pct >= 0 ? '+' : ''}${r.pct.toFixed(2)}% | ${flag}`
      );
    } catch (e) {
      console.log(`${t.padEnd(5)} | ❌ LỖI: ${e.message}`);
    }
  }
  console.log('\n=== XONG. Thấy giá/khối lượng hợp lý là nguồn OK, import workflow được. ===');
})();
