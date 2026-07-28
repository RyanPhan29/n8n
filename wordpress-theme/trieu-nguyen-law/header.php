<?php
/**
 * Đầu trang: <head>, thanh liên hệ, menu (☰ chạy bằng CSS thuần).
 */
$tnl_name = tnl_opt( 'tnl_office_name', 'Triều Nguyễn và Cộng sự' );
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta property="og:locale" content="vi_VN" />
	<meta property="og:type" content="website" />
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

	<div class="topbar">
		<div class="container topbar__inner">
			<span class="topbar__item">🕑 <?php echo esc_html( tnl_opt( 'tnl_hours', 'Thứ 2 – Thứ 7: 7h30 – 18h00' ) ); ?></span>
			<span class="topbar__item">📍 Trụ sở: Gia Lai (Bình Định cũ) · Hỗ trợ toàn quốc</span>
			<span class="topbar__item">📞 <span data-phone-text><?php echo esc_html( tnl_opt( 'tnl_phone_display', '0984 243 629' ) ); ?></span></span>
		</div>
	</div>

	<header class="header" id="top">
		<div class="container header__inner">
			<input type="checkbox" id="nav-toggle-cb" class="nav-cb" hidden />
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="brand">
				<?php if ( has_custom_logo() ) : the_custom_logo(); else : ?>
					<span class="brand__mark">⚖</span>
				<?php endif; ?>
				<span class="brand__text"><strong>VĂN PHÒNG LUẬT SƯ</strong><em><?php echo esc_html( $tnl_name ); ?></em></span>
			</a>

			<nav class="nav" id="nav">
				<a href="<?php echo esc_url( home_url( '/#gioi-thieu' ) ); ?>">Giới thiệu</a>
				<a href="<?php echo esc_url( home_url( '/#linh-vuc' ) ); ?>">Lĩnh vực</a>
				<a href="<?php echo esc_url( home_url( '/#doi-ngu' ) ); ?>">Đội ngũ</a>
				<a href="<?php echo esc_url( home_url( '/#bang-phi' ) ); ?>">Bảng phí</a>
				<a href="<?php echo esc_url( home_url( '/#cam-nang' ) ); ?>">Cẩm nang</a>
				<a href="<?php echo esc_url( home_url( '/#lien-he' ) ); ?>">Liên hệ</a>
			</nav>

			<a href="<?php echo esc_attr( tnl_tel_link() ); ?>" class="header__call" data-phone-link>
				<span class="header__call-icon">📞</span>
				<span class="header__call-text"><small>Gọi tư vấn miễn phí</small><strong data-phone-text><?php echo esc_html( tnl_opt( 'tnl_phone_display', '0984 243 629' ) ); ?></strong></span>
			</a>

			<label class="nav-toggle" for="nav-toggle-cb" aria-label="Mở menu" role="button" tabindex="0"><span></span><span></span><span></span></label>
			<label class="nav-overlay" for="nav-toggle-cb" aria-hidden="true"></label>
		</div>
	</header>
