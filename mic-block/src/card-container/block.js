/**
 * BLOCK: cards-container
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InnerBlocks } = wp.editor; // Import InnerBlocks from wp.blocks

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'mic/container', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'MiC Container' ),
	icon: 'index-card',
	category: 'mic-blocks',
	getEditWrapperProps: function() {
		return {
			'data-align': 'full',
		};
	},
	edit: function( props ) {
		// Creates a <p class='wp-block-cgb-block-mic-block'></p>.
		return (
			<section className={ props.className }>
				<h4>Add your cards inside this box.</h4>
				<InnerBlocks />
			</section>
		);
	},
	save: function( props ) {
		return (
			<section className="card-container">
				<InnerBlocks.Content />
			</section>
		);
	},
} );
