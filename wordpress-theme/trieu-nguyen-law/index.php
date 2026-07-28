<?php
/**
 * Danh sách bài viết (Cẩm nang) — dùng cho trang Blog, lưu trữ, tìm kiếm.
 */
get_header();

$tnl_title = __( 'Cẩm nang pháp luật', 'trieu-nguyen-law' );
if ( is_category() ) {
	$tnl_title = single_cat_title( '', false );
} elseif ( is_search() ) {
	$tnl_title = sprintf( __( 'Kết quả tìm kiếm: %s', 'trieu-nguyen-law' ), get_search_query() );
} elseif ( is_tag() ) {
	$tnl_title = single_tag_title( '', false );
}
?>
	<div class="article__head">
		<div class="container">
			<p class="breadcrumb"><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Trang chủ</a> › Cẩm nang</p>
			<h1><?php echo esc_html( $tnl_title ); ?></h1>
		</div>
	</div>

	<section class="section">
		<div class="container">
			<?php if ( have_posts() ) : ?>
				<div class="grid grid--3">
					<?php while ( have_posts() ) : the_post(); $cat = get_the_category(); ?>
						<a class="card post" href="<?php the_permalink(); ?>">
							<?php if ( has_post_thumbnail() ) : ?>
								<?php the_post_thumbnail( 'medium_large', array( 'class' => 'post-thumb' ) ); ?>
							<?php endif; ?>
							<?php if ( $cat ) : ?><div class="post__tag"><?php echo esc_html( $cat[0]->name ); ?></div><?php endif; ?>
							<h3><?php the_title(); ?></h3>
							<p><?php echo esc_html( tnl_excerpt() ); ?></p>
							<span class="post__more">Đọc tiếp →</span>
						</a>
					<?php endwhile; ?>
				</div>
				<div class="pagination">
					<?php echo paginate_links( array( 'prev_text' => '←', 'next_text' => '→' ) ); ?>
				</div>
			<?php else : ?>
				<p class="empty-note">Chưa có bài viết nào. Hãy đăng bài đầu tiên trong <strong>Bài viết → Viết bài mới</strong>.</p>
			<?php endif; ?>
		</div>
	</section>

<?php get_footer(); ?>
