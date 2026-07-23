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

export const ALL_SHORTS: ShortSpec[] = [SHORT_LK1, SHORT_KIMCUONG, SHORT_VANG, SHORT_RE13, SHORT_BDS_S1, SHORT_BDS_S2, SHORT_BDS_S4, SHORT_TK80, SHORT_DIEMTIN, SHORT_DIEMTIN23];
