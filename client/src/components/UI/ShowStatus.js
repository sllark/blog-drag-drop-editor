import React from "react";
import cross from '../../assets/img/cross-1.1s-200px.png';
import check from '../../assets/img/check-1.1s-200px.png';


export default function ShowStatus(props) {


    if (props.status==='failed'){
        return (
            <div className="saving">
                <img src={cross} alt="failed"/>
                <p>
                    {props.message}
                </p>
            </div>

        );
    }

    if (props.status==='success'){
        return (
            <div className="saving">
                <img src={check} alt="success"/>
                <p>
                    {props.message}
                </p>
                &nbsp;&nbsp;<a href={'/post/'+props.id} target="_blank">View Page</a>
            </div>

        );
    }



    return (
        <div className="saving">
            <div className="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <p>
                Saving...
            </p>
        </div>

    );
}
