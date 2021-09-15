import React from "react";

const WindowBR = (props)=> {
    return (
        <div className="windowComponent breaker"
             data-id={props.comp.randID}
             ref={props.comp.ref}
        >
        </div>
    );
}

export default WindowBR;