/**
 * BLOCK: mic-card
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { RichText, MediaUpload, PlainText } = wp.editor;
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { Button } = wp.components;

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
registerBlockType( 'mic/mic-card', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'MiC Card - image right' ), // Block title.
	icon: 'index-card', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'mic-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	attributes: {
		cardTitle: {
			source: 'text',
			selector: '.card__title',
		},
		cardBody: {
			type: 'array',
			source: 'text',
			selector: '.card__body',
		},
		cardLinkUrl: {
			source: 'text',
			selector: 'a',
			attribute: 'html',
		},
		cardImageUrl: {
			attribute: 'src',
			selector: '.card__image',
		},
		cardImageAlt: {
			attributes: 'alt',
			selector: '.card__image',
		},
	},
	edit( { attributes, className, setAttributes } ) {
		const onChangeCardTitle = newCardTitle => {
			setAttributes( { cardTitle: newCardTitle } );
		};

		const onChangeCardLinkUrl = newCardLinkUrl => {
			setAttributes( { cardLinkUrl: newCardLinkUrl } );
		};

		const onChangeCardBody = newCardBody => {
			setAttributes( { cardBody: newCardBody } );
		};

		const getImageButton = openEvent => {
			if ( attributes.imageUrl ) {
				return (
					<img
						src={ attributes.imageUrl }
						onClick={ openEvent }
						className="image"
					/>
				);
			}
			return (
				<div className="button-container">
					<Button onClick={ openEvent } className="button button-large">
						Pick an image
					</Button>
				</div>
			);
		};

		return (
			<div className={ className }>
				<div className="url">
					<PlainText
						onChange={ onChangeCardLinkUrl }
						value={ attributes.cardLinkUrl }
						placeholder="Your card link URL"
					/>
				</div>
				<div className="card bg-white flex w-100">
					<div className="card__content text w-7/12 h-full">
						<h3 className="card__title text-umblue p-4 py-6 md:text-xl">
							<PlainText
								onChange={ onChangeCardTitle }
								value={ attributes.cardTitle }
								placeholder="Your card title"
								className="heading"
							/>
						</h3>
						<p className="card__body p-8 px-12 md:px-6 my-4 text-xl md:text-lg">
							<RichText
								onChange={ onChangeCardBody }
								value={ attributes.cardBody }
								placeholder="Your card text"
							/>
						</p>
					</div>
					<div
						className="card__image w-5/12 h-auto"
						src="#"
						alt="{ alt }"
					/>
					<MediaUpload
						onSelect={ media => {
							setAttributes( {
								imageAlt: media.alt,
								imageUrl: media.url,
							} );
						} }
						type="image"
						value={ attributes.imageID }
						render={ ( { open } ) => getImageButton( open ) }
					/>
				</div>
			</div>
		);
	},
	save( { attributes } ) {
		const cardImage = ( src, alt ) => {
			if ( ! src ) {
				return (
					<img
						className="card__image"
						src="http://fpoimg.com/364x250"
						alt=""
					/>
				);
			}
			if ( alt ) {
				return (
					<img className="card__image" src={ src } alt={ alt } />
				);
			}
			// No alt set, so let's hide it from screen readers
			return (
				<img
					className="card__image"
					src={ src }
					alt=""
					ariaHidden="true"
				/>
			);
		};
		return (
			<div className="card bg-white flex w-100">
				<div className="card__content text w-7/12 h-full">
					<h3 className="card__title text-umblue p-4 py-6 md:text-xl">
						<a href={ attributes.cardLinkUrl }>
							<RichText.Content value={ attributes.cardTitle } />
						</a>
					</h3>
					<p className="card__body p-8 px-12 md:px-6 my-4 text-xl md:text-lg">
						<a href={ attributes.linkUrl }>
							<RichText.Content value={ attributes.cardBody } />
						</a>
					</p>
				</div>
				<div className="w-5/12 h-auto">
					{ cardImage( attributes.cardImageUrl, attributes.cardImageAlt ) }
				</div>
			</div>
		);
	},
} );
