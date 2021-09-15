import React from "react";

const CompHeading = (props)=> {
    return (
        <div className="component" draggable={"true"} onDragStart={props.onDragStart} data-type="heading">
            Heading
        </div>
    );
}

export default CompHeading;