import React from "react";
import ComponentWrapper  from './ComponentWrapper'


const WindowText = (props) => {

    return (
        <ComponentWrapper {...props}>
            <div>
                {props.comp.content}
            </div>
        </ComponentWrapper>
    );
}

export default WindowText;