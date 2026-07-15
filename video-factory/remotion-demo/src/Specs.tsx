import {VideoSpec} from './Blocks';

// ===== VÍ DỤ SPEC: 1 video = 1 mảng dữ liệu. Không code tay cảnh nào. =====
export const NOTHE: VideoSpec = {
  slug: 'NoThe',
  scenes: [
    {t: 'hook', bar: 'red', sec: 8, size: 62,
      heading: ['Cà thẻ sướng tay — ', {t: 'TRẢ NƯỚC MẮT?', c: 'red'}],
      items: [{text: '💳 Quẹt thẻ cho đã'}, {arrow: '↓ cuối tháng…'}, {text: '😱 Nợ chồng nợ', c: 'red'}],
      ah: {pose: 'point'}, bubble: {text: 'Để tui bóc cho!'},
      caption: ['Câu chuyện của ', {t: 'chị Lan', c: 'tuan'}, ' — bạn có thấy mình trong đó?']},

    {t: 'char', bar: 'navy', sec: 7,
      heading: ['Gặp ', {t: 'chị Lan', c: 'tuan'}, ', 28 tuổi'],
      items: [{text: '🛍️ Mê mua sắm online', c: 'gray'}, {text: '💳 3 thẻ tín dụng', c: 'tuan'}, {text: '“Trả tối thiểu thôi mà!”', c: 'red'}],
      ah: {pose: 'smug', shirt: 'red', female: true},
      caption: ['Mỗi lần quẹt thẻ, cảm giác như ', {t: 'tiền chùa', c: 'red'}]},

    {t: 'number', bar: 'red', sec: 8, htop: 130, size: 58,
      heading: ['Dư nợ thẻ của chị Lan'],
      value: 30000000, suffix: '₫', numColor: 'red',
      sub: 'lãi suất ~ 40%/năm', ah: {pose: 'shock', shirt: 'red', female: true},
      caption: ['Lãi thẻ tín dụng ', {t: 'cao gấp mấy lần', c: 'red'}, ' vay ngân hàng']},

    {t: 'versus', bar: 'amber', sec: 8,
      heading: ['Cái bẫy: ', {t: '“trả tối thiểu”', c: 'red'}],
      left: {pill: '✅ Trả full', sub: 'hết nợ · 0 lãi', c: 'teal'},
      right: {pill: '👹 Trả tối thiểu 5%', sub: 'trả mãi không hết', c: 'red'},
      caption: ['Trả tối thiểu = ', {t: 'nuôi nợ cả đời', c: 'red'}]},

    {t: 'rule', bar: 'teal', sec: 6, n: 1, color: 'teal',
      heading: ['Thoát nợ thẻ — nhớ…'], title: 'Luôn trả FULL dư nợ mỗi kỳ',
      caption: ['Trả đúng hạn, đủ 100% → ', {t: 'miễn lãi hoàn toàn', c: 'teal'}]},

    {t: 'rule', bar: 'teal', sec: 6, n: 2, color: 'blue',
      heading: ['Thoát nợ thẻ — nhớ…'], title: 'Đừng rút tiền mặt từ thẻ',
      caption: ['Rút tiền mặt bị tính ', {t: 'phí + lãi ngay lập tức', c: 'red'}]},

    {t: 'question', bar: 'navy', sec: 7, size: 54,
      heading: ['Câu hỏi thật lòng:'],
      lines: [['Bạn cần món đồ đó,'], [{t: 'hay chỉ đang buồn?', c: 'red'}]],
      caption: ['Thẻ tín dụng là công cụ, ', {t: 'đừng để nó thành chủ nợ', c: 'red'}]},

    {t: 'cta', bar: 'navy', sec: 7,
      heading: ['Quẹt thông minh — giữ ví cho chặt! 👊'], button: 'ĐĂNG KÝ KÊNH'},
  ],
};

