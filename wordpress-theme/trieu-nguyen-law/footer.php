<?php
/**
 * Chân trang + nút Gọi/Zalo nổi.
 */
$tnl_name = tnl_opt( 'tnl_office_name', 'Triều Nguyên và Cộng sự' );
?>
	<footer class="footer">
		<div class="container footer__inner">
			<div class="footer__col">
				<div class="brand brand--footer">
					<span class="brand__mark">⚖</span>
					<span class="brand__text">
						<strong>VĂN PHÒNG LUẬT SƯ</strong>
						<em><?php echo esc_html( $tnl_name ); ?></em>
					</span>
				</div>
				<p class="footer__desc">Đồng hành pháp lý tận tâm cùng bà con tại Tây Sơn, Bình Định và các vùng lân cận.</p>
			</div>
			<div class="footer__col">
				<h4>Lĩnh vực</h4>
				<a href="<?php echo esc_url( home_url( '/#linh-vuc' ) ); ?>">Đất đai – Thừa kế</a>
				<a href="<?php echo esc_url( home_url( '/#linh-vuc' ) ); ?>">Hôn nhân – Gia đình</a>
				<a href="<?php echo esc_url( home_url( '/#linh-vuc' ) ); ?>">Hình sự – Dân sự</a>
				<a href="<?php echo esc_url( home_url( '/#linh-vuc' ) ); ?>">Doanh nghiệp – Hợp đồng</a>
			</div>
			<div class="footer__col">
				<h4>Liên kết</h4>
				<a href="<?php echo esc_url( home_url( '/#cam-nang' ) ); ?>">Cẩm nang pháp luật</a>
				<a href="<?php echo esc_url( home_url( '/#hoi-dap' ) ); ?>">Hỏi – Đáp</a>
				<a href="<?php echo esc_url( home_url( '/#dat-lich' ) ); ?>">Đặt lịch tư vấn</a>
				<a href="<?php echo esc_url( home_url( '/#lien-he' ) ); ?>">Liên hệ</a>
			</div>
			<div class="footer__col">
				<h4>Liên hệ</h4>
				<p>📞 <a href="<?php echo esc_attr( tnl_tel_link() ); ?>" data-phone-link><span data-phone-text><?php echo esc_html( tnl_opt( 'tnl_phone_display', '0123 456 789' ) ); ?></span></a></p>
				<p>📍 <?php echo esc_html( tnl_opt( 'tnl_address', '[Số nhà, tên đường], Tây Sơn, Bình Định' ) ); ?></p>
				<p>🕑 <?php echo esc_html( tnl_opt( 'tnl_hours', 'Thứ 2 – Thứ 7: 7h30 – 18h00' ) ); ?></p>
			</div>
		</div>
		<div class="footer__bottom">
			<div class="container">
				<p>© <?php echo esc_html( date( 'Y' ) ); ?> Văn phòng Luật sư <?php echo esc_html( $tnl_name ); ?>. Bảo lưu mọi quyền.</p>
			</div>
		</div>
	</footer>

	<!-- Nút Gọi & Zalo nổi -->
	<div class="floating">
		<a href="<?php echo esc_attr( tnl_tel_link() ); ?>" class="floating__btn floating__btn--call" data-phone-link aria-label="Gọi điện">
			<span class="floating__ring"></span>📞
		</a>
		<a href="<?php echo esc_url( tnl_zalo_link() ); ?>" class="floating__btn floating__btn--zalo" data-zalo-link target="_blank" rel="noopener" aria-label="Nhắn Zalo">💬</a>
	</div>

	<?php wp_footer(); ?>
</body>
</html>
