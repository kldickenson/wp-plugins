import React from "react";

const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;
const {RichText, InspectorControls, MediaUpload, URLInputButton, ColorPalette} = wp.editor;
const {PanelBody, Button, RadioControl} = wp.components;

registerBlockType("mc-blocks/section", {
    title: __("Section", "mc-blocks"),
    icon: "feedback",
    category: "widgets",

    attributes: {
        sectionHeading: {
            type: "string",
            source: "html",
            selector: ".section-heading"
        },
        sectionContent: {
            type: "string",
            source: "html",
            multiline: "p",
            selector: ".section-content"
        },
        sectionList: {
            type: "string",
            source: "html",
            multiline: "li",
            selector: ".section-list"
        },
        sectionImage: {
            type: "string",
            source: "attribute",
            selector: ".section-image",
            attribute: "src"
        },
        sectionImageAlt: {
            type: "string",
            source: "attribute",
            selector: ".section-image",
            attribute: "alt"
        },
        sectionBackgroundImage: {
            type: "string",
        },
        sectionLink: {
            type: "string",
            source: "attribute",
            selector: ".section-link",
            attribute: "href"
        },
        sectionTextAlignment: {
            type: "string",
            default: "section-right"
        },
        sectionBackgroundColor: {
            type: "string",
            default: "#fff"
        },
        sectionBackgroundColorName: {
            type: "string",
            default: "white"
        },
        sectionButton: {
            type: "string",
            source: "html",
            selector: ".section-button"
        }
    },

    edit: props => {
        const {
            attributes: {
                sectionHeading,
                sectionContent,
                sectionBackgroundImage,
                sectionLink,
                sectionList,
                sectionTextAlignment,
                sectionImage,
                sectionImageAlt,
                sectionBackgroundColor,
                sectionBackgroundColorName,
                sectionButton
            },
            setAttributes
        } = props;

        const onChangeSectionHeading = newSectionHeading => {
            setAttributes({sectionHeading: newSectionHeading});
        };

        const onChangeSectionContent = newSectionContent => {
            setAttributes({sectionContent: newSectionContent});
        };

        const onBackgroundImageSelect = newBackgroundImage => {
            setAttributes({sectionBackgroundImage: newBackgroundImage.sizes.full.url});
        };

        const onChangeSectionLink = newSectionLink => {
            setAttributes({sectionLink: newSectionLink});
        };

        const onChangeSectionList = newSectionList => {
            setAttributes({sectionList: newSectionList});
        };

        const onChangeSectionTextAlignment = newSectionTextAlignment => {
            setAttributes({sectionTextAlignment: newSectionTextAlignment});
        };

        const onChangeSectionImage = newSectionImage => {
            setAttributes({
                sectionImage: newSectionImage.sizes.full.url,
                sectionImageAlt: newSectionImage.alt
            });
        };

        const onRemoveBackgroundImage = () => {
            setAttributes({sectionBackgroundImage: ""});
        };

        const onRemoveSectionImage = () => {
            setAttributes({sectionImage: ""});
        };

        const onChangeSectionBackgroundColor = newSectionBackgroundColor => {
            const matchingColor = colors.find((color) => newSectionBackgroundColor === color.color);

            setAttributes({
                sectionBackgroundColor: newSectionBackgroundColor,
                sectionBackgroundColorName: matchingColor.name
            });
        };

        const onChangeSectionButton = newSectionButton => {
            setAttributes({sectionButton: newSectionButton});
        };

        const colors = [
            {name: "white", color: "#fff"},
            {name: "blue", color: "#00274c"},
            {name: "light-blue", color: "#465d85"}
        ];

        return [
            <InspectorControls>
                <PanelBody title={__("Section options", "mc-blocks")}>
                    <div className="components-base-control">
                        <div className="components-base-control__field">
                            <label className="components-base-control__label">
                                {__("Background image", "mc-blocks")}
                            </label>

                            {sectionBackgroundImage &&
                            <img src={sectionBackgroundImage} alt=""/>
                            }

                            <MediaUpload
                                onSelect={onBackgroundImageSelect}
                                value={sectionBackgroundImage}
                                render={({open}) => (
                                    <Button
                                        className="editor-post-featured-image__toggle"
                                        onClick={open}>Change image
                                    </Button>
                                )}
                            />

                            {sectionBackgroundImage &&
                            <Button
                                className="components-button is-link is-destructive"
                                onClick={onRemoveBackgroundImage}>Remove background image
                            </Button>
                            }
                        </div>

                        <div className="components-base-control__field">
                            <RadioControl
                                label={__("Text alignment", "mc-blocks")}
                                selected={sectionTextAlignment}
                                options={[
                                    {label: "Left", value: "section-left"},
                                    {label: "Right", value: "section-right"}
                                ]}
                                onChange={onChangeSectionTextAlignment}
                            />
                        </div>

                        <div className="components-base-control__field">
                            <label className="components-base-control__label">
                                {__("Background color", "mc-blocks")}
                            </label>
                            <ColorPalette
                                value={sectionBackgroundColor}
                                onChange={onChangeSectionBackgroundColor}
                                colors={colors}
                            />
                        </div>

                        <div className="components-base-control__field">
                            <label className="components-base-control__label">
                                {__("Link", "mc-blocks")}
                            </label>
                            <URLInputButton
                                className="section-cta-url"
                                label={__("CTA URL", "mc-blocks")}
                                onChange={onChangeSectionLink}
                                url={sectionLink}
                            />
                        </div>
                    </div>
                </PanelBody>
            </InspectorControls>,
            <div>
                <h3 className="section-heading">
                    <RichText
                        placeholder={__("Section heading", "mc-blocks")}
                        value={sectionHeading}
                        formattingControls={[]}
                        onChange={onChangeSectionHeading}
                    />
                </h3>

                <div className="section-image">
                    {sectionImage &&
                    <img src={sectionImage} alt={sectionImageAlt}/>
                    }

                    <MediaUpload
                        onSelect={onChangeSectionImage}
                        value={sectionImage}
                        render={({open}) => (
                            <Button
                                className="editor-post-featured-image__toggle"
                                onClick={open}>Change section image
                            </Button>
                        )}
                    />

                    {sectionImage &&
                    <Button
                        className="components-button is-link is-destructive"
                        onClick={onRemoveSectionImage}>Remove section image
                    </Button>
                    }
                </div>

                <div className="section-content">
                    <RichText
                        multiline="p"
                        placeholder={__("Section content", "mc-blocks")}
                        onChange={onChangeSectionContent}
                        value={sectionContent}
                    />
                </div>
                <RichText
                    tagName="ul"
                    multiline="li"
                    className="section-list"
                    placeholder={__("List items", "mc-blocks")}
                    onChange={onChangeSectionList}
                    value={sectionList}
                />
                <RichText
                    className="section-button"
                    placeholder={__("Section Button Text", "mc-blocks")}
                    onChange={onChangeSectionButton}
                    value={sectionButton}
                />
            </div>
        ];
    },
    save: props => {
        const {
            attributes: {
                sectionHeading,
                sectionContent,
                sectionBackgroundImage,
                sectionLink,
                sectionList,
                sectionTextAlignment,
                sectionImage,
                sectionImageAlt,
                sectionBackgroundColor,
                sectionBackgroundColorName,
                sectionButton
            }
        } = props;

        return (
            <div
                className={`section-background full-width ${sectionBackgroundColorName} ${sectionTextAlignment} ${sectionImage ? "has-image" : ""}`}
                style={sectionBackgroundImage ? `background: url(${sectionBackgroundImage}) no-repeat center/cover` : ""}>

                <div className={`section-wrapper flex ${!sectionImage ? "contained" : ""}`}>
                    {sectionImage &&
                    <img className="section-image w-1/2" src={sectionImage} alt={sectionImageAlt}/>
                    }

                    <div className="section-text w-1/2">
                        {sectionLink &&
                        <a href={sectionLink} className="section-link">
                            <h2 className="section-heading">
                                <RichText.Content
                                    value={sectionHeading}
                                />
                            </h2>
                        </a>
                        }

                        {!sectionLink &&
                        <h2 className="section-heading">
                            <RichText.Content
                                value={sectionHeading}
                            />
                        </h2>
                        }

                        <div className="section-content">
                            <RichText.Content
                                multiline="p"
                                value={sectionContent}
                            />
                        </div>

                        {sectionList &&
                        <ul className="section-list">
                            <RichText.Content
                                multiline="li"
                                value={sectionList}
                            />
                        </ul>
                        }

                        {sectionButton &&
                        <a className="section-button button" href={sectionLink}>
                            <RichText.Content
                                value={sectionButton}
                            />
                        </a>
                        }
                    </div>
                </div>
            </div>
        )
    }
});
