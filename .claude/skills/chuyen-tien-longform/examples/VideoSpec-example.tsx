// VÍ DỤ SPEC DÀI (copy-paste, sửa nội dung) — thêm vào ALL_SPECS trong Specs.tsx.
// d = frame@30 (từ autotime). Đủ các block hay dùng: hook/char/number/split/list/comments/rule/question/cta.
export const DEMO: VideoSpec = {
  slug: 'Demo',
  scenes: [
    // NHỊP 1 — BỐI CẢNH
    {t: 'split', d: 264, bar: 'navy', size: 52,
      heading: ['Hai lựa chọn nhìn ', {t: 'GIỐNG NHAU', c: 'navy'}],
      colL: {title: '💳 A', big: 'TIỀN CỦA BẠN', sub: 'an toàn', c: 'blue'},
      colR: {title: '💳 B', big: 'TIỀN NGƯỜI KHÁC', sub: 'rủi ro', c: 'red'}, midVS: true,
      caption: ['Mở đầu bằng ', {t: 'nghịch lý', c: 'red'}]},
    {t: 'comments', d: 219, bar: 'navy', size: 56, heading: ['Cả mạng chia hai phe'],
      comments: [{name: 'An', text: 'Cái A ngon hơn!', c: 'teal', side: 'l'},
                 {name: 'Bình', text: 'B mới lời to 🤑', c: 'red', side: 'r'}]},
    // NHỊP 2 — SỐ LIỆU (auto-time cảnh > 20s thì tách 2-3 cảnh con)
    {t: 'number', d: 330, bar: 'teal', htop: 130, size: 54, deco: '🗓️', decoSide: 'l',
      heading: ['Con số then chốt'], value: 45, suffix: ' ngày', numColor: 'teal',
      sub: 'giải thích ngắn ở đây', ah: {pose: 'cool'}},
    {t: 'line', d: 252, bar: 'amber', size: 56, heading: ['Xu hướng tăng'],
      points: [{label: '2024', v: 82}, {label: 'giữa', v: 118}, {label: '2025', v: 155}], lineColor: 'amber', unit: 'tr',
      caption: ['Đầu năm chỉ ', {t: '82 triệu', c: 'amber'}]},
    // NHỊP 3 — XUNG ĐỘT (center + big cho câu punch)
    {t: 'char', d: 402, bar: 'red', size: 72, center: true,
      heading: ['Giá đắt nhất: ', {t: 'CÁI BẪY', c: 'red'}],
      ah: {pose: 'warning'}, caption: ['Cảnh center: title tự né Anh Hai, caption 1-2 dòng gọn']},
    // NHỊP 4 — GIẢI QUYẾT (rule đánh số)
    {t: 'rule', d: 297, bar: 'teal', n: 1, color: 'teal',
      heading: ['Nguyên tắc vàng'], title: 'Nguyên tắc ngắn gọn 1 dòng',
      caption: ['Diễn giải đưa xuống caption, đừng nhồi vào title']},
    {t: 'list', d: 351, bar: 'teal', size: 54, heading: ['Nhớ thêm'],
      items: [{text: '③ Ý ngắn', c: 'red'}, {text: '④ Ý ngắn (item 1 dòng cho đẹp)', c: 'blue'}],
      ah: {pose: 'pointup'}},
    // NHỊP 5 — BỐI CẢNH LỚN + CTA
    {t: 'question', d: 189, bar: 'navy', size: 56, heading: ['Câu hỏi thật sự:'],
      lines: [['Không phải cái nào tốt hơn,'], [{t: 'mà BẠN là ai?', c: 'amber'}]],
      caption: ['Chốt bằng câu hỏi kéo tương tác']},
    {t: 'cta', d: 224, bar: 'navy', size: 50,
      heading: ['Giữ ví cho chặt ', {t: '👊', c: 'teal'}], button: 'THEO DÕI ANH HAI'},
  ],
};
// ĐĂNG KÝ: export const ALL_SPECS: VideoSpec[] = [..., DEMO];
