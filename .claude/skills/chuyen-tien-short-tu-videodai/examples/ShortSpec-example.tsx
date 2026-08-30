// VÍ DỤ SHORT "bóc 1 vấn đề" (copy-paste, sửa nội dung) — thêm vào ALL_SHORTS trong ShortSpecs.tsx.
// 4 cảnh KHÓA: HOOK → SỐ → ĐIỂM(cards/icon+label) → CÂU HỎI. d tạm, auto-time lại khi có Vbee.
// Nội dung TO-RÕ ở GIỮA; Anh Hai căn giữa đáy (ahCorner + ahH), THỨ YẾU. SFX tự có (engine).
export const DEMO_SHORT: ShortSpec = {
  slug: 'DemoShort',
  scenes: [
    // 1) HOOK — nêu vấn đề + icon metaphor
    {d: 250, bar: 'red', pose: 'shock', ahCorner: 'right',
      head: ['Vấn đề bắt sóng — ', {t: 'gây tò mò?', c: 'red'}],
      icon: '💎  ➡️  ❓', iconTop: 560, iconSize: 150},
    // 2) SỐ — con số đắt giá (Counter tự kèm ticker/ding)
    {d: 260, bar: 'red', pose: 'broke', ahCorner: 'right', ahH: 600,
      head: ['Con số cú sốc'], size: 76,
      value: 70, suffix: '%', numColor: 'red', numTop: 560, numSize: 170,
      label: ['Nhãn dưới số ', {t: 'nhấn mạnh', c: 'red'}, ' 💔'], labelTop: 820, labelC: 'red'},
    // 3) ĐIỂM — cards đối chiếu (2 card + VS) HOẶC icon + label
    {d: 260, bar: 'teal', pose: 'aha', ahCorner: 'left', ahH: 600,
      head: ['Insight ', {t: 'chính', c: 'teal'}], size: 80,
      cards: [{header: 'ĐÚNG', icon: '🥇', label: 'lý do ngắn', c: 'teal'},
              {header: 'SAI', icon: '💎', label: 'lý do ngắn', c: 'gray', dim: true}], cardsTop: 440},
    // 4) CÂU HỎI — kéo tương tác
    {d: 130, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Còn bạn?'], size: 90, icon: '🤔💭', iconTop: 520, iconSize: 150,
      q: ['Câu hỏi mở cho ', {t: 'người xem?', c: 'gold'}]},
  ],
};
// ĐĂNG KÝ: export const ALL_SHORTS: ShortSpec[] = [..., DEMO_SHORT];
