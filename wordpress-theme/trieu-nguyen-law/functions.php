<?php
/**
 * Triều Nguyên Law — functions.php
 * Cấu hình theme, nạp CSS/JS và tạo mục "Tùy biến" để sửa thông tin liên hệ.
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

if ( ! function_exists( 'tnl_setup' ) ) {
	function tnl_setup() {
		load_theme_textdomain( 'trieu-nguyen-law', get_template_directory() . '/languages' );
		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'automatic-feed-links' );
		add_theme_support( 'custom-logo', array( 'height' => 80, 'width' => 80, 'flex-height' => true, 'flex-width' => true ) );
		add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
		add_theme_support( 'responsive-embeds' );
		register_nav_menus( array(
			'primary' => __( 'Menu chính', 'trieu-nguyen-law' ),
		) );
	}
}
add_action( 'after_setup_theme', 'tnl_setup' );

/**
 * Lấy giá trị cấu hình từ Customizer (có giá trị mặc định).
 */
function tnl_opt( $key, $default = '' ) {
	return get_theme_mod( $key, $default );
}

/**
 * Nạp CSS & JS.
 */
function tnl_assets() {
	// Google Fonts (hỗ trợ tiếng Việt)
	wp_enqueue_style(
		'tnl-fonts',
		'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&family=Noto+Serif:wght@600;700&display=swap&subset=vietnamese',
		array(),
		null
	);
	// CSS chính (style.css của theme)
	wp_enqueue_style( 'tnl-style', get_stylesheet_uri(), array( 'tnl-fonts' ), wp_get_theme()->get( 'Version' ) );
	// JS
	wp_enqueue_script( 'tnl-main', get_template_directory_uri() . '/js/main.js', array(), wp_get_theme()->get( 'Version' ), true );

	// Truyền thông tin liên hệ sang JavaScript (cho nút gọi, Zalo, form)
	wp_localize_script( 'tnl-main', 'VP_CONFIG', array(
		'soDienThoai'  => preg_replace( '/\s+/', '', tnl_opt( 'tnl_phone', '0123456789' ) ),
		'soHienThi'    => tnl_opt( 'tnl_phone_display', '0123 456 789' ),
		'zalo'         => preg_replace( '/\D+/', '', tnl_opt( 'tnl_zalo', '0123456789' ) ),
		'email'        => tnl_opt( 'tnl_email', 'email@vanphongluat.vn' ),
		'facebook'     => tnl_opt( 'tnl_facebook', '#' ),
		'formEndpoint' => tnl_opt( 'tnl_formspree', '' ),
	) );
}
add_action( 'wp_enqueue_scripts', 'tnl_assets' );

/**
 * ====================================================================
 *  TÙY BIẾN (Customizer): Giao diện → Tùy biến → "Thông tin văn phòng"
 * ====================================================================
 */
