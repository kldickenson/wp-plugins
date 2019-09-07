/**
 * BLOCK: Accordion Block.
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n

const {
	registerBlockType, // Import registerBlockType() from wp.blocks
} = wp.blocks;
const {
} = wp.compose;
const {
	PanelBody,
	ToggleControl,
} = wp.components;
const {
	InnerBlocks,
	InspectorControls,
} = wp.editor;
export const edit = ( props ) => {
	const {
		setAttributes,
	} = props;
	const {
		allClosed,
		allowMulti,
		deepLink,
		updateHistory,
	} = props.attributes;
	return [
		<InspectorControls key={ 'inspector' }>
			<PanelBody title={ __( 'Accordion Options', 'custom-blocks' ) }>
				<ToggleControl
					label="Allow all closed?"
					help={ allClosed ? 'Yes' : 'No' }
					checked={ allClosed }
					onChange={ () => setAttributes( { allClosed: ! allClosed } ) }
				/>
				<ToggleControl
					label="Deep link accordion?"
					help={ deepLink ? 'Yes' : 'No' }
					checked={ deepLink }
					onChange={ () => setAttributes( { deepLink: ! deepLink } ) }
				/>
				<ToggleControl
					label="Update browser history (if deep link is set to 'yes')?"
					help={ updateHistory ? 'Yes' : 'No' }
					checked={ updateHistory }
					onChange={ () => setAttributes( { updateHistory: ! updateHistory } ) }
				/>
				<ToggleControl
					label="Allow multi-expand?"
					help={ allowMulti ? 'Yes' : 'No' }
					checked={ allowMulti }
					onChange={ () => setAttributes( { allowMulti: ! allowMulti } ) }
				/>
			</PanelBody>
		</InspectorControls>,
		<div key={ 'editable' } className={ 'accordion' }>
			<div className={ 'accordion-wrap' }>
				<InnerBlocks
					allowedBlocks={ [ 'mc-accordion-block/accordion-item' ] }
				/>
			</div>
		</div>,
	];
};

export const save = ( props ) => {
	const {
		allClosed,
		allowMulti,
		deepLink,
		updateHistory,
	} = props.attributes;
	return (
		<ul className={ 'accordion' } data-accordion data-options={ `allowAllClosed:${ allClosed }; updateHistory:${ updateHistory }; deepLink:${ deepLink }; multiExpand:${ allowMulti };` }>
			<InnerBlocks.Content />
		</ul>
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
		<rect fill="#00274c" x="3" y="17" width="18" height="2" />
		<path fill="#00274c" d="M19,12v1H5v-1H19 M21,10H3v5h18V10L21,10z" />
		<rect fill="#00274c" x="3" y="6" width="18" height="2" />
	</svg>
);
registerBlockType( 'mc-accordion-block/accordion-wrapper', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Accordion Wrapper' ), // Block title.
	icon: accordionBlockIcon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'mic-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [ __( 'Accordion Wrapper' ) ],
	attributes: {
		accordionHeading: {
			type: 'array',
			source: 'children',
			selector: 'a',
		},
		accordionContent: {
			type: 'array',
			source: 'children',
			selector: 'div',
		},
		allClosed: {
			type: 'boolean',
			default: true,
			attribute: 'data-Options',
		},
		allowMulti: {
			type: 'boolean',
			default: true,
			attribute: 'data-Options',
		},
		deepLink: {
			type: 'boolean',
			default: true,
			attribute: 'data-Options',
		},
		updateHistory: {
			type: 'boolean',
			default: true,
			attribute: 'data-Options',
		},
	},

	// The "edit" property must be a valid function.
	edit: edit,

	// The "save" property must be specified and must be a valid function.
	save: save,
} );
