import React from "react";
import {Redirect} from 'react-router-dom'

import axios from "../helper/axios";

import Input from '../components/form/Input'
import Spinner from '../components/UI/Spinner'
import ShowResponse from "../components/UI/ShowResponse";

import {validatePassword} from '../helper/validation';
import handleAxiosError from '../helper/handleAxiosError';
import isEmail from "validator/lib/isEmail";

import configs from "../assets/config/configs";

class SignUp extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            form: {
                email: {
                    value: "",
                    isValid: false
                },
                password: {
                    value: "",
                    isValid: false
                },
                firstName: {
                    value: "",
                    isValid: false
                },
                lastName: {
                    value: "",
                    isValid: false
                }
            },
            loading: false,
            responseStatus: "",
            responseMsg: "",
            redirect:null

        }

        this.statusTimeout = null;

    }



    onsubmitHandler = (e) => {
        e.preventDefault();

        let isFormValid = this.checkFormValidation();
        if (!isFormValid) {

            this.setState({
                responseStatus: "failed",
                responseMsg: "Please fill the form correctly."
            });
            return;
        }

        this.setState({loading: true});

        let form= this.state.form;

        axios({
            method: 'post',
            url: configs.api_url + "/signup",
            headers: {
                "content-type": "application/json"
            },
            data: {
                firstName: form.firstName.value,
                lastName: form.lastName.value,
                email: form.email.value,
                password: form.password.value,
            }
        })
            .then(result => {
                this.setResponsePreview("success","Account created Successfully.")
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
        else isValid = value.length >= 2;

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

    checkFormValidation = () => {

        return this.state.form.email.isValid && this.state.form.password.isValid && this.state.form.firstName.isValid && this.state.form.lastName.isValid;

    }

    setResponsePreview = (status, msg) => {
        this.setState({
            responseMsg: msg,
            responseStatus: status
        })
    }

    render() {


        if (this.state.redirect){

            return <Redirect to={this.state.redirect}/>
        }


        let savingLoader = this.state.responseStatus !== "" ?
                <ShowResponse
                    status={this.state.responseStatus}
                    message={this.state.responseMsg}
                    hideMe={() => this.setState({responseStatus:""})}
                /> : null;


        if (this.state.loading)
            return (
                <div className="signupPage">
                    <Spinner/>
                </div>
            )
        else
            return (
                <div className="signupPage">
                    {savingLoader}
                    <h2>Create account to join the community.</h2>
                    <form onSubmit={this.onsubmitHandler}>
                        <label htmlFor="firstName">First Name</label>
                        <Input
                            type="text"
                            id="firstName"
                            placeholder="John"
                            value={this.state.form.firstName.value}
                            changeHandler={this.changeHandler}
                            class={
                                (this.state.form.firstName.value !== "" && !this.state.form.firstName.isValid) ? "inValid" : "valid"
                            }
                        />
                        <label htmlFor="lastName">Last Name</label>
                        <Input
                            type="text"
                            id="lastName"
                            placeholder="Doe"
                            value={this.state.form.lastName.value}
                            changeHandler={this.changeHandler}
                            class={
                                (this.state.form.lastName.value !== "" && !this.state.form.lastName.isValid) ? "inValid" : "valid"
                            }
                        />
                        <label htmlFor="email">Email</label>
                        <Input
                            type="text"
                            id="email"
                            placeholder="john.doe@example.com"
                            value={this.state.form.email.value}
                            changeHandler={this.changeHandler}
                            class={
                                (this.state.form.email.value !== "" && !this.state.form.email.isValid) ? "inValid" : "valid"
                            }
                        />

                        <label htmlFor="password">Password</label>
                        <Input
                            type="password"
                            id="password"
                            value={this.state.form.password.value}
                            changeHandler={this.changeHandler}
                            class={
                                (this.state.form.password.value !== "" && !this.state.form.password.isValid) ? "inValid" : "valid"
                            }
                        />

                        <button type='submit' className="btn btn--secondary">Sign Up</button>
                    </form>

                </div>
            );


    }


}


export default SignUp;
