<?php
/**
 * Trang chủ (Front Page) — bản đầy đủ, phục vụ toàn quốc.
 */
get_header();
$tel   = tnl_tel_link();
$phone = tnl_opt( 'tnl_phone_display', '0984 243 629' );
$years = tnl_opt( 'tnl_lawyer_years', '30' );
?>

	<!-- HERO -->
	<section class="hero">
		<div class="container hero__inner">
			<div class="hero__content">
				<p class="hero__eyebrow">⚖ Tư vấn và tranh tụng — Liên tỉnh · Toàn quốc</p>
				<h1 class="hero__title">Bảo vệ quyền lợi của bạn bằng sự tận tâm &amp; uy tín</h1>
				<p class="hero__sub">Văn phòng Luật sư <strong><?php echo esc_html( tnl_opt( 'tnl_office_name', 'Triều Nguyễn và Cộng sự' ) ); ?></strong> — trụ sở tại <strong>Gia Lai (Bình Định cũ)</strong>, đồng hành cùng khách hàng <strong>trên khắp cả nước</strong>: đất đai, thừa kế, hôn nhân, hình sự, dân sự, doanh nghiệp. Tư vấn trực tuyến nhanh chóng; luật sư trực tiếp tham gia hòa giải, tranh tụng tại tòa án nhiều tỉnh thành.</p>
				<div class="hero__actions">
					<a href="<?php echo esc_attr( $tel ); ?>" class="btn btn--gold btn--lg" data-phone-link>📞 Gọi ngay: <span data-phone-text><?php echo esc_html( $phone ); ?></span></a>
					<a href="#dat-lich" class="btn btn--outline btn--lg">📝 Đặt lịch tư vấn</a>
				</div>
				<ul class="hero__trust"><li>✔ Tư vấn ban đầu <strong>miễn phí</strong></li><li>✔ Giữ <strong>bí mật</strong> thông tin</li><li>✔ Chi phí <strong>rõ ràng</strong></li></ul>
			</div>
			<div class="hero__card">
				<h3>Cần hỏi gấp một việc?</h3>
				<p>Để lại số điện thoại, luật sư sẽ gọi lại cho bạn sớm nhất.</p>
				<form class="quickform" data-quickform>
					<label>Họ tên<input type="text" name="ten" placeholder="Nguyễn Văn A" required /></label>
					<label>Số điện thoại<input type="tel" name="sdt" placeholder="09xx xxx xxx" required pattern="[0-9 ]{9,15}" inputmode="numeric" /></label>
					<label>Vấn đề cần hỏi
						<select name="linhvuc"><option>Đất đai – Nhà ở</option><option>Thừa kế – Di chúc</option><option>Hôn nhân – Gia đình</option><option>Hình sự</option><option>Dân sự – Hợp đồng</option><option>Doanh nghiệp – Lao động</option><option>Vấn đề khác</option></select>
					</label>
					<button type="submit" class="btn btn--gold btn--block">Gửi yêu cầu gọi lại</button>
					<p class="quickform__note">Hoặc gọi/nhắn Zalo trực tiếp.</p>
				</form>
			</div>
		</div>
	</section>

	<!-- CON SỐ -->
	<section class="section--stats"><div class="container stats">
		<div class="stat"><div class="stat__num"><?php echo esc_html( $years ); ?>+</div><div class="stat__label">Năm kinh nghiệm</div></div>
		<div class="stat"><div class="stat__num">500+</div><div class="stat__label">Vụ việc đã hỗ trợ</div></div>
		<div class="stat"><div class="stat__num">Toàn quốc</div><div class="stat__label">Phạm vi hỗ trợ</div></div>
		<div class="stat"><div class="stat__num">24/7</div><div class="stat__label">Tư vấn trực tuyến</div></div>
	</div></section>

	<!-- GIỚI THIỆU -->
	<section class="section section--about" id="gioi-thieu">
		<div class="container about">
			<div class="about__media">
				<?php $photo = tnl_opt( 'tnl_lawyer_photo', '' ); if ( $photo ) : ?>
					<img src="<?php echo esc_url( $photo ); ?>" alt="<?php echo esc_attr( tnl_opt( 'tnl_lawyer_name', 'Luật sư' ) ); ?>" />
				<?php else : ?>
					<div class="about__placeholder"><span class="about__placeholder-ic">👩‍⚖️</span><span>Thêm ảnh: Tùy biến → Giới thiệu luật sư</span></div>
				<?php endif; ?>
				<div class="about__badge"><strong><?php echo esc_html( $years ); ?>+</strong><span>năm kinh nghiệm</span></div>
			</div>
			<div class="about__content">
				<p class="section__eyebrow">Về chúng tôi</p>
				<h2 class="section__title">Tận tâm – Uy tín – Phục vụ trên toàn quốc</h2>
				<p class="about__role"><?php echo esc_html( tnl_opt( 'tnl_lawyer_role', 'Trưởng Văn phòng · Luật sư Nguyễn Thị Triều' ) ); ?></p>
				<p><?php echo esc_html( tnl_opt( 'tnl_lawyer_bio', 'Văn phòng có trụ sở tại Gia Lai (Bình Định cũ) nhưng nhận việc liên huyện, liên tỉnh, toàn quốc — kết hợp tư vấn trực tuyến và trực tiếp tham gia tố tụng tại tòa án nhiều tỉnh thành. Phương châm: nói thật, giải thích dễ hiểu và theo việc đến cùng.' ) ); ?></p>
				<ul class="about__list"><li>Hơn <strong><?php echo esc_html( $years ); ?></strong> năm kinh nghiệm tư vấn &amp; tranh tụng</li><li>Nhận việc <strong>liên huyện, liên tỉnh, toàn quốc</strong></li><li>Đã đồng hành cùng <strong>hàng trăm</strong> vụ việc ở nhiều tỉnh thành</li><li>Giữ <strong>bí mật</strong> thông tin khách hàng tuyệt đối</li></ul>
				<div class="about__actions"><a href="#dat-lich" class="btn btn--gold">📝 Đặt lịch gặp luật sư</a><a href="<?php echo esc_attr( $tel ); ?>" class="btn btn--ghost-maroon" data-phone-link>📞 Gọi tư vấn</a></div>
			</div>
		</div>
	</section>

	<!-- LĨNH VỰC -->
	<section class="section section--alt" id="linh-vuc"><div class="container">
		<div class="section__head"><p class="section__eyebrow">Lĩnh vực tư vấn</p><h2 class="section__title">Chúng tôi hỗ trợ bạn việc gì?</h2><p class="section__lead">Đầy đủ các lĩnh vực pháp lý thường gặp của cá nhân và doanh nghiệp — hỗ trợ khách hàng trên toàn quốc.</p></div>
		<div class="grid grid--3">
			<article class="card service"><div class="service__icon">🏡</div><h3>Đất đai – Nhà ở</h3><ul><li>Tranh chấp ranh đất, lối đi</li><li>Sang tên, tách thửa, sổ đỏ</li><li>Đòi lại đất cho mượn, ở nhờ</li><li>Đền bù, giải phóng mặt bằng</li></ul><a href="#dat-lich" class="service__link">Nhờ tư vấn →</a></article>
			<article class="card service"><div class="service__icon">📜</div><h3>Thừa kế – Di chúc</h3><ul><li>Lập di chúc hợp pháp</li><li>Chia di sản thừa kế</li><li>Khai nhận, từ chối di sản</li><li>Tranh chấp thừa kế</li></ul><a href="#dat-lich" class="service__link">Nhờ tư vấn →</a></article>
			<article class="card service"><div class="service__icon">👨‍👩‍👧</div><h3>Hôn nhân – Gia đình</h3><ul><li>Ly hôn thuận tình / đơn phương</li><li>Giành quyền nuôi con, cấp dưỡng</li><li>Chia tài sản vợ chồng</li><li>Xác định cha, mẹ, con</li></ul><a href="#dat-lich" class="service__link">Nhờ tư vấn →</a></article>
			<article class="card service"><div class="service__icon">⚖️</div><h3>Hình sự</h3><ul><li>Bào chữa cho bị can, bị cáo</li><li>Bảo vệ người bị hại</li><li>Tham gia từ giai đoạn điều tra</li><li>Kháng cáo, giảm nhẹ hình phạt</li></ul><a href="#dat-lich" class="service__link">Nhờ tư vấn →</a></article>
			<article class="card service"><div class="service__icon">🤝</div><h3>Dân sự – Hợp đồng</h3><ul><li>Đòi nợ, tranh chấp vay mượn</li><li>Bồi thường thiệt hại, tai nạn</li><li>Soạn thảo, rà soát hợp đồng</li><li>Tranh chấp mua bán, đặt cọc</li></ul><a href="#dat-lich" class="service__link">Nhờ tư vấn →</a></article>
			<article class="card service"><div class="service__icon">🏢</div><h3>Doanh nghiệp – Lao động</h3><ul><li>Thành lập công ty, hộ kinh doanh</li><li>Đăng ký, thay đổi giấy phép</li><li>Tranh chấp lao động, BHXH</li><li>Tư vấn pháp lý thường xuyên</li></ul><a href="#dat-lich" class="service__link">Nhờ tư vấn →</a></article>
		</div>
	</div></section>

	<!-- VÌ SAO CHỌN -->
	<section class="section" id="vi-sao"><div class="container">
		<div class="section__head"><p class="section__eyebrow">Vì sao chọn chúng tôi</p><h2 class="section__title">Gần gũi – Tận tâm – Đáng tin cậy</h2></div>
		<div class="grid grid--3">
			<div class="feature"><div class="feature__icon">🤝</div><h3>Nói chuyện dễ hiểu</h3><p>Giải thích cặn kẽ, đời thường — ai cũng nắm được quyền lợi của mình.</p></div>
			<div class="feature"><div class="feature__icon">💰</div><h3>Chi phí minh bạch</h3><p>Báo phí rõ ràng trước khi làm; tư vấn lần đầu miễn phí.</p></div>
			<div class="feature"><div class="feature__icon">🔒</div><h3>Bảo mật tuyệt đối</h3><p>Mọi thông tin được giữ kín theo quy tắc đạo đức nghề luật sư.</p></div>
			<div class="feature"><div class="feature__icon">🌐</div><h3>Phạm vi toàn quốc</h3><p>Tư vấn trực tuyến và đại diện tại tòa án nhiều tỉnh thành — không giới hạn địa giới.</p></div>
			<div class="feature"><div class="feature__icon">⏱️</div><h3>Phản hồi nhanh</h3><p>Gọi điện hoặc nhắn Zalo là được hỗ trợ ngay, kể cả ngoài giờ.</p></div>
			<div class="feature"><div class="feature__icon">📚</div><h3>Kinh nghiệm thực chiến</h3><p>Đã xử lý nhiều vụ việc phức tạp, am hiểu cả thủ tục địa phương lẫn liên tỉnh.</p></div>
		</div>
	</div></section>

	<!-- QUY TRÌNH -->
	<section class="section section--alt" id="quy-trinh"><div class="container">
		<div class="section__head"><p class="section__eyebrow">Quy trình làm việc</p><h2 class="section__title">4 bước đơn giản</h2></div>
		<div class="steps">
			<div class="step"><div class="step__num">1</div><h3>Liên hệ</h3><p>Gọi điện, nhắn Zalo hoặc để lại số.</p></div>
			<div class="step"><div class="step__num">2</div><h3>Tư vấn miễn phí</h3><p>Luật sư lắng nghe và chỉ rõ hướng giải quyết.</p></div>
			<div class="step"><div class="step__num">3</div><h3>Báo phí &amp; ký kết</h3><p>Thống nhất công việc, chi phí rõ ràng.</p></div>
			<div class="step"><div class="step__num">4</div><h3>Thực hiện</h3><p>Làm thủ tục, đại diện, bảo vệ quyền lợi đến cùng.</p></div>
		</div>
	</div></section>

	<!-- ĐỘI NGŨ -->
	<section class="section" id="doi-ngu"><div class="container">
		<div class="section__head"><p class="section__eyebrow">Đội ngũ</p><h2 class="section__title">Luật sư &amp; cộng sự</h2></div>
		<div class="grid grid--3">
			<div class="member"><div class="member__photo">👩‍⚖️</div><div class="member__body"><h3><?php echo esc_html( tnl_opt( 'tnl_lawyer_name', 'Luật sư Nguyễn Thị Triều' ) ); ?></h3><p class="member__role">Trưởng Văn phòng</p><p class="member__desc">Hơn <?php echo esc_html( $years ); ?> năm kinh nghiệm về đất đai, dân sự và hình sự; tận tâm theo từng vụ việc đến cùng.</p></div></div>
			<div class="member"><div class="member__photo">⚖️</div><div class="member__body"><h3>Luật sư cộng sự</h3><p class="member__role">Hôn nhân – Gia đình &amp; Thừa kế</p><p class="member__desc">Đồng hành xử lý ly hôn, nuôi con, phân chia di sản.</p></div></div>
			<div class="member"><div class="member__photo">🧑‍💼</div><div class="member__body"><h3>Chuyên viên pháp lý</h3><p class="member__role">Hồ sơ &amp; Thủ tục hành chính</p><p class="member__desc">Hỗ trợ soạn thảo hồ sơ, giấy tờ và thủ tục nhanh gọn.</p></div></div>
		</div>
	</div></section>

	<!-- BẢNG PHÍ -->
	<section class="section section--alt" id="bang-phi"><div class="container">
		<div class="section__head"><p class="section__eyebrow">Chi phí dịch vụ</p><h2 class="section__title">Bảng phí tham khảo</h2><p class="section__lead">Mức phí minh bạch, thống nhất trước khi làm. Phí cụ thể tùy tính chất từng vụ việc.</p></div>
		<div class="pricing">
			<div class="price-card"><h3>Tư vấn pháp luật</h3><div class="price-card__price">Miễn phí</div><p class="price-card__note">Lần tư vấn đầu tiên</p><ul><li>Nghe &amp; phân tích vụ việc</li><li>Chỉ rõ hướng giải quyết</li><li>Tư vấn qua điện thoại / Zalo</li><li>Hẹn gặp tại văn phòng</li></ul><a href="#dat-lich" class="btn btn--ghost-maroon btn--block">Nhận tư vấn</a></div>
			<div class="price-card price-card--featured"><span class="price-card__badge">Được chọn nhiều</span><h3>Soạn thảo hồ sơ</h3><div class="price-card__price">Từ 300.000đ</div><p class="price-card__note">Tùy loại giấy tờ</p><ul><li>Soạn đơn từ, hợp đồng</li><li>Di chúc, văn bản thỏa thuận</li><li>Hồ sơ khởi kiện, khiếu nại</li><li>Rà soát giấy tờ pháp lý</li></ul><a href="#dat-lich" class="btn btn--gold btn--block">Đặt dịch vụ</a></div>
			<div class="price-card"><h3>Luật sư đại diện</h3><div class="price-card__price">Theo vụ việc</div><p class="price-card__note">Báo phí trọn gói</p><ul><li>Đại diện làm thủ tục</li><li>Tham gia hòa giải, tranh tụng</li><li>Bảo vệ quyền lợi tại tòa</li><li>Theo sát đến khi xong việc</li></ul><a href="#dat-lich" class="btn btn--ghost-maroon btn--block">Yêu cầu báo phí</a></div>
		</div>
		<p class="pricing-note">* Mức phí trên chỉ mang tính tham khảo. Văn phòng luôn báo giá rõ ràng và thống nhất trước khi thực hiện.</p>
	</div></section>

	<!-- CẢM NHẬN -->
	<section class="section"><div class="container">
		<div class="section__head"><p class="section__eyebrow">Khách hàng nói gì</p><h2 class="section__title">Cảm nhận của khách hàng</h2></div>
		<div class="grid grid--3">
			<div class="testi"><div class="testi__stars">★★★★★</div><p class="testi__quote">Vụ tranh chấp đất nhà tôi kéo dài mấy năm, nhờ văn phòng hướng dẫn tận tình mà giải quyết xong.</p><div class="testi__author"><div class="testi__avatar">H</div><div><div class="testi__name">Chị Hoa</div><div class="testi__loc">Gia Lai</div></div></div></div>
			<div class="testi"><div class="testi__stars">★★★★★</div><p class="testi__quote">Luật sư nói chuyện dễ hiểu, thủ tục ly hôn làm nhanh gọn, chi phí rõ ràng từ đầu.</p><div class="testi__author"><div class="testi__avatar">T</div><div><div class="testi__name">Anh Tuấn</div><div class="testi__loc">TP. Quy Nhơn</div></div></div></div>
			<div class="testi"><div class="testi__stars">★★★★★</div><p class="testi__quote">Tôi ở tỉnh khác, chỉ tư vấn qua điện thoại và Zalo mà vụ thừa kế được lo trọn gói, khỏi đi lại.</p><div class="testi__author"><div class="testi__avatar">L</div><div><div class="testi__name">Anh Lâm</div><div class="testi__loc">TP. Hồ Chí Minh</div></div></div></div>
		</div>
	</div></section>

	<!-- CẨM NANG (tự lấy bài mới nhất) -->
	<section class="section section--alt" id="cam-nang"><div class="container">
		<div class="section__head"><p class="section__eyebrow">Cẩm nang pháp luật</p><h2 class="section__title">Kiến thức hữu ích cho bạn</h2></div>
		<div class="grid grid--3">
			<?php
			$q = new WP_Query( array( 'posts_per_page' => 3, 'ignore_sticky_posts' => true ) );
			if ( $q->have_posts() ) :
				while ( $q->have_posts() ) : $q->the_post(); $cat = get_the_category(); ?>
					<a class="card post" href="<?php the_permalink(); ?>">
						<?php if ( $cat ) : ?><div class="post__tag"><?php echo esc_html( $cat[0]->name ); ?></div><?php endif; ?>
						<h3><?php the_title(); ?></h3>
						<p><?php echo esc_html( tnl_excerpt() ); ?></p>
						<span class="post__more">Đọc tiếp →</span>
					</a>
				<?php endwhile;
				wp_reset_postdata();
			else : ?>
				<p class="empty-note">Chưa có bài viết. Hãy đăng bài đầu tiên trong <strong>Bài viết → Viết bài mới</strong>.</p>
			<?php endif; ?>
		</div>
		<?php $blog = get_option( 'page_for_posts' ); if ( $blog ) : ?>
			<div style="text-align:center;margin-top:28px"><a href="<?php echo esc_url( get_permalink( $blog ) ); ?>" class="btn btn--ghost-maroon">Xem tất cả bài viết →</a></div>
		<?php endif; ?>
	</div></section>

	<!-- HỎI ĐÁP -->
	<section class="section" id="hoi-dap"><div class="container container--narrow">
		<div class="section__head"><p class="section__eyebrow">Hỏi – Đáp nhanh</p><h2 class="section__title">Câu hỏi khách hàng hay thắc mắc</h2></div>
		<div class="faq">
			<details class="faq__item"><summary>Tư vấn lần đầu có mất tiền không?</summary><div class="faq__body"><p>Không. Lần tư vấn đầu tiên qua điện thoại hoặc tại văn phòng là <strong>hoàn toàn miễn phí</strong>. Chúng tôi chỉ báo phí khi bạn đồng ý để văn phòng thực hiện công việc cụ thể.</p></div></details>
			<details class="faq__item"><summary>Tôi ở tỉnh khác thì văn phòng hỗ trợ được không?</summary><div class="faq__body"><p>Được. Chúng tôi <strong>tư vấn trực tuyến</strong> qua điện thoại/Zalo và trực tiếp <strong>tham gia tố tụng tại tòa án nhiều tỉnh thành</strong>, nên bạn ở đâu cũng hỗ trợ được.</p></div></details>
			<details class="faq__item"><summary>Khi đến tư vấn cần mang theo giấy tờ gì?</summary><div class="faq__body"><p>Bạn nên mang theo <strong>CCCD/CMND</strong> và các giấy tờ liên quan (sổ đỏ, giấy kết hôn, hợp đồng, giấy vay nợ…). Chưa đủ cũng không sao, cứ trao đổi trước.</p></div></details>
			<details class="faq__item"><summary>Chi phí thuê luật sư khoảng bao nhiêu?</summary><div class="faq__body"><p>Tùy tính chất từng vụ việc. Chúng tôi luôn <strong>báo giá rõ ràng và thống nhất trước</strong> khi làm, không phát sinh bất ngờ.</p></div></details>
			<details class="faq__item"><summary>Thông tin của tôi có được giữ kín không?</summary><div class="faq__body"><p>Có. Mọi thông tin được <strong>giữ bí mật tuyệt đối</strong> theo quy định đạo đức nghề luật sư.</p></div></details>
		</div>
	</div></section>

	<!-- ĐẶT LỊCH -->
	<section class="section section--cta" id="dat-lich"><div class="container container--narrow">
		<div class="section__head"><p class="section__eyebrow section__eyebrow--light">Đặt lịch tư vấn</p><h2 class="section__title section__title--light">Để lại thông tin, chúng tôi gọi lại cho bạn</h2><p class="section__lead section__lead--light">Điền vài thông tin đơn giản. Hoặc gọi/nhắn Zalo trực tiếp nếu bạn cần gấp.</p></div>
		<form class="bookform" data-quickform>
			<div class="bookform__row">
				<label>Họ và tên *<input type="text" name="ten" placeholder="Nguyễn Văn A" required /></label>
				<label>Số điện thoại *<input type="tel" name="sdt" placeholder="09xx xxx xxx" required pattern="[0-9 ]{9,15}" inputmode="numeric" /></label>
			</div>
			<div class="bookform__row">
				<label>Lĩnh vực cần tư vấn<select name="linhvuc"><option>Đất đai – Nhà ở</option><option>Thừa kế – Di chúc</option><option>Hôn nhân – Gia đình</option><option>Hình sự</option><option>Dân sự – Hợp đồng</option><option>Doanh nghiệp – Lao động</option><option>Vấn đề khác</option></select></label>
				<label>Bạn muốn được gọi lúc<select name="thoigian"><option>Bất cứ lúc nào</option><option>Buổi sáng (7h30 – 11h30)</option><option>Buổi chiều (13h30 – 18h00)</option></select></label>
			</div>
			<label>Mô tả ngắn vấn đề của bạn<textarea name="noidung" rows="3" placeholder="Ví dụ: Tôi muốn hỏi về tranh chấp ranh đất…"></textarea></label>
			<button type="submit" class="btn btn--gold btn--lg btn--block">📩 Gửi yêu cầu tư vấn</button>
			<p class="bookform__note">Bằng việc gửi, bạn đồng ý để văn phòng liên hệ lại với bạn.</p>
		</form>
	</div></section>

	<!-- LIÊN HỆ -->
	<section class="section" id="lien-he"><div class="container">
		<div class="section__head"><p class="section__eyebrow">Liên hệ</p><h2 class="section__title">Ghé văn phòng hoặc gọi cho chúng tôi</h2></div>
		<div class="contact">
			<div class="contact__info">
				<a class="contact__item" href="<?php echo esc_attr( $tel ); ?>" data-phone-link><span class="contact__ic">📞</span><span><small>Điện thoại / Zalo</small><strong data-phone-text><?php echo esc_html( $phone ); ?></strong></span></a>
				<a class="contact__item" href="mailto:<?php echo esc_attr( tnl_opt( 'tnl_email', 'email@vanphongluat.vn' ) ); ?>" data-email-link><span class="contact__ic">✉️</span><span><small>Email</small><strong data-email-text><?php echo esc_html( tnl_opt( 'tnl_email', 'email@vanphongluat.vn' ) ); ?></strong></span></a>
				<div class="contact__item"><span class="contact__ic">📍</span><span><small>Trụ sở</small><strong><?php echo esc_html( tnl_opt( 'tnl_address', '69 Phan Huy Ích, xã Tây Sơn, tỉnh Gia Lai' ) ); ?></strong><small style="display:block;color:var(--ink-soft);margin-top:2px">(TT. Phú Phong, huyện Tây Sơn, Bình Định cũ)</small></span></div>
				<div class="contact__item"><span class="contact__ic">🌐</span><span><small>Phạm vi phục vụ</small><strong>Liên huyện · Liên tỉnh · Toàn quốc</strong></span></div>
				<div class="contact__socials"><a href="<?php echo esc_url( tnl_opt( 'tnl_facebook', '#' ) ); ?>" class="btn btn--ghost-maroon" data-fanpage-link>📘 Facebook</a><a href="<?php echo esc_url( tnl_zalo_link() ); ?>" class="btn btn--gold" data-zalo-link target="_blank" rel="noopener">💬 Nhắn Zalo</a></div>
			</div>
			<div class="contact__map"><iframe title="Bản đồ văn phòng" src="<?php echo esc_url( tnl_opt( 'tnl_map_src', 'https://www.google.com/maps?q=T%C3%A2y%20S%C6%A1n%2C%20Gia%20Lai&output=embed' ) ); ?>" width="100%" height="100%" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
		</div>
	</div></section>

<?php get_footer(); ?>
