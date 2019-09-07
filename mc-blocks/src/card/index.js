import React from "react";

const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;
const {RichText} = wp.editor;

registerBlockType("mc-blocks/card", {
    title: __("Card", "mc-blocks"),
    icon: "id",
    category: "widgets",

    attributes: {
        cardHeading: {
            type: "string",
            source: "text",
            selector: ".card-heading"
        },
        cardTopContent: {
            type: "string",
            source: "html",
            selector: ".card-top-content"
        },
        cardBottomContent: {
            type: "string",
            source: "html",
            selector: ".card-bottom-content"
        }
    },

    styles: [
        {
            name: "default",
            label: __("Vertical", "mc-blocks"),
            isDefault: true
        },
        {
            name: "horizontal",
            label: __("Horizontal", "mc-blocks")
        }
    ],

    edit: props => {
        const {
            attributes: {cardHeading, cardTopContent, cardBottomContent},
            setAttributes
        } = props;

        const onChangeCardHeading = newCardHeading => {
            setAttributes({cardHeading: newCardHeading});
        };

        const onChangeCardTopContent = newCardTopContent => {
            setAttributes({cardTopContent: newCardTopContent});
        };

        const onChangeCardBottomContent = newCardBottomContent => {
            setAttributes({cardBottomContent: newCardBottomContent});
        };

        return (
            <div>
                <h3 className="card-heading">
                    <RichText
                        placeholder={__("Card heading", "mc-blocks")}
                        value={cardHeading}
                        onChange={onChangeCardHeading}
                    />
                </h3>
                <div className="card-top-content">
                    <RichText
                        placeholder={__("Card top content", "mc-blocks")}
                        onChange={onChangeCardTopContent}
                        value={cardTopContent}
                    />
                </div>
                <div className="card-bottom-content">
                    <RichText
                        placeholder={__("Card bottom content", "mc-blocks")}
                        onChange={onChangeCardBottomContent}
                        value={cardBottomContent}
                    />
                </div>
            </div>
        );
    },
    save: props => {
        const {
            attributes: {cardHeading, cardTopContent, cardBottomContent}
        } = props;

        return (
            <div className="border-2 border-denim flex flex-col">
                <div className="bg-light-blue-grey p-4 flex-grow">
                    <h3 className="card-heading text-lg text-michigan-blue mb-2 font-bold">
                        <RichText.Content
                            value={cardHeading}
                        />
                    </h3>
                    <p className="card-top-content w-full">
                        <RichText.Content
                            value={cardTopContent}
                        />
                    </p>
                </div>

                {cardBottomContent &&
                <p className="card-bottom-content bg-white p-4 mb-0 w-full">
                    <RichText.Content
                        value={cardBottomContent}
                    />
                </p>
                }

            </div>
        )
    }
});
