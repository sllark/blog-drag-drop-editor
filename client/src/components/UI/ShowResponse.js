import React,{useEffect} from "react";
import cross from '../../assets/img/cross-1.1s-200px.png';
import check from '../../assets/img/check-1.1s-200px.png';



export default function ShowResponse(props) {

    let timeout = undefined;

    useEffect(()=>{
        // console.log('added')
        timeout = setTimeout(()=> {
            props.hideMe();
            clearTimeout(timeout);
        },3000)

    },[]);





    if (props.status==='failed'){
        return (
            <div className="showResponse">
                <img src={cross} alt="failed"/>
                <p>
                    {props.message}
                </p>
            </div>

        );
    }

    if (props.status==='success'){

        let pageLink = (<a href={'/post/'+props.postID} target="_blank">View Page</a>);

        return (
            <div className="showResponse">
                <img src={check} alt="success"/>
                <p>
                    {props.message} &nbsp;&nbsp;
                    {
                        props.postID ? pageLink : null
                    }
                </p>
            </div>

        );
    }


    if (props.status==='message'){
        return (
            <div className="showResponse">
                <p>
                    <strong>{props.message}</strong>
                </p>
            </div>

        );
    }



    return (
        <div className="showResponse">
            <p>
                Saving...
            </p>
        </div>
    );
}
