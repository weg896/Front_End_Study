<?php

get_header();
	if(have_posts()){
		while(have_posts()){
			the_post();?>
			<article class="post page">			
				<h2><?php the_title();?></h2>
				
				<div class="info-box">
					<h4>This is info box</h4>
					<p>fqea j asjo poadasdpfoj joij apodsjf </p>
				</div>
				<?php the_content(); ?>
			</article>		
<?php }
	}else{
		echo "<p>No content found</p>";
	}
get_footer();
?>