import React from "react";
import ListingPost from "./ListingPost";
import Spinner from "../UI/Spinner";
import axios from "../../helper/axios";
import handleAxiosError from "../../helper/handleAxiosError";
import ShowResponse from "../UI/ShowResponse";


class LatestPosts extends React.Component {


    state = {
        posts: [],
        totalPosts: 0,
        currentPage: 0,
        responseStatus: "",
        responseMsg: "",
        isLoading: false
    }


    componentDidMount() {
        this.fetchPosts(1, this.props.userID)
    }


    fetchPosts = (pageToLoad = 1, userID = "") => {


        if (pageToLoad <= 0 || pageToLoad === this.state.currentPage) return;

        if (this.state.totalPosts > 0 && pageToLoad > Math.ceil(this.state.totalPosts / 10)) return;


        this.setState({isLoading: true})

        let fetchUrl = "/getPosts";

        if (userID) {
            fetchUrl = "/getUserPosts";
            fetchUrl+="?page=" + pageToLoad;
            fetchUrl+="&userID=" + userID;
        }else {
            fetchUrl+="?page=" + pageToLoad;
        }



        axios.get(fetchUrl)
            .then(result => {

                console.log(result)

                this.setState((preveState) => {
                    return {
                        posts: [...preveState.posts, ...result.data.posts],
                        totalPosts: result.data.count,
                        currentPage: pageToLoad
                    }
                });


            })
            .catch(error => {
                handleAxiosError(error, this.setResponsePreview, "Loading Failed...")
            })
            .then(() => this.setState({isLoading: false}))

    }


    deletePost = (postId) => {

        let posts = [...this.state.posts];
        let postIndex = posts.findIndex(post => post._id === postId);
        posts[postIndex].beingDelete = true;
        this.setState({posts})


        axios.post("deletePost",
            JSON.stringify({
                postId: postId
            }))
            .then(result => {

                posts.splice(postIndex, 1);
                this.setState({posts})
                this.setResponsePreview("success", "Post deleted successfully.")

                if(this.props.onPostDelete) this.props.onPostDelete(postId);

            })
            .catch(error => {
                posts[postIndex].beingDelete = false;
                this.setState({posts})
                handleAxiosError(error, this.setResponsePreview, "Failed to deleted post.")
            })


    }

    setResponsePreview = (status, msg) => {
        this.setState({
            responseMsg: msg,
            responseStatus: status
        })
    }


    render() {

        const posts = this.state.posts;

        return (
            <>
                {
                    this.state.responseStatus !== "" ?
                        <ShowResponse
                            status={this.state.responseStatus}
                            message={this.state.responseMsg}
                            postID={this.state.postId}
                            hideMe={() => this.setState({responseStatus: ""})}
                        /> : null
                }
                <div className="latestPosts">

                    <div className="container">

                        {
                            !this.props.loadMyPosts && <h2>Latest Posts</h2>
                        }

                        <div className="posts">


                            {
                                posts.length ?
                                    posts.map(post =>
                                        <ListingPost
                                            key={post._id}
                                            post={post}
                                            loadMyPosts={this.props.loadMyPosts}
                                            deletePost={this.deletePost}/>)

                                    : !this.state.isLoading ?
                                    <h5 className="noPost">No Post to Load</h5> : null
                            }

                            {
                                this.state.isLoading ?
                                    <Spinner/> :
                                    null
                            }

                            <button className="btn btn--secondary btn--lg"
                                    disabled={(this.state.totalPosts <= 0 || this.state.currentPage === Math.ceil(this.state.totalPosts / 10))}
                                    onClick={() => this.fetchPosts(this.state.currentPage + 1)}>
                                Load More
                            </button>

                        </div>

                    </div>

                </div>
            </>
        );

    }


}


export default LatestPosts;