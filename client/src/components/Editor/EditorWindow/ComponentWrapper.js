import React, {useEffect, useState} from "react";
import getStyles from '../../../helper/getStyles'

import copyImg from '../../../assets/img/content_copy.png';
import deleteImg from '../../../assets/img/trash.png';

const ComponentWrapper = (props) => {

    const [showControl, setShowControl] = useState(false);

    useEffect(() => {

        if (!props.comp.selected || props.comp.focused)
            setShowControl(false);
        else if (props.comp.selected)
            setShowControl(true);


    }, [props.comp.selected, props.comp.focused])


    let control = showControl && props.comp.ref.current ? getControls(props.comp) : null;
    let className = getClassName(props.comp);

    let attributes = {...props.comp.attributes};
    delete attributes.className;

    let contentEditable = props.comp.focused;
    if (props.comp.type === "img") contentEditable = false;


    //component has link and it is not in editor;
    //make links have href and it goes to desired loaction if http/https is not present in link
    if (attributes.hreflink && !props.onDragEnd && !props.onDragEnd) {
        let textBefore = "//";
        if (attributes.hreflink.indexOf("http") === 0) textBefore = "";
        attributes.href = textBefore + attributes.hreflink;

        delete attributes.hreflink;
    }

    return (
        <>
            {control}
            {React.cloneElement(props.children, {
                ...{...attributes},
                className: className,
                onDragStart: props.onDragStart,
                onDragEnd: props.onDragEnd,
                draggable: props.comp.dragable,
                ref: props.comp.ref,
                "data-id": props.comp.randID,
                contentEditable: contentEditable,
                suppressContentEditableWarning: true,
                tabIndex: "1",
                role: "link",
                style: getStyles(props.styles),
            })
            }
        </>
    );
}

const getClassName = (component) => {

    let className = ""
    if (component.dragable) className = "windowComponent";
    if (!component.focused && component.selected) className += " selected"
    if (component.focused) className += " focused"
    if (component.dragging) className += " dragging";

    className += " " + (component.attributes?.className || "");

    return className;
}

const getControls = (component) => {

    let box = component.ref.current.getClientRects()[0];
    let {width, top, left, bottom} = box;
    let height = 0;


    top = component.ref.current.offsetTop;
    let editorTop = component.ref.current.closest('.editorMainWindow').getClientRects()[0].y;


    // height of header
    if (top <= editorTop) top = Number(box.bottom) - 40;

    return (
        <span
            className="compController"
            style={{
                width,
                height,
                top: top,
                left
            }}>
                     <img className="copyControl" data-id={component.randID} src={copyImg}/>
                     <img className="deleteControl" data-id={component.randID} src={deleteImg}/>
            </span>
    )

}

export default ComponentWrapper;