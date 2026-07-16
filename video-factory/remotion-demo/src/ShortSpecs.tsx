import {ShortSpec} from './Short';

// LK-1 "Bỏ 10 triệu thành 450 triệu" — d khớp audio shorts_audio/LK1.mp3 (22.0s, 4 cảnh)
export const SHORT_LK1: ShortSpec = {
  slug: 'ShortLK1',
  scenes: [
    // 1) Hook — icon 2D metaphor ở giữa, Anh Hai nép phải
    {d: 207, bar: 'blue', pose: 'sly', ahCorner: 'right',
      head: ['Bỏ ', {t: '10 triệu', c: 'blue'}, ' rồi đi ngủ 😴'],
      icon: '💰  😴  ❓', iconTop: 540, iconSize: 150},
    // 2) Số 450 TO ở giữa — 1 dòng, không gì che, Anh Hai nép phải
    {d: 158, bar: 'blue', pose: 'greedy', ahCorner: 'right', ahH: 600,
      head: ['Vài chục năm sau…'], size: 70,
      value: 450, suffix: ' triệu', numColor: 'blue', numTop: 560, numSize: 150,
      label: ['Chính là ', {t: 'LÃI KÉP', c: 'blue'}, ' 🤯'], labelTop: 800, labelC: 'blue'},
    // 3) Card 2D so sánh SỚM vs TRỄ — hero ở giữa, Anh Hai nép trái
    {d: 173, bar: 'teal', pose: 'aha', ahCorner: 'left', ahH: 600,
      head: ['Bí mật là ', {t: 'THỜI GIAN', c: 'teal'}], size: 82,
      cards: [
        {header: 'BẮT ĐẦU SỚM', icon: '🌱', label: 'Lời chồng lời', c: 'teal'},
        {header: 'ĐỂ TRỄ', icon: '🐌', label: 'Thiệt đủ đường', c: 'gray', dim: true},
      ], cardsTop: 440},
    // 4) Câu hỏi chốt — thêm icon giữa cho đỡ trống
    {d: 122, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Vậy còn bạn?'], size: 90,
      icon: '🤔💭', iconTop: 520, iconSize: 150,
      q: ['Bạn định bắt đầu đầu tư từ ', {t: 'năm bao nhiêu tuổi?', c: 'gold'}]},
  ],
};

// KIMCUONG "Vì sao kim cương khó bán lại" — bắt sóng vụ buôn lậu kim cương 2026 (4 cảnh, ~32s)
// d tạm (ước lượng) — auto-time lại khi có Vbee.
export const SHORT_KIMCUONG: ShortSpec = {
  slug: 'ShortKimCuong',
  scenes: [
    // 1) HOOK — thời sự
    {d: 250, bar: 'red', pose: 'shock', ahCorner: 'right',
      head: ['Tiệm kim cương bị bắt — ', {t: 'đá của bạn bán ở đâu?', c: 'red'}],
      icon: '💎  ➡️  ❓', iconTop: 560, iconSize: 150},
    // 2) SỐ — mức lỗ khi bán lại
    {d: 260, bar: 'red', pose: 'broke', ahCorner: 'right', ahH: 600,
      head: ['Bán lại thường ', {t: 'LỖ tới', c: 'red'}], size: 74,
      value: 70, suffix: '%', numColor: 'red', numTop: 560, numSize: 170,
      label: ['Vì kim cương ', {t: 'KHÔNG có giá chung', c: 'red'}, ' 💔'], labelTop: 820, labelC: 'red'},
    // 3) ĐIỂM — vàng vs kim cương (thanh khoản)
    {d: 260, bar: 'teal', pose: 'aha', ahCorner: 'left', ahH: 600,
      head: ['Vàng thì ', {t: 'KHÁC HẲN', c: 'teal'}], size: 80,
      cards: [
        {header: 'VÀNG', icon: '🥇', label: 'Giá chung · bán ngay', c: 'teal'},
        {header: 'KIM CƯƠNG', icon: '💎', label: 'Mỗi viên 1 giá · kẹt', c: 'gray', dim: true},
      ], cardsTop: 440},
    // 4) CÂU HỎI
    {d: 130, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Còn bạn?'], size: 90,
      icon: '🤔💭', iconTop: 520, iconSize: 150,
      q: ['Từng mua kim cương để ', {t: 'đầu tư chưa?', c: 'gold'}]},
  ],
};

export const ALL_SHORTS: ShortSpec[] = [SHORT_LK1, SHORT_KIMCUONG];
