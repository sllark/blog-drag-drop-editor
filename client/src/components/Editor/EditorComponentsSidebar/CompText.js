import React from "react";

const CompText = (props)=> {
    return (
        <div className="component" draggable={"true"} onDragStart={props.onDragStart} data-type="p">
            Text
        </div>
    );
}

export default CompText;