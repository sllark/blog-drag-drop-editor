import React from "react";

const CompButton = (props)=> {
    return (
        <div className="component" draggable={"true"} onDragStart={props.onDragStart} data-type="button">
            Button
        </div>
    );
}

export default CompButton;