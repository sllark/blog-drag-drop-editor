import React from "react";
import ComponentWrapper from "./ComponentWrapper";

const WindowHeading = (props)=> {

    const headingType =props.comp.headingType;
    const headingContent =props.comp.content;


    let heading = <h1>{headingContent}</h1>;

    if (headingType ===  'h2' )
        heading = <h2>{headingContent}</h2>;
    else if (headingType ===  'h3' )
        heading = <h3>{headingContent}</h3>;
    else if (headingType ===  'h4' )
        heading = <h4>{headingContent}</h4>;
    else if (headingType ===  'h5' )
        heading = <h5>{headingContent}</h5>;
    else if (headingType ===  'h6' )
        heading = <h6>{headingContent}</h6>;




    return (
        <ComponentWrapper {...props}>
            {heading}
        </ComponentWrapper>
    );

}

export default WindowHeading;