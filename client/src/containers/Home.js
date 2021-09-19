import React from "react";
import HomeHero from '../components/home/HomeHero'
import LatestPosts from '../components/home/LatestPosts'


class Home extends React.Component {

    //PostBrisk



    render() {

        let showHero = !localStorage.getItem("userID") ? <HomeHero/> : null;

        return (
            <div className="home">
                {showHero}
                <LatestPosts />
            </div>
        );

    }


}


export default Home;
