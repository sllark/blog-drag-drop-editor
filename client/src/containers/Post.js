import React from "react";
import {Link, Redirect} from "react-router-dom";

import Spinner from '../components/UI/Spinner'
import ShowResponse from "../components/UI/ShowResponse";

import getPostComponents from "../helper/getPostComponents";
import axios from "../helper/axios";
import getPostInfo from "../helper/getPostInfoStr";
import handleAxiosError from "../helper/handleAxiosError";


class Post extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showSpinner: true,
            postData: null,
            responseStatus: "",
            responseMsg: "",
            redirect: "",
            redirectTo: ""
        }
    }


    componentDidMount() {
        let postId = this.props.match.params.id;
        if (!postId) this.props.history.push('/');

        this.loadPost(postId);
    }

    loadPost = (postId) => {


        axios.get("/getPost/" + postId)
            .then(result => {

                this.setState({
                    showSpinner: false,
                    postData: result.data.post
                })

            })
            .catch(error => {
                this.setState({redirect: "/"})
                handleAxiosError(error, this.setResponsePreview, "Loading Failed...")
            })


    }

    setResponsePreview = (status, msg) => {
        this.setState({
            responseMsg: msg,
            responseStatus: status
        })
    }


    render() {


        let postData = this.state.postData;
        if (postData) postData = getPostComponents(postData.components);


        if (this.state.redirectTo !== "") return <Redirect to={this.state.redirectTo}/>

        return (
            <>
                {
                    this.state.responseStatus !== "" ?
                        <ShowResponse
                            status={this.state.responseStatus}
                            message={this.state.responseMsg}
                            postID={this.state.postId}
                            hideMe={() => {

                                console.log('hide');

                                this.setState({responseStatus: ""})
                                if (this.state.redirect)
                                    this.setState(prevState => {
                                        return {
                                            redirectTo: prevState.redirect
                                        }
                                    })
                            }}
                        /> : null
                }

                <div className="postContainer">

                    <div className="container">
                        <PostMeta meta={this.state.postData}/>

                        <div className="postContent">
                            {postData}
                        </div>

                        {this.state.showSpinner ? <Spinner/> : null}

                    </div>

                </div>

            </>
        )


    }


}


const PostMeta = (props) => {

    console.log(props)

    if (!props.meta) return null

    return (
        <>
            <h1 className="title"> {props.meta.title} </h1>
            {
                getPostInfo(props.meta)
            }
        </>
    )

}


export default Post;