// ===== BĐS: vì sao giá nhà cao mãi không giảm (5-nhịp, ~5 phút, khớp audio BDS.mp3) =====
// d = số frame @30fps, lấy từ auto-timer (N=16 khớp lặng) rồi tự tách cảnh dài -> 24 cảnh, tổng 9148.
export const BDS: VideoSpec = {
  slug: 'BDS',
  scenes: [
    // — NHỊP 1: BỐI CẢNH —
    {t: 'hook', d: 347, bar: 'red', size: 60,
      heading: ['Ai cũng mơ một mái nhà — sao giờ ', {t: 'XA vời?', c: 'red'}],
      ah: {pose: 'worried'}, bubble: {text: 'Để tui bóc cho!'},
      caption: ['Chuyện ', {t: 'anh Minh', c: 'tuan'}, ' — có thể bạn thấy chính mình trong đó']},

    {t: 'char', d: 560, bar: 'teal', size: 58,
      heading: ['Gặp ', {t: 'anh Minh', c: 'tuan'}, ', 30 tuổi'],
      items: [{text: '💼 Văn phòng · lương 30 triệu'}, {text: '➕ Vợ kế toán +20 triệu', c: 'teal'}, {text: '= 50 triệu/tháng · 600 triệu/năm', c: 'tuan'}],
      ah: {pose: 'point'},
      caption: ['Chỉ mơ một căn hộ nhỏ ', {t: '60m²', c: 'teal'}, ', hết cảnh chuyển trọ']},

    // — NHỊP 2: KỲ VỌNG SỤP —
    {t: 'number', d: 541, bar: 'red', htop: 120, size: 54,
      heading: ['Anh mở bảng giá… rồi ', {t: 'chết lặng', c: 'red'}],
      value: 112, suffix: ' triệu/m²', numColor: 'red', dur: 55,
      sub: 'căn hộ sơ cấp TP.HCM, đầu 2025', ah: {pose: 'shock'},
      caption: ['Căn 60m² tử tế ≈ ', {t: '6–7 tỷ', c: 'red'}, '. Mà mới loại vừa phải!']},

    {t: 'number', d: 357, bar: 'red', htop: 130, size: 56,
      heading: ['Giá nhà / thu nhập ở Việt Nam'],
      value: 23.7, decimals: 1, suffix: ' lần', numColor: 'red', dur: 50,
      sub: 'mức lành mạnh thế giới: chỉ 5–7 lần', ah: {pose: 'facepalm'}},

    {t: 'char', d: 356, bar: 'red', size: 56,
      heading: ['Nhịn ăn nhịn tiêu ', {t: 'gần 24 NĂM', c: 'red'}, ' mới mua nổi'],
      ah: {pose: 'worried'},
      caption: ['Đắt gấp ', {t: '1,6 lần', c: 'red'}, ' trung bình thế giới — hàng đắt bậc nhất châu Á']},

    // — NHỊP 3: XUNG ĐỘT — 3 lý do —
    {t: 'char', d: 240, bar: 'amber', size: 56,
      heading: ['Sao giá cao mà ', {t: 'KHÔNG chịu giảm?', c: 'amber'}],
      ah: {pose: 'think'},
      caption: ['Có ', {t: '3 lý do cốt lõi', c: 'navy'}, ' — hiểu rồi bạn sẽ bớt hoang mang']},

    {t: 'char', d: 359, bar: 'blue', size: 60,
      heading: [{t: '① ', c: 'blue'}, 'Nguồn cung méo mó'],
      ah: {pose: 'warning'},
      caption: ['Thị trường ', {t: 'vừa thừa vừa thiếu', c: 'blue'}, ' một cách khó tin']},

    {t: 'list', d: 359, bar: 'blue', size: 54,
      heading: ['Sài Gòn 2023 · ', {t: '19 dự án', c: 'blue'}, ' mở bán'],
      items: [{text: '🏙️ Cao cấp: 11.334 căn', c: 'gray'}, {text: '🏢 Trung cấp: 5.051 căn', c: 'blue'}, {text: '🏠 Bình dân: 0 CĂN 😱', c: 'red'}],
      ah: {pose: 'shock'},
      caption: ['Nhà vừa túi tiền ', {t: 'gần như biến mất', c: 'red'}]},

    {t: 'list', d: 359, bar: 'blue', size: 56,
      heading: ['Hệ quả'],
      items: [{text: '📉 Nguồn cung chạm đáy 12 năm', c: 'red'}, {text: '➡️ Bình Dương ôm 80% hàng mới', c: 'blue'}],
      ah: {pose: 'warning'},
      caption: ['Khan hiếm loại nhà người ta cần → ', {t: 'giá bị đẩy lên', c: 'red'}]},

    {t: 'char', d: 431, bar: 'blue', size: 58,
      heading: [{t: '② ', c: 'blue'}, 'Chi phí đầu vào & lạm phát'],
      ah: {pose: 'point'},
      caption: ['Giá đất, vật liệu, thuế phí — ', {t: 'tất cả đều leo thang', c: 'red'}]},

    {t: 'bars', d: 431, bar: 'blue', size: 54,
      heading: ['Căn bình dân · giá mỗi ', {t: 'm²', c: 'blue'}],
      bars: [{label: 'năm 2015', v: 30}, {label: 'năm 2023', v: 50}], barColor: 'blue', max: 55,
      caption: ['Gần ', {t: 'GẤP ĐÔI', c: 'red'}, ' chỉ trong 8 năm']},

    {t: 'char', d: 406, bar: 'blue', size: 56,
      heading: [{t: '③ ', c: 'blue'}, 'Lãi suất cao & siết thanh khoản'],
      ah: {pose: 'warning'},
      caption: ['Con dao ', {t: 'hai lưỡi', c: 'red'}, ' — cứa cả người mua lẫn doanh nghiệp']},

    {t: 'list', d: 405, bar: 'blue', size: 56,
      heading: ['Lãi vay mua nhà thương mại'],
      items: [{text: '🎁 Ưu đãi: 8–10%/năm (1–2 năm đầu)', c: 'amber'}, {text: '🔥 Sau đó thả nổi: 13–15%/năm', c: 'red'}],
      ah: {pose: 'facepalm'},
      caption: ['Siết tiền → không có dự án mới → ', {t: 'cung càng thiếu', c: 'red'}]},

    // — cao trào: ác mộng nợ —
    {t: 'char', d: 389, bar: 'red', size: 56,
      heading: ['Giấc mơ dễ thành ', {t: 'ÁC MỘNG NỢ', c: 'red'}],
      items: [{text: '🏠 Giả sử mua căn 5 tỷ'}, {text: '🏦 Vay 70% = 3,5 tỷ · trả 20 năm', c: 'red'}],
      ah: {pose: 'worried'},
      caption: ['Nghe thì đơn giản… ', {t: 'nhưng khoan đã', c: 'red'}]},

    {t: 'list', d: 388, bar: 'red', size: 56,
      heading: ['Tiền trả góp ', {t: 'mỗi tháng', c: 'red'}],
      items: [{text: '😮‍💨 2 năm đầu: ~37 triệu', c: 'amber'}, {text: '💀 Khi thả nổi: ~50 triệu', c: 'red'}],
      ah: {pose: 'angry'},
      caption: ['Cao hơn cả ', {t: 'tổng lương 2 vợ chồng', c: 'red'}, ' — thành sợi dây thắt cổ']},

    // — NHỊP 4: GIẢI QUYẾT —
    {t: 'hook', d: 422, bar: 'navy', size: 58,
      heading: ['Đừng ngồi chờ ', {t: 'bong bóng vỡ', c: 'red'}],
      ah: {pose: 'warning'},
      caption: ['Chờ cả đời cũng chưa chắc rẻ — hãy ', {t: 'CHỦ ĐỘNG', c: 'teal'}]},

    {t: 'list', d: 404, bar: 'teal', size: 56,
      heading: ['Đổi lại định nghĩa ', {t: '“an cư”', c: 'teal'}],
      items: [{text: '📍 Ra vùng ven · Bình Dương · Long An', c: 'teal'}, {text: '💰 Giá có khi chỉ bằng NỬA', c: 'teal'}],
      ah: {pose: 'aha'},
      caption: ['Chính những nơi đó mới ', {t: 'còn hàng để mua', c: 'teal'}]},

    {t: 'char', d: 271, bar: 'teal', size: 56,
      heading: ['Thuê nhà ', {t: 'KHÔNG', c: 'teal'}, ' phải là thất bại'],
      ah: {pose: 'chill'},
      caption: ['Tiền dư đem đầu tư — ', {t: 'khôn hơn', c: 'teal'}, ' gồng nợ 20 năm']},

    {t: 'char', d: 265, bar: 'teal', size: 54,
      heading: ['Đã quyết mua? ', {t: 'Đừng vay quá 40%', c: 'red'}, ' thu nhập'],
      ah: {pose: 'warning'},
      caption: ['Tính trước lãi thả nổi · giữ ', {t: 'quỹ dự phòng 6 tháng', c: 'teal'}]},

    {t: 'list', d: 368, bar: 'blue', size: 56,
      heading: ['Để mắt tới ', {t: 'NHÀ Ở XÃ HỘI', c: 'blue'}],
      items: [{text: '🏦 Lãi chỉ 5,9–6,6%/năm', c: 'teal'}, {text: '🧑 Người trẻ <35 tuổi ưu đãi thêm', c: 'blue'}],
      ah: {pose: 'cash'},
      caption: ['Rẻ hơn hẳn ', {t: 'vay thương mại', c: 'red'}]},

    {t: 'number', d: 367, bar: 'amber', htop: 120, size: 52,
      heading: ['Nhưng đừng ảo tưởng…'],
      value: 2, suffix: '%', numColor: 'amber', dur: 40,
      sub: 'gói 145 nghìn tỷ mới giải ngân được hơn ngần này', ah: {pose: 'think'},
      caption: ['Ế dài dù 4 lần hạ lãi → chính sách có, nhưng phải ', {t: 'chủ động săn', c: 'navy'}]},

    // — NHỊP 5: BỐI CẢNH LỚN —
    {t: 'hook', d: 428, bar: 'navy', size: 56,
      heading: ['Giá nhà cao ', {t: 'KHÔNG phải lỗi của bạn', c: 'teal'}],
      ah: {pose: 'point'},
      caption: ['Đó là bài toán lớn của ', {t: 'cả nền kinh tế', c: 'navy'}]},

    {t: 'char', d: 428, bar: 'navy', size: 54,
      heading: ['Đừng để nó cướp mất ', {t: 'sự bình yên', c: 'teal'}],
      ah: {pose: 'chill'},
      caption: ['Nhà là nơi hạnh phúc — ', {t: 'không phải con số khiến bạn mất ngủ', c: 'navy'}]},

    {t: 'cta', d: 267, bar: 'navy',
      heading: ['Giữ vững tinh thần — giữ ví cho chặt! 👊'], button: 'THEO DÕI ANH HAI'},
  ],
};

