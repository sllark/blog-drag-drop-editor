import React from "react";
import {Link} from "react-router-dom";

const getPostInfo = (post)=>{

    let info = null;

    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    if(post.createdAt){
        info = ` on ${new Date(post.createdAt).toLocaleDateString(undefined,options)}`
    }



    return (
        <p className="about">
            By -&nbsp;
            <Link to={"/profile/"+post.userID?._id}>{post.userID?.firstName} {post.userID?.lastName}</Link>
            &nbsp;{info}
        </p>

    )

}


export default getPostInfo;
