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
		
		add_theme_support('post-formats', array('aside','gallery','link'));
	}
		
		
	add_action('after_setup_theme',"learningWordPress_setup");
	
	function arphabet_widgets_init() {

		register_sidebar( array(
			'name'          => 'Home right sidebar',
			'id'            => 'side_1',
			'before_widget' => '<div class="widget-item">',
			'after_widget'  => '</div>',
			'before_title'  => '<h4>',
			'after_title'   => '/<h4>',
		) );
		register_sidebar( array(
			'name'          => 'Home Footer 1',
			'id'            => 'footer1',
		) );
		register_sidebar( array(
			'name'          => 'Home Footer 2',
			'id'            => 'footer2',
		) );
		register_sidebar( array(
			'name'          => 'Home Footer 3',
			'id'            => 'footer3',
		) );
		register_sidebar( array(
			'name'          => 'Home Footer 4',
			'id'            => 'footer4',
		) );


	}
	add_action( 'widgets_init', 'arphabet_widgets_init' );

	function learning_customize_register($wp_customize){
		$wp_customize->add_setting('lwp_link_color', array(
			'default' => '#006ec3',
			'transport' => 'refresh',
		));
		
		$wp_customize->add_setting('lwp_btn_color', array(
			'default' => '#006ec3',
			'transport' => 'refresh',
		));
		
		
		
		$wp_customize->add_section('lwp_standard_colors',array(
			'title' => __('Standard Colors','learningWordpress'), //prefer name and theme name
			'priority' => 30,
		));
		
		$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize,'lwp_link_color_control',array(
				'label' => __('Link color', 'learningWordpress'),
				'section' => 'lwp_standard_colors',
				'settings' => 'lwp_link_color',
			)
		));
		
		$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize,'lwp_btn_color_control',array(
				'label' => __('Button color', 'learningWordpress'),
				'section' => 'lwp_standard_colors',
				'settings' => 'lwp_btn_color',
			)
		));
		
	}
	
	add_action('customize_register','learning_customize_register');

	function learning_customize_css(){ ?>
		<style type='text/css'>
			a:link,
			a:visited{
				color:<?php echo get_theme_mod('lwp_link_color');?> ; 
			}
			
			.site-header nav ul li.current-menu-item a:link,
			.site-header nav ul li.current-menu-item a:visited,
			.site-header nav ul li.current-page-ancestor a:link,
			.site-header nav ul li.current-page-ancestor a:visited{
				font-weight: bold;
				background-color: <?php echo get_theme_mod('lwp_link_color');?> ;
				color:#fff;
			}
			
			.btn-a,
			.btn-a:link,
			.btn-a:visited,
			div.hd-search #searchsubmit{
				background-color: <?php echo get_theme_mod('lwp_btn_color');?> ;
			}
			
		</style>
	<?php }
	
	add_action('wp_head','learning_customize_css');

?>