<?php

/**
 * Plugin Name: Michigan Creative Blocks
 * Description: Custom Gutenberg blocks.
 * Version: 1.0.0
 * Author: Michigan Creative
 */

defined( 'ABSPATH' ) || exit;

/**
 * Registers all block assets so that they can be enqueued through the Block Editor in
 * the corresponding context.
 *
 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
 */
add_action( 'init', 'mc_blocks_register_blocks' );

function mc_blocks_register_blocks() {

	// If Block Editor is not active, bail.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Retister the block editor script.
	wp_register_script(
		'mc-blocks-editor-script',                                            // label
		plugins_url( 'build/index.js', __FILE__ ),                        // script file
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', "wp-data" ),        // dependencies
		filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' )        // set version as file last modified time
	);

	// Array of block created in this plugin.
	$blocks = [
		'mc-blocks/accordion',
		'mc-blocks/section-inner',
		'mc-blocks/card',
		'mc-blocks/section',
	];

	// Loop through $blocks and register each block with the same script and styles.
	foreach ( $blocks as $block ) {
		register_block_type( $block, array(
			'editor_script' => 'mc-blocks-editor-script',                    // Calls registered script above
		) );
	}
}
