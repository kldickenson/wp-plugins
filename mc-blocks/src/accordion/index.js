const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;
const {RichText} = wp.editor;

registerBlockType("mc-blocks/accordion", {
    title: __("Accordion", "mc-blocks"),
    icon: "editor-insertmore",
    category: "widgets",

    attributes: {
        accordionHeading: {
            type: "string",
            source: "html",
            selector: ".accordion-heading"
        },
        accordionContent: {
            type: "array",
            source: "children",
            selector: ".accordion-content"
        }
    },

    edit: props => {
        const {
            attributes: {accordionHeading, accordionContent},
            setAttributes
        } = props;

        const onChangeAccordionHeading = newAccordionHeading => {
            setAttributes({accordionHeading: newAccordionHeading});
        };

        const onChangeAccordionContent = newAccordionContent => {
            setAttributes({accordionContent: newAccordionContent});
        };

        return (
            <div>
                <h3 className="accordion-heading">
                    <RichText
                        placeholder={__("Accordion heading", "mc-blocks")}
                        value={accordionHeading}
                        onChange={onChangeAccordionHeading}
                    />
                </h3>
                <div className="accordion-content">
                    <RichText
                        multiline="p"
                        placeholder={__("Accordion content", "mc-blocks")}
                        onChange={onChangeAccordionContent}
                        value={accordionContent}
                    />
                </div>
            </div>
        );
    },
    save: props => {
        const {
            attributes: {accordionHeading, accordionContent}
        } = props;

        return (
            <details>
                <summary>
                    <span className="accordion-heading">
                        <RichText.Content value={accordionHeading}/>
                    </span>
                    <span className="plus-wrapper">
                        <span className="plus"/>
                    </span>
                </summary>
                <div className="accordion-content">
                    <RichText.Content
                        multiline="p"
                        value={accordionContent}
                    />
                </div>
            </details>
        )
    }
});
