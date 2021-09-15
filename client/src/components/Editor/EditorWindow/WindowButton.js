import React from "react";
import ComponentWrapper from './ComponentWrapper'


const WindowButton = (props) => {


    return (
        <ComponentWrapper {...props}>
            <a>
                {props.comp.content}
            </a>
        </ComponentWrapper>
    );
}

export default WindowButton;