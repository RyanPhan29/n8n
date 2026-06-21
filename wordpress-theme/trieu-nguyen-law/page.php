<?php
/**
 * Trang tĩnh (Giới thiệu, Bảng giá, Điều khoản...).
 */
get_header();
while ( have_posts() ) : the_post();
?>
	<div class="article__head">
		<div class="container container--narrow">
			<p class="breadcrumb"><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Trang chủ</a></p>
			<h1><?php the_title(); ?></h1>
		</div>
	</div>
	<article class="article">
		<div class="container container--narrow article__body">
			<?php the_content(); ?>
		</div>
	</article>
<?php
endwhile;
get_footer();
