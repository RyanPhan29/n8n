<?php
/**
 * Trang một bài viết (Cẩm nang pháp luật).
 */
get_header();
while ( have_posts() ) : the_post();
	$cat = get_the_category();
?>
	<div class="article__head">
		<div class="container container--narrow">
			<p class="breadcrumb"><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Trang chủ</a> › <a href="<?php echo esc_url( home_url( '/#cam-nang' ) ); ?>">Cẩm nang</a></p>
			<?php if ( $cat ) : ?><span class="article__tag" style="background:var(--gold);color:var(--maroon-dark)"><?php echo esc_html( $cat[0]->name ); ?></span><?php endif; ?>
			<h1><?php the_title(); ?></h1>
		</div>
	</div>

	<article class="article">
		<div class="container container--narrow article__body">
			<?php if ( has_post_thumbnail() ) : ?>
				<div style="margin-bottom:24px"><?php the_post_thumbnail( 'large', array( 'style' => 'border-radius:12px;width:100%;height:auto' ) ); ?></div>
			<?php endif; ?>

			<?php the_content(); ?>

			<div class="article__cta">
				<h3>Bạn cần tư vấn về vấn đề này?</h3>
				<p>Gọi cho chúng tôi để được hướng dẫn cụ thể cho trường hợp của bạn — lần đầu miễn phí.</p>
				<a href="<?php echo esc_url( home_url( '/#dat-lich' ) ); ?>" class="btn btn--gold btn--lg">📝 Đặt lịch tư vấn miễn phí</a>
			</div>

			<p style="margin-top:28px"><a href="<?php echo esc_url( home_url( '/#cam-nang' ) ); ?>">← Quay lại Cẩm nang pháp luật</a></p>
		</div>
	</article>
<?php
endwhile;
get_footer();
