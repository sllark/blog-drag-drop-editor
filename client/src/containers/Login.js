import React from "react";

import Input from '../components/form/Input'
import Spinner from '../components/UI/Spinner'
import ShowStatus from '../components/UI/ShowStatus';
import {validateEmail, validatePassword} from "../helper/validation";
import isEmail from 'validator/lib/isEmail';
import axios from "../helper/axios";
import configs from "../assets/config/configs";
import handleAxiosError from "../helper/handleAxiosError";
import {Redirect} from "react-router-dom";
import ShowResponse from "../components/UI/ShowResponse";


class Login extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            form: {
                email: {
                    value: "",
                    isValid:false
                },
                password: {
                    value: "",
                    isValid:'false'
                }

            },
            loading: false,
            responseStatus: "",
            responseMsg: "",
            redirect:null
        }


        this.statusTimeout=null
    }




    onsubmitHandler = (e) => {
        e.preventDefault();

        let isFormValid = this.checkFormValidation();
        if (!isFormValid){

            this.setState({
                responseStatus: "failed",
                responseMsg: "Please fill the form correctly."
            });

            return;
        }

        this.setState({loading: true})


        axios({
            method: 'post',
            url: configs.api_url + "/login",
            headers: {
                "content-type": "application/json"
            },
            data: JSON.stringify({
                email: this.state.form.email.value,
                password: this.state.form.password.value
            })
        })
            .then(result => {
                this.setResponsePreview("success","Login Successfully.")
                this.props.updateState(result.data);
                this.setState({redirect: "/feed"})
            })
            .catch(error => {
                handleAxiosError(error, this.setResponsePreview, "Internal Server Error.")
            })
            .then(() => {
                this.setState({loading: false})
            })


    }

    changeHandler = (e) => {
        let name = e.target.id;
        let value = e.target.value;

        let isValid = false;

        if (name === "email") isValid = isEmail(value);
        else if (name === "password") isValid = validatePassword(value);

        this.setState((prevState) => {

            let updatedForm = {
                ...prevState.form,
                [name]: {
                    value: value,
                    isValid: isValid
                }
            }

            return {
                form: updatedForm
            }

        })

    }

    checkFormValidation = ()=>{
        return this.state.form.email.isValid && this.state.form.password.isValid;
    }

    setResponsePreview = (status, msg) => {
        this.setState({
            responseMsg: msg,
            responseStatus: status
        })
    }


    render() {


        if (this.state.redirect) return <Redirect to={this.state.redirect}/>



        let savingLoader = this.state.responseStatus !== "" ?
            <ShowResponse
                status={this.state.responseStatus}
                message={this.state.responseMsg}
                hideMe={() => this.setState({responseStatus:""})}
            /> : null;



        if (this.state.loading) {

            return (
                <div className="signupPage">
                    <Spinner/>
                </div>
            );

        } else {

            return (

                <div className="signupPage">
                    {savingLoader}
                    <h2>Logn In to access you Account</h2>
                    <form onSubmit={this.onsubmitHandler}>
                        <label htmlFor="email">Email</label>
                        <Input
                            type="text"
                            id="email"
                            value={this.state.form.email.value}
                            changeHandler={this.changeHandler}
                            class={
                                (this.state.form.email.value!=="" && !this.state.form.email.isValid) ? "inValid" : "valid"
                            }
                        />

                        <label htmlFor="password">Password</label>
                        <Input
                            type="password"
                            id="password"
                            value={this.state.form.password.value}
                            changeHandler={this.changeHandler}
                            class={
                                (this.state.form.password.value!=="" && !this.state.form.password.isValid) ? "inValid" : "valid"
                            }
                        />

                        <button type='submit' className="btn btn--secondary">Login</button>
                    </form>
                </div>
            );

        }

    }


}


export default Login;
