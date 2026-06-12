#!/usr/bin/env node
/**
 * Script kiểm tra nguồn dữ liệu TCBS TRƯỚC khi import workflow vào n8n.
 *
 * Cách chạy trên VPS (nơi đã cài n8n / có Node.js):
 *     node investment-platform/scripts/test-tcbs.js
 *     node investment-platform/scripts/test-tcbs.js VNM FPT HPG   # tự chọn mã
 *
 * Script sẽ:
 *   1. Gọi thử API công khai của TCBS
 *   2. In ra cấu trúc dữ liệu thật (để xác nhận tên trường, đơn vị giá)
 *   3. Chạy đúng logic phân tích mà workflow dùng, in tín hiệu nếu có
 *
 * KHÔNG cần cài thêm gì (dùng fetch có sẵn của Node 18+).
 * Nếu Node < 18, chạy: npm i node-fetch  rồi sửa dòng fetch bên dưới.
 */

const TICKERS    = process.argv.slice(2).length ? process.argv.slice(2)
                                                : ['VNM', 'FPT', 'HPG', 'MWG', 'VCB'];
const VOL_SPIKE  = 2.0;
const PRICE_MOVE = 3.0;
const LOOKBACK   = 20;

async function fetchBars(ticker) {
  const to  = Math.floor(Date.now() / 1000);
  const url = `https://apipubaws.tcbs.com.vn/stock-insight/v1/stock/bars-long-term`
            + `?ticker=${ticker}&type=stock&resolution=D&to=${to}&countBack=30`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function analyze(ticker, bars) {
  if (!bars || bars.length < 5) return null;
  const today    = bars[bars.length - 1];
  const prev     = bars[bars.length - 2];
  const lookback = bars.slice(0, bars.length - 1).slice(-LOOKBACK);
  const avgVol   = lookback.reduce((s, b) => s + (b.volume || 0), 0) / (lookback.length || 1);
  const volRatio = avgVol ? today.volume / avgVol : 0;
  const pct      = prev.close ? ((today.close - prev.close) / prev.close) * 100 : 0;

  const reasons = [];
  if (volRatio >= VOL_SPIKE)       reasons.push(`KL đột biến x${volRatio.toFixed(1)}`);
  if (Math.abs(pct) >= PRICE_MOVE) reasons.push(`Giá ${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`);
  return { ticker, close: today.close, volume: today.volume, avgVol, volRatio, pct, reasons };
}

(async () => {
  console.log('=== KIỂM TRA NGUỒN DỮ LIỆU TCBS ===\n');
  let first = true;
  for (const t of TICKERS) {
    try {
      const json = await fetchBars(t);
      const bars = (json && json.data) || [];

      if (first) {
        console.log('>> Mẫu 1 phiên dữ liệu thô (để xác nhận tên trường & ĐƠN VỊ GIÁ):');
        console.log(JSON.stringify(bars[bars.length - 1], null, 2));
        console.log('   --> Nếu "close" có dạng ~64.5 nghĩa là đơn vị NGHÌN đồng (workflow đã *1000).');
        console.log('   --> Nếu "close" có dạng ~64500 thì sửa lại workflow bỏ phần *1000.\n');
        first = false;
      }

      const r = analyze(t, bars);
      if (!r) { console.log(`${t.padEnd(5)} | không đủ dữ liệu`); continue; }
      const flag = r.reasons.length ? '🔔 ' + r.reasons.join(' | ') : '— bình thường';
      console.log(
        `${t.padEnd(5)} | giá ${String(r.close).padStart(8)} | ` +
        `KL ${String(r.volume).padStart(10)} (x${r.volRatio.toFixed(1)} TB) | ` +
        `${r.pct >= 0 ? '+' : ''}${r.pct.toFixed(2)}% | ${flag}`
      );
    } catch (e) {
      console.log(`${t.padEnd(5)} | ❌ LỖI: ${e.message}`);
    }
  }
  console.log('\n=== XONG. Nếu thấy giá/khối lượng hợp lý là nguồn OK, import workflow được. ===');
})();
