<?php

get_header();
	if(have_posts()){
		while(have_posts()){
			the_post();?>
			<article class="post">		
				<h1><a href="<?php the_permalink(); ?>"><?php the_title();?></a></h1>
				<p class="post-info">
					<?php 
						the_time('F jS, Y g:i a');
					?> | by <a href="<?php 
						echo get_author_posts_url(get_the_author_meta("ID")); 
					?>"><?php the_author(); ?></a> | single post in 
					<?php 
						$categories = get_the_category();
						$separator = ", ";
						$output = "";
						if($categories){
							foreach($categories as $cate){
								$output .= '<a href="'. get_category_link($cate->term_id) . '">' .$cate->cat_name .'</a>'. $separator;
							}
							echo trim($output, $separator);
						}
					?>
				</p>
				
								
				<?php the_post_thumbnail('banner-image'); ?>
				<p><?php the_content(); ?></p>		
			</article>		
<?php }
	}else{
		echo "<p>No content found</p>";
	}
get_footer();
?>