<?php
/**
 * @package PeoplePlugin
 *
 */
/*
Plugin Name: Michigan Creative - People Custom Post Type
Plugin URI:
Description: Plugin to create a People custom post type
Version: 1.0.0
Author: Michigan Creative, University of Michigan
Author URI: https://creative.umich.edu
License: GPLv2 or later
Text Domain: mc-people
*/

defined( 'ABSPATH' ) or die( 'Hey, what are you doing here? GET OUT!' );

class PeoplePlugin {

	function __construct() {
		add_action( 'init', array( $this, 'custom_post_type' ) );
	}

	function register() {
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue' ) );
		add_action( 'init', array( $this, 'create_role_taxonomy' ) );
		add_shortcode( 'people-carousel', array( $this, 'mc_people_carousel' ) );
	}

	function activate() {
		// generate a CPT
		$this->custom_post_type();
		// flush rewrite rules
		flush_rewrite_rules();
	}

	function deactivate() {
		// flush rewrite rules
		flush_rewrite_rules();
	}

	function mc_people_carousel( $atts, $content = null ) {
		$args = array(
			'post_type'      => 'people',
			'orderby'        => 'rand',
			'posts_per_page' => 9,
		);

		$posts = get_posts( $args );

		if ( $posts ) {
			ob_start(); ?>

            <section class="py-24">
                <div class="lg:flex justify-between">
                    <div class="lg:w-5/12 mb-12 lg:mb-0">
                        <h2 class="text-4xl text-michigan-blue"><a href="/people"><?php echo __( 'People', 'creative-wp-theme' ) ?></a></h2>
                        <p class="font-bold text-lg leading-tight"><?php echo $content; ?></p>

                        <a href="/people" class="block mb-8 font-bold text-lg">
							<?php echo __( 'Search affiliates', 'creative-wp-theme' ); ?>.
                        </a>

                        <a href="#" class="button inline-block">
							<?php echo __( 'Apply to become an affiliate', 'creative-wp-theme' ); ?>
                        </a>
                    </div>

                    <div class="lg:w-7/12 -m-4 relative">
                        <div id="people-carousel" class="mx-8">
							<?php foreach ( $posts as $post ) : setup_postdata( $post ) ?>
                                <div class="person p-4">
									<?php if ( get_field( 'photo', $post->ID ) ) : ?>
                                        <img src="<?php echo get_field( 'photo', $post->ID ); ?>"
                                             class="w-full h-64 lg:h-56 object-cover object-center mb-4"
                                             alt="<?php echo $post->post_title; ?>">
									<?php endif; ?>

                                    <p class="font-medium text-michigan-blue">
										<?php echo $post->post_title; ?>
                                    </p>

                                    <p class="text-sm">
										<?php $positions = get_field( 'positions', $post->ID ); ?>
										<?php echo current( explode( "\r", $positions ) ); ?>
                                    </p>
                                </div>
							<?php endforeach; ?>

							<?php wp_reset_postdata(); ?>
                        </div>
                        <button class="absolute left-1 top-33" id="people-carousel-previous"
                                aria-label="previous slides">
                            <img class="rotate-180" src="<?php echo get_template_directory_uri(); ?>/img/arrow.svg"
                                 alt="">
                        </button>
                        <button class="absolute right-1 top-33" id="people-carousel-next" aria-label="next slides">
                            <img src="<?php echo get_template_directory_uri(); ?>/img/arrow.svg" alt="">
                        </button>
                    </div>
                </div>
            </section>

			<?php return ob_get_clean();
		}

	}

	function custom_post_type() {
		register_post_type( 'people', array(
			'public'           => 'true',
			'label'            => 'people',
			'labels'           => array(
				'name'          => 'People',
				'add_new_item'  => 'Add New Person',
				'edit_item'     => 'Edit Person',
				'all_items'     => 'All People',
				'singular_name' => 'Person'
			),
			'description'      => 'The leadership and affiliates of MiCDA',
			'menu_icon'        => 'dashicons-admin-users',
			'rewrite'          => array(
				'slug'               => 'people',
				'delete_with_author' => false,
				'pages'              => false,
			),
			'supports'         => array(
				'title',
				'editor',
				'page-attributes',
				'custom-fields'
			),
			'taxonomies'       => array( 'roles' ),
			'show_ui'          => true,
			'show_in_menu'     => true,
			'show_in_nav_menu' => true,
			'menu_position'    => 20,
			'show_in_rest'     => true,
		) );
	}

	function create_role_taxonomy() {
    // Add new taxonomy, make it hierarchical (like categories)
    $labels = array(
        'name'              => _x( 'Roles', 'Roles', 'people' ),
        'singular_name'     => _x( 'role', 'role', 'people' ),
        'search_items'      => __( 'Search roles', 'people' ),
		  'all_items'         => __( 'All roles', 'people' ),
			'parent_item'       => __( 'Parent role', 'people' ),
        'parent_item_colon' => __( 'Parent role:', 'people' ),
        'edit_item'         => __( 'Edit role', 'people' ),
        'update_item'       => __( 'Update role', 'people' ),
        'add_new_item'      => __( 'Add New role', 'people' ),
        'new_item_name'     => __( 'New role', 'people' ),
        'menu_name'         => __( 'roles', 'people' ),
    );

    $args = array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
		  'show_admin_column' => true,
		  'show_in_rest'			=> true,
        'query_var'         => true,
        'rewrite'           => array( 'slug' => 'role' ),
    );

    register_taxonomy( 'roles', array( 'people' ), $args );
}

	function enqueue() {
		wp_enqueue_style( 'peoplestyle', plugins_url( '/assets/mc-people.css', __FILE__ ) );
		wp_enqueue_script( 'peoplescript', plugins_url( '/assets/mc-people.js', __FILE__ ) );
	}
}

if ( class_exists( 'PeoplePlugin' ) ) {
	$peoplePlugin = new PeoplePlugin();
	$peoplePlugin->register();
}

//activation
register_activation_hook( __FILE__, array( $peoplePlugin, 'activate' ) );

//deactivation
register_deactivation_hook( __FILE__, array( $peoplePlugin, 'deactivate' ) );
