import React from 'react';

import ProfileDetails from "../components/profile/ProfileDetails";
import LatestPosts from "../components/home/LatestPosts";

class Profile extends React.Component{


    state={
        deletePostID:""
    }


    postDelete = (postID)=>{
        if (this.props.match.params.id !== localStorage.getItem('userID')) return;

        this.setState({deletePostID:postID})
    }


    render() {


        return(
            <div className="profilePage">
                <div className="container">

                    <ProfileDetails
                        {...this.props}
                        postDeleted={this.state.deletePostID}
                    />

                    <LatestPosts
                         loadMyPosts={this.props.match.params.id === localStorage.getItem('userID')}
                         userID={this.props.match.params.id || localStorage.getItem('userID')}
                         onPostDelete={this.postDelete}
                    />


                </div>
            </div>

        )
    }

}



export default Profile;
