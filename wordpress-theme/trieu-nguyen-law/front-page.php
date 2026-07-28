<?php
/**
 * Trang chủ (Front Page).
 */
get_header();
?>

	<!-- HERO -->
	<section class="hero">
		<div class="container hero__inner">
			<div class="hero__content">
				<p class="hero__eyebrow">⚖ Tư vấn và tranh tụng — Liên tỉnh · Toàn quốc</p>
				<h1 class="hero__title">Bảo vệ quyền lợi của bạn bằng sự tận tâm &amp; uy tín</h1>
				<p class="hero__sub">
					Văn phòng Luật sư Triều Nguyễn và Cộng sự — trụ sở tại <strong>Gia Lai (Bình Định cũ)</strong>, phục vụ khách hàng trên toàn quốc; tư vấn rõ ràng,
					dễ hiểu về <strong>đất đai, thừa kế, ly hôn, hình sự, dân sự</strong> và
					<strong>doanh nghiệp</strong>. Bạn cứ gọi, chúng tôi lắng nghe và hướng dẫn từng bước.
				</p>
				<div class="hero__actions">
					<a href="<?php echo esc_attr( tnl_tel_link() ); ?>" class="btn btn--gold btn--lg" data-phone-link>📞 Gọi ngay: <span data-phone-text><?php echo esc_html( tnl_opt( 'tnl_phone_display', '0984 243 629' ) ); ?></span></a>
					<a href="#dat-lich" class="btn btn--outline btn--lg">📝 Đặt lịch tư vấn</a>
				</div>
				<ul class="hero__trust">
					<li>✔ Tư vấn ban đầu <strong>miễn phí</strong></li>
					<li>✔ Giữ <strong>bí mật</strong> thông tin</li>
					<li>✔ Chi phí <strong>rõ ràng</strong>, báo trước</li>
				</ul>
			</div>
			<div class="hero__card">
				<h3>Cần hỏi gấp một việc?</h3>
				<p>Để lại số điện thoại, luật sư sẽ gọi lại cho bạn trong thời gian sớm nhất.</p>
				<form class="quickform" data-quickform>
					<label>Họ tên
						<input type="text" name="ten" placeholder="Ví dụ: Nguyễn Văn A" required />
					</label>
					<label>Số điện thoại
						<input type="tel" name="sdt" placeholder="Ví dụ: 09xx xxx xxx" required pattern="[0-9 ]{9,15}" inputmode="numeric" />
					</label>
					<label>Vấn đề cần hỏi
						<select name="linhvuc">
							<option>Đất đai – Nhà ở – Thừa kế</option>
							<option>Hôn nhân – Gia đình (ly hôn, nuôi con)</option>
							<option>Hình sự – Dân sự</option>
							<option>Doanh nghiệp – Hợp đồng</option>
							<option>Vấn đề khác</option>
						</select>
					</label>
					<button type="submit" class="btn btn--gold btn--block">Gửi yêu cầu gọi lại</button>
					<p class="quickform__note">Hoặc gọi/nhắn Zalo trực tiếp — chúng tôi luôn sẵn sàng.</p>
				</form>
			</div>
		</div>
	</section>

	<!-- GIỚI THIỆU LUẬT SƯ -->
	<section class="section section--about" id="gioi-thieu">
		<div class="container about">
			<div class="about__media">
				<?php $tnl_photo = tnl_opt( 'tnl_lawyer_photo', '' ); ?>
				<?php if ( $tnl_photo ) : ?>
					<img src="<?php echo esc_url( $tnl_photo ); ?>" alt="<?php echo esc_attr( tnl_opt( 'tnl_lawyer_name', 'Luật sư' ) ); ?>" />
				<?php else : ?>
					<div class="about__placeholder">
						<span class="about__placeholder-ic">👨‍⚖️</span>
						<span>Thêm ảnh trong: Tùy biến → Giới thiệu luật sư</span>
					</div>
				<?php endif; ?>
				<div class="about__badge"><strong><?php echo esc_html( tnl_opt( 'tnl_lawyer_years', '30' ) ); ?>+</strong><span>năm kinh nghiệm</span></div>
			</div>
			<div class="about__content">
				<p class="section__eyebrow">Về chúng tôi</p>
				<h2 class="section__title"><?php echo esc_html( tnl_opt( 'tnl_lawyer_name', 'Luật sư Nguyễn Thị Triều' ) ); ?></h2>
				<p class="about__role"><?php echo esc_html( tnl_opt( 'tnl_lawyer_role', 'Trưởng Văn phòng Luật sư Triều Nguyễn và Cộng sự' ) ); ?></p>
				<p><?php echo esc_html( tnl_opt( 'tnl_lawyer_bio', 'Văn phòng có trụ sở tại Gia Lai (Bình Định cũ) nhưng nhận việc liên huyện, liên tỉnh, toàn quốc — kết hợp tư vấn trực tuyến và trực tiếp tham gia tố tụng tại tòa án nhiều tỉnh thành. Phương châm: nói thật, giải thích dễ hiểu và theo việc đến cùng.' ) ); ?></p>
				<ul class="about__list">
					<li>Hơn <strong><?php echo esc_html( tnl_opt( 'tnl_lawyer_years', '30' ) ); ?></strong> năm kinh nghiệm tư vấn &amp; tranh tụng tại tòa</li>
					<li>Nhận việc <strong>liên huyện, liên tỉnh, toàn quốc</strong></li>
					<li>Đã đồng hành cùng <strong>hàng trăm</strong> vụ việc ở nhiều tỉnh thành</li>
					<li>Tận tâm với từng hồ sơ, giữ <strong>bí mật</strong> thông tin tuyệt đối</li>
				</ul>
				<div class="about__actions">
					<a href="#dat-lich" class="btn btn--gold">📝 Đặt lịch gặp luật sư</a>
					<a href="<?php echo esc_attr( tnl_tel_link() ); ?>" class="btn btn--ghost-maroon" data-phone-link>📞 Gọi tư vấn ngay</a>
				</div>
			</div>
		</div>
	</section>

	<!-- LĨNH VỰC -->
	<section class="section" id="linh-vuc">
		<div class="container">
			<div class="section__head">
				<p class="section__eyebrow">Lĩnh vực tư vấn</p>
				<h2 class="section__title">Chúng tôi hỗ trợ bạn việc gì?</h2>
				<p class="section__lead">Bấm vào lĩnh vực bạn quan tâm để xem chúng tôi giúp được gì.</p>
			</div>
			<div class="grid grid--4">
				<article class="card service">
					<div class="service__icon">🏡</div>
					<h3>Đất đai – Nhà ở – Thừa kế</h3>
					<ul>
						<li>Tranh chấp ranh đất, lối đi</li>
						<li>Sang tên, tách thửa, sổ đỏ</li>
						<li>Chia di sản, làm di chúc</li>
						<li>Đòi lại đất cho mượn, cho ở nhờ</li>
					</ul>
					<a href="#dat-lich" class="service__link">Nhờ tư vấn →</a>
				</article>
				<article class="card service">
					<div class="service__icon">👨‍👩‍👧</div>
					<h3>Hôn nhân – Gia đình</h3>
					<ul>
						<li>Thủ tục ly hôn (thuận tình / đơn phương)</li>
						<li>Giành quyền nuôi con, cấp dưỡng</li>
						<li>Chia tài sản chung vợ chồng</li>
						<li>Xác định cha, mẹ, con</li>
					</ul>
					<a href="#dat-lich" class="service__link">Nhờ tư vấn →</a>
				</article>
				<article class="card service">
					<div class="service__icon">⚖️</div>
					<h3>Hình sự – Dân sự</h3>
					<ul>
						<li>Bào chữa, bảo vệ quyền lợi</li>
						<li>Đòi nợ, tranh chấp vay mượn</li>
						<li>Bồi thường thiệt hại, tai nạn</li>
						<li>Khiếu nại, tố cáo đúng pháp luật</li>
					</ul>
					<a href="#dat-lich" class="service__link">Nhờ tư vấn →</a>
				</article>
				<article class="card service">
					<div class="service__icon">🏢</div>
					<h3>Doanh nghiệp – Hợp đồng</h3>
					<ul>
						<li>Thành lập công ty, hộ kinh doanh</li>
						<li>Đăng ký kinh doanh, thay đổi giấy phép</li>
						<li>Soạn thảo, rà soát hợp đồng</li>
						<li>Tư vấn thuế, lao động cơ bản</li>
					</ul>
					<a href="#dat-lich" class="service__link">Nhờ tư vấn →</a>
				</article>
			</div>
		</div>
	</section>

	<!-- VÌ SAO CHỌN -->
	<section class="section section--alt" id="vi-sao">
		<div class="container">
			<div class="section__head">
				<p class="section__eyebrow">Vì sao chọn chúng tôi</p>
				<h2 class="section__title">Gần gũi – Tận tâm – Đáng tin cậy</h2>
			</div>
			<div class="grid grid--3">
				<div class="feature"><div class="feature__icon">🤝</div><h3>Nói chuyện dễ hiểu</h3><p>Giải thích bằng lời lẽ gần gũi, không dùng từ ngữ khó hiểu, để ai cũng nắm được quyền lợi của mình.</p></div>
				<div class="feature"><div class="feature__icon">💰</div><h3>Chi phí rõ ràng</h3><p>Báo trước chi phí, không phát sinh bất ngờ. Tư vấn lần đầu hoàn toàn miễn phí.</p></div>
				<div class="feature"><div class="feature__icon">🔒</div><h3>Giữ kín thông tin</h3><p>Mọi câu chuyện của bạn được giữ bí mật tuyệt đối theo quy định nghề luật.</p></div>
				<div class="feature"><div class="feature__icon">🌐</div><h3>Phạm vi toàn quốc</h3><p>Tư vấn trực tuyến và đại diện tại tòa án nhiều tỉnh thành — không giới hạn địa giới.</p></div>
				<div class="feature"><div class="feature__icon">⏱️</div><h3>Phản hồi nhanh</h3><p>Gọi điện hoặc nhắn Zalo là được hỗ trợ ngay, không phải chờ đợi lâu.</p></div>
				<div class="feature"><div class="feature__icon">📚</div><h3>Kinh nghiệm thực tế</h3><p>Đã xử lý nhiều vụ việc phức tạp, am hiểu cả thủ tục địa phương lẫn liên tỉnh.</p></div>
			</div>
		</div>
	</section>

	<!-- QUY TRÌNH -->
	<section class="section" id="quy-trinh">
		<div class="container">
			<div class="section__head">
				<p class="section__eyebrow">Quy trình làm việc</p>
				<h2 class="section__title">4 bước đơn giản</h2>
				<p class="section__lead">Bạn không cần biết gì về luật — cứ liên hệ, chúng tôi lo phần còn lại.</p>
			</div>
			<div class="steps">
				<div class="step"><div class="step__num">1</div><h3>Liên hệ</h3><p>Gọi điện, nhắn Zalo hoặc để lại số. Bạn kể vắn tắt sự việc.</p></div>
				<div class="step"><div class="step__num">2</div><h3>Tư vấn miễn phí</h3><p>Luật sư lắng nghe, phân tích và chỉ rõ hướng giải quyết cho bạn.</p></div>
				<div class="step"><div class="step__num">3</div><h3>Báo phí &amp; ký kết</h3><p>Thống nhất công việc và chi phí rõ ràng trước khi bắt đầu.</p></div>
				<div class="step"><div class="step__num">4</div><h3>Thực hiện</h3><p>Chúng tôi làm thủ tục, đại diện và bảo vệ quyền lợi cho bạn đến cùng.</p></div>
			</div>
		</div>
	</section>

	<!-- CẨM NANG (tự lấy bài mới nhất từ WordPress) -->
	<section class="section section--alt" id="cam-nang">
		<div class="container">
			<div class="section__head">
				<p class="section__eyebrow">Cẩm nang pháp luật</p>
				<h2 class="section__title">Kiến thức hữu ích cho bạn</h2>
				<p class="section__lead">Những bài viết giải thích luật bằng lời dễ hiểu, áp dụng được ngay.</p>
			</div>
			<div class="grid grid--3">
				<?php
				$tnl_posts = new WP_Query( array( 'posts_per_page' => 3, 'ignore_sticky_posts' => true ) );
				if ( $tnl_posts->have_posts() ) :
					while ( $tnl_posts->have_posts() ) : $tnl_posts->the_post();
						$cat = get_the_category();
						?>
						<a class="card post" href="<?php the_permalink(); ?>">
							<?php if ( $cat ) : ?><div class="post__tag"><?php echo esc_html( $cat[0]->name ); ?></div><?php endif; ?>
							<h3><?php the_title(); ?></h3>
							<p><?php echo esc_html( tnl_excerpt() ); ?></p>
							<span class="post__more">Đọc tiếp →</span>
						</a>
						<?php
					endwhile;
					wp_reset_postdata();
				else : ?>
					<p class="empty-note">Chưa có bài viết nào. Hãy đăng bài đầu tiên trong <strong>Bài viết → Viết bài mới</strong> của WordPress.</p>
				<?php endif; ?>
			</div>
			<?php if ( $tnl_posts->have_posts() || ( isset( $tnl_posts ) && $tnl_posts->found_posts > 0 ) ) : ?>
				<div style="text-align:center;margin-top:32px">
					<a href="<?php echo esc_url( get_permalink( get_option( 'page_for_posts' ) ) ?: home_url( '/?post_type=post' ) ); ?>" class="btn btn--outline" style="color:var(--maroon);border-color:var(--maroon)">Xem tất cả bài viết →</a>
				</div>
			<?php endif; ?>
		</div>
	</section>

	<!-- HỎI ĐÁP / FAQ -->
	<section class="section" id="hoi-dap">
		<div class="container container--narrow">
			<div class="section__head">
				<p class="section__eyebrow">Hỏi – Đáp nhanh</p>
				<h2 class="section__title">Câu hỏi bà con hay thắc mắc</h2>
			</div>
			<div class="faq" data-faq>
				<details class="faq__item"><summary>Tư vấn lần đầu có mất tiền không?</summary><div class="faq__body"><p>Không. Lần tư vấn đầu tiên qua điện thoại hoặc tại văn phòng là <strong>hoàn toàn miễn phí</strong>. Chúng tôi chỉ báo phí khi bạn đồng ý để văn phòng thực hiện công việc cụ thể.</p></div></details>
				<details class="faq__item"><summary>Tôi ở xa, không rành giấy tờ thì có làm được không?</summary><div class="faq__body"><p>Được. Bạn chỉ cần gọi điện kể sự việc, chúng tôi sẽ hướng dẫn từng bước cần chuẩn bị những gì. Nếu cần, văn phòng có thể đại diện làm thủ tục thay bạn.</p></div></details>
				<details class="faq__item"><summary>Khi đến tư vấn cần mang theo giấy tờ gì?</summary><div class="faq__body"><p>Bạn nên mang theo <strong>CCCD/CMND</strong> và các giấy tờ liên quan đến vụ việc (ví dụ: sổ đỏ, giấy kết hôn, hợp đồng, giấy vay nợ…). Nếu chưa có đủ cũng không sao, cứ đến trao đổi trước.</p></div></details>
				<details class="faq__item"><summary>Chi phí thuê luật sư khoảng bao nhiêu?</summary><div class="faq__body"><p>Chi phí tùy theo tính chất từng vụ việc. Chúng tôi luôn <strong>báo giá rõ ràng và thống nhất trước</strong> khi làm, không phát sinh bất ngờ. Bạn yên tâm hỏi thoải mái trước khi quyết định.</p></div></details>
				<details class="faq__item"><summary>Thông tin của tôi có được giữ kín không?</summary><div class="faq__body"><p>Có. Mọi thông tin bạn cung cấp được <strong>giữ bí mật tuyệt đối</strong> theo quy định đạo đức nghề luật sư.</p></div></details>
			</div>
		</div>
	</section>

	<!-- ĐẶT LỊCH TƯ VẤN -->
	<section class="section section--cta" id="dat-lich">
		<div class="container container--narrow">
			<div class="section__head">
				<p class="section__eyebrow section__eyebrow--light">Đặt lịch tư vấn</p>
				<h2 class="section__title section__title--light">Để lại thông tin, chúng tôi gọi lại cho bạn</h2>
				<p class="section__lead section__lead--light">Điền vài thông tin đơn giản. Hoặc gọi/nhắn Zalo trực tiếp nếu bạn cần gấp.</p>
			</div>
			<form class="bookform" data-quickform>
				<div class="bookform__row">
					<label>Họ và tên *<input type="text" name="ten" placeholder="Nguyễn Văn A" required /></label>
					<label>Số điện thoại *<input type="tel" name="sdt" placeholder="09xx xxx xxx" required pattern="[0-9 ]{9,15}" inputmode="numeric" /></label>
				</div>
				<div class="bookform__row">
					<label>Lĩnh vực cần tư vấn
						<select name="linhvuc">
							<option>Đất đai – Nhà ở – Thừa kế</option>
							<option>Hôn nhân – Gia đình</option>
							<option>Hình sự – Dân sự</option>
							<option>Doanh nghiệp – Hợp đồng</option>
							<option>Vấn đề khác</option>
						</select>
					</label>
					<label>Bạn muốn được gọi lúc
						<select name="thoigian">
							<option>Bất cứ lúc nào</option>
							<option>Buổi sáng (7h30 – 11h30)</option>
							<option>Buổi chiều (13h30 – 18h00)</option>
						</select>
					</label>
				</div>
				<label>Mô tả ngắn vấn đề của bạn
					<textarea name="noidung" rows="3" placeholder="Ví dụ: Tôi muốn hỏi về tranh chấp ranh đất với nhà hàng xóm…"></textarea>
				</label>
				<button type="submit" class="btn btn--gold btn--lg btn--block">📩 Gửi yêu cầu tư vấn</button>
				<p class="bookform__note">Bằng việc gửi, bạn đồng ý để văn phòng liên hệ lại với bạn.</p>
			</form>
		</div>
	</section>

	<!-- LIÊN HỆ -->
	<section class="section" id="lien-he">
		<div class="container">
			<div class="section__head">
				<p class="section__eyebrow">Liên hệ</p>
				<h2 class="section__title">Ghé văn phòng hoặc gọi cho chúng tôi</h2>
			</div>
			<div class="contact">
				<div class="contact__info">
					<a class="contact__item" href="<?php echo esc_attr( tnl_tel_link() ); ?>" data-phone-link>
						<span class="contact__ic">📞</span>
						<span><small>Điện thoại / Zalo</small><strong data-phone-text><?php echo esc_html( tnl_opt( 'tnl_phone_display', '0984 243 629' ) ); ?></strong></span>
					</a>
					<a class="contact__item" href="mailto:<?php echo esc_attr( tnl_opt( 'tnl_email', 'email@vanphongluat.vn' ) ); ?>" data-email-link>
						<span class="contact__ic">✉️</span>
						<span><small>Email</small><strong data-email-text><?php echo esc_html( tnl_opt( 'tnl_email', 'email@vanphongluat.vn' ) ); ?></strong></span>
					</a>
					<div class="contact__item">
						<span class="contact__ic">📍</span>
						<span><small>Địa chỉ</small><strong><?php echo esc_html( tnl_opt( 'tnl_address', '69 Phan Huy Ích, xã Tây Sơn, tỉnh Gia Lai' ) ); ?></strong></span>
					</div>
					<div class="contact__item">
						<span class="contact__ic">🕑</span>
						<span><small>Giờ làm việc</small><strong><?php echo esc_html( tnl_opt( 'tnl_hours', 'Thứ 2 – Thứ 7: 7h30 – 18h00' ) ); ?></strong></span>
					</div>
					<div class="contact__socials">
						<a href="<?php echo esc_url( tnl_opt( 'tnl_facebook', '#' ) ); ?>" class="btn btn--outline" data-fanpage-link>📘 Facebook</a>
						<a href="<?php echo esc_url( tnl_zalo_link() ); ?>" class="btn btn--gold" data-zalo-link target="_blank" rel="noopener">💬 Nhắn Zalo</a>
					</div>
				</div>
				<div class="contact__map">
					<iframe title="Bản đồ văn phòng" src="<?php echo esc_url( tnl_opt( 'tnl_map_src', 'https://www.google.com/maps?q=T%C3%A2y%20S%C6%A1n%2C%20B%C3%ACnh%20%C4%90%E1%BB%8Bnh&output=embed' ) ); ?>" width="100%" height="100%" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
				</div>
			</div>
		</div>
	</section>

<?php get_footer(); ?>
