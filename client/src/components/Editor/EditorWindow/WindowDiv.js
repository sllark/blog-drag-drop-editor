import React from "react";

const WindowDiv = (props)=> {
    return (
        <div className="windowComponent"
             contentEditable={props.comp.focus}
             onChange={props.onChangeHandler}
             ref={props.comp.ref}
             style={props.styles}
             data-id={props.comp.randID}>
        </div>
    );
}

export default WindowDiv;