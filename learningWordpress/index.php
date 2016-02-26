<?php
include 'ChromePhp.php';
get_header();?>

<div class ="side-content clearfix">

	<div class="main-column">
	
<?php
		if(have_posts()){
			while(have_posts()){
				the_post();
				get_template_part('content', get_post_format());	
			}
		}else{
			echo "<p>No content found</p>";
		}?>
	
	
	</div>
	<?php get_sidebar(); ?>
</div>
<?php	
get_footer();
?>