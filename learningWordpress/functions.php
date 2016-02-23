<?php 

	function learningWordPress_resource(){
		wp_enqueue_style("style", get_stylesheet_uri());
	}
	
	add_action("wp_enqueue_scripts", 'learningWordPress_resource');
	

	
	function get_top_ancestor_id(){
		global $post;
		if($post->post_parent){	
			$ancestors = array_reverse(get_post_ancestors($post->ID));
			return $ancestors[0];
		}
		
		
		return $post->ID;
	}
	
	function has_children(){
		global $post;
		$pages = get_pages('child_of='.$post->ID);
		return count($pages);
	}
	
	function custom_excerpt_length(){
		return 5;
	}
	
	add_filter("excerpt_length","custom_excerpt_length");
	
	function learningWordPress_setup(){
		// navigation menu
	register_nav_menus(array(
		"primary"=>__('Primary Menu'),
		"footer"=>__("Footer Menu"),
	));
	
		add_theme_support("post-thumbnails");
		add_image_size('small-thumbnail',150,150,true);
		add_image_size('banner-image',900,300,array('left','top'));
	}
		
		
	add_action('after_setup_theme',"learningWordPress_setup");
?>