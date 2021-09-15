import React from "react";


const Input = (props)=> {


    return (
        <>
            <input
                type={props.type}
                id={props.id}
                name={props.id}
                value={props.value}
                onChange={props.changeHandler}
                className={props.class}
                placeholder={props.placeholder}
            />
        </>
    );
}

export default Input;
