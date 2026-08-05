/* =========================================================
   i18n — Chuyển ngôn ngữ VI · EN · KO · 中 (Dr Lê Hiếu)
   Áp dụng cho phần khung (header/footer/CTA) trên mọi trang
   và toàn bộ nội dung Trang chủ.
   ========================================================= */
(function () {
  'use strict';

  var LANGS = ['vi', 'en', 'ko', 'zh'];
  var LABEL = { vi: 'VI', en: 'EN', ko: '한국어', zh: '中文' };
  var HTMLLANG = { vi: 'vi', en: 'en', ko: 'ko', zh: 'zh-Hans' };

  var DICT = {
    /* ---------- Khung dùng chung ---------- */
    'nav.home':       { vi: 'Trang chủ', en: 'Home', ko: '홈', zh: '首页' },
    'nav.about':      { vi: 'Về bác sĩ', en: 'About', ko: '의사 소개', zh: '关于医生' },
    'nav.services':   { vi: 'Dịch vụ ▾', en: 'Services ▾', ko: '진료 ▾', zh: '服务 ▾' },
    'nav.cases':      { vi: 'Case study', en: 'Results', ko: '치료 사례', zh: '案例' },
    'nav.tech':       { vi: 'Công nghệ', en: 'Technology', ko: '장비', zh: '技术' },
    'nav.reviews':    { vi: 'Đánh giá', en: 'Reviews', ko: '후기', zh: '评价' },
    'nav.booking':    { vi: 'Đặt lịch online', en: 'Book online', ko: '온라인 예약', zh: '在线预约' },
    'nav.contact':    { vi: 'Liên hệ', en: 'Contact', ko: '연락처', zh: '联系' },
    'nav.menu':       { vi: '📋 Bảng dịch vụ đầy đủ', en: '📋 Full service menu', ko: '📋 전체 시술 메뉴', zh: '📋 完整服务菜单' },
    'sub.trimun':     { vi: 'Trị Mụn Y Khoa', en: 'Medical Acne Treatment', ko: '의료 여드름 치료', zh: '医学祛痘' },
    'sub.seo':        { vi: 'Trị Sẹo Rỗ', en: 'Atrophic Scar Treatment', ko: '흉터(모공) 치료', zh: '凹陷疤痕治疗' },
    'sub.peel':       { vi: 'Peel Da Dược Mỹ Phẩm', en: 'Medical Chemical Peel', ko: '메디컬 필링', zh: '医学换肤' },
    'sub.laser':      { vi: 'Laser Trẻ Hoá', en: 'Laser Rejuvenation', ko: '레이저 리쥬브네이션', zh: '激光年轻化' },
    'sub.triet':      { vi: 'Triệt Lông Diode', en: 'Diode Hair Removal', ko: '다이오드 제모', zh: '半导体脱毛' },
    'cta.book':       { vi: 'Đặt lịch khám', en: 'Book now', ko: '예약하기', zh: '立即预约' },
    'header.hotline': { vi: '📞 0934 113 839', en: '📞 0934 113 839', ko: '📞 0934 113 839', zh: '📞 0934 113 839' },

    /* ---------- Hero ---------- */
    'hero.h1a':   { vi: 'TRỊ MỤN · SẸO · NÁM', en: 'ACNE · SCARS · MELASMA', ko: '여드름 · 흉터 · 기미', zh: '祛痘 · 疤痕 · 黄褐斑' },
    'hero.h1b':   { vi: 'CHUYÊN SÂU Y KHOA', en: 'ADVANCED MEDICAL CARE', ko: '전문 의료 케어', zh: '专业医学治疗' },
    'hero.sub':   { vi: 'Phòng khám Da liễu Bác sĩ CKI Lê Hiếu', en: 'Dr. Le Hieu Dermatology Clinic', ko: 'Le Hieu 전문의 피부과 클리닉', zh: 'Lê Hiếu 皮肤科专科诊所' },
    'hero.tagline': {
      vi: '10 năm kinh nghiệm · 5000+ khách điều trị thành công. Không phải spa. Không quảng cáo ảo. Chỉ có phác đồ y khoa được cá nhân hoá cho từng khách.',
      en: '10 years of experience · 5,000+ patients successfully treated. Not a spa. No empty promises — only personalized medical treatment plans for each patient.',
      ko: '10년 경력 · 5,000명 이상 치료 성공. 스파가 아닙니다. 과장 광고 없이, 환자 개개인에 맞춘 의료 치료 프로토콜만 제공합니다.',
      zh: '10年经验 · 5000+ 成功治疗案例。不是美容院，没有虚假宣传——只有为每位顾客量身定制的医学治疗方案。'
    },
    'hero.cta1':  { vi: 'Đặt lịch khám miễn phí', en: 'Book a free consultation', ko: '무료 상담 예약', zh: '预约免费咨询' },
    'hero.cta2':  { vi: 'Xem case study thật →', en: 'See real results →', ko: '실제 사례 보기 →', zh: '查看真实案例 →' },
    'hero.badge1':{ vi: 'Bác sĩ CKI Da liễu', en: 'Board-certified dermatologist', ko: '피부과 전문의', zh: '皮肤科专科医生' },
    'hero.badge2':{ vi: '10 năm kinh nghiệm', en: '10 years of experience', ko: '10년 경력', zh: '10年经验' },
    'hero.badge3':{ vi: '5000+ khách hài lòng', en: '5,000+ happy patients', ko: '5,000명+ 만족 고객', zh: '5000+ 满意顾客' },
    'hero.loc':   { vi: '📍 762 Hùng Vương, Khu Phú Mỹ, Thủ Dầu Một, Bình Dương', en: '📍 762 Hung Vuong, Phu My, Thu Dau Mot, Binh Duong', ko: '📍 762 Hung Vuong, Phu My, Thu Dau Mot, Binh Duong', zh: '📍 平阳省土龙木市富美坊雄王路762号' },
    'hero.cue':   { vi: 'Kéo xuống xem kết quả thật từ khách hàng', en: 'Scroll down to see real patient results', ko: '아래로 스크롤하여 실제 결과 보기', zh: '向下滑动查看真实案例' },
    'stat.years': { vi: 'Năm kinh nghiệm', en: 'Years of experience', ko: '년 경력', zh: '年经验' },
    'stat.clients':{ vi: 'Khách điều trị', en: 'Patients treated', ko: '치료 환자', zh: '治疗顾客' },
    'stat.cki':   { vi: 'Chuyên khoa Da liễu', en: 'Dermatology specialist', ko: '피부과 전문', zh: '皮肤科专科' },

    /* ---------- Section: Dịch vụ ---------- */
    'svc.eyebrow':{ vi: 'Dịch vụ', en: 'Services', ko: '진료 항목', zh: '服务项目' },
    'svc.title':  { vi: 'Dịch vụ điều trị chuyên sâu', en: 'Advanced treatment services', ko: '전문 치료 서비스', zh: '专业治疗服务' },
    'svc.sub':    { vi: 'Mỗi vấn đề da cần phác đồ riêng — không có công thức chung', en: 'Every skin concern needs its own protocol — no one-size-fits-all', ko: '모든 피부 고민은 각각의 프로토콜이 필요합니다 — 일률적인 방법은 없습니다', zh: '每种皮肤问题都需要专属方案——没有万能公式' },
    'card1.title':{ vi: 'Trị Mụn Y Khoa', en: 'Medical Acne Treatment', ko: '의료 여드름 치료', zh: '医学祛痘' },
    'card1.desc': { vi: 'Từ mụn ẩn, mụn viêm đến mụn bọc nội tiết. Phác đồ cá nhân hoá theo 4 loại mụn + 3 nguyên nhân gốc.', en: 'From closed comedones and inflammatory acne to hormonal cystic acne. Personalized protocol by 4 acne types + 3 root causes.', ko: '숨은 여드름, 염증성 여드름부터 호르몬성 낭포성 여드름까지. 4가지 여드름 유형 + 3가지 근본 원인에 맞춘 맞춤 프로토콜.', zh: '从隐藏性、炎症性到激素性囊肿痤疮。按4种痤疮类型 + 3大根源定制方案。' },
    'card2.title':{ vi: 'Trị Sẹo Rỗ Chuyên Sâu', en: 'Advanced Scar Treatment', ko: '흉터 집중 치료', zh: '凹陷疤痕深度治疗' },
    'card2.desc': { vi: '5 loại sẹo lõm khác nhau — phương pháp khác nhau. Kết hợp Fractional CO2 + Subcision + TCA CROSS.', en: '5 types of atrophic scars — different methods. Combining Fractional CO2 + Subcision + TCA CROSS.', ko: '5가지 함몰 흉터 — 각기 다른 방법. Fractional CO2 + 서브시전 + TCA CROSS 병행.', zh: '5种凹陷疤痕——不同方法。结合点阵CO2 + 皮下分离 + TCA CROSS。' },
    'card3.title':{ vi: 'Peel Da Dược Mỹ Phẩm', en: 'Medical Chemical Peel', ko: '메디컬 케미컬 필링', zh: '医学化学换肤' },
    'card3.desc': { vi: 'Peel bằng dược mỹ phẩm nhập từ châu Âu. Nồng độ acid chọn theo loại da từng khách.', en: 'Peels using European medical-grade cosmeceuticals. Acid strength tailored to each skin type.', ko: '유럽산 메디컬 화장품을 사용한 필링. 피부 타입에 맞춘 산 농도.', zh: '采用欧洲进口医学护肤品换肤。酸浓度按肤质定制。' },
    'card.more':  { vi: 'Tìm hiểu thêm', en: 'Learn more', ko: '자세히 보기', zh: '了解更多' },
    'svc.more.laser':{ vi: 'Xem thêm: Laser Trẻ Hoá', en: 'More: Laser Rejuvenation', ko: '더 보기: 레이저 리쥬브네이션', zh: '更多：激光年轻化' },
    'svc.more.triet':{ vi: 'Triệt Lông Diode', en: 'Diode Hair Removal', ko: '다이오드 제모', zh: '半导体脱毛' },

    /* ---------- Section: Case study ---------- */
    'case.eyebrow':{ vi: 'Kết quả thật', en: 'Real results', ko: '실제 결과', zh: '真实案例' },
    'case.title': { vi: 'Kết quả thật từ khách hàng', en: 'Real results from our patients', ko: '실제 환자들의 결과', zh: '来自顾客的真实效果' },
    'case.sub':   { vi: 'Không photoshop. Không dàn dựng. Đây là những khách đã đồng ý cho phép sử dụng hình ảnh.', en: 'No photoshop. No staging. These patients consented to sharing their images.', ko: '포토샵 없음. 연출 없음. 이미지 사용에 동의한 실제 환자들입니다.', zh: '无PS，无摆拍。均为同意授权使用照片的真实顾客。' },
    'case.disc':  { vi: 'Kết quả phụ thuộc cơ địa và mức độ tổn thương của từng người. Hình ảnh được khách hàng đồng ý cho phép sử dụng.', en: 'Results vary by individual condition and severity. Images used with patient consent.', ko: '결과는 개인의 체질과 손상 정도에 따라 다릅니다. 이미지는 환자 동의하에 사용되었습니다.', zh: '效果因个人体质和损伤程度而异。照片经顾客同意使用。' },
    'case.btn':   { vi: 'Đặt lịch để bác đánh giá tình trạng da của bạn', en: 'Book a consultation to assess your skin', ko: '피부 상태 진단 예약하기', zh: '预约让医生评估您的皮肤' },
    'cap.seoro':  { vi: 'Điều trị sẹo rỗ do mụn', en: 'Acne scar treatment', ko: '여드름 흉터 치료', zh: '痤疮凹陷疤痕治疗' },
    'cap.seopt':  { vi: 'Điều trị sẹo phức tạp', en: 'Complex scar treatment', ko: '복합 흉터 치료', zh: '复杂疤痕治疗' },
    'cap.noitiet':{ vi: 'Điều trị mụn nội tiết', en: 'Hormonal acne treatment', ko: '호르몬성 여드름 치료', zh: '激素性痤疮治疗' },
    'cap.cortico':{ vi: 'Phục hồi da nhiễm corticoid', en: 'Corticosteroid-damaged skin recovery', ko: '스테로이드 손상 피부 회복', zh: '激素依赖性皮肤修复' },
    'cap.ruou':   { vi: 'Phục hồi da nhiễm thuốc rượu', en: 'Damaged skin recovery (herbal alcohol)', ko: '한방 알코올 손상 피부 회복', zh: '药酒损伤皮肤修复' },
    'cap.nangl':  { vi: 'Điều trị viêm nang lông', en: 'Folliculitis treatment', ko: '모낭염 치료', zh: '毛囊炎治疗' },
    'cap.nam':    { vi: 'Điều trị nám', en: 'Melasma treatment', ko: '기미 치료', zh: '黄褐斑治疗' },
    'cap.munv':   { vi: 'Điều trị mụn viêm', en: 'Inflammatory acne treatment', ko: '염증성 여드름 치료', zh: '炎症性痤疮治疗' },
    'cap.chuan':  { vi: 'Trị mụn chuẩn y khoa', en: 'Medical-standard acne treatment', ko: '의료 표준 여드름 치료', zh: '医学标准祛痘' },

    /* ---------- Section: Về bác sĩ ---------- */
    'ab.eyebrow': { vi: 'Về bác sĩ', en: 'About the doctor', ko: '의사 소개', zh: '关于医生' },
    'ab.title':   { vi: 'Bác sĩ CKI Lê Hiếu', en: 'Dr. Le Hieu, Dermatology Specialist', ko: 'Le Hieu 피부과 전문의', zh: 'Lê Hiếu 皮肤科专科医生' },
    'ab.tagline': { vi: '10 năm — hàng nghìn khách — 1 triết lý duy nhất', en: '10 years — thousands of patients — one philosophy', ko: '10년 — 수천 명의 환자 — 하나의 철학', zh: '10年 — 数千位顾客 — 唯一的理念' },
    'ab.p1':      { vi: 'Bác sĩ Lê Hiếu tốt nghiệp Chuyên khoa I Da liễu, với 10 năm kinh nghiệm điều trị chuyên sâu các vấn đề mụn, sẹo, nám và peel da tại Bình Dương.', en: 'Dr. Le Hieu holds a Level-I Specialist degree in Dermatology, with 10 years of experience treating acne, scars, melasma and chemical peels in Binh Duong.', ko: 'Le Hieu 원장은 피부과 전문의(1급) 자격을 보유하고 있으며, 빈즈엉에서 여드름·흉터·기미·필링을 10년간 전문 치료해 왔습니다.', zh: 'Lê Hiếu 医生拥有皮肤科一级专科学位，在平阳省从事痤疮、疤痕、黄褐斑及换肤治疗已有10年经验。' },
    'ab.p2':      { vi: 'Không giống các spa quảng cáo "trị mụn sau 1 buổi", bác Hiếu tin vào phác đồ y khoa được cá nhân hoá cho từng khách. Da mỗi người khác nhau — phác đồ cũng phải khác.', en: 'Unlike spas promising "clear skin in one session", Dr. Hieu believes in medical protocols personalized for each patient. Every skin is different — so every plan should be too.', ko: '"한 번에 여드름 치료"를 광고하는 스파와 달리, Hieu 원장은 환자마다 맞춤화된 의료 프로토콜을 신뢰합니다. 피부가 다르면 치료법도 달라야 합니다.', zh: '与宣传"一次祛痘"的美容院不同，Hiếu 医生坚信为每位顾客量身定制的医学方案。每个人的皮肤不同，方案也应不同。' },
    'ab.quote':   { vi: '"Bác từng bị mụn nặng thời sinh viên, từng tự nặn sai cách để lại sẹo. Chính trải nghiệm đó khiến bác chọn ngành da liễu — và không phán xét bất kỳ khách nào đang bế tắc với làn da của mình."', en: '"I had severe acne as a student and left scars from squeezing them wrong. That experience led me to dermatology — and to never judge anyone struggling with their skin."', ko: '"저도 학창 시절 심한 여드름을 앓았고, 잘못 짜서 흉터가 남았습니다. 그 경험이 저를 피부과로 이끌었고, 피부 때문에 힘든 누구도 판단하지 않게 되었습니다."', zh: '"我学生时代也曾长过严重痤疮，因错误挤压留下疤痕。正是这段经历让我选择皮肤科——也让我从不评判任何为皮肤困扰的人。"' },
    'ab.b1':      { vi: 'Chuyên khoa I Da liễu', en: 'Level-I Dermatology Specialist', ko: '피부과 전문의 (1급)', zh: '皮肤科一级专科' },
    'ab.b2':      { vi: '10 năm kinh nghiệm', en: '10 years of experience', ko: '10년 경력', zh: '10年经验' },
    'ab.b3':      { vi: '5000+ khách điều trị', en: '5,000+ patients treated', ko: '5,000명+ 치료', zh: '5000+ 治疗顾客' },
    'ab.b4':      { vi: 'Cập nhật công nghệ mới', en: 'Up-to-date with new technology', ko: '최신 기술 업데이트', zh: '紧跟新技术' },
    'ab.btn':     { vi: 'Đọc câu chuyện đầy đủ', en: 'Read the full story', ko: '전체 이야기 보기', zh: '阅读完整故事' },

    /* ---------- Section: Công nghệ ---------- */
    'tech.eyebrow':{ vi: 'Công nghệ y khoa', en: 'Medical technology', ko: '의료 장비', zh: '医学技术' },
    'tech.title': { vi: 'Công nghệ điều trị', en: 'Treatment technology', ko: '치료 장비', zh: '治疗技术' },
    'tech.sub':   { vi: 'Thiết bị y khoa chính hãng — không phải máy spa', en: 'Genuine medical devices — not spa machines', ko: '정품 의료 장비 — 스파용 기기가 아닙니다', zh: '正品医疗设备——非美容院机器' },
    'tech1.role': { vi: 'Phân tích 17 chỉ số da chuyên sâu', en: 'In-depth 17-parameter skin analysis', ko: '17개 항목 정밀 피부 분석', zh: '深度分析17项皮肤指标' },
    'tech2.role': { vi: 'Tái cấu trúc sẹo đa tầng', en: 'Multi-layer scar remodeling', ko: '다층 흉터 재구성', zh: '多层疤痕重建' },
    'tech3.role': { vi: 'Triệt lông bền vững', en: 'Long-lasting hair removal', ko: '지속적인 제모', zh: '持久脱毛' },
    'tech4.role': { vi: 'Xử lý thâm — nám tầng sâu', en: 'Deep pigmentation & melasma removal', ko: '깊은 색소·기미 제거', zh: '深层色沉·黄褐斑处理' },

    /* ---------- Section: Đánh giá ---------- */
    'rev.eyebrow':{ vi: 'Đánh giá', en: 'Reviews', ko: '후기', zh: '评价' },
    'rev.title':  { vi: 'Khách hàng nói gì về BS Hiếu', en: 'What patients say about Dr. Hieu', ko: 'Hieu 원장에 대한 후기', zh: '顾客对 Hiếu 医生的评价' },
    'rev.more':   { vi: 'Xem thêm 100+ đánh giá Google →', en: 'See 100+ more Google reviews →', ko: '구글 리뷰 100+ 더 보기 →', zh: '查看更多100+谷歌评价 →' },

    /* ---------- Section: Đặt lịch ---------- */
    'bk.eyebrow': { vi: 'Đặt lịch', en: 'Booking', ko: '예약', zh: '预约' },
    'bk.title':   { vi: 'Đặt lịch khám miễn phí', en: 'Book a free consultation', ko: '무료 상담 예약', zh: '预约免费咨询' },
    'bk.sub':     { vi: 'Bác sĩ CKI Lê Hiếu tư vấn 1-1 trực tiếp. Không tính phí buổi đầu tiên.', en: 'One-on-one consultation directly with Dr. Le Hieu. First visit is free.', ko: 'Le Hieu 전문의가 1:1 직접 상담합니다. 첫 방문은 무료입니다.', zh: 'Lê Hiếu 医生一对一亲自咨询。首次免费。' },
    'bk.trust1':  { vi: 'Tư vấn miễn phí buổi đầu', en: 'Free first consultation', ko: '첫 상담 무료', zh: '首次咨询免费' },
    'bk.trust2':  { vi: 'Không ép mua gói dịch vụ', en: 'No pushy upselling', ko: '강매 없음', zh: '不强推套餐' },
    'bk.trust3':  { vi: 'Bác sĩ CKI trực tiếp khám', en: 'Examined by the specialist in person', ko: '전문의 직접 진료', zh: '专科医生亲诊' },
    'bk.formtitle':{ vi: 'Điền thông tin đặt lịch', en: 'Fill in your booking details', ko: '예약 정보 입력', zh: '填写预约信息' },
    'bk.formsub': { vi: 'Phòng khám sẽ gọi lại xác nhận trong thời gian sớm nhất.', en: 'We will call you back to confirm shortly.', ko: '빠른 시일 내에 확인 전화를 드립니다.', zh: '我们将尽快致电确认。' },
    'bk.name':    { vi: 'Họ tên', en: 'Full name', ko: '성함', zh: '姓名' },
    'bk.phone':   { vi: 'Số điện thoại', en: 'Phone number', ko: '전화번호', zh: '电话号码' },
    'bk.issue':   { vi: 'Vấn đề da', en: 'Skin concern', ko: '피부 고민', zh: '皮肤问题' },
    'bk.date':    { vi: 'Ngày mong muốn', en: 'Preferred date', ko: '희망 날짜', zh: '期望日期' },
    'bk.note':    { vi: 'Ghi chú thêm', en: 'Additional notes', ko: '추가 메모', zh: '备注' },
    'bk.submit':  { vi: 'Đặt lịch ngay', en: 'Book now', ko: '지금 예약', zh: '立即预约' },
    'bk.note2':   { vi: 'Thông tin của bạn được bảo mật và chỉ dùng để liên hệ tư vấn.', en: 'Your information is kept private and used only to contact you.', ko: '귀하의 정보는 안전하게 보호되며 상담 연락에만 사용됩니다.', zh: '您的信息将被保密，仅用于联系咨询。' },
    'ph.name':    { vi: 'Nguyễn Văn A', en: 'Your name', ko: '이름', zh: '您的姓名' },
    'ph.phone':   { vi: '09xx xxx xxx', en: '09xx xxx xxx', ko: '09xx xxx xxx', zh: '09xx xxx xxx' },
    'ph.note':    { vi: 'Mô tả ngắn tình trạng da của bạn…', en: 'Briefly describe your skin condition…', ko: '피부 상태를 간단히 적어주세요…', zh: '简要描述您的皮肤情况…' },

    /* ---------- Footer + động ---------- */
    'ft.services':{ vi: 'Dịch vụ', en: 'Services', ko: '진료 항목', zh: '服务' },
    'ft.links':   { vi: 'Liên kết', en: 'Links', ko: '바로가기', zh: '链接' },
    'ft.contact': { vi: 'Liên hệ', en: 'Contact', ko: '연락처', zh: '联系方式' },
    'mb.call':    { vi: 'Gọi', en: 'Call', ko: '전화', zh: '致电' },
    'mb.zalo':    { vi: 'Zalo', en: 'Zalo', ko: 'Zalo', zh: 'Zalo' },
    'mb.book':    { vi: 'Đặt lịch', en: 'Book', ko: '예약', zh: '预约' },
    'ck.text':    { vi: 'Website dùng cookie để cải thiện trải nghiệm và đo lường hiệu quả.', en: 'This website uses cookies to improve your experience and measure performance.', ko: '이 웹사이트는 경험 개선과 성과 측정을 위해 쿠키를 사용합니다.', zh: '本网站使用 cookie 以改善体验并衡量效果。' },
    'ck.more':    { vi: 'Xem Chính sách bảo mật', en: 'See Privacy Policy', ko: '개인정보 처리방침 보기', zh: '查看隐私政策' },
    'ck.ok':      { vi: 'Đồng ý', en: 'Accept', ko: '동의', zh: '同意' }
  };

  function t(key, lang) {
    var e = DICT[key];
    if (!e) return null;
    return e[lang] != null ? e[lang] : e.vi;
  }
  // Cho main.js dùng để dịch phần tử động (thanh gọi, cookie)
  window.__i18nText = function (key) { return t(key, current()) || key; };

  function current() {
    var l;
    try { l = localStorage.getItem('site-lang'); } catch (e) {}
    if (LANGS.indexOf(l) === -1) l = null;
    if (!l) {
      var nav = (navigator.language || 'vi').slice(0, 2).toLowerCase();
      l = LANGS.indexOf(nav) !== -1 ? nav : 'vi';
    }
    return l;
  }

  function apply(lang) {
    document.documentElement.setAttribute('lang', HTMLLANG[lang] || lang);
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = t(el.getAttribute('data-i18n'), lang);
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var v = t(el.getAttribute('data-i18n-html'), lang);
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var v = t(el.getAttribute('data-i18n-ph'), lang);
      if (v != null) el.setAttribute('placeholder', v);
    });
    // cập nhật nhãn nút chuyển
    document.querySelectorAll('.lang-switch__cur').forEach(function (el) { el.textContent = LABEL[lang]; });
    document.querySelectorAll('.lang-switch__opt').forEach(function (el) {
      el.setAttribute('aria-current', el.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
    window.__lang = lang;
  }
  window.__applyI18n = function () { apply(current()); };

  function setLang(lang) {
    if (LANGS.indexOf(lang) === -1) return;
    try { localStorage.setItem('site-lang', lang); } catch (e) {}
    apply(lang);
  }

  function wire() {
    document.querySelectorAll('.lang-switch').forEach(function (sw) {
      var btn = sw.querySelector('.lang-switch__btn');
      var menu = sw.querySelector('.lang-switch__menu');
      if (btn) btn.addEventListener('click', function (e) {
        e.stopPropagation();
        sw.classList.toggle('open');
      });
      sw.querySelectorAll('.lang-switch__opt').forEach(function (opt) {
        opt.addEventListener('click', function () {
          setLang(opt.getAttribute('data-lang'));
          sw.classList.remove('open');
        });
      });
    });
    document.addEventListener('click', function () {
      document.querySelectorAll('.lang-switch.open').forEach(function (s) { s.classList.remove('open'); });
    });
  }

  function init() { wire(); apply(current()); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
