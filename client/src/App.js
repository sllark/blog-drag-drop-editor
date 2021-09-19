import React from "react";
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";

import PrivateRoute from "./helper/PrivateRoute";

import Home from './containers/Home';
import Editor from './containers/Editor';
import SignUp from './containers/SignUp';
import Login from './containers/Login';
import Profile from "./containers/Profile";
import Post from "./containers/Post";

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

                    <PrivateRoute
                        path="/editor"
                        render={props =>
                            <Editor {...props}/>
                        }
                    />

                    <Route
                        path="/testEditor"
                        render={props =>
                            <Editor {...props}/>
                        }
                    />


                    <PrivateRoute
                        path="/profile/:id"
                        render={
                            props => (
                                <>
                                    <MainHeader {...props} updateState={this.updateState}/>
                                    <Profile {...props} key={props.match.params.id}/>
                                </>
                            )}
                    />

                    <PrivateRoute
                        path="/profile"
                        render={
                            props => (
                                <>
                                    <MainHeader {...props} updateState={this.updateState}/>
                                    <Profile {...props}/>
                                </>
                            )}
                    />


                    <Route
                        path="/post/:id"
                        render={
                            props => (
                                <>
                                    <MainHeader {...props} updateState={this.updateState}/>
                                    <Post {...props} />
                                </>
                            )}
                    />


                    <Route
                        path="/"
                        render={props => (
                            <>
                                <MainHeader {...props} updateState={this.updateState}/>
                                <Home />
                            </>
                        )}

                    />
                </Switch>
            </Router>
        )


    }


}

export default App;
