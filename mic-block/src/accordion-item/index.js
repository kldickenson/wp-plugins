/**
 * BLOCK: Accordion Block.
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
// import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n

const {
	registerBlockType, // Import registerBlockType() from wp.blocks
} = wp.blocks;

const {
	RichText,
	InnerBlocks,
} = wp.editor;
const CONTENT = [
	[ 'core/paragraph', {
		content: __( 'Enter Accordion Content' ),
	} ],
];

export const edit = ( props ) => {
	const {
		isSelected,
		editable,
		setAttributes,
	} = props;

	const {
		accordionHeading,
	} = props.attributes;
	return [
		<div key={ 'editable' } className={ 'accordion' }>
			<RichText
				tagName={ 'h5' }
				className={ 'heading' }
				value={ accordionHeading }
				placeholder={ __( 'Enter heading content' ) }
				onChange={ ( value ) => setAttributes( { accordionHeading: value } ) }
				isSelected={ isSelected && editable === 'accordionHeading' }
			/>
			<div className={ 'accordion-content' }>
				<InnerBlocks
					template={ CONTENT }
				/>
			</div>
		</div>,
	];
};

export const save = ( props ) => {
	const {
		accordionHeading,
	} = props.attributes;
	const uniqueID = [ accordionHeading.toString().toLowerCase().replace( /[^A-Z0-9]+/ig, '-' ).trim() ];
	// const openClose (event) = {
	// 	event.target.a('is-active');
	// }
	return (
		<li className={ 'accordion-item' } data-accordion-item>
			{ accordionHeading && !! accordionHeading.length && (
				<a href={ '#' + uniqueID } className={ 'accordion-title' }>
					{ accordionHeading }
				</a>
			) }
			{
				<div className={ 'accordion-content' } data-tab-content id={ accordionHeading.toString().toLowerCase().replace( /[^A-Z0-9]+/ig, '-' ).trim() }>
					<InnerBlocks.Content />
				</div>
			}
		</li>
	);
};

/**
 * Register: Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
const accordionBlockIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="2 2 22 22">
		<path fill="#00274c" d="M19,12v1H5v-1H19 M21,10H3v5h18V10L21,10z" />
	</svg>
);
registerBlockType( 'mc-accordion-block/accordion-item', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Accordion Item' ), // Block title.
	icon: accordionBlockIcon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'mic-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [ __( 'Accordion Item' ) ],

	attributes: {
		accordionHeading: {
			type: 'array',
			source: 'children',
			selector: 'a',
		},
		uniqueID: {
			type: 'string',
			source: 'attribute',
			selector: 'div',
			attribute: 'id',
		},
	},

	// The "edit" property must be a valid function.
	edit: edit,

	// The "save" property must be specified and must be a valid function.
	save: save,
} );

