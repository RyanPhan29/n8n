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
    {d: 285, bar: 'red', pose: 'shock', ahCorner: 'right',
      head: ['Tiệm kim cương bị bắt — ', {t: 'đá của bạn bán ở đâu?', c: 'red'}],
      icon: '💎  ➡️  ❓', iconTop: 560, iconSize: 150},
    // 2) SỐ — mức lỗ khi bán lại
    {d: 399, bar: 'red', pose: 'broke', ahCorner: 'right', ahH: 600,
      head: ['Bán lại thường ', {t: 'LỖ tới', c: 'red'}], size: 74,
      value: 70, suffix: '%', numColor: 'red', numTop: 560, numSize: 170,
      label: ['Vì kim cương ', {t: 'KHÔNG có giá chung', c: 'red'}, ' 💔'], labelTop: 820, labelC: 'red'},
    // 3) ĐIỂM — vàng vs kim cương (thanh khoản)
    {d: 330, bar: 'teal', pose: 'aha', ahCorner: 'left', ahH: 600,
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

// VÀNG "Vàng có sao không?" — trấn an người giữ vàng (chùm kim cương). d tạm, re-time khi có Vbee.
export const SHORT_VANG: ShortSpec = {
  slug: 'ShortVang',
  scenes: [
    // 1) HOOK
    {d: 234, bar: 'red', pose: 'worried', ahCorner: 'right',
      head: ['Chủ tiệm vàng bị bắt — ', {t: 'vàng của bạn có sao?', c: 'red'}],
      icon: '🥇  😨  ❓', iconTop: 560, iconSize: 150},
    // 2) ĐIỂM — làm rõ: đây là vụ kim cương
    {d: 174, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Đây là vụ ', {t: 'KIM CƯƠNG', c: 'red'}], size: 84,
      icon: '💎  ≠  🥇', iconTop: 540, iconSize: 170,
      label: ['Không phải vàng có vấn đề'], labelTop: 820, labelC: 'gray'},
    // 3) GIẢI PHÁP — vàng minh bạch
    {d: 270, bar: 'teal', pose: 'cool', ahCorner: 'left', ahH: 620,
      head: ['Vàng miếng ', {t: 'MINH BẠCH', c: 'teal'}], size: 82,
      icon: '🥇  🌍  ✅', iconTop: 500, iconSize: 140,
      label: ['Giá công khai mỗi ngày · nơi cấp phép · giữ hóa đơn'], labelTop: 790, labelC: 'teal'},
    // 4) CÂU HỎI
    {d: 140, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Còn bạn?'], size: 90,
      icon: '🤔💭', iconTop: 520, iconSize: 150,
      q: ['Bán tháo lúc hoảng — hay ', {t: 'giữ bình tĩnh?', c: 'gold'}]},
  ],
};

// RE13 "Rẻ hơn 1/3 = cờ đỏ" — nguyên tắc chống bẫy (chùm kim cương). d tạm, re-time khi có Vbee.
export const SHORT_RE13: ShortSpec = {
  slug: 'ShortRe13',
  scenes: [
    // 1) HOOK
    {d: 255, bar: 'amber', pose: 'sly', ahCorner: 'right',
      head: ['Rẻ hơn thị trường ', {t: '1/3', c: 'red'}, ' = hời?'],
      icon: '💎  🏷️  ❓', iconTop: 560, iconSize: 150},
    // 2) SỐ — rẻ bất thường
    {d: 228, bar: 'red', pose: 'warning', ahCorner: 'right', ahH: 600,
      head: ['Rẻ bất thường tới'], size: 76,
      value: 33, suffix: '%', numColor: 'red', numTop: 560, numSize: 170,
      label: ['= ', {t: 'CỜ ĐỎ 🚩', c: 'red'}, ', không phải hời'], labelTop: 820, labelC: 'red'},
    // 3) GIẢI PHÁP — vì sao rẻ
    {d: 285, bar: 'navy', pose: 'think', ahCorner: 'left', ahH: 620,
      head: ['Không ai bán ', {t: 'LỖ', c: 'red'}, ' cho bạn'], size: 80,
      icon: '💰  ❓', iconTop: 500, iconSize: 160,
      label: ['Món càng đắt, càng phải hỏi: “vì sao rẻ?”'], labelTop: 800, labelC: 'navy'},
    // 4) CÂU HỎI
    {d: 120, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Lần tới gặp deal rẻ khó tin…'], size: 74,
      icon: '🤔💭', iconTop: 540, iconSize: 150,
      q: ['Bạn vội mua hay ', {t: 'hỏi vì sao?', c: 'gold'}]},
  ],
};

// ============ CHÙM BĐS 2026 "NGHẼN DÒNG TIỀN" ============
// S1 nghịch lý lãi suất — bds_s1.mp3 (31.73s) d=[193,278,302,179]
export const SHORT_BDS_S1: ShortSpec = {
  slug: 'ShortBdsS1',
  scenes: [
    {d: 193, bar: 'red', pose: 'sly', ahCorner: 'right',
      head: ['Vay ', {t: '12–15%', c: 'red'}, '\n·  Gửi ', {t: '6–7%', c: 'teal'}], size: 84,
      icon: '🏦  ⚔️  🐷', iconTop: 560, iconSize: 150},
    {d: 278, bar: 'red', pose: 'shock', ahCorner: 'right', ahH: 600,
      head: ['Tiền VAY đắt gần'], size: 82,
      value: 2, suffix: 'x', numColor: 'red', numTop: 540, numSize: 210,
      label: ['Lãi chạy đều, ăn vào túi bạn'], labelTop: 810, labelC: 'red'},
    {d: 302, bar: 'amber', pose: 'think', ahCorner: 'left', ahH: 600,
      head: ['Riêng lãi,\nnhà phải tăng'], size: 78,
      value: 10, suffix: '%/năm', numColor: 'amber', numTop: 540, numSize: 165,
      label: ['mới HOÀ VỐN — chưa tính lời'], labelTop: 810, labelC: 'amber'},
    {d: 179, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Thị trường\nđang chững lại'], size: 78,
      icon: '🤔💭', iconTop: 520, iconSize: 150,
      q: ['Vay lãi cao ôm tài sản khó bán — ', {t: 'bạn xuống tiền?', c: 'gold'}]},
  ],
};

// S2 bẫy "cam kết 18%" — bds_s2.mp3 (36.40s) d=[191,362,377,162]
export const SHORT_BDS_S2: ShortSpec = {
  slug: 'ShortBdsS2',
  scenes: [
    {d: 191, bar: 'amber', pose: 'sly', ahCorner: 'right',
      head: ['Dự án cam kết lời\n', {t: '18%/năm', c: 'gold'}], size: 80,
      icon: '🤝  💰  ❓', iconTop: 560, iconSize: 150},
    {d: 362, bar: 'red', pose: 'think', ahCorner: 'right', ahH: 600,
      head: ['NH vay 12–15%, gửi 6–7%…'], size: 68,
      value: 18, suffix: '%', numColor: 'red', numTop: 540, numSize: 200,
      label: ['Lấy ĐÂU ra để chia cho bạn?'], labelTop: 820, labelC: 'red'},
    {d: 377, bar: 'red', pose: 'warning', ahCorner: 'left', ahH: 600,
      head: ['Lấy tiền ', {t: 'người sau', c: 'red'}, '\ntrả người trước'], size: 72,
      icon: '🔄  💸', iconTop: 530, iconSize: 160,
      label: ['Người mới ngừng → tiền kẹt'], labelTop: 820, labelC: 'red'},
    {d: 162, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Cam kết lời\ncao chót vót…'], size: 78,
      icon: '🚩', iconTop: 520, iconSize: 180,
      q: ['Bạn nên mừng — hay ', {t: 'nên chạy?', c: 'gold'}]},
  ],
};

// S4 ba dấu hiệu dự án sắp đắp chiếu — bds_s4.mp3 (36.90s) d=[153,166,233,209,225,121]
export const SHORT_BDS_S4: ShortSpec = {
  slug: 'ShortBdsS4',
  scenes: [
    {d: 153, bar: 'red', pose: 'warning', ahCorner: 'right',
      head: ['3 dấu hiệu dự án\n', {t: 'SẮP ĐẮP CHIẾU', c: 'red'}], size: 76,
      icon: '🏗️  ⚠️', iconTop: 560, iconSize: 160},
    {d: 166, bar: 'amber', pose: 'think', ahCorner: 'left', ahH: 580,
      head: ['① Tiến độ ', {t: 'chậm dần', c: 'red'}], size: 84,
      icon: '🐢  🏗️', iconTop: 520, iconSize: 170,
      label: ['Hứa hoài, công trường im lìm'], labelTop: 820, labelC: 'amber'},
    {d: 233, bar: 'red', pose: 'warning', ahCorner: 'right', ahH: 580,
      head: ['② Bỗng ', {t: 'bán tháo', c: 'red'}], size: 84,
      icon: '🏷️  📉', iconTop: 520, iconSize: 170,
      label: ['Gom tiền mặt gấp = khát vốn'], labelTop: 820, labelC: 'red'},
    {d: 209, bar: 'red', pose: 'worried', ahCorner: 'left', ahH: 580,
      head: ['③ Ôm ', {t: 'nhiều dự án', c: 'red'}], size: 82,
      icon: '🏢🏢🏢  ⛓️', iconTop: 530, iconSize: 120,
      label: ['1 mắt xích kẹt, cả dây đứng'], labelTop: 820, labelC: 'red'},
    {d: 225, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 620,
      head: ['Thứ bạn mua\nkhông phải căn nhà'], size: 78,
      icon: '🤝  📄', iconTop: 510, iconSize: 160,
      label: ['mà là LỜI HỨA bàn giao'], labelTop: 800, labelC: 'navy'},
    {d: 121, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Còn bạn?'], size: 90,
      icon: '🤔💭', iconTop: 520, iconSize: 150,
      q: ['Từng gặp dự án nào ', {t: 'chậm bàn giao?', c: 'gold'}]},
  ],
};

// SHORT "80 NĂM MUA NHÀ" — thu riêng short80b.mp3 (48.5s) d=[431,324,321,107,75,197] · neo khoảng lặng thật · số 80 bung @35.8s đúng lúc giọng "tám mươi năm"
export const SHORT_TK80: ShortSpec = {
  slug: 'ShortTK80',
  scenes: [
    {d: 431, bar: 'red', pose: 'shock', ahCorner: 'right', ahH: 600,
      head: ['Giá nhà gấp'], size: 84,
      value: 30, suffix: ' LẦN', numColor: 'red', numTop: 540, numSize: 200,
      label: ['thu nhập 1 năm của gia đình'], labelTop: 820, labelC: 'red'},
    {d: 324, bar: 'red', pose: 'broke', ahCorner: 'right', ahH: 600,
      head: ['Nhịn ăn, dồn CẢ thu nhập'], size: 74,
      value: 30, suffix: ' năm', numColor: 'red', numTop: 540, numSize: 190,
      label: ['mới mua nổi 1 căn'], labelTop: 820, labelC: 'red'},
    {d: 321, bar: 'amber', pose: 'think', ahCorner: 'left', ahH: 600,
      head: ['Trả góp 1/3 lương mỗi tháng…'], size: 70,
      icon: '💸  🏦', iconTop: 520, iconSize: 170,
      label: ['thực tế hơn — nhưng con số thì…'], labelTop: 820, labelC: 'amber'},
    {d: 107, bar: 'red', pose: 'shock', ahCorner: 'right', ahH: 600,
      head: ['Con số đội lên tới'], size: 78,
      value: 80, suffix: ' NĂM', numColor: 'red', numTop: 540, numSize: 200,
      label: ['Tám mươi năm cho 1 căn nhà 😱'], labelTop: 820, labelC: 'red'},
    {d: 75, bar: 'red', pose: 'worried', ahCorner: 'right', ahH: 620,
      head: ['Khó mua nhà ', {t: 'nhất thế giới', c: 'red'}], size: 76,
      icon: '🌏', iconTop: 540, iconSize: 220},
    {d: 197, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Không phải do bạn kém đâu'], size: 66,
      icon: '🤔💭', iconTop: 520, iconSize: 150,
      q: ['Bạn nghĩ bao lâu mới ', {t: 'mua nổi nhà?', c: 'gold'}]},
  ],
};

// ĐIỂM TIN TIỀN BẠC 22/7 — thu diemtin.mp3 (48.48s) · 10 nhịp neo khoảng lặng thật
// cut(s): 3.5 |10.3 |14.2 |20.4 |25.0 |31.6 |37.0 |41.6 |45.5 |48.48
export const SHORT_DIEMTIN: ShortSpec = {
  slug: 'ShortDiemTin',
  scenes: [
    // 0) INTRO 0→3.5
    {d: 105, bar: 'navy', pose: 'present', ahCorner: 'right', ahH: 620,
      head: ['ĐIỂM TIN ', {t: 'TIỀN BẠC', c: 'gold'}], size: 82,
      icon: '📊  🗞️', iconTop: 540, iconSize: 170,
      label: ['Thứ Tư · 22 · 7 · 2026'], labelTop: 840, labelC: 'gray'},
    // 1a) VÀNG — số 146 bung 3.5→10.3
    {d: 204, bar: 'amber', pose: 'think', ahCorner: 'right', ahH: 600,
      head: ['Vàng SJC vừa hạ về'], size: 74,
      value: 146, suffix: ' tr/lượng', numColor: 'amber', numTop: 540, numSize: 158,
      label: ['sau mấy phiên tăng nóng — thế giới chững lại'], labelTop: 820, labelC: 'amber'},
    // 1b) VÀNG khuyên 10.3→14.2
    {d: 117, bar: 'red', pose: 'worried', ahCorner: 'right', ahH: 620,
      head: ['Giá đang ', {t: 'giằng co', c: 'red'}], size: 82,
      icon: '⚖️', iconTop: 540, iconSize: 200,
      label: ['Đừng mua đuổi theo cơn sốt'], labelTop: 840, labelC: 'red'},
    // 2a) LÃI SUẤT — số 8% bung 14.2→20.4
    {d: 186, bar: 'teal', pose: 'cool', ahCorner: 'left', ahH: 600,
      head: ['Lãi gửi tiết kiệm nhích lên'], size: 70,
      value: 8, suffix: '%/năm', numColor: 'teal', numTop: 540, numSize: 200,
      label: ['Kỳ hạn 6 tháng — có nơi gần 8%'], labelTop: 820, labelC: 'teal'},
    // 2b) LÃI SUẤT online 20.4→25.0
    {d: 138, bar: 'teal', pose: 'aha', ahCorner: 'left', ahH: 600,
      head: ['Tin vui cho ', {t: 'người gửi tiền', c: 'teal'}], size: 74,
      icon: '💰  📈', iconTop: 540, iconSize: 160,
      label: ['Gửi online thường lãi cao hơn tại quầy'], labelTop: 840, labelC: 'teal'},
    // 3) TỶ GIÁ 25.0→31.6
    {d: 198, bar: 'blue', pose: 'present', ahCorner: 'right', ahH: 600,
      head: ['NHNN ', {t: 'giảm nhẹ tỷ giá', c: 'blue'}], size: 74,
      icon: '💵  🔻', iconTop: 540, iconSize: 170,
      label: ['Đô la hạ nhiệt — cần mua thì canh thời điểm'], labelTop: 840, labelC: 'blue'},
    // 4a) NHÀ ĐẤT chững 31.6→37.0
    {d: 162, bar: 'red', pose: 'think', ahCorner: 'right', ahH: 600,
      head: ['Căn hộ HN & TP.HCM'], size: 76,
      icon: '🏢  📉', iconTop: 540, iconSize: 170,
      label: ['Người mua chững lại — giá cao, lãi vay tăng'], labelTop: 840, labelC: 'red'},
    // 4b) NHÀ ĐẤT mặc cả 37.0→41.6
    {d: 138, bar: 'navy', pose: 'sly', ahCorner: 'left', ahH: 600,
      head: ['Bên bán đang khó'], size: 80,
      icon: '🤝', iconTop: 540, iconSize: 200,
      label: ['Người mua có thời gian cân nhắc & mặc cả'], labelTop: 840, labelC: 'navy'},
    // 5a) TÓM LẠI 41.6→45.5
    {d: 117, bar: 'teal', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Tóm lại'], size: 88,
      cards: [
        {header: 'GỬI TIẾT KIỆM', icon: '🏦', label: 'Đang lợi hơn', c: 'teal'},
        {header: 'VÀNG & NHÀ', icon: '🥇', label: 'Nên bình tĩnh', c: 'gray', dim: true},
      ], cardsTop: 440},
    // 5b) CTA 45.5→48.48
    {d: 89, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Giữ ví cho chặt 👛'], size: 78,
      q: ['Ngày mai ', {t: 'điểm tin tiếp nhé!', c: 'gold'}]},
  ],
};

// ĐIỂM TIN TIỀN BẠC 23/7 — thu diemtin23.mp3 (49.56s) · 12 nhịp neo khoảng lặng thật
// cut(s): 3.77 |9.30 |12.85 |15.10 |20.70 |27.60 |31.50 |34.50 |38.80 |41.70 |46.90 |49.56
export const SHORT_DIEMTIN23: ShortSpec = {
  slug: 'ShortDiemTin23',
  scenes: [
    // 0) INTRO 0→3.77
    {d: 113, bar: 'navy', pose: 'present', ahCorner: 'right', ahH: 620,
      head: ['ĐIỂM TIN ', {t: 'TIỀN BẠC', c: 'gold'}], size: 82,
      icon: '📊  🗞️', iconTop: 540, iconSize: 170,
      label: ['23 · 7 · 2026'], labelTop: 840, labelC: 'gray'},
    // 1a) VÀNG lao dốc 3.77→9.30
    {d: 166, bar: 'red', pose: 'shock', ahCorner: 'right', ahH: 600,
      head: ['Vàng SJC ', {t: 'lao dốc kỷ lục', c: 'red'}], size: 74,
      icon: '📉', iconTop: 520, iconSize: 240,
      label: ['Mất 6–7 triệu/lượng chỉ 1 buổi sáng'], labelTop: 860, labelC: 'red'},
    // 1b) VÀNG về 140 — số bung 9.30→12.85
    {d: 106, bar: 'red', pose: 'broke', ahCorner: 'right', ahH: 600,
      head: ['Rơi về'], size: 76,
      value: 140, suffix: ' triệu', numColor: 'red', numTop: 540, numSize: 200,
      label: ['Thấp nhất kể từ đầu năm'], labelTop: 830, labelC: 'red'},
    // 1c) NGHỊCH LÝ thế giới tăng 12.85→15.10
    {d: 68, bar: 'amber', pose: 'think', ahCorner: 'left', ahH: 600,
      head: ['Lạ đời: thế giới lại ', {t: 'TĂNG', c: 'teal'}], size: 66,
      icon: '🌍📈   ⇄   🇻🇳📉', iconTop: 560, iconSize: 110},
    // 1d) CHÊNH mua-bán 6tr 15.10→20.70
    {d: 168, bar: 'red', pose: 'worried', ahCorner: 'right', ahH: 600,
      head: ['Chênh mua–bán giãn tới'], size: 68,
      value: 6, suffix: ' triệu', numColor: 'red', numTop: 540, numSize: 190,
      label: ['Mua xong là lỗ ngay ⚠️'], labelTop: 830, labelC: 'red'},
    // 2) TỶ GIÁ 20.70→27.60
    {d: 207, bar: 'blue', pose: 'present', ahCorner: 'right', ahH: 600,
      head: ['Đô la ngân hàng vẫn ', {t: 'neo cao', c: 'blue'}], size: 66,
      value: 26300, suffix: ' đ/USD', numColor: 'blue', numTop: 540, numSize: 128,
      label: ['Hàng nhập đắt hơn — âm thầm ăn túi tiền'], labelTop: 830, labelC: 'blue'},
    // 3a) TRÚ ẨN 27.60→31.50
    {d: 117, bar: 'teal', pose: 'cool', ahCorner: 'left', ahH: 600,
      head: ['Vàng chao đảo → tiết kiệm ', {t: 'trú ẩn', c: 'teal'}], size: 60,
      icon: '🏦  🛡️', iconTop: 540, iconSize: 180},
    // 3b) LÃI 8-10% — số bung 31.50→34.50
    {d: 90, bar: 'teal', pose: 'aha', ahCorner: 'left', ahH: 600,
      head: ['Lãi kỳ hạn dài'], size: 74,
      value: 10, suffix: '%/năm', numColor: 'teal', numTop: 540, numSize: 190,
      label: ['Quanh 8–10% · tiền để yên vẫn sinh lời'], labelTop: 830, labelC: 'teal'},
    // 4a) NHÀ ĐẤT 34.50→38.80
    {d: 129, bar: 'red', pose: 'think', ahCorner: 'right', ahH: 600,
      head: ['Căn hộ HN & TP.HCM'], size: 76,
      icon: '🏢  📉', iconTop: 540, iconSize: 170,
      label: ['Giá cao · người mua thận trọng'], labelTop: 840, labelC: 'red'},
    // 4b) MẶC CẢ 38.80→41.70
    {d: 87, bar: 'navy', pose: 'sly', ahCorner: 'left', ahH: 600,
      head: ['Bên bán sốt ruột'], size: 78,
      icon: '🤝', iconTop: 540, iconSize: 200,
      label: ['Người mua cứ bình tĩnh mà chọn'], labelTop: 840, labelC: 'navy'},
    // 5a) TÓM LẠI 41.70→46.90
    {d: 156, bar: 'teal', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Tóm lại'], size: 88,
      cards: [
        {header: 'VÀNG', icon: '🎢', label: 'Đừng bắt dao rơi', c: 'red', dim: true},
        {header: 'TIẾT KIỆM', icon: '🛡️', label: 'Chỗ dựa an toàn', c: 'teal'},
      ], cardsTop: 440},
    // 5b) CTA 46.90→49.56
    {d: 80, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Giữ ví cho chặt 👛'], size: 78,
      q: ['Mai Anh Hai ', {t: 'điểm tin tiếp nhé!', c: 'gold'}]},
  ],
};

// SS01 — SJC vs Nhẫn 9999 — thu ss01.mp3 (30.7s) · neo khoảng lặng: 5.2|10.5|17.0|24.2|27.1
export const SHORT_SS01: ShortSpec = {
  slug: 'ShortSS01',
  scenes: [
    // 0) HOOK câu hỏi 0→5.2
    {d: 156, bar: 'gold', pose: 'think', ahCorner: 'right', ahH: 600,
      head: ['Mua vàng để dành:', {t: '\nSJC hay Nhẫn 9999?', c: 'red'}], size: 66,
      icon: '🥇  ⚖️  💍', iconTop: 560, iconSize: 130},
    // 1a) SJC nhảy 5.2→10.5
    {d: 159, bar: 'red', pose: 'shock', ahCorner: 'right', ahH: 600,
      head: ['Vàng miếng SJC'], size: 78,
      icon: '🥇', iconTop: 520, iconSize: 200,
      label: ['Tháng 7 nhảy dữ · có lúc ~140 triệu'], labelTop: 850, labelC: 'red'},
    // 1b) SJC chênh 6tr — số bung 10.5→17.0
    {d: 195, bar: 'red', pose: 'broke', ahCorner: 'right', ahH: 600,
      head: ['Cái đau: chênh mua–bán tới'], size: 64,
      value: 6, suffix: ' triệu', numColor: 'red', numTop: 540, numSize: 190,
      label: ['Mua xong bán lại là mất luôn'], labelTop: 830, labelC: 'red'},
    // 2) NHẪN 9999 17.0→24.2
    {d: 216, bar: 'teal', pose: 'cool', ahCorner: 'left', ahH: 600,
      head: ['Vàng nhẫn 9999'], size: 78,
      icon: '💍', iconTop: 520, iconSize: 200,
      label: ['Chênh hẹp · bán lại dễ · thanh khoản mượt'], labelTop: 850, labelC: 'teal'},
    // 3) CHỐT 2 thẻ + VS 24.2→27.1
    {d: 87, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Chốt'], size: 84,
      cards: [
        {header: 'SJC', icon: '🥇', label: 'Chênh rộng', c: 'red', dim: true},
        {header: 'NHẪN', icon: '💍', label: 'Gọn, dễ bán', c: 'teal'},
      ], cardsTop: 470},
    // 4) CTA 27.1→30.7
    {d: 108, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Bạn giữ loại nào?'], size: 80,
      q: ['Vàng miếng hay ', {t: 'vàng nhẫn?', c: 'gold'}]},
  ],
};

export const SHORT_SS02: ShortSpec = {
  slug: 'ShortSS02',
  scenes: [
    {d: 168, bar: 'gold', pose: 'think', ahCorner: 'right', ahH: 600,
      head: ['Giữ tài sản:', {t: '\nvàng hay kim cương?', c: 'gold'}], size: 64,
      icon: '💍  ⚖️  🥇', iconTop: 560, iconSize: 130},
    {d: 134, bar: 'teal', pose: 'cool', ahCorner: 'left', ahH: 600,
      head: ['Vàng: cả nước một giá'], size: 72, icon: '🥇', iconTop: 520, iconSize: 200,
      label: ['Bán đâu cũng ra tiền · chênh rõ'], labelTop: 850, labelC: 'teal'},
    {d: 205, bar: 'red', pose: 'shock', ahCorner: 'right', ahH: 600,
      head: ['Kim cương: bán lại ép lỗ tới'], size: 60,
      value: 70, suffix: '%', numColor: 'red', numTop: 540, numSize: 190,
      label: ['Mỗi viên một giá · không bảng chung'], labelTop: 850, labelC: 'red'},
    {d: 95, bar: 'red', pose: 'broke', ahCorner: 'right', ahH: 600,
      head: ['Mua 100 triệu, bán lại còn'], size: 62,
      value: 35, suffix: ' triệu', numColor: 'red', numTop: 540, numSize: 190,
      label: ['Ba bốn chục là chuyện thường'], labelTop: 850, labelC: 'red'},
    {d: 135, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Chốt'], size: 84,
      cards: [{header: 'VÀNG', icon: '🥇', label: 'Bán đâu cũng được', c: 'teal'},
              {header: 'K.CƯƠNG', icon: '💍', label: 'Ép lỗ khi bán', c: 'red', dim: true}], cardsTop: 470},
    {d: 121, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Bạn tin loại nào?'], size: 80, q: ['Vàng hay ', {t: 'kim cương?', c: 'gold'}]},
  ],
};

export const SHORT_SS03: ShortSpec = {
  slug: 'ShortSS03',
  scenes: [
    {d: 165, bar: 'gold', pose: 'think', ahCorner: 'right', ahH: 600,
      head: ['100 triệu nhàn rỗi:', {t: '\nmua vàng hay gửi bank?', c: 'gold'}], size: 62,
      icon: '🥇  ⚖️  🏦', iconTop: 560, iconSize: 130},
    {d: 199, bar: 'blue', pose: 'worried', ahCorner: 'left', ahH: 600,
      head: ['Vàng: giữ giá, chống trượt'], size: 66, icon: '🥇', iconTop: 520, iconSize: 200,
      label: ['Nhưng nằm im · không đẻ lãi'], labelTop: 850, labelC: 'blue'},
    {d: 194, bar: 'teal', pose: 'cool', ahCorner: 'right', ahH: 600,
      head: ['Gửi bank kỳ hạn dài'], size: 70,
      value: 10, suffix: '%', numColor: 'teal', numTop: 540, numSize: 190,
      label: ['Tầm 8–10%/năm · tiền đẻ đều'], labelTop: 850, labelC: 'teal'},
    {d: 99, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Chốt'], size: 84,
      cards: [{header: 'VÀNG', icon: '🥇', label: 'Để trú ẩn', c: 'blue'},
              {header: 'BANK', icon: '🏦', label: 'Tiền tự lớn', c: 'teal'}], cardsTop: 470},
    {d: 97, bar: 'teal', pose: 'aha', ahCorner: 'left', ahH: 600,
      head: ['Người khôn thì', {t: '\nchia đôi', c: 'teal'}], size: 72,
      label: ['Giữ chút vàng · gửi chút bank'], labelTop: 850, labelC: 'teal'},
    {d: 79, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Bạn nghiêng bên nào?'], size: 78, q: ['Vàng hay ', {t: 'bank?', c: 'teal'}]},
  ],
};

export const SHORT_SS04: ShortSpec = {
  slug: 'ShortSS04',
  scenes: [
    {d: 169, bar: 'gold', pose: 'think', ahCorner: 'right', ahH: 600,
      head: ['Sợ mất giá:', {t: '\nôm vàng hay ôm đô?', c: 'gold'}], size: 64,
      icon: '🥇  ⚖️  💵', iconTop: 560, iconSize: 130},
    {d: 191, bar: 'blue', pose: 'cool', ahCorner: 'left', ahH: 600,
      head: ['Đô Mỹ ở ngân hàng'], size: 68,
      value: 26300, suffix: ' đ', numColor: 'blue', numTop: 540, numSize: 130,
      label: ['Đi lì · nhích từng chút · ít thót tim'], labelTop: 850, labelC: 'blue'},
    {d: 199, bar: 'amber', pose: 'worried', ahCorner: 'right', ahH: 600,
      head: ['Vàng: chống lạm phát mạnh'], size: 60, icon: '🥇', iconTop: 520, iconSize: 190,
      label: ['Biến động cao · nhảy mấy triệu/lượng'], labelTop: 850, labelC: 'amber'},
    {d: 127, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Chốt'], size: 84,
      cards: [{header: 'ĐÔ', icon: '💵', label: 'Êm, ít sóng', c: 'blue'},
              {header: 'VÀNG', icon: '🥇', label: 'Sóng, giữ giá', c: 'amber'}], cardsTop: 470},
    {d: 85, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Bạn team nào?'], size: 80, q: ['Team đô hay ', {t: 'team vàng?', c: 'gold'}]},
  ],
};

export const SHORT_SS05: ShortSpec = {
  slug: 'ShortSS05',
  scenes: [
    {d: 189, bar: 'gold', pose: 'think', ahCorner: 'right', ahH: 600,
      head: ['Mùng 10 vía Thần Tài:', {t: '\nmua vàng lấy vía?', c: 'gold'}], size: 60,
      icon: '🧧  🥇  📈', iconTop: 560, iconSize: 130},
    {d: 234, bar: 'red', pose: 'worried', ahCorner: 'right', ahH: 600,
      head: ['Ngày vía: giá bị đẩy cao'], size: 62,
      value: 3, suffix: ' triệu', numColor: 'red', numTop: 540, numSize: 190,
      label: ['Mua xong vài ngày lỗ 1–3 triệu/lượng'], labelTop: 850, labelC: 'red'},
    {d: 124, bar: 'teal', pose: 'cool', ahCorner: 'left', ahH: 600,
      head: ['Mua ngày thường'], size: 74, icon: '📅', iconTop: 520, iconSize: 190,
      label: ['Không ai chen · giá bình tĩnh · nền tốt'], labelTop: 850, labelC: 'teal'},
    {d: 104, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Chốt'], size: 84,
      cards: [{header: 'NGÀY VÍA', icon: '🧧', label: 'Được tinh thần', c: 'red', dim: true},
              {header: 'NGÀY THƯỜNG', icon: '📅', label: 'Được giá tốt', c: 'teal'}], cardsTop: 470},
    {d: 120, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Bạn từng mua vía chưa?'], size: 74, q: ['Lời hay ', {t: 'lỗ?', c: 'red'}]},
  ],
};

export const SHORT_SS06: ShortSpec = {
  slug: 'ShortSS06',
  scenes: [
    {d: 172, bar: 'navy', pose: 'think', ahCorner: 'right', ahH: 620,
      head: ['Gửi tiết kiệm:', {t: '\nRa quầy hay Online?', c: 'gold'}], size: 62,
      icon: '🏦  ⚖️  📱', iconTop: 560, iconSize: 130},
    {d: 170, bar: 'teal', pose: 'aha', ahCorner: 'left', ahH: 600,
      head: ['Bấm online nhỉnh hơn'], size: 74, icon: '📱', iconTop: 520, iconSize: 200,
      label: ['Cùng bank, cùng kỳ hạn · tới ~nửa % mỗi năm'], labelTop: 850, labelC: 'teal'},
    {d: 208, bar: 'amber', pose: 'present', ahCorner: 'right', ahH: 600,
      head: ['Nghe bé mà cộng dồn lớn'], size: 62, icon: '💰', iconTop: 540, iconSize: 180,
      label: ['Vài trăm triệu · dăm bảy năm dồn lại'], labelTop: 850, labelC: 'amber'},
    {d: 121, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Chốt'], size: 84,
      cards: [{header: 'RA QUẦY', icon: '🏦', label: 'Lãi thấp hơn', c: 'red', dim: true},
              {header: 'ONLINE', icon: '📱', label: 'Nhỉnh hơn', c: 'teal'}], cardsTop: 460},
    {d: 103, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Nhà mình gửi kiểu nào?'], size: 74, q: ['Ra quầy hay ', {t: 'bấm online?', c: 'gold'}]},
  ],
};

export const SHORT_SS07: ShortSpec = {
  slug: 'ShortSS07',
  scenes: [
    {d: 153, bar: 'navy', pose: 'think', ahCorner: 'right', ahH: 620,
      head: ['Gửi kỳ hạn nào:', {t: '\n6 hay 12 tháng?', c: 'gold'}], size: 64,
      icon: '📅  ⚖️  📅', iconTop: 560, iconSize: 120},
    {d: 185, bar: 'blue', pose: 'cool', ahCorner: 'left', ahH: 600,
      head: ['Kỳ hạn 6 tháng'], size: 76,
      value: 8, suffix: '%', numColor: 'blue', numTop: 500, numSize: 170,
      label: ['~5,5–8%/năm · linh hoạt, dễ rút'], labelTop: 850, labelC: 'blue'},
    {d: 170, bar: 'teal', pose: 'present', ahCorner: 'right', ahH: 600,
      head: ['Kỳ hạn 12 tháng'], size: 76,
      value: 10, suffix: '%', numColor: 'teal', numTop: 500, numSize: 170,
      label: ['~8–10%/năm · nhưng giam cả năm'], labelTop: 850, labelC: 'teal'},
    {d: 146, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Chốt'], size: 84,
      cards: [{header: '6 THÁNG', icon: '📅', label: 'Linh hoạt', c: 'blue'},
              {header: '12 THÁNG', icon: '🔒', label: 'Lãi cao hơn', c: 'teal'}], cardsTop: 460},
    {d: 110, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Bạn gửi bao lâu?'], size: 80, q: ['Yên tâm ', {t: 'mấy tháng?', c: 'gold'}]},
  ],
};

export const SHORT_SS08: ShortSpec = {
  slug: 'ShortSS08',
  scenes: [
    {d: 202, bar: 'navy', pose: 'sly', ahCorner: 'right', ahH: 620,
      head: ['Lãi cao gấp rưỡi:', {t: '\ntin không?', c: 'red'}], size: 66,
      icon: '🏦  ⚖️  📜', iconTop: 560, iconSize: 120},
    {d: 175, bar: 'teal', pose: 'cool', ahCorner: 'left', ahH: 600,
      head: ['Gửi tiết kiệm'], size: 76,
      value: 10, suffix: '%', numColor: 'teal', numTop: 500, numSize: 170,
      label: ['~5,5–10% · có bảo hiểm, ngủ ngon'], labelTop: 850, labelC: 'teal'},
    {d: 234, bar: 'red', pose: 'worried', ahCorner: 'right', ahH: 600,
      head: ['Trái phiếu doanh nghiệp'], size: 60,
      value: 12, suffix: '%', numColor: 'red', numTop: 520, numSize: 180,
      label: ['~9–12% · từng có vụ chậm trả gốc lãi'], labelTop: 850, labelC: 'red'},
    {d: 94, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Chốt'], size: 84,
      cards: [{header: 'TIẾT KIỆM', icon: '🏦', label: 'Ngủ ngon', c: 'teal'},
              {header: 'TRÁI PHIẾU', icon: '📜', label: 'Cao = rủi ro', c: 'red', dim: true}], cardsTop: 460},
    {d: 102, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Bạn thuộc team nào?'], size: 78, q: ['Ngủ ngon hay ', {t: 'lãi cao?', c: 'gold'}]},
  ],
};

export const SHORT_SS09: ShortSpec = {
  slug: 'ShortSS09',
  scenes: [
    {d: 166, bar: 'navy', pose: 'think', ahCorner: 'right', ahH: 620,
      head: ['Bank nhỏ lãi cao hơn:', {t: '\nchuyển không?', c: 'gold'}], size: 58,
      icon: '🏦  ⚖️  🏛️', iconTop: 560, iconSize: 120},
    {d: 154, bar: 'blue', pose: 'present', ahCorner: 'left', ahH: 600,
      head: ['Ngân hàng nhỏ'], size: 78, icon: '🏦', iconTop: 520, iconSize: 200,
      label: ['Đẩy lãi cao để hút vốn · chênh là thật'], labelTop: 850, labelC: 'blue'},
    {d: 152, bar: 'teal', pose: 'cool', ahCorner: 'right', ahH: 600,
      head: ['Ngân hàng lớn'], size: 78, icon: '🏛️', iconTop: 520, iconSize: 200,
      label: ['Thương hiệu quen · cảm giác an tâm'], labelTop: 850, labelC: 'teal'},
    {d: 118, bar: 'gold', pose: 'aha', ahCorner: 'right', ahH: 600,
      head: ['Điểm mấu chốt'], size: 70, icon: '🛡️', iconTop: 520, iconSize: 190,
      label: ['Gửi đâu cũng có bảo hiểm tiền gửi'], labelTop: 850, labelC: 'gold'},
    {d: 144, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Chốt'], size: 84,
      cards: [{header: 'NHỎ', icon: '🏦', label: 'Lãi cao hơn', c: 'blue'},
              {header: 'LỚN', icon: '🏛️', label: 'An tâm hơn', c: 'teal'}], cardsTop: 460},
    {d: 101, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Nhà mình gửi đâu?'], size: 78, q: ['Ngân hàng ', {t: 'lớn hay nhỏ?', c: 'gold'}]},
  ],
};

export const SHORT_SS10: ShortSpec = {
  slug: 'ShortSS10',
  scenes: [
    {d: 168, bar: 'navy', pose: 'worried', ahCorner: 'right', ahH: 620,
      head: ['Kẹt tiền gấp:', {t: '\nrút sổ liền?', c: 'red'}], size: 66,
      icon: '🏦  ⚖️  ✂️', iconTop: 560, iconSize: 120},
    {d: 190, bar: 'red', pose: 'broke', ahCorner: 'left', ahH: 600,
      head: ['Rút sổ trước hạn'], size: 72, icon: '✂️', iconTop: 520, iconSize: 200,
      label: ['Lãi tính lại không kỳ hạn · mất gần sạch lãi'], labelTop: 850, labelC: 'red'},
    {d: 208, bar: 'teal', pose: 'cool', ahCorner: 'right', ahH: 600,
      head: ['Vay cầm cố sổ'], size: 74,
      value: 2, suffix: '%', numColor: 'teal', numTop: 520, numSize: 170,
      label: ['Giữ sổ chạy tiếp · chỉ trả thêm ~1–2%'], labelTop: 850, labelC: 'teal'},
    {d: 68, bar: 'blue', pose: 'point', ahCorner: 'right', ahH: 620,
      head: ['Vay ngắn vài tuần,', {t: '\nphần chênh bé tí', c: 'teal'}], size: 66},
    {d: 63, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Chốt'], size: 84,
      cards: [{header: 'RÚT SỔ', icon: '✂️', label: 'Mất sạch lãi', c: 'red', dim: true},
              {header: 'CẦM CỐ', icon: '🏦', label: 'Giữ lãi, +1–2%', c: 'teal'}], cardsTop: 460},
    {d: 100, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Bạn từng rút non chưa?'], size: 74, q: ['Phá sổ hay ', {t: 'cầm cố?', c: 'gold'}]},
  ],
};

export const SHORT_SS11: ShortSpec = {
  slug: 'ShortSS11',
  scenes: [
    {d: 151, bar: 'blue', pose: 'think', ahCorner: 'right', ahH: 600,
      head: ['Thuê trọ 10 năm,', {t: '\ntiền bay mỗi tháng?', c: 'red'}], size: 64,
      icon: '🏠  ⚖️  🔑', iconTop: 560, iconSize: 120},
    {d: 194, bar: 'blue', pose: 'cool', ahCorner: 'left', ahH: 600,
      head: ['Bên THUÊ'], size: 78, icon: '🏠', iconTop: 520, iconSize: 200,
      label: ['Nhẹ gánh mỗi tháng · 10 năm vẫn trắng tay chỗ ở'], labelTop: 850, labelC: 'blue'},
    {d: 214, bar: 'red', pose: 'broke', ahCorner: 'right', ahH: 600,
      head: ['MUA trả góp · thả nổi lên'], size: 62,
      value: 15, suffix: '%', numColor: 'red', numTop: 540, numSize: 180,
      label: ['Ưu đãi 6-8% rồi bung · gánh nặng thật'], labelTop: 830, labelC: 'red'},
    {d: 71, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Chủ động hay không?'], size: 76},
    {d: 151, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Nằm ở kỷ luật để dành'], size: 64,
      cards: [{header: 'THUÊ', icon: '🏠', label: 'Nhẹ, linh hoạt', c: 'blue'},
              {header: 'MUA', icon: '🔑', label: 'Có nhà, gánh lãi', c: 'teal'}], cardsTop: 470},
    {d: 97, bar: 'navy', pose: 'present', ahCorner: 'right', ahH: 700,
      head: ['Nhà mình sao rồi?'], size: 80, q: ['Đang thuê hay ', {t: 'đang trả góp?', c: 'gold'}]},
  ],
};

export const SHORT_SS12: ShortSpec = {
  slug: 'ShortSS12',
  scenes: [
    {d: 137, bar: 'gold', pose: 'think', ahCorner: 'right', ahH: 600,
      head: ['Vài tỷ trong tay:', {t: '\nchung cư hay thổ cư?', c: 'red'}], size: 62,
      icon: '🏢  ⚖️  🏘️', iconTop: 560, iconSize: 120},
    {d: 194, bar: 'teal', pose: 'cool', ahCorner: 'left', ahH: 600,
      head: ['Chung cư'], size: 78, icon: '🏢', iconTop: 520, iconSize: 200,
      label: ['Khấu hao · nhưng cực dễ cho thuê, dòng tiền đều'], labelTop: 850, labelC: 'teal'},
    {d: 126, bar: 'amber', pose: 'aha', ahCorner: 'right', ahH: 600,
      head: ['Nhà thổ cư gắn với đất'], size: 66, icon: '🏘️', iconTop: 520, iconSize: 190,
      label: ['Đất giữ giá theo thời gian · nghe là mê'], labelTop: 850, labelC: 'amber'},
    {d: 172, bar: 'red', pose: 'worried', ahCorner: 'right', ahH: 600,
      head: ['Thị trường đứng · tồn kho'], size: 60,
      value: 500, suffix: ' nghìn tỷ', numColor: 'red', numTop: 540, numSize: 150,
      label: ['Rao nửa năm chưa chắc có khách'], labelTop: 830, labelC: 'red'},
    {d: 106, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Chốt'], size: 84,
      cards: [{header: 'CHUNG CƯ', icon: '🏢', label: 'Hao giá, dễ bán', c: 'teal'},
              {header: 'THỔ CƯ', icon: '🏘️', label: 'Giữ giá, kén khách', c: 'amber'}], cardsTop: 470},
    {d: 80, bar: 'navy', pose: 'present', ahCorner: 'right', ahH: 700,
      head: ['Bạn cần cái nào hơn?'], size: 78, q: ['Dòng tiền hay ', {t: 'giữ giá?', c: 'gold'}]},
  ],
};

export const SHORT_SS13: ShortSpec = {
  slug: 'ShortSS13',
  scenes: [
    {d: 129, bar: 'gold', pose: 'think', ahCorner: 'right', ahH: 600,
      head: ['Cùng mua một căn nhà,', {t: '\nhai số phận khác nhau', c: 'red'}], size: 60,
      icon: '🏠  ⚖️  📉', iconTop: 560, iconSize: 120},
    {d: 227, bar: 'blue', pose: 'worried', ahCorner: 'left', ahH: 600,
      head: ['Mua để Ở · vay trả góp'], size: 62,
      value: 15, suffix: '%', numColor: 'red', numTop: 540, numSize: 180,
      label: ['Lãi thả nổi tới 15% · nhưng có chỗ ở, kệ thị trường'], labelTop: 830, labelC: 'blue'},
    {d: 113, bar: 'amber', pose: 'greedy', ahCorner: 'right', ahH: 600,
      head: ['Người LƯỚT SÓNG'], size: 74, icon: '🏠', iconTop: 520, iconSize: 190,
      label: ['Ôm nhà chờ tăng giá · tính vài tháng ra hàng'], labelTop: 850, labelC: 'amber'},
    {d: 142, bar: 'red', pose: 'broke', ahCorner: 'right', ahH: 600,
      head: ['Thị trường đứng · rao mãi'], size: 64, icon: '📉', iconTop: 520, iconSize: 190,
      label: ['Không ai mua · mà lãi vẫn đếm từng ngày'], labelTop: 850, labelC: 'red'},
    {d: 81, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Kẹt đúng người tưởng khôn'], size: 60,
      cards: [{header: 'ĐỂ Ở', icon: '🔑', label: 'Có nhà, trụ được', c: 'teal'},
              {header: 'LƯỚT SÓNG', icon: '📉', label: 'Kẹt dòng tiền', c: 'red'}], cardsTop: 470},
    {d: 107, bar: 'navy', pose: 'present', ahCorner: 'right', ahH: 700,
      head: ['Nhà mình thấy ai kẹt chưa?'], size: 66, q: ['Ai lướt sóng ', {t: 'bị kẹt hàng?', c: 'gold'}]},
  ],
};

export const SHORT_SS14: ShortSpec = {
  slug: 'ShortSS14',
  scenes: [
    {d: 174, bar: 'gold', pose: 'sly', ahCorner: 'right', ahH: 600,
      head: ['NH báo lãi 6%,', {t: '\nmừng vội không?', c: 'red'}], size: 64,
      icon: '🏦  📄  ⚠️', iconTop: 560, iconSize: 120},
    {d: 135, bar: 'teal', pose: 'cool', ahCorner: 'left', ahH: 600,
      head: ['Lãi CỐ ĐỊNH'], size: 78, icon: '🔒', iconTop: 520, iconSize: 200,
      label: ['Cao hơn chút từ đầu · nhưng biết trước, ngủ ngon'], labelTop: 850, labelC: 'teal'},
    {d: 196, bar: 'red', pose: 'shock', ahCorner: 'right', ahH: 600,
      head: ['Lãi THẢ NỔI · năm 2 nhảy lên'], size: 58,
      value: 15, suffix: '%', numColor: 'red', numTop: 540, numSize: 180,
      label: ['Ưu đãi 6-8% cho ghiền · rồi bung'], labelTop: 830, labelC: 'red'},
    {d: 107, bar: 'red', pose: 'broke', ahCorner: 'right', ahH: 600,
      head: ['Tiền trả phình cả nửa'], size: 66, icon: '📈', iconTop: 520, iconSize: 190,
      label: ['Mà lương vẫn đứng im một chỗ'], labelTop: 850, labelC: 'red'},
    {d: 129, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Bẫy ở dòng chữ nhỏ'], size: 66,
      cards: [{header: 'CỐ ĐỊNH', icon: '🔒', label: 'Biết trước, yên', c: 'teal'},
              {header: 'THẢ NỔI', icon: '⚠️', label: 'Sau đó bung', c: 'red'}], cardsTop: 470},
    {d: 95, bar: 'navy', pose: 'present', ahCorner: 'right', ahH: 700,
      head: ['Đọc kỹ hợp đồng chưa?'], size: 72, q: ['Nhà mình vay ', {t: 'loại lãi nào?', c: 'gold'}]},
  ],
};

export const SHORT_SS15: ShortSpec = {
  slug: 'ShortSS15',
  scenes: [
    {d: 195, bar: 'gold', pose: 'think', ahCorner: 'right', ahH: 600,
      head: ['Sốt đất tỉnh lời gấp đôi:', {t: '\ncần tiền, bán được không?', c: 'red'}], size: 58,
      icon: '🏞️  ⚖️  🏙️', iconTop: 560, iconSize: 120},
    {d: 185, bar: 'red', pose: 'worried', ahCorner: 'right', ahH: 600,
      head: ['Đất TỈNH lúc sốt'], size: 74, icon: '🏞️', iconTop: 520, iconSize: 190,
      label: ['Tăng vù vù · thị trường đứng là ế, rao cả năm vẫn ế'], labelTop: 850, labelC: 'red'},
    {d: 224, bar: 'teal', pose: 'cool', ahCorner: 'left', ahH: 600,
      head: ['Đất/nhà THÀNH PHỐ · giá cao'], size: 56,
      value: 90, suffix: ' tr/m²', numColor: 'teal', numTop: 540, numSize: 150,
      label: ['Nhưng luôn có người hỏi · cần là bán, ra tiền nhanh'], labelTop: 830, labelC: 'teal'},
    {d: 122, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Bán được mới là tiền thật'], size: 62,
      cards: [{header: 'ĐẤT TỈNH', icon: '🏞️', label: 'Lời trên giấy', c: 'red'},
              {header: 'THÀNH PHỐ', icon: '🏙️', label: 'Thanh khoản khỏe', c: 'teal'}], cardsTop: 470},
    {d: 89, bar: 'navy', pose: 'present', ahCorner: 'right', ahH: 700,
      head: ['Nhà mình ôm đất ở đâu?'], size: 72, q: ['Đất tỉnh hay ', {t: 'thành phố?', c: 'gold'}]},
  ],
};

export const SHORT_SS16: ShortSpec = {
  slug: 'ShortSS16',
  scenes: [
    {d: 206, bar: 'gold', pose: 'think', ahCorner: 'right', ahH: 600,
      head: ['Trả góp 0%:', {t: '\nthật sự 0 đồng?', c: 'red'}], size: 66,
      icon: '💳  ⚖️  🧾', iconTop: 560, iconSize: 130},
    {d: 163, bar: 'teal', pose: 'cool', ahCorner: 'left', ahH: 600,
      head: ['Trả thẳng'], size: 78, icon: '💵', iconTop: 520, iconSize: 200,
      label: ['Đúng bằng giá niêm yết · hết'], labelTop: 850, labelC: 'teal'},
    {d: 190, bar: 'red', pose: 'shock', ahCorner: 'right', ahH: 600,
      head: ['Trả góp 0% kèm phí'], size: 64,
      value: 3, suffix: ' %/tháng', numColor: 'red', numTop: 540, numSize: 180,
      label: ['Phí chuyển đổi + phí hồ sơ'], labelTop: 830, labelC: 'red'},
    {d: 91, bar: 'amber', pose: 'worried', ahCorner: 'right', ahH: 600,
      head: ['Món hàng đội thêm', {t: '\nvài % mà không hay', c: 'amber'}], size: 60},
    {d: 79, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Chốt'], size: 84,
      cards: [{header: 'TRẢ THẲNG', icon: '💵', label: 'Đúng giá', c: 'teal'},
              {header: 'GÓP 0%', icon: '🧾', label: 'Có phí ẩn', c: 'red', dim: true}], cardsTop: 470},
    {d: 104, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Bạn từng dính phí ẩn?'], size: 76, q: ['Lãi 0% mà ', {t: 'phí khác 0', c: 'gold'}]},
  ],
};

export const SHORT_SS17: ShortSpec = {
  slug: 'ShortSS17',
  scenes: [
    {d: 188, bar: 'gold', pose: 'think', ahCorner: 'right', ahH: 600,
      head: ['Điện thoại mới:', {t: '\ntrả góp hay để dành?', c: 'red'}], size: 64,
      icon: '📱  ⚖️  💰', iconTop: 560, iconSize: 130},
    {d: 73, bar: 'teal', pose: 'cool', ahCorner: 'left', ahH: 600,
      head: ['Mua đứt'], size: 78, icon: '📱', iconTop: 520, iconSize: 200,
      label: ['Trả đúng giá máy · xong chuyện'], labelTop: 850, labelC: 'teal'},
    {d: 206, bar: 'red', pose: 'shock', ahCorner: 'right', ahH: 600,
      head: ['Trả góp đội thêm lãi + phí'], size: 60,
      value: 15, suffix: ' %', numColor: 'red', numTop: 540, numSize: 190,
      label: ['Tùy gói · tùy nơi'], labelTop: 830, labelC: 'red'},
    {d: 113, bar: 'amber', pose: 'worried', ahCorner: 'right', ahH: 600,
      head: ['Máy 15 triệu,', {t: '\nchênh bằng 1 tai nghe xịn', c: 'amber'}], size: 60},
    {d: 121, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Chốt'], size: 84,
      cards: [{header: 'MUA ĐỨT', icon: '💵', label: 'Đúng giá', c: 'teal'},
              {header: 'TRẢ GÓP', icon: '🧾', label: 'Cộng lại nặng', c: 'red', dim: true}], cardsTop: 470},
    {d: 112, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Bạn thuộc phe nào?'], size: 80, q: ['Cầm liền hay ', {t: 'chờ đủ tiền?', c: 'gold'}]},
  ],
};

export const SHORT_SS18: ShortSpec = {
  slug: 'ShortSS18',
  scenes: [
    {d: 153, bar: 'gold', pose: 'think', ahCorner: 'right', ahH: 600,
      head: ['Ly cà phê 30k mỗi sáng:', {t: '\nchuyện nhỏ?', c: 'red'}], size: 62,
      icon: '☕  ⚖️  💰', iconTop: 560, iconSize: 130},
    {d: 123, bar: 'red', pose: 'shock', ahCorner: 'right', ahH: 600,
      head: ['Uống hết mỗi năm'], size: 68,
      value: 11, suffix: ' triệu', numColor: 'red', numTop: 540, numSize: 180,
      label: ['30k/ngày ≈ 900k/tháng'], labelTop: 830, labelC: 'red'},
    {d: 206, bar: 'teal', pose: 'cool', ahCorner: 'left', ahH: 600,
      head: ['Để dành + lãi kép 10 năm'], size: 60,
      value: 100, suffix: ' triệu', numColor: 'teal', numTop: 540, numSize: 180,
      label: ['Có thể phình vài chục tới cả trăm'], labelTop: 830, labelC: 'teal'},
    {d: 152, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 620,
      head: ['Kẻ "ăn" tiền:', {t: '\nthói quen × thời gian', c: 'gold'}], size: 62},
    {d: 59, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Chốt'], size: 84,
      cards: [{header: 'UỐNG HẾT', icon: '☕', label: 'Bay mỗi ngày', c: 'red', dim: true},
              {header: 'ĐỂ DÀNH', icon: '💰', label: 'Lãi đẻ lãi', c: 'teal'}], cardsTop: 470},
    {d: 122, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Ngày bạn "uống" mất bao nhiêu?'], size: 62, q: ['Không bắt nhịn, ', {t: 'chỉ hỏi vui', c: 'gold'}]},
  ],
};

export const SHORT_SS19: ShortSpec = {
  slug: 'ShortSS19',
  scenes: [
    {d: 132, bar: 'gold', pose: 'think', ahCorner: 'right', ahH: 600,
      head: ['Mua xe mới,', {t: '\nmùi thơm ai cũng mê?', c: 'red'}], size: 64,
      icon: '🚗  ⚖️  🔑', iconTop: 560, iconSize: 130},
    {d: 200, bar: 'red', pose: 'shock', ahCorner: 'right', ahH: 600,
      head: ['Vừa lăn bánh đã mất giá'], size: 60,
      value: 10, suffix: ' %', numColor: 'red', numTop: 540, numSize: 190,
      label: ['Đổi từ "mới" sang "đã dùng"'], labelTop: 830, labelC: 'red'},
    {d: 108, bar: 'red', pose: 'broke', ahCorner: 'right', ahH: 600,
      head: ['Chạy 3 năm, bốc hơi'], size: 62,
      value: 40, suffix: ' %', numColor: 'red', numTop: 540, numSize: 190,
      label: ['Giá trị rơi 30 tới 40%'], labelTop: 830, labelC: 'red'},
    {d: 147, bar: 'teal', pose: 'cool', ahCorner: 'left', ahH: 600,
      head: ['Xe cũ ngon lành'], size: 74, icon: '🚙', iconTop: 520, iconSize: 200,
      label: ['Qua đoạn mất giá đau nhất · đỡ lỗ'], labelTop: 850, labelC: 'teal'},
    {d: 121, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Chốt'], size: 84,
      cards: [{header: 'XE MỚI', icon: '🚗', label: 'Gánh mất giá', c: 'red', dim: true},
              {header: 'XE CŨ', icon: '🚙', label: 'Đỡ lỗ hơn', c: 'teal'}], cardsTop: 470},
    {d: 117, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Bạn chọn kiểu nào?'], size: 80, q: ['Cảm giác mới hay ', {t: 'đỡ lỗ?', c: 'gold'}]},
  ],
};

export const SHORT_SS20: ShortSpec = {
  slug: 'ShortSS20',
  scenes: [
    {d: 218, bar: 'gold', pose: 'think', ahCorner: 'right', ahH: 600,
      head: ['Sale giảm 50%:', {t: '\nmua đi kẻo lỡ?', c: 'red'}], size: 64,
      icon: '🏷️  ⚖️  🛒', iconTop: 560, iconSize: 130},
    {d: 96, bar: 'amber', pose: 'sly', ahCorner: 'right', ahH: 600,
      head: ['Tiết kiệm là tiêu ít đi,', {t: '\nhay mua nhiều giá rẻ?', c: 'amber'}], size: 60},
    {d: 160, bar: 'red', pose: 'shock', ahCorner: 'right', ahH: 600,
      head: ['Mua 3 món chỉ cần 1'], size: 68, icon: '🛒', iconTop: 520, iconSize: 200,
      label: ['Tổng tiền ra khỏi ví vẫn tăng'], labelTop: 850, labelC: 'red'},
    {d: 120, bar: 'teal', pose: 'cool', ahCorner: 'left', ahH: 600,
      head: ['Người "không mua gì"'], size: 70, icon: '💰', iconTop: 520, iconSize: 200,
      label: ['Cuối tháng lại là người còn tiền'], labelTop: 850, labelC: 'teal'},
    {d: 126, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Chốt'], size: 84,
      cards: [{header: 'SĂN SALE', icon: '🛒', label: 'Mua thừa món', c: 'red', dim: true},
              {header: 'KHÔNG MUA', icon: '💰', label: 'Còn tiền', c: 'teal'}], cardsTop: 470},
    {d: 108, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Mùa sale bạn ôm gì về?'], size: 72, q: ['Bẫy ở ', {t: 'món chẳng cần', c: 'gold'}]},
  ],
};

export const SHORT_SS21: ShortSpec = {
  slug: 'ShortSS21',
  scenes: [
    {d: 162, bar: 'gold', pose: 'think', ahCorner: 'right', ahH: 600,
      head: ['Quẹt thẻ miễn lãi', {t: '\n~45 ngày, tiện thật?', c: 'gold'}], size: 66,
      icon: '💳', iconTop: 540, iconSize: 200},
    {d: 96, bar: 'teal', pose: 'cool', ahCorner: 'left', ahH: 600,
      head: ['Tiền mặt'], size: 80, icon: '💵', iconTop: 520, iconSize: 200,
      label: ['Ví mỏng đi là tự khắc chùn tay'], labelTop: 850, labelC: 'teal'},
    {d: 225, bar: 'red', pose: 'shock', ahCorner: 'right', ahH: 600,
      head: ['Thẻ tín dụng: tiêu chưa thấy đau'], size: 60,
      value: 40, suffix: '%', numColor: 'red', numTop: 500, numSize: 190,
      label: ['Trả chậm, rút tiền mặt: lãi ~20–40%/năm'], labelTop: 840, labelC: 'red'},
    {d: 74, bar: 'amber', pose: 'worried', ahCorner: 'right', ahH: 600,
      head: ['Miễn lãi chỉ đúng khi', {t: '\ntrả đủ, đúng hạn', c: 'amber'}], size: 64},
    {d: 118, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Chốt'], size: 84,
      cards: [{header: 'TIỀN MẶT', icon: '💵', label: 'Thấy là chùn', c: 'teal'},
              {header: 'THẺ', icon: '💳', label: 'Dễ quên, lãi cao', c: 'red', dim: true}], cardsTop: 470},
    {d: 132, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Tới kỳ sao kê có giật mình?'], size: 70, q: ['Bạn xài thẻ hay ', {t: 'tiền mặt?', c: 'gold'}]},
  ],
};

export const SHORT_SS22: ShortSpec = {
  slug: 'ShortSS22',
  scenes: [
    {d: 199, bar: 'gold', pose: 'think', ahCorner: 'right', ahH: 600,
      head: ['Gói "2 trong 1":', {t: '\nvừa bảo vệ vừa tích lũy?', c: 'gold'}], size: 60,
      icon: '🛡️  ➕  💰', iconTop: 560, iconSize: 120},
    {d: 182, bar: 'amber', pose: 'present', ahCorner: 'right', ahH: 600,
      head: ['Gói gộp'], size: 80, icon: '📦', iconTop: 520, iconSize: 200,
      label: ['Tiện, nhưng phần tích lũy lãi thường thấp'], labelTop: 850, labelC: 'amber'},
    {d: 239, bar: 'teal', pose: 'cool', ahCorner: 'left', ahH: 600,
      head: ['Tách ra'], size: 80, icon: '🛡️  📈', iconTop: 520, iconSize: 150,
      label: ['Bảo hiểm tử kỳ rẻ + tự đầu tư riêng'], labelTop: 850, labelC: 'teal'},
    {d: 86, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Chốt'], size: 84,
      cards: [{header: 'GỘP', icon: '📦', label: 'Lãi thấp', c: 'amber', dim: true},
              {header: 'TÁCH', icon: '📈', label: 'Linh hoạt hơn', c: 'teal'}], cardsTop: 470},
    {d: 93, bar: 'navy', pose: 'sly', ahCorner: 'right', ahH: 600,
      head: ['"Hai trong một" nghe gọn,', {t: '\nchưa chắc là món hời', c: 'gold'}], size: 60},
    {d: 98, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Còn tùy nhu cầu mỗi nhà'], size: 74, q: ['Bạn phe gộp hay ', {t: 'phe tách?', c: 'teal'}]},
  ],
};

export const SHORT_SS23: ShortSpec = {
  slug: 'ShortSS23',
  scenes: [
    {d: 169, bar: 'gold', pose: 'think', ahCorner: 'right', ahH: 600,
      head: ['"Lương ba cọc,', {t: '\nđợi giàu rồi đầu tư sau"?', c: 'gold'}], size: 62,
      icon: '⏳', iconTop: 540, iconSize: 200},
    {d: 228, bar: 'teal', pose: 'cool', ahCorner: 'left', ahH: 600,
      head: ['Bạn A · 22 tuổi'], size: 76, icon: '🌱', iconTop: 520, iconSize: 200,
      label: ['Bỏ chút xíu mỗi tháng, nhưng đều và sớm'], labelTop: 850, labelC: 'teal'},
    {d: 115, bar: 'red', pose: 'worried', ahCorner: 'right', ahH: 600,
      head: ['Bạn B · ngoài 30'], size: 76, icon: '⏰', iconTop: 520, iconSize: 200,
      label: ['Bắt đầu trễ, phải bỏ gấp mấy lần'], labelTop: 850, labelC: 'red'},
    {d: 159, bar: 'navy', pose: 'aha', ahCorner: 'right', ahH: 600,
      head: ['Về hưu, bạn A lại nhỉnh hơn!'], size: 60,
      icon: '📈', iconTop: 500, iconSize: 190,
      label: ['Làm giàu là THỜI GIAN, để lãi đẻ ra lãi'], labelTop: 850, labelC: 'gold'},
    {d: 114, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Chốt'], size: 84,
      cards: [{header: 'SỚM', icon: '🌱', label: 'Thời gian dài', c: 'teal'},
              {header: 'TRỄ', icon: '⏰', label: 'Đuổi mệt hơn', c: 'red', dim: true}], cardsTop: 470},
    {d: 116, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Bạn để dành từ khi nào?'], size: 68, q: ['Bắt đầu ', {t: 'sớm', c: 'teal'}, ' hay ', {t: 'để đó?', c: 'red'}]},
  ],
};

export const SHORT_SS24: ShortSpec = {
  slug: 'ShortSS24',
  scenes: [
    {d: 143, bar: 'gold', pose: 'think', ahCorner: 'right', ahH: 600,
      head: ['Không phải lời khuyên nha.', {t: '\nCó 10 năm, để tiền đâu?', c: 'gold'}], size: 58,
      icon: '💰  ⚖️  📈', iconTop: 560, iconSize: 120},
    {d: 177, bar: 'teal', pose: 'cool', ahCorner: 'left', ahH: 600,
      head: ['Gửi tiết kiệm: êm ru'], size: 66,
      value: 10, suffix: '%', numColor: 'teal', numTop: 500, numSize: 190,
      label: ['Chừng 8–10%/năm, ngủ ngon, lời tà tà'], labelTop: 840, labelC: 'teal'},
    {d: 206, bar: 'red', pose: 'shock', ahCorner: 'right', ahH: 600,
      head: ['Cổ phiếu dài hạn'], size: 76, icon: '📈', iconTop: 520, iconSize: 200,
      label: ['Kỳ vọng cao hơn, nhưng tim đập chân run'], labelTop: 850, labelC: 'red'},
    {d: 171, bar: 'navy', pose: 'aha', ahCorner: 'right', ahH: 600,
      head: ['Đổi bình yên lấy', {t: '\ncơ hội lời nhiều hơn', c: 'gold'}], size: 64,
      label: ['Mà cơ hội thì không có gì chắc'], labelTop: 850, labelC: 'amber'},
    {d: 128, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Chốt'], size: 84,
      cards: [{header: 'TIẾT KIỆM', icon: '💰', label: 'Êm, ngủ ngon', c: 'teal'},
              {header: 'CỔ PHIẾU', icon: '📈', label: 'Sóng gió', c: 'red', dim: true}], cardsTop: 470},
    {d: 79, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Bạn thuộc team nào?'], size: 78, q: ['Team ', {t: 'tiết kiệm', c: 'teal'}, ' hay ', {t: 'cổ phiếu?', c: 'red'}]},
  ],
};

export const SHORT_SS25: ShortSpec = {
  slug: 'ShortSS25',
  scenes: [
    {d: 183, bar: 'gold', pose: 'think', ahCorner: 'right', ahH: 600,
      head: ['Không có thời gian', {t: '\nmà muốn tiền đẻ?', c: 'gold'}], size: 66,
      icon: '💼  ⏳  📈', iconTop: 560, iconSize: 120,
      label: ['Không phải lời khuyên đầu tư'], labelTop: 890, labelC: 'gray'},
    {d: 260, bar: 'teal', pose: 'cool', ahCorner: 'left', ahH: 600,
      head: ['Quỹ mở / ETF'], size: 78, icon: '🧺', iconTop: 520, iconSize: 200,
      label: ['Cả rổ nhiều mã · một mã sập không cháy túi'], labelTop: 850, labelC: 'teal'},
    {d: 240, bar: 'blue', pose: 'worried', ahCorner: 'right', ahH: 600,
      head: ['Tự mua từng mã'], size: 78, icon: '📈', iconTop: 520, iconSize: 200,
      label: ['Chủ động · nhưng lướt theo tin đồn dễ ôm lỗ'], labelTop: 850, labelC: 'red'},
    {d: 100, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Chốt'], size: 84,
      cards: [{header: 'QUỸ', icon: '🧺', label: 'Nhàn, bền', c: 'teal'},
              {header: 'TỰ ĐÁNH', icon: '📈', label: 'Cần thời gian', c: 'blue', dim: true}], cardsTop: 470},
    {d: 95, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Bạn đang chọn cách nào?'], size: 80, q: ['Tự đánh hay ', {t: 'để quỹ lo?', c: 'gold'}]},
  ],
};

export const SHORT_SS26: ShortSpec = {
  slug: 'ShortSS26',
  scenes: [
    {d: 180, bar: 'amber', pose: 'think', ahCorner: 'right', ahH: 600,
      head: ['Cất tiền trong két', {t: '\nan toàn tuyệt đối?', c: 'red'}], size: 64,
      icon: '🔒  💵', iconTop: 560, iconSize: 130},
    {d: 148, bar: 'red', pose: 'worried', ahCorner: 'right', ahH: 600,
      head: ['Lạm phát âm thầm gặm'], size: 62,
      value: 4, suffix: '%/năm', numColor: 'red', numTop: 540, numSize: 180,
      label: ['Mỗi năm bào mòn 3–4% sức mua'], labelTop: 850, labelC: 'red'},
    {d: 210, bar: 'red', pose: 'broke', ahCorner: 'right', ahH: 600,
      head: ['Để két: mất trắng phần đó'], size: 60, icon: '🔒', iconTop: 520, iconSize: 200,
      label: ['Tờ tiền nguyên số · mua được ít đồ hơn'], labelTop: 850, labelC: 'red'},
    {d: 172, bar: 'teal', pose: 'cool', ahCorner: 'left', ahH: 600,
      head: ['Gửi tiết kiệm'], size: 78, icon: '🏦', iconTop: 520, iconSize: 200,
      label: ['Lời khiêm tốn · nhưng bù được lạm phát'], labelTop: 850, labelC: 'teal'},
    {d: 86, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Chốt'], size: 84,
      cards: [{header: 'KÉT', icon: '🔒', label: 'Mất sức mua', c: 'red', dim: true},
              {header: 'GỬI', icon: '🏦', label: 'Bù lạm phát', c: 'teal'}], cardsTop: 470},
    {d: 104, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Tiền bạn nằm không ở đâu?'], size: 74, q: ['Trong két hay ', {t: 'sinh lãi?', c: 'gold'}]},
  ],
};

export const SHORT_SS27: ShortSpec = {
  slug: 'ShortSS27',
  scenes: [
    {d: 232, bar: 'gold', pose: 'think', ahCorner: 'right', ahH: 600,
      head: ['Bitcoin là "vàng số"?', {t: '\nNơi trú ẩn thời loạn?', c: 'gold'}], size: 60,
      icon: '₿  🆚  🥇', iconTop: 560, iconSize: 120,
      label: ['Không phải lời khuyên đầu tư'], labelTop: 890, labelC: 'gray'},
    {d: 159, bar: 'teal', pose: 'cool', ahCorner: 'left', ahH: 600,
      head: ['Vàng vật chất'], size: 78, icon: '🥇', iconTop: 520, iconSize: 200,
      label: ['Mấy ngàn năm · biến động nhẹ · lì đòn'], labelTop: 850, labelC: 'teal'},
    {d: 196, bar: 'red', pose: 'shock', ahCorner: 'right', ahH: 600,
      head: ['Bitcoin: tàu lượn siêu tốc'], size: 62,
      value: 60, suffix: '%', numColor: 'red', numTop: 540, numSize: 190,
      label: ['Có thể rớt 50–60% trong thời gian ngắn'], labelTop: 850, labelC: 'red'},
    {d: 147, bar: 'navy', pose: 'worried', ahCorner: 'right', ahH: 600,
      head: ['Dao động dữ vậy', {t: '\nkhó gọi là trú ẩn', c: 'red'}], size: 62,
      label: ['Trú ẩn là ngủ được · không thức canh giá'], labelTop: 850, labelC: 'gray'},
    {d: 90, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Chốt'], size: 84,
      cards: [{header: 'VÀNG', icon: '🥇', label: 'Lì đòn', c: 'teal'},
              {header: 'BITCOIN', icon: '₿', label: 'Canh bạc', c: 'red', dim: true}], cardsTop: 470},
    {d: 117, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Nơi cất của yên tâm của bạn?'], size: 70, q: ['Vàng hay ', {t: 'Bitcoin?', c: 'gold'}]},
  ],
};

export const SHORT_SS28: ShortSpec = {
  slug: 'ShortSS28',
  scenes: [
    {d: 202, bar: 'amber', pose: 'think', ahCorner: 'right', ahH: 600,
      head: ['Ai cũng khoe "dự án"', {t: '\nsao ví mình cứ thiếu?', c: 'red'}], size: 60,
      icon: '💸  📉', iconTop: 560, iconSize: 130},
    {d: 159, bar: 'teal', pose: 'cool', ahCorner: 'left', ahH: 600,
      head: ['Gửi tiết kiệm ngân hàng'], size: 68,
      value: 10, suffix: '%/năm', numColor: 'teal', numTop: 540, numSize: 170,
      label: ['Cỡ 6–10% · chậm mà chắc · có bảo lãnh'], labelTop: 850, labelC: 'teal'},
    {d: 130, bar: 'red', pose: 'greedy', ahCorner: 'right', ahH: 600,
      head: ['Nơi hứa "cam kết lợi nhuận"'], size: 56,
      value: 18, suffix: '%+', numColor: 'red', numTop: 540, numSize: 190,
      label: ['Từ 18% trở lên · nghe cho sướng tai'], labelTop: 850, labelC: 'red'},
    {d: 228, bar: 'red', pose: 'sly', ahCorner: 'right', ahH: 600,
      head: ['Lấy tiền người sau', {t: '\ntrả cho người trước', c: 'red'}], size: 62,
      icon: '⚠️', iconTop: 520, iconSize: 150,
      label: ['Mô hình Ponzi · tuyển không kịp là sập'], labelTop: 850, labelC: 'red'},
    {d: 99, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Chốt'], size: 84,
      cards: [{header: 'BANK', icon: '🏦', label: 'Có bảo lãnh', c: 'teal'},
              {header: '"CAM KẾT"', icon: '⚠️', label: 'Kiểu Ponzi', c: 'red', dim: true}], cardsTop: 470},
    {d: 109, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Từng nghe ai chào "cam kết"?'], size: 64, q: ['Lãi thật hay ', {t: 'bẫy Ponzi?', c: 'gold'}]},
  ],
};

export const SHORT_SS29: ShortSpec = {
  slug: 'ShortSS29',
  scenes: [
    {d: 131, bar: 'amber', pose: 'think', ahCorner: 'right', ahH: 600,
      head: ['App "giải ngân 5 phút"', {t: '\nbấm hay khoan?', c: 'gold'}], size: 60,
      icon: '📱  ⏱️  💸', iconTop: 560, iconSize: 120,
      label: ['Không phải lời khuyên tài chính'], labelTop: 890, labelC: 'gray'},
    {d: 158, bar: 'blue', pose: 'present', ahCorner: 'left', ahH: 600,
      head: ['Vay ngân hàng'], size: 74,
      value: 20, suffix: '%/năm', numColor: 'blue', numTop: 540, numSize: 170,
      label: ['Cỡ 10–20% · nhưng phải chờ, phải giấy tờ'], labelTop: 850, labelC: 'blue'},
    {d: 282, bar: 'red', pose: 'shock', ahCorner: 'right', ahH: 600,
      head: ['App vay siêu tốc: lãi thật'], size: 56,
      value: 300, suffix: '%/năm', numColor: 'red', numTop: 540, numSize: 170,
      label: ['Cộng đủ phí · đội lên 100–300%, thậm chí hơn'], labelTop: 850, labelC: 'red'},
    {d: 187, bar: 'red', pose: 'sly', ahCorner: 'right', ahH: 600,
      head: ['Không ghi "lãi",', {t: '\nnó ghi "phí"', c: 'red'}], size: 64,
      icon: '⚠️', iconTop: 520, iconSize: 150,
      label: ['Vay càng dễ · trả càng đau'], labelTop: 850, labelC: 'red'},
    {d: 80, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Chốt'], size: 84,
      cards: [{header: 'BANK', icon: '🏦', label: 'Chờ · lãi thật', c: 'blue'},
              {header: 'APP RẸT', icon: '📱', label: 'Nhanh · cắt cổ', c: 'red', dim: true}], cardsTop: 470},
    {d: 101, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Vay nào phí nuốt hết gốc?'], size: 66, q: ['Ngân hàng hay ', {t: 'app rẹt?', c: 'gold'}]},
  ],
};

export const SHORT_SS30: ShortSpec = {
  slug: 'ShortSS30',
  scenes: [
    {d: 196, bar: 'red', pose: 'think', ahCorner: 'right', ahH: 600,
      head: ['"Cam kết lợi nhuận cao,', {t: '\nổn định" — tin nổi?', c: 'red'}], size: 56,
      icon: '📢  💰', iconTop: 560, iconSize: 130},
    {d: 160, bar: 'navy', pose: 'worried', ahCorner: 'right', ahH: 600,
      head: ['Thị trường lên xuống', {t: '\nmỗi ngày', c: 'blue'}], size: 64,
      icon: '📈📉', iconTop: 520, iconSize: 150,
      label: ['Không ai cam kết được đường nó đi'], labelTop: 850, labelC: 'gray'},
    {d: 173, bar: 'teal', pose: 'cool', ahCorner: 'left', ahH: 600,
      head: ['Người làm ăn thật', {t: '\nnói "CÓ RỦI RO"', c: 'teal'}], size: 62,
      label: ['Ai hứa chắc như đinh · cái chắc nằm chỗ khác'], labelTop: 850, labelC: 'teal'},
    {d: 198, bar: 'red', pose: 'point', ahCorner: 'right', ahH: 600,
      head: ['Lợi nhuận cao bất thường', {t: '\nluôn kèm rủi ro cao', c: 'red'}], size: 58,
      label: ['Ai xóa chữ "rủi ro" là đang giấu nó'], labelTop: 850, labelC: 'red'},
    {d: 80, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 640,
      head: ['Chốt'], size: 84,
      cards: [{header: '"CAM KẾT"', icon: '📢', label: 'Giấu rủi ro', c: 'red', dim: true},
              {header: 'NÓI THẬT', icon: '✅', label: 'Có rủi ro', c: 'teal'}], cardsTop: 470},
    {d: 121, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Từng bị "cam kết" làm xiêu lòng?'], size: 60, q: ['Nghe hứa chắc, ', {t: 'bạn nghĩ gì?', c: 'gold'}]},
  ],
};

// ĐẤT ĐAI 24/7 — "Nhà nước quyết định giá đất" — thu datdai.mp3 (51.36s) · 9 nhịp neo khoảng lặng
// cut(s): 5.07 |13.2 |17.27 |23.74 |29.68 |33.33 |39.65 |46.0 |51.36
export const SHORT_DATDAI: ShortSpec = {
  slug: 'ShortDatDai',
  scenes: [
    {d: 152, bar: 'red', pose: 'shock', ahCorner: 'right', ahH: 600,
      head: ['TIN NÓNG ', {t: '24/7', c: 'red'}], size: 84,
      icon: '🔴  🏠', iconTop: 540, iconSize: 180,
      label: ['Ảnh hưởng túi tiền & giấc mơ mua nhà'], labelTop: 850, labelC: 'red'},
    {d: 244, bar: 'navy', pose: 'present', ahCorner: 'right', ahH: 600,
      head: ['Định hướng sửa ', {t: 'LUẬT ĐẤT ĐAI', c: 'navy'}], size: 62,
      icon: '📜  ⚖️', iconTop: 540, iconSize: 170,
      label: ['Bế mạc Hội nghị TW3 khóa 14 · 3 điều cần nắm'], labelTop: 850, labelC: 'gray'},
    {d: 122, bar: 'teal', pose: 'think', ahCorner: 'left', ahH: 600,
      head: ['① Đất ', {t: 'sở hữu toàn dân', c: 'navy'}], size: 66,
      icon: '🇻🇳  🏞️', iconTop: 540, iconSize: 160,
      label: ['Không tư nhân hóa đất đai'], labelTop: 850, labelC: 'navy'},
    {d: 194, bar: 'teal', pose: 'cool', ahCorner: 'left', ahH: 600,
      head: ['Sổ đỏ hợp pháp ', {t: 'GIỮ NGUYÊN', c: 'teal'}], size: 60,
      icon: '📗  ✅', iconTop: 540, iconSize: 180,
      label: ['Không xem xét lại quyền dùng đất hợp pháp'], labelTop: 850, labelC: 'teal'},
    {d: 178, bar: 'blue', pose: 'present', ahCorner: 'right', ahH: 600,
      head: ['② Nhà nước ', {t: 'QUYẾT ĐỊNH giá đất', c: 'blue'}], size: 56,
      icon: '🏛️  💰', iconTop: 540, iconSize: 170,
      label: ['Điều tiết · kiểm soát · quyết định'], labelTop: 850, labelC: 'blue'},
    {d: 110, bar: 'blue', pose: 'aha', ahCorner: 'right', ahH: 600,
      head: ['→ Thị trường ', {t: 'MINH BẠCH giá', c: 'blue'}], size: 64,
      icon: '🔍  🏠', iconTop: 540, iconSize: 180},
    {d: 190, bar: 'teal', pose: 'point', ahCorner: 'left', ahH: 600,
      head: ['③ Thu hồi đất'], size: 74,
      icon: '🏘️  🤝', iconTop: 540, iconSize: 170,
      label: ['Bảo đảm chỗ ở · điều kiện sống · sinh kế'], labelTop: 850, labelC: 'teal'},
    {d: 190, bar: 'amber', pose: 'think', ahCorner: 'right', ahH: 620,
      head: ['Mới là ', {t: 'định hướng', c: 'amber'}, ' — luật chờ Quốc hội'], size: 54,
      icon: '⏳  📊', iconTop: 540, iconSize: 150,
      label: ['Hướng đi: siết đầu cơ · minh bạch giá đất'], labelTop: 850, labelC: 'amber'},
    {d: 161, bar: 'navy', pose: 'point', ahCorner: 'right', ahH: 700,
      head: ['Giá nhà sẽ dễ thở hơn?'], size: 70,
      q: ['Nhà nước quyết định giá đất — ', {t: 'bạn nghĩ sao?', c: 'gold'}]},
  ],
};

export const ALL_SHORTS: ShortSpec[] = [SHORT_LK1, SHORT_KIMCUONG, SHORT_VANG, SHORT_RE13, SHORT_BDS_S1, SHORT_BDS_S2, SHORT_BDS_S4, SHORT_TK80, SHORT_DIEMTIN, SHORT_DIEMTIN23, SHORT_SS01, SHORT_SS02, SHORT_SS03, SHORT_SS04, SHORT_SS05, SHORT_SS06, SHORT_SS07, SHORT_SS08, SHORT_SS09, SHORT_SS10, SHORT_SS11, SHORT_SS12, SHORT_SS13, SHORT_SS14, SHORT_SS15, SHORT_SS16, SHORT_SS17, SHORT_SS18, SHORT_SS19, SHORT_SS20, SHORT_SS21, SHORT_SS22, SHORT_SS23, SHORT_SS24, SHORT_SS25, SHORT_SS26, SHORT_SS27, SHORT_SS28, SHORT_SS29, SHORT_SS30, SHORT_DATDAI];
