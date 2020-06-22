import React, {Component} from 'react';
import './App.css';
import boards from './images/boards.svg';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import LoginForm from "./components/Login/LoginForm";
import ServiceBroadCaster from "./components/ServiceBroadCaster/ServiceBroadCaster";
import {app, base, googleAuthProvider} from "./base";

class App extends Component{

    state = {
        showLoginForm: false
    }

    handleLogin = () => {
        this.setState({
            ...this.state,
            showLoginForm: !this.state.showLoginForm
        });
    }

    cancelLogin = () => {
        this.setState({
            ...this.state,
            showLoginForm: false
        });
    }

    handleRegister = () => {
        alert("to register");
    }

    render = () => {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 id={"app-header"}>SMART TASK MANAGEMENT</h1>
                    <img src={boards} className={"App-logo"} alt="logo" />
                    {/*for web browsers*/}
                    <span id={"l-logInBtn"} onClick={this.handleLogin}>login</span>
                    <span id={"l-registerBtn"} onClick={this.handleRegister}>register</span>
                    {/*for mobile devices*/}
                    <Button id={"logInBtn"} type={"button"} variant={"dark"} className={"mr-2 sm-2"} onClick={this.handleLogin}>Login <i className={"fa fa-sign-in"}/></Button>
                    <Button id={"registerBtn"} type={"button"} variant={"dark"} className={"mr-2 sm-2"} onClick={this.handleRegister}>Register <i className={"fa fa-id-card"}/></Button>
                </header>
                {
                    this.state.showLoginForm && (
                        <LoginForm
                            onLoginCancelled={this.cancelLogin}
                            onLogin={this.onLogin}
                            onLoginWithGoogle={this.onLoginWithGoogle} />
                    )
                }
                <ServiceBroadCaster services={[
                                        "Smart Management of tasks you care.",
                                        "Get your activities in track.",
                                        "Automation on your ease.",
                                        "Analytical Reports for better control."
                                    ]}
                                    handleLogin={this.handleLogin}
                                    handleRegister={this.handleRegister} />
            </div>
        );
    }

    onLogin = (loginInfo) => {
        app.auth().fetchSignInMethodsForEmail(loginInfo.user).then((providers) => {
            if(providers.length === 0){
                // return app.auth().createUserWithEmailAndPassword(loginInfo.user, this.state.password);
                return false;
            }else if(providers.indexOf("password") === -1){
                return null;
                // used other sign in method
            }else{
                return app.auth().signInWithEmailAndPassword(loginInfo.user, loginInfo.password);
            }
        }).then(response=>{
            if(response === null){
                alert("user other method for login");
            }else if (response === false){
                alert("username or password not valid");
            }else if ('user' in response){
                alert("You are now logged In");
                console.log(response);
                // this.setState({
                //     ...this.state,
                //     authenticated: true
                // })
            }
        }).catch(error=>console.log(error));
    }

    onLoginWithGoogle = () => {

    }
}

export default App;