function tnl_customize_register( $wp_customize ) {

	$wp_customize->add_section( 'tnl_office', array(
		'title'    => __( 'Thông tin văn phòng', 'trieu-nguyen-law' ),
		'priority' => 30,
	) );

	$fields = array(
		'tnl_office_name'  => array( 'Tên văn phòng', 'Triều Nguyên và Cộng sự', 'text' ),
		'tnl_phone'        => array( 'Số điện thoại (để bấm gọi, viết liền)', '0123456789', 'text' ),
		'tnl_phone_display'=> array( 'Số điện thoại (hiển thị cho đẹp)', '0123 456 789', 'text' ),
		'tnl_zalo'         => array( 'Số Zalo', '0123456789', 'text' ),
		'tnl_email'        => array( 'Email', 'email@vanphongluat.vn', 'text' ),
		'tnl_facebook'     => array( 'Link Facebook (chưa có để dấu #)', '#', 'url' ),
		'tnl_address'      => array( 'Địa chỉ', '[Số nhà, tên đường], Tây Sơn, Bình Định', 'text' ),
		'tnl_hours'        => array( 'Giờ làm việc', 'Thứ 2 – Thứ 7: 7h30 – 18h00', 'text' ),
		'tnl_formspree'    => array( 'Link Formspree nhận form (tùy chọn)', '', 'url' ),
	);

	foreach ( $fields as $id => $f ) {
		$wp_customize->add_setting( $id, array(
			'default'           => $f[1],
			'sanitize_callback' => ( 'url' === $f[2] ) ? 'esc_url_raw' : 'sanitize_text_field',
		) );
		$wp_customize->add_control( $id, array(
			'label'   => $f[0],
			'section' => 'tnl_office',
			'type'    => ( 'url' === $f[2] ) ? 'url' : 'text',
		) );
	}

	// Mã nhúng bản đồ Google Maps (chỉ cần dán link trong src="...")
	$wp_customize->add_setting( 'tnl_map_src', array(
		'default'           => 'https://www.google.com/maps?q=T%C3%A2y%20S%C6%A1n%2C%20B%C3%ACnh%20%C4%90%E1%BB%8Bnh&output=embed',
		'sanitize_callback' => 'esc_url_raw',
	) );
	$wp_customize->add_control( 'tnl_map_src', array(
		'label'       => __( 'Link bản đồ Google Maps (phần src nhúng)', 'trieu-nguyen-law' ),
		'description' => __( 'Vào Google Maps → Chia sẻ → Nhúng bản đồ → copy link trong src="..."', 'trieu-nguyen-law' ),
		'section'     => 'tnl_office',
		'type'        => 'url',
	) );

	// ----- Phần "Giới thiệu luật sư" -----
	$wp_customize->add_section( 'tnl_about', array(
		'title'    => __( 'Giới thiệu luật sư', 'trieu-nguyen-law' ),
		'priority' => 31,
	) );

	$wp_customize->add_setting( 'tnl_lawyer_name', array( 'default' => 'Luật sư [Họ và tên]', 'sanitize_callback' => 'sanitize_text_field' ) );
	$wp_customize->add_control( 'tnl_lawyer_name', array( 'label' => 'Tên luật sư', 'section' => 'tnl_about', 'type' => 'text' ) );

	$wp_customize->add_setting( 'tnl_lawyer_role', array( 'default' => 'Trưởng Văn phòng Luật sư Triều Nguyên và Cộng sự', 'sanitize_callback' => 'sanitize_text_field' ) );
	$wp_customize->add_control( 'tnl_lawyer_role', array( 'label' => 'Chức danh', 'section' => 'tnl_about', 'type' => 'text' ) );

	$wp_customize->add_setting( 'tnl_lawyer_years', array( 'default' => '15', 'sanitize_callback' => 'sanitize_text_field' ) );
	$wp_customize->add_control( 'tnl_lawyer_years', array( 'label' => 'Số năm kinh nghiệm (hiện trên huy hiệu)', 'section' => 'tnl_about', 'type' => 'text' ) );

	$wp_customize->add_setting( 'tnl_lawyer_bio', array(
		'default'           => 'Với nhiều năm kinh nghiệm tư vấn và tranh tụng, chúng tôi thấu hiểu những vướng mắc pháp lý thường gặp của bà con — từ đất đai, thừa kế đến hôn nhân, dân sự. Phương châm của văn phòng là lắng nghe tận tâm, tư vấn dễ hiểu và bảo vệ quyền lợi của khách hàng đến cùng.',
		'sanitize_callback' => 'sanitize_textarea_field',
	) );
	$wp_customize->add_control( 'tnl_lawyer_bio', array( 'label' => 'Đoạn giới thiệu', 'section' => 'tnl_about', 'type' => 'textarea' ) );

	$wp_customize->add_setting( 'tnl_lawyer_photo', array( 'default' => '', 'sanitize_callback' => 'esc_url_raw' ) );
	$wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'tnl_lawyer_photo', array(
		'label'   => __( 'Ảnh luật sư / văn phòng', 'trieu-nguyen-law' ),
		'section' => 'tnl_about',
	) ) );
}
add_action( 'customize_register', 'tnl_customize_register' );

/**
 * Rút gọn nội dung bài viết cho thẻ Cẩm nang.
 */
function tnl_excerpt( $len = 22 ) {
	return wp_trim_words( get_the_excerpt(), $len, '…' );
}

/**
 * Link gọi điện / Zalo dùng trong PHP.
 */
function tnl_tel_link() { return 'tel:' . preg_replace( '/\s+/', '', tnl_opt( 'tnl_phone', '0123456789' ) ); }
function tnl_zalo_link() { return 'https://zalo.me/' . preg_replace( '/\D+/', '', tnl_opt( 'tnl_zalo', '0123456789' ) ); }
