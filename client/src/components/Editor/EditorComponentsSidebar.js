import React from "react";
import CompImg from './EditorComponentsSidebar/CompImg';
import CompText from './EditorComponentsSidebar/CompText';
import CompButton from './EditorComponentsSidebar/CompButton';
import CompHeading from './EditorComponentsSidebar/CompHeading';

export default function EditorComponentsSidebar() {


    const onDragStart = (ev)=>{
        ev.dataTransfer.effectAllowed = "move";
        ev.dataTransfer.setData("type", ev.target.dataset.type);
    }


    return (
        <div className="editorSidebarComponents">
            <CompImg onDragStart={onDragStart}/>
            <CompText onDragStart={onDragStart}/>
            <CompButton onDragStart={onDragStart}/>
            <CompHeading onDragStart={onDragStart}/>
        </div>
    );
}
