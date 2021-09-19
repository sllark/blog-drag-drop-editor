import React, {useEffect, useState} from "react";
import axios from "../../helper/axios";
import handleAxiosError from "../../helper/handleAxiosError";
import ShowResponse from "../UI/ShowResponse";

function ProfileDetails(props) {

    const [user, setUser] = useState({
        firstName: ".",
        lastName: ".",
        totalPosts: "."
    })


    const [responseStatus,setResponseStatus ]=useState("")
    const [responseMessage,setResponseMessage ]=useState("")

    useEffect(() => {

        let id = props.match.params.id;
        if (!id) id = localStorage.getItem('userID')

        getUser(id);

    }, [])

    useEffect(() => {

        if (!props.postDeleted) return;

        let userObj = {...user}
        userObj.totalPosts -= 1;

        setUser(userObj);

    }, [props.postDeleted])


    const getUser = (userID) => {


        axios.get("/getUserDetails?userID=" + userID)
            .then(result => {

                console.log(result)

                let user = result.data.user;

                user = {
                    ...user,
                    totalPosts: result.data.totalPosts
                }

                setUser(user);
            })
            .catch(error => {
                handleAxiosError(error, setResponsePreview, "Loading Failed...")
            })


    }



    const setResponsePreview = (status, msg) => {
        setResponseStatus(status)
        setResponseMessage(msg);
    }


    return (

        <>

            {
                responseStatus !== "" ?
                    <ShowResponse
                        status={responseStatus}
                        message={responseMessage}
                        hideMe={() => setResponseStatus("")}
                    /> : null
            }
            <div className="profileDetails">
                <h3>
                    @{
                    user.firstName + " " + user.lastName
                }
                </h3>
                <h5>
                    {
                        user.totalPosts
                    }
                </h5>
                <h4>
                    Post
                    {
                        user.totalPosts > 1 && "s"
                    }
                </h4>

            </div>

            </>

    );
}


export default ProfileDetails;
