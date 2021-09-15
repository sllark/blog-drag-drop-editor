import React from 'react';
import LatestPosts from "../../components/home/LatestPosts";

class Profile extends React.Component{



    render() {
        return(
            <div className="profilePage">
                <div className="container">

                    <LatestPosts
                         loadMyPosts={true}/>

                </div>
            </div>

        )
    }

}



export default Profile;
