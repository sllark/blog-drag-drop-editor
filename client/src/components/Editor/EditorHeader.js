import React,{useState} from "react";
import {Link} from "react-router-dom";
import logo from '../../assets/img/logo-white-asset.png'

export default function EditorHeader(props) {
    const [showNav,setShowNav] = useState(false);

    let classname = "btn btn--primary";


    return (
        <div className="mainHeader">
            <Link to="/">
                <img src={logo} alt="logo"/>
            </Link>
            <ul  className={(!showNav ? "hideNav":"")}>
                {
                    props.postID ?
                        <li>
                            <Link to={"/post/" + props.postID} className={classname} target="_blank">
                                Preview Page
                            </Link>
                        </li>
                        : null
                }
                <li className={classname}
                    onClick={()=> {
                        props.savePost()
                        setShowNav(false)
                    }}>
                    Save
                </li>
                <li className={classname}
                    onClick={()=> {
                        props.showModal()
                        setShowNav(false)
                    }}>
                    Post Details
                </li>

                <li className={classname + (props.showComponents ? " active" : "")}
                    onClick={()=> {
                        props.showSidebarComponents()
                        setShowNav(false)
                    }}>
                    Components
                </li>
                <li className={classname + (!props.showComponents ? " active" : "")}
                    onClick={()=> {
                        props.showSidebarStyles()
                        setShowNav(false)
                    }}>
                    Manager
                </li>
            </ul>

            <div className={"hamburgerMenu "+(showNav ? "makeCross": "")} onClick={()=>setShowNav(!showNav)}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}
