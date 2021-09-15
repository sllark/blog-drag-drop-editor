import React from "react";

const CompImg = (props)=> {
    return (
        <div className="component" draggable={"true"} onDragStart={props.onDragStart} data-type="img">
            Image
        </div>
    );
}


export default CompImg;