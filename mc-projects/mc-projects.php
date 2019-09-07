<?php
/**
 * @package ProjectsPlugin
 *
 */
/*
Plugin Name: Michigan Creative - Projects Custom Post Type
Plugin URI:
Description: Plugin to create a Projects custom post type
Version: 1.0.0
Author: Michigan Creative, University of Michigan
Author URI: https://creative.umich.edu
License: GPLv2 or later
Text Domain: mc-projects
*/

defined( 'ABSPATH' ) or die( 'Hey, what are you doing here? GET OUT!' );

class ProjectsPlugin {

	function __construct() {
		add_action( 'init', array( $this, 'custom_post_type' ) );
		add_action( 'init', array( $this, 'create_year_taxonomy' ) );
	}

	function register() {
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue' ) );
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

	function custom_post_type() {
		register_post_type( 'projects', array(
			'public'           => true,
			'label'            => 'projects',
			'labels'           => array(
				'name'          => 'Projects',
				'add_new_item'  => 'Add New Project',
				'edit_item'     => 'Edit Project',
				'all_items'     => 'All Projects',
				'singular_name' => 'Project'
			),
			'description'      => 'Pilot Projects',
			'menu_icon'        => 'dashicons-lightbulb',
			'rewrite'          => array(
				'slug'               => 'projects',
				'delete_with_author' => false,
				'pages'              => false,
			),
			'supports'         => array(
				'title',
				'editor',
				'page-attributes',
				'custom-fields',
				'categories'
			),
			'taxonomies'       => array( 'year' ),
			'show_ui'          => true,
			'show_in_menu'     => true,
			'show_in_nav_menu' => true,
			'menu_position'    => 20,
			'show_in_rest'     => true,
		) );
	}

	function create_year_taxonomy() {
    // Add new taxonomy, make it hierarchical (like categories)
    $labels = array(
        'name'              => __( 'Years', 'Years', 'projects' ),
        'singular_name'     => __( 'Year', 'Year', 'projects' ),
        'search_items'      => __( 'Search Years', 'projects' ),
        'all_items'         => __( 'All Years', 'projects' ),
        'edit_item'         => __( 'Edit Year', 'projects' ),
        'update_item'       => __( 'Update Year', 'projects' ),
        'add_new_item'      => __( 'Add A New Year', 'projects' ),
        'new_item_name'     => __( 'New Year Date', 'projects' ),
        'menu_name'         => __( 'Years', 'projects' ),
    );

    $args = array(
		  'public'				=> true,
        'hierarchical'      => true,
        'labels'            => $labels,
		  'show_ui'           => true,
        'show_admin_column' => true,
 		  'show_in_rest'		=> true,
       'query_var'         => true,
        'rewrite'           => array( 'slug' => 'year' ),
    );

    register_taxonomy( 'years', array( 'projects' ), $args );
}

	function enqueue() {
		wp_enqueue_style( 'projectsstyle', plugins_url( '/assets/mc-projects.css', __FILE__ ) );
		wp_enqueue_script( 'projectsscript', plugins_url( '/assets/mc-projects.js', __FILE__ ) );
	}
}

if ( class_exists( 'ProjectsPlugin' ) ) {
	$ProjectsPlugin = new ProjectsPlugin();
	$ProjectsPlugin->register();
}

//activation
register_activation_hook( __FILE__, array( $ProjectsPlugin, 'activate' ) );

//deactivation
register_deactivation_hook( __FILE__, array( $ProjectsPlugin, 'deactivate' ) );
