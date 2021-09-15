import React,{useEffect} from 'react';
import Backdrop from './Backdrop';



const Modal=(props)=>{


    let classname="Modal";

    if(!props.show){
        classname+=" hideModal"
    }

    useEffect(()=>{
        window.addEventListener('keydown',(e)=>{
            if (e.key ==='Escape')
                props.backdropClick();
        })
    },[])


    return(
        <>
            <Backdrop backdropClicked={props.backdropClick} show={props.show}/>
            <div className={classname}>
                {props.children}
            </div>
        </>
    )
}

export default Modal;