import React,{useState} from "react";
import {Link} from "react-router-dom";

import logo from '../../assets/img/logo-white-asset.png'


export default function EditorHeader(props) {

    console.log(props);

    const [showNav,setShowNav] = useState(false);

    const logout =  ()=>{
        setShowNav(false)
        localStorage.removeItem('token')
        localStorage.removeItem('userID')
        props.updateState({token:null,userId:null,isAuth:null})
        props.history.push('/')
    }


    let defaultLinks =
        <>
            <li>
                <Link to="/" className={"btn btn--primary"+(props.location.pathname === "/" ? " active":"")} onClick={()=>setShowNav(false)}>
                    Home
                </Link>
            </li>
            <li>
                <Link to="/login" className={"btn btn--primary"+(props.location.pathname === "/login" ? " active":"")} onClick={()=>setShowNav(false)}>
                    Login
                </Link>
            </li>

            <li>
                <Link to="/signup" className={"btn btn--primary"+(props.location.pathname === "/signup" ? " active":"")} onClick={()=>setShowNav(false)}>
                    Get Started
                </Link>
            </li>
        </>;


    if (localStorage.getItem('userID')){

        defaultLinks =
            <>
                <li>
                    <Link to="/" className="btn--white" onClick={()=>setShowNav(false)}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to={"/profile/"+localStorage.getItem('userID')} className="btn--white" onClick={()=>setShowNav(false)}>
                        My Posts
                    </Link>
                </li>
                <li>
                    <Link to="/editor" className="btn--white" onClick={()=>setShowNav(false)}>
                        Create New Post
                    </Link>
                </li>
                <li>
                    <a onClick={logout} className="btn--white">
                        Logout
                    </a>
                </li>
            </>;

    }

    return (
        <div className="mainHeader">
            <Link to="/">
                <img src={logo} alt="logo"/>
            </Link>
            <ul className={(!showNav ? "hideNav":"")}>
                {defaultLinks}
            </ul>
            <div className={"hamburgerMenu "+(showNav ? "makeCross": "")} onClick={()=>setShowNav(!showNav)}>
                <div/>
                <div/>
                <div/>
            </div>
        </div>
    );
}
