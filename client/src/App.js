import React from "react";
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";

import Home from './containers/home/Home';
import Editor from './containers/Editor/Editor';
import SignUp from './containers/auth/SignUp';
import Login from './containers/auth/Login';
import Profile from "./containers/User/Profile";
import Post from "./containers/post/Post";

import './assets/scss/main.scss';
import MainHeader from "./components/header/MainHeader";


/*

- Protected Routes

 */


class App extends React.Component {

    state = {
        token: null,
        userID: null,
        isAuth: false
    }

    componentDidMount() {


        if (localStorage.getItem('token')) {
            this.setState({
                token: localStorage.getItem('token'),
                userID: localStorage.getItem('userID'),
                isAuth: true
            })
        }


    }


    updateState = (stateToUpdate) => {

        if (stateToUpdate.token) {
            console.log(stateToUpdate)
            localStorage.setItem('token', stateToUpdate.token);
            localStorage.setItem('userID', stateToUpdate.userID);
        }

        this.setState((prevState) => {
            return {
                ...prevState,
                ...stateToUpdate
            }
        })

    }


    render() {

        return (
            <Router>
                <Switch>

                    <Route
                        path="/signup"
                        render={props => (
                            <>
                                <MainHeader {...props} updateState={this.updateState}/>
                                <SignUp
                                    updateState={this.updateState}
                                    state={this.state}
                                    {...props}
                                />
                            </>
                        )}
                    />

                    <Route
                        path="/login"
                        render={props => (
                            <>
                                <MainHeader {...props} updateState={this.updateState}/>
                                <Login
                                    updateState={this.updateState}
                                    state={this.state}
                                    {...props}
                                />
                            </>
                        )}
                    />

                    <Route
                        path="/editor"
                        render={props =>
                            <Editor
                                {...props}
                                userID={this.state.userID}
                                token={this.state.token}/>
                        }
                    />


                    <Route
                        path="/about"
                        render={
                            props => (
                                <>
                                    <MainHeader {...props} updateState={this.updateState}/>
                                    <Profile token={this.state.token}/>
                                </>
                            )}
                    />


                    <Route
                        path="/post/:id"
                        render={
                            props => (
                                <>
                                    <MainHeader {...props} updateState={this.updateState}/>
                                    <Post {...props} token={this.state.token}/>
                                </>
                            )}
                    />


                    <Route
                        path="/"
                        render={props => (
                            <>
                                <MainHeader {...props} updateState={this.updateState}/>
                                <Home isAuth={this.state.isAuth} token={this.state.token}/>
                            </>
                        )}

                    />
                </Switch>
            </Router>
        )


    }


}

export default App;
