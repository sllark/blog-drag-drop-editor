import React from "react";
import WindowText from "../components/Editor/EditorWindow/WindowText";
import WindowImg from "../components/Editor/EditorWindow/WindowImg";
import WindowButton from "../components/Editor/EditorWindow/WindowButton";
import WindowHeading from "../components/Editor/EditorWindow/WindowHeading";
import WindowBR from "../components/Editor/EditorWindow/WindowBR";
import WindowDiv from "../components/Editor/EditorWindow/WindowDiv";

const getPostComponents = (components,onDragStart=null,onDragEnd=null)=>{

    return components.map((ele) => {

        let windowComp = ele.type;
        let component;


        switch (windowComp) {

            case "p":
                component = <WindowText
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    // onClickHandler={this.compClickHandler}
                    // compBlurHandler={this.compBlurHandler}
                    key={ele.randID}
                    comp={ele}
                    styles={ele.styles}
                />;
                break;

            case "img":

                component = <WindowImg
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    key={ele.randID}
                    comp={ele}
                    styles={ele.styles}
                />;
                break;


            case "button":

                component = <WindowButton
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    key={ele.randID}
                    comp={ele}
                    styles={ele.styles}
                />;
                break;


            case "heading":

                component = <WindowHeading
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    key={ele.randID}
                    comp={ele}
                    styles={ele.styles}
                />;
                break;


            case "breaker":
                component = <WindowBR
                    key={ele.randID}
                    comp={ele}
                    styles={ele.styles}

                />;
                break;


            default:
                component = <WindowDiv
                    key={ele.randID}
                    comp={ele}
                />;
                break;
        }

        return component;
    });
}


export default getPostComponents;