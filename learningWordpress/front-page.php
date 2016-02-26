<?php
include 'ChromePhp.php';
get_header();?>

<div class ="side-content clearfix">
	<h3>customer home page</h3>
<?php
		if(have_posts()){
			while(have_posts()){
				the_post();
				the_content();
			}
		}else{
			echo "<p>No content found</p>";
		}
		
		?>
		<div class="home-columns clearfix">
			<div class='one-half'>
			<?php
				$opinionPosts = new WP_Query('cat=4 & posts_per_page=2 & orderby=title & order=ASC');
		
				if($opinionPosts->have_posts()){
					while($opinionPosts->have_posts()){
						$opinionPosts->the_post();?>
						<h2><a href="<?php the_permalink();?>"><?php the_title(); ?></a></h2>
						
			<?php
						the_excerpt();
					}
				}else{
					echo "<p>No content found</p>";
				}
				wp_reset_postdata();
			?>
			
			</div>
			<div class="one-half last">
				<?php
				$otherPosts = new WP_Query('cat=1 & posts_per_page=2 & orderby=title & order=ASC');
		
				if($otherPosts->have_posts()){
					while($otherPosts->have_posts()){
						$otherPosts->the_post();?>
						<h2><a href="<?php the_permalink();?>"><?php the_title(); ?></a></h2>
				
				<?php
					}
				}else{
					echo "<p>No content found</p>";
				}
				?>
			
			</div>
		</div>
		<?php
		wp_reset_postdata();
		?>
	
	
</div>
<?php	
get_footer();
?>