import React from 'react';
import {Link} from "react-router-dom";
import Spinner from "../UI/Spinner";

import getPostInfo from "../../helper/getPostInfoStr";

const ListingPost = (props) => {


    if(props.post.beingDelete)
        return <div className="postContainer contentCenter"><Spinner/></div>


    return (
        <div className="postContainer">
            <Link
                to={'/post/' + props.post._id}
                className="postContainer__img">
                <img
                    src={props.post.featuredImage} alt=""/>
            </Link>

            <div className="postContainer__content container">
                <h2>{props.post.title}</h2>
                <p>
                    {
                        props.post.description
                    }
                </p>
                {
                    getPostInfo(props.post)
                }
                <div className="postContainer__content__btns">


                    {
                        props.loadMyPosts ?
                            (
                                <>
                                    <Link to={'/post/' + props.post._id} className="btn btn--secondary">View</Link>
                                    <Link to={{
                                        pathname: '/editor',
                                        search: ("postId=" + props.post._id + "&shouldEdit=" + true)
                                    }}
                                          className="btn btn--secondary">Edit</Link>
                                    <button
                                        className="btn btn--danger"
                                        onClick={(e) => props.deletePost(props.post._id)}
                                    >
                                        Delete
                                    </button>
                                </>
                            )
                            :
                            (
                                <Link to={'/post/' + props.post._id} className="btn btn--secondary">Read More</Link>
                            )
                    }

                </div>
            </div>


        </div>
    )

}



export default ListingPost;