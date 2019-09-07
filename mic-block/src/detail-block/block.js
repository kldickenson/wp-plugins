/**
 * BLOCK: detail-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks } = wp.editor;

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
registerBlockType( 'mic/mic-detail-block', {
	title: __( 'Detail Accordion' ),
	icon: 'shield',
	category: 'mic-blocks',

	attributes: {
		content: {
			type: 'array',
			source: 'children',
			selector: 'p',
		},
		heading: {
			type: 'array',
			source: 'children',
			selector: 'summary',
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function( props ) {
		const {
			className,
			setAttributes,
			attributes: { content, heading },
		} = props;

		const onChangeContent = value => {
			setAttributes( { content: value } );
		};

		const onChangeHeading = value => {
			setAttributes( { heading: value } );
		};

		return (
			<details className={ className } open>
				<summary>
					<RichText
						tagName="h2"
						onChange={ onChangeHeading }
						value={ heading }
					/>
				</summary>
				<RichText
					tagName="p"
					onChange={ onChangeContent }
					value={ content }
				/>
				<InnerBlocks
					allowedBlocks={ [ 'core/paragraph', 'core/list' ] }
				/>
			</details>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {
		const {
			className,
			attributes: { content, heading },
		} = props;

		return (
			<details className="accordion">
				<RichText.Content tagName="summary" value={ heading } />
				<RichText.Content tagName="p" value={ content } />
				<InnerBlocks.Content />
			</details>
		);
	},
} );
