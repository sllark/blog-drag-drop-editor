import React from "react";
import StyleList from './EditorStylesSidebar/StylesList'
import NumberField from './EditorStylesSidebar/NumberField'
import ColorField from './EditorStylesSidebar/ColorField'


const defaultText = {
    value: "auto",
    unit: "none"
}

const defaultNum = {
    value: "0",
    unit: "px"
}
const defaultColor = {
    value: "#545454",
    unit: 'none'
}


function EditorComponentsSidebar(props) {

    const updateStyle = (style) => {
        props.updateStyles(props.id, style);
    }

    const updateDropdowStyle = (e) => {
        updateStyle({property: e.target.id, value: e.target.value})
    }

    const updateCompAttribute = (e) => {
        props.updateAttribute(props.id, {name: e.target.id, value: e.target.value})
    }

    const updateSingleComp = (e) => {
        let comp = {...props.component}
        comp.headingType = e.target.value;

        if (comp.headingType === 'h1')
            comp.styles.fontSize.value = 40;
        else if (comp.headingType === 'h2')
            comp.styles.fontSize.value = 32;
        else if (comp.headingType === 'h3')
            comp.styles.fontSize.value = 26;
        else if (comp.headingType === 'h4')
            comp.styles.fontSize.value = 18;
        else if (comp.headingType === 'h5')
            comp.styles.fontSize.value = 16;
        else if (comp.headingType === 'h6')
            comp.styles.fontSize.value = 12;


        props.updateSingleComponent(comp);
    }


    let selectedComponent = props.component;

    if (!selectedComponent)
        selectedComponent = {};



    let displayValue = "block",
        fontWeightValue = "500",
        textAlign = "left",
        borderStyle = "solid",
        compClassName = "",
        compHref = "",
        compTarget = "_blank",
        compImgSrc = "",
        headingType = "h1";


    if (props.styles.display)
        displayValue = props.styles.display.value;

    if (props.styles.fontWeight)
        fontWeightValue = props.styles.fontWeight.value;

    if (props.styles.textAlign)
        textAlign = props.styles.textAlign.value;

    if (selectedComponent.attributes) {
        compClassName = selectedComponent.attributes.className || compClassName;
        compHref = selectedComponent.attributes.hreflink || compHref;
        compTarget = selectedComponent.attributes.target || compTarget;
        compImgSrc = selectedComponent.attributes.src || compImgSrc;
    }


    if (selectedComponent.headingType)
        headingType = selectedComponent.headingType;


    let elementAttr = null;
    if (selectedComponent.type === "button") {

        elementAttr = <>
            <div className="styleBox w-100 input-w-100">
                <label htmlFor="hreflink">href</label>
                <input type="url"
                       id='hreflink'
                       value={compHref}
                       onChange={updateCompAttribute}
                       autoComplete="off"
                />
            </div>
            <div className="styleBox w-100 input-w-100">
                <label htmlFor="target">target</label>
                <select id="target" className="styleBoxDropdown"
                        value={compTarget}
                        onChange={updateCompAttribute}
                        autoComplete="off"
                >
                    <option value="_blank">_blank</option>
                    <option value="_self">_self</option>
                    <option value="_parent">_parent</option>
                    <option value="_top">_top</option>
                </select>
            </div>
        </>

    }


    if (selectedComponent.type === "img") {

        elementAttr = <>
            <div className="styleBox w-100 input-w-100">
                <label htmlFor="src">Image URL</label>
                <input type="url"
                       id='src'
                       value={compImgSrc}
                       onChange={updateCompAttribute}
                       autoComplete="off"
                />
            </div>
        </>

    }

    if (selectedComponent.type === "heading") {

        elementAttr =
            <div className="styleBox w-100">
                <label htmlFor="headingType">Heading Type</label>
                <select id="headingType" className="styleBoxDropdown"
                        value={headingType}
                        onChange={updateSingleComp}
                >
                    <option value="h1">h1</option>
                    <option value="h2">h2</option>
                    <option value="h3">h3</option>
                    <option value="h4">h4</option>
                    <option value="h5">h5</option>
                    <option value="h6">h6</option>
                </select>
            </div>;

    }


    return (
        <div className="editorSidebarStyles">


            <StyleList title="Setting">


                <div className="styleBox w-100 input-w-100">
                    <label htmlFor="className">Class</label>
                    <input type="text"
                           id='className'
                           value={compClassName}
                           onChange={updateCompAttribute}
                           autoComplete="off"
                    />
                </div>

                {elementAttr}

            </StyleList>

            <StyleList title="Genral">

                <div className="styleBox">
                    <label htmlFor="display">Display</label>
                    <select id="display" className="styleBoxDropdown"
                            value={displayValue}
                            onChange={updateDropdowStyle}
                    >
                        <option value="block">block</option>
                        <option value="inline">inline</option>
                        <option value="inline-block">inline-block</option>
                        <option value="flex">flex</option>
                    </select>
                </div>

                <div className="styleBox">
                    <label htmlFor="width">Width</label>
                    <NumberField id="width"
                                 value={props.styles.width || defaultText} updateStyle={updateStyle}
                    />
                </div>

                <div className="styleBox">
                    <label htmlFor="height">Height</label>
                    <NumberField id="height"
                                 value={props.styles.height || defaultText}
                                 updateStyle={updateStyle}
                    />
                </div>

                <div className="fourPropertiesCont">
                    <h5>Margin</h5>

                    <div className="styleBox">
                        <label htmlFor="marginTop">Top</label>
                        <NumberField id="marginTop"
                                     value={props.styles.marginTop || defaultNum}
                                     updateStyle={updateStyle}
                        />
                    </div>
                    <div className="styleBox">
                        <label htmlFor="marginRight">Right</label>
                        <NumberField id="marginRight"
                                     value={props.styles.marginRight || defaultNum}
                                     updateStyle={updateStyle}
                        />
                    </div>
                    <div className="styleBox">
                        <label htmlFor="marginLeft">Left</label>
                        <NumberField id="marginLeft"
                                     value={props.styles.marginLeft || defaultNum}
                                     updateStyle={updateStyle}
                        />
                    </div>
                    <div className="styleBox">
                        <label htmlFor="marginBottom">Bottom</label>
                        <NumberField id="marginBottom"
                                     value={props.styles.marginBottom || defaultNum}
                                     updateStyle={updateStyle}
                        />
                    </div>
                </div>

                <div className="fourPropertiesCont">
                    <h5>Padding</h5>

                    <div className="styleBox">
                        <label htmlFor="paddingTop">Top</label>
                        <NumberField id="paddingTop"
                                     value={props.styles.paddingTop || defaultNum}
                                     updateStyle={updateStyle}
                        />
                    </div>
                    <div className="styleBox">
                        <label htmlFor="paddingRight">Right</label>
                        <NumberField id="paddingRight"
                                     value={props.styles.paddingRight || defaultNum}
                                     updateStyle={updateStyle}
                        />
                    </div>
                    <div className="styleBox">
                        <label htmlFor="paddingLeft">Left</label>
                        <NumberField id="paddingLeft"
                                     value={props.styles.paddingLeft || defaultNum}
                                     updateStyle={updateStyle}
                        />
                    </div>
                    <div className="styleBox">
                        <label htmlFor="paddingBottom">Bottom</label>
                        <NumberField id="paddingBottom"
                                     value={props.styles.paddingBottom || defaultNum}
                                     updateStyle={updateStyle}
                        />
                    </div>
                </div>

            </StyleList>

            <StyleList title="Typography">

                <div className="styleBox">
                    <label htmlFor="fontSize">Font Size</label>
                    <NumberField id="fontSize"
                                 value={props.styles.fontSize || defaultNum}
                                 updateStyle={updateStyle}
                    />
                </div>

                <div className="styleBox">
                    <label htmlFor="fontWeight">Font Weight</label>
                    <select id="fontWeight" className="styleBoxDropdown"
                            value={fontWeightValue}
                            onChange={updateDropdowStyle}
                    >
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="300">300</option>
                        <option value="400">400</option>
                        <option value="500">500</option>
                        <option value="600">600</option>
                        <option value="700">700</option>
                        <option value="800">800</option>
                    </select>
                </div>

                <div className="styleBox">
                    <label htmlFor="textAlign">Text Align</label>
                    <select id="textAlign" className="styleBoxDropdown"
                            value={textAlign}
                            onChange={updateDropdowStyle}
                    >
                        <option value="left">left</option>
                        <option value="center">center</option>
                        <option value="right">right</option>
                        <option value="unset">unset</option>
                    </select>
                </div>

                <div className="styleBox">
                    <label htmlFor="opacity">Opacity</label>
                    <NumberField id="opacity"
                                 value={props.styles.opacity || defaultNum}
                                 updateStyle={updateStyle}
                    />
                </div>

                <div className="styleBox w-100">
                    <label htmlFor="color">Color</label>
                    <ColorField
                        id="color"
                        value={props.styles.color || defaultColor}
                        updateStyle={updateStyle}
                    />
                </div>

                <div className="styleBox w-100">
                    <label htmlFor="backgroundColor">Background Color</label>
                    <ColorField
                        id="backgroundColor"
                        value={props.styles.backgroundColor || {value: "#ffffff"}}
                        updateStyle={updateStyle}
                    />
                </div>

                <div className="fourPropertiesCont">
                    <h5>Border</h5>

                    <div className="styleBox w-100">
                        <label htmlFor="borderWidth">Border Width</label>
                        <NumberField id="borderWidth"
                                     value={props.styles.borderWidth || defaultNum}
                                     updateStyle={updateStyle}
                        />
                    </div>
                    <div className="styleBox w-100">
                        <label htmlFor="borderStyle">Border Style</label>
                        <select id="borderStyle" className="styleBoxDropdown"
                                value={borderStyle}
                                onChange={updateDropdowStyle}
                        >
                            <option value="solid">solid</option>
                            <option value="dashed">dashed</option>
                            <option value="dotted">dotted</option>
                            <option value="double">double</option>
                            <option value="groove">groove</option>
                            <option value="unset">unset</option>
                        </select>
                    </div>

                    <div className="styleBox w-100">
                        <label htmlFor="borderColor">Border Color</label>
                        <ColorField
                            id="borderColor"
                            value={props.styles.borderColor || defaultColor}
                            updateStyle={updateStyle}
                        />
                    </div>
                </div>

                <div className="fourPropertiesCont">
                    <h5>Border Radius</h5>

                    <div className="styleBox">
                        <label htmlFor="borderTopLeftRadius">Top</label>
                        <NumberField id="borderTopLeftRadius"
                                     value={props.styles.borderTopLeftRadius || defaultNum}
                                     updateStyle={updateStyle}
                        />
                    </div>
                    <div className="styleBox">
                        <label htmlFor="borderTopRightRadius">Right</label>
                        <NumberField id="borderTopRightRadius"
                                     value={props.styles.borderTopRightRadius || defaultNum}
                                     updateStyle={updateStyle}
                        />
                    </div>
                    <div className="styleBox">
                        <label htmlFor="borderBottomLeftRadius">Left</label>
                        <NumberField id="borderBottomLeftRadius"
                                     value={props.styles.borderBottomLeftRadius || defaultNum}
                                     updateStyle={updateStyle}
                        />
                    </div>
                    <div className="styleBox">
                        <label htmlFor="borderBottomRightRadius">Bottom</label>
                        <NumberField id="borderBottomRightRadius"
                                     value={props.styles.borderBottomRightRadius || defaultNum}
                                     updateStyle={updateStyle}
                        />
                    </div>
                </div>

            </StyleList>

        </div>
    );
}


export default EditorComponentsSidebar;