// ===== 100 TRIỆU: GỬI BANK HAY MUA VÀNG? (5-nhịp, khớp GIAVANG.mp3 — neo đúng 4 mốc nhịp 24.8/63.6/144.3/194.8s) =====
export const GIAVANG: VideoSpec = {
  slug: 'GiaVang',
  scenes: [
    // NHỊP 1 — BỐI CẢNH (0 → 24.8s)
    {t: 'hook', d: 162, bar: 'navy', size: 58,
      heading: ['100 triệu: gửi bank hay ', {t: 'mua vàng?', c: 'amber'}],
      ah: {pose: 'think'}, bubble: {text: 'Để tui bóc!'},
      caption: ['Một câu hỏi làm ', {t: 'cả cõi mạng cãi nhau', c: 'red'}]},
    {t: 'comments', d: 282, bar: 'navy', size: 56,
      heading: ['Cả mạng chia hai phe'],
      comments: [
        {name: 'Tiến', text: 'Gửi bank ít nhất cũng 7–8%/năm rồi!', c: 'blue', side: 'l'},
        {name: 'Xuyến', text: 'Thôi, mình mua vàng 🥇', c: 'amber', side: 'r'},
        {name: 'Hữu Tân', text: 'Bank 9,2% rồi, vàng tụt dốc lỗ nặng', c: 'blue', side: 'l'},
      ]},
    {t: 'comments', d: 117, bar: 'navy', size: 56,
      heading: ['Người khoe, kẻ than'],
      comments: [
        {name: 'Khổ Gà', text: 'Mua vàng 2023, giờ lời kha khá 😂', c: 'amber', side: 'l'},
        {name: 'Đủ Đỉnh', text: 'Mua vàng như tôi giờ còn 143tr… ĐỪNG NHƯ TÔI 😅', c: 'red', side: 'r'},
      ]},
    {t: 'char', d: 195, bar: 'navy', size: 64, center: true,
      heading: ['Rốt cuộc ', {t: 'ai đúng?', c: 'amber'}],
      ah: {pose: 'point'}, caption: ['Hôm nay mình tính bằng ', {t: 'CON SỐ THẬT', c: 'teal'}]},

    // NHỊP 2 — KỲ VỌNG (24.8 → 63.6s)
    {t: 'line', d: 252, bar: 'amber', size: 56,
      heading: ['2025 — vàng tăng ', {t: 'ĐIÊN RỒ', c: 'amber'}],
      points: [{label: 'Đầu 2025', v: 82}, {label: 'Giữa năm', v: 118}, {label: 'Cuối 2025', v: 155}], lineColor: 'amber', unit: 'tr',
      caption: ['Đầu năm mỗi lượng chỉ ', {t: '82 triệu', c: 'amber'}]},
    {t: 'number', d: 195, bar: 'amber', htop: 130, size: 54, deco: '🥇', decoSide: 'l',
      heading: ['Cuối năm chạm đỉnh'],
      value: 160, suffix: ' triệu', numColor: 'amber', sub: 'đỉnh lịch sử — 27/12/2025', ah: {pose: 'shock'}},
    {t: 'number', d: 177, bar: 'amber', htop: 140, size: 56, deco: '📈', decoSide: 'l',
      heading: ['Chỉ trong 1 năm, vàng tăng'],
      value: 85, suffix: '%', numColor: 'amber', dur: 40, ah: {pose: 'greedy'}},
    {t: 'number', d: 177, bar: 'amber', htop: 130, size: 54, deco: '💰', decoSide: 'l',
      heading: ['100 triệu mua vàng đầu năm →'],
      value: 185, suffix: ' triệu', numColor: 'teal', dur: 40, ah: {pose: 'greedy'}},
    {t: 'number', d: 189, bar: 'blue', htop: 130, size: 54, deco: '🏦', decoSide: 'l',
      heading: ['Còn 100 triệu gửi bank 1 năm'],
      value: 106, suffix: ' triệu', numColor: 'blue', sub: 'lãi 6 – 7,4%/năm', ah: {pose: 'cool'},
      caption: ['Chắc chắn, an toàn, nhưng… khiêm tốn']},
    {t: 'versus', d: 174, bar: 'red', size: 56,
      heading: ['Đặt cạnh nhau'],
      left: {pill: '🥇 Vàng +85%', sub: '~185 triệu', c: 'amber'},
      right: {pill: '🏦 Bank +6%', sub: '~106 triệu', c: 'blue'},
      caption: ['Vàng thắng ', {t: 'một trời một vực', c: 'amber'}, ' — ai chẳng muốn ôm vàng?']},

    // NHỊP 3 — XUNG ĐỘT (63.6 → 144.3s)
    {t: 'char', d: 162, bar: 'red', size: 78, center: true,
      heading: ['Nhưng ', {t: 'KHOAN đã…', c: 'red'}],
      ah: {pose: 'warning'}, caption: ['Đây là cái bẫy ', {t: 'nguy hiểm nhất', c: 'red'}]},
    {t: 'char', d: 312, bar: 'red', size: 58,
      heading: ['85% là nhìn về ', {t: 'QUÁ KHỨ', c: 'red'}],
      ah: {pose: 'facepalm'}, caption: ['Sau khi mọi chuyện đã xảy ra rồi — không ai bảo đảm nó lặp lại lúc bạn xuống tiền']},
    {t: 'split', d: 300, bar: 'red', size: 52,
      heading: ['Bằng chứng nóng hổi — ', {t: '14/7/2026', c: 'red'}],
      colL: {title: 'ĐỈNH 27/12', big: '160tr', sub: 'cuối năm ngoái', c: 'amber'},
      colR: {title: 'HÔM NAY', big: '148tr', sub: 'đã hạ nhiệt', c: 'red'},
      caption: ['Chỉ hơn nửa năm, mỗi lượng ', {t: 'bốc hơi gần 12 triệu', c: 'red'}]},
    {t: 'list', d: 237, bar: 'red', size: 56,
      heading: ['Ai lỡ mua ĐỈNH thì sao?'],
      items: [{text: '📉 Đang tạm LỖ hơn 10 triệu/lượng', c: 'red'}],
      ah: {pose: 'broke'}, caption: ['Dù vàng vẫn ở vùng cao — mua sai thời điểm là ôm lỗ']},
    {t: 'char', d: 258, bar: 'red', size: 60, center: true,
      heading: ['Vàng ăn thua theo ', {t: 'THỜI ĐIỂM', c: 'red'}],
      ah: {pose: 'shrug'}, caption: ['Người trúng sóng thì lời đậm, kẻ mua trễ thì ôm lỗ']},
    {t: 'char', d: 213, bar: 'red', size: 58, deco: '🪙', decoSide: 'l',
      heading: [{t: '① ', c: 'red'}, 'Vàng KHÔNG đẻ lãi'],
      ah: {pose: 'point'}, caption: ['Cất trong tủ, vàng nằm im không thêm một xu — còn tiền gửi bank ', {t: 'ngày nào cũng sinh lãi', c: 'teal'}]},
    {t: 'char', d: 276, bar: 'red', size: 58,
      heading: [{t: '② ', c: 'red'}, 'Chênh MUA – BÁN'],
      ah: {pose: 'facepalm'}, caption: ['Vàng miếng mua vào luôn rẻ hơn bán ra vài triệu/lượng → ', {t: 'vừa mua đã lỗ ngay một khúc', c: 'red'}]},
    {t: 'char', d: 195, bar: 'red', size: 58,
      heading: [{t: '③ ', c: 'red'}, 'Rủi ro cất giữ'],
      ah: {pose: 'worried'}, caption: ['Đừng bao giờ ôm hết vàng trong nhà: ', {t: 'mất cắp, cháy nổ là mất trắng', c: 'red'}]},
    {t: 'list', d: 249, bar: 'blue', size: 58,
      heading: ['Còn ngân hàng thì sao?'],
      items: [{text: '✅ An toàn, có bảo hiểm tiền gửi', c: 'teal'}, {text: '✅ Lãi biết trước, cần là rút', c: 'teal'}],
      ah: {pose: 'cool'}, caption: ['Nhưng khi vàng/lạm phát phi mã, ', {t: 'mấy % lãi hóa bé nhỏ', c: 'red'}]},
    {t: 'split', d: 219, bar: 'navy', size: 52,
      heading: ['Không kênh nào ', {t: 'ngon ăn tất cả', c: 'amber'}],
      colL: {title: '🥇 VÀNG', items: ['+ Lời to khi trúng sóng', '– Không lãi · chênh mua–bán', '– Rủi ro cất giữ'], c: 'amber'},
      colR: {title: '🏦 NGÂN HÀNG', items: ['+ An toàn · lãi đều', '+ Cần là rút', '– Thua khi vàng/lạm phát sốt'], c: 'blue'}},

    // NHỊP 4 — GIẢI QUYẾT (144.3 → 194.8s)
    {t: 'list', d: 339, bar: 'teal', size: 52,
      heading: ['Hỏi đúng: tiền để ', {t: 'làm gì, bao lâu?', c: 'teal'}],
      items: [{text: '① Tiền ngắn hạn & quỹ khẩn cấp → GỬI BANK', c: 'teal'}],
      ah: {pose: 'warning'}, caption: ['Đừng bao giờ đem tiền sống còn đi cược vào thứ lên xuống như vàng']},
    {t: 'list', d: 273, bar: 'teal', size: 56,
      heading: [{t: '② ', c: 'teal'}, 'Vàng là phần PHÒNG THỦ'],
      items: [{text: '🛡️ Chỉ để 5 – 15% tài sản vào vàng', c: 'teal'}, {text: 'Như bảo hiểm, không phải làm giàu nhanh', c: 'teal'}],
      ah: {pose: 'point'}},
    {t: 'list', d: 321, bar: 'teal', size: 56,
      heading: [{t: '③ ', c: 'teal'}, 'Mua RẢI ĐỀU'],
      items: [{text: 'Mua nhiều lần, đừng dồn cục đúng đỉnh', c: 'teal'}, {text: 'Tránh cảnh vừa mua xong là ôm hận', c: 'teal'}],
      ah: {pose: 'cash'}},
    {t: 'list', d: 279, bar: 'teal', size: 54,
      heading: [{t: '④ ', c: 'red'}, 'ĐỪNG vay để lướt vàng'],
      items: [{text: 'Đừng đụng tiền học phí / chữa bệnh', c: 'red'}],
      ah: {pose: 'warning'}, caption: ['Lướt vàng theo phong trào bằng tiền vay = tự đưa mình vào bẫy']},
    {t: 'list', d: 303, bar: 'teal', size: 54,
      heading: ['Người ', {t: 'tỉnh táo nhất?', c: 'teal'}],
      items: [{text: '🏦 200tr gửi bank', c: 'blue'}, {text: '💵 100tr tiền mặt', c: 'gray'}, {text: '🥇 100tr mua vàng', c: 'amber'}],
      ah: {pose: 'aha'}, caption: ['Chính là ', {t: 'chia trứng ra nhiều giỏ 🧺', c: 'teal'}]},

    // NHỊP 5 — BỐI CẢNH LỚN (194.8 → 243.8s)
    {t: 'char', d: 435, bar: 'navy', size: 56,
      heading: ['Vì sao vàng ', {t: 'tăng sốc?', c: 'amber'}],
      ah: {pose: 'think'}, caption: ['Cả thế giới bất an → đổ xô tìm nơi trú ẩn. Vàng như tấm ', {t: 'ÁO MƯA ☔', c: 'blue'}, ' — quý lúc bão']},
    {t: 'char', d: 333, bar: 'navy', size: 56, center: true,
      heading: ['Áo mưa quý khi trời ', {t: 'BÃO…', c: 'blue'}],
      ah: {pose: 'point'}, caption: ['…nhưng không ai mặc áo mưa để đi làm giàu mỗi ngày']},
    {t: 'char', d: 417, bar: 'navy', size: 54,
      heading: ['Quá khứ +85% ', {t: '≠ tương lai', c: 'red'}],
      ah: {pose: 'warning'}, caption: ['Người mua đỉnh hôm nay có thể là người ôm lỗ ngày mai — ', {t: 'đừng chạy theo đám đông', c: 'red'}, ' trong cơn sốt']},
    {t: 'cta', d: 274, bar: 'navy', size: 50,
      heading: ['Chọn cách giúp bạn ', {t: 'NGỦ NGON', c: 'teal'}, ' 😌'], button: 'THEO DÕI ANH HAI'},
  ],
};

export const ALL_SPECS: VideoSpec[] = [NOTHE, BDS, GIAVANG];
