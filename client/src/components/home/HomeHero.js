import React from "react";
import {Link} from "react-router-dom";



export default function HomeHero(props) {


    return (
        <div className="heroHome">

            <div className="container">


                <h1>Where you find great ideas</h1>

                <p>
                    Read and share new perspectives on just about any topic. Everyone’s welcome.
                </p>

                <Link to="/signup" className="btn btn--dark">Join Now</Link>


            </div>

        </div>
    );
}
