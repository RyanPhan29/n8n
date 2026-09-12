// VÍ DỤ SHORT SO SÁNH "X vs Y" (copy-paste, sửa nội dung) — thêm vào ALL_SHORTS trong ShortSpecs.tsx.
// Trục chính = cards 2 cột + badge VS. 4 cảnh: HOOK → SỐ/HÌNH → CARDS so sánh → CÂU HỎI chọn phe.
// Nội dung giữa, Anh Hai thứ yếu, SFX tự có.
export const DEMO_SOSANH: ShortSpec = {
  slug: 'DemoSoSanh',
  scenes: [
    // 1) HOOK — đặt 2 phe
    {d: 240, bar: 'amber', pose: 'think', ahCorner: 'right',
      head: [{t: 'X', c: 'teal'}, ' hay ', {t: 'Y', c: 'blue'}, ' — chọn cái nào?'],
      icon: '🥇  ⚖️  🏦', iconTop: 560, iconSize: 150},
    // 2) SỐ — con số làm nghiêng cán cân
    {d: 250, bar: 'blue', pose: 'greedy', ahCorner: 'right', ahH: 600,
      head: ['Sau 1 năm'], size: 76,
      value: 185, suffix: ' triệu', numColor: 'teal', numTop: 560, numSize: 150,
      label: ['Nếu chọn ', {t: 'X', c: 'teal'}], labelTop: 820, labelC: 'teal'},
    // 3) CARDS — so sánh trực diện (dim bên yếu)
    {d: 260, bar: 'navy', pose: 'aha', ahCorner: 'left', ahH: 600,
      head: ['Đặt cạnh nhau'], size: 84,
      cards: [{header: '🥇 X', icon: '📈', label: 'Lời to · rủi ro', c: 'teal'},
              {header: '🏦 Y', icon: '🔒', label: 'Chắc · khiêm tốn', c: 'blue'}], cardsTop: 440},
    // 4) CÂU HỎI — chọn phe
    {d: 130, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Còn bạn?'], size: 90, icon: '🤔💭', iconTop: 520, iconSize: 150,
      q: ['Bạn team ', {t: 'X hay Y?', c: 'gold'}]},
  ],
};
// ĐĂNG KÝ: export const ALL_SHORTS: ShortSpec[] = [..., DEMO_SOSANH];
