import React, { useState } from 'react';

const StyleList = (props)=> {

    const [showList, setShowList] = useState(true);

    let list=null;

    if (showList){
        list=props.children
    }

    let className = "";

    return (
        <div className="styleList" >
            <h4 onClick={()=>setShowList(!showList)}>{props.title}</h4>
            <div className={"list "+(showList ? "" : "hideList")}>
                {list}
            </div>
        </div>
    );
}

export default StyleList;