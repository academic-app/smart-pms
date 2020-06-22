import React, {Component} from 'react';
import './App.css';
import boards from './images/boards.svg';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert, Button} from 'react-bootstrap';
import LoginForm from "./components/UA/Login/LoginForm";
import ServiceBroadCaster from "./components/ServiceBroadCaster/ServiceBroadCaster";
import {loginWithEmailAndPassword, loginWithGoogle, register} from "./api/service/UAC";
import RegisterForm from "./components/UA/Register/RegisterForm";
import Dash from "./components/Dash/Dash";

class App extends Component{

    state = {
        loginEmail: null,
        showLoginForm: false,
        showRegistrationForm: false,
        message: null,
        messageVariant: "",
        currentUserId: null
    }

    handleLogin = (email) => {
        this.setState({
            ...this.state,
            loginEmail: typeof email === 'string' ? email : "" ,
            showLoginForm: !this.state.showLoginForm,
            showRegistrationForm: false
        });
    }

    onLoginCancelled = () => {
        this.setState({
            ...this.state,
            showLoginForm: false
        });
    }

    handleRegister = () => {
        this.setState({
            ...this.state,
            showLoginForm: false,
            showRegistrationForm: !this.state.showRegistrationForm
        });
    }

    onRegistrationCancelled = () => {
        this.setState({
            ...this.state,
            showRegistrationForm: false
        });
    }

    onRegistrationRejected = (message) => {
        this.setState({
            ...this.state,
            message: message,
            messageVariant: "danger"
        })
    }

    clearErrorMessage = () => {
        this.setState({
            ...this.state,
            message: null
        })
    }

    render = () => {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 id={"app-header"}>SMART TASK MANAGEMENT</h1>
                    {
                        this.state.currentUserId === null && (
                            <React.Fragment>
                                {/*for web browsers*/}
                                <span id={"l-logInBtn"} onClick={this.handleLogin}>login</span>
                                <span id={"l-registerBtn"} onClick={this.handleRegister}>register</span>
                                {/*for mobile devices*/}
                                <Button id={"logInBtn"} type={"button"} variant={"dark"} className={"mr-2 sm-2"} onClick={this.handleLogin}>Login <i className={"fa fa-sign-in"}/></Button>
                                <Button id={"registerBtn"} type={"button"} variant={"dark"} className={"mr-2 sm-2"} onClick={this.handleRegister}>Register <i className={"fa fa-id-card"}/></Button>
                            </React.Fragment>
                        )
                    }
                </header>
                <img src={boards} className={"App-logo"} alt="logo" />
                <div className={"App-Content"}>
                    {
                        this.state.message !== null && (
                            <Alert className={"Alert"} variant={this.state.messageVariant} onClose={this.clearErrorMessage} dismissible>
                                {this.state.message}
                            </Alert>
                        )
                    }
                </div>
                    {
                        this.state.showLoginForm && (
                            <LoginForm
                                loginEmail={this.state.loginEmail}
                                onLoginCancelled={this.onLoginCancelled}
                                onLogin={this.onLogin}
                                onLoginWithGoogle={this.onLoginWithGoogle} />
                        )
                    }
                    {
                        this.state.showRegistrationForm && (
                            <RegisterForm
                                onRegistrationCancelled={this.onRegistrationCancelled}
                                onRegistrationRejected={this.onRegistrationRejected}
                                onRegister={this.onRegister}
                                onRegisterWithGoogle={this.onLoginWithGoogle} />
                        )
                    }
                    {
                        this.state.currentUserId === null ? (
                            <ServiceBroadCaster services={[
                                "Smart Management of tasks you care.",
                                "Get your activities in track.",
                                "Automation on your ease.",
                                "Analytical Reports for better control."
                            ]}
                            handleLogin={this.handleLogin}
                            handleRegister={this.handleRegister} />
                        ):(
                            <Dash/>
                        )
                    }
            </div>
        );
    }

    onLogin = (loginInfo) => {
        loginWithEmailAndPassword(loginInfo, (user, userInfo) => {
            this.setState({
                ...this.state,
                currentUserId: user.uid,
                message: "Welcome, "+userInfo.name,
                messageVariant: "success"
            })
        }, failureMessage => {
            this.setState({
                ...this.state,
                message: failureMessage,
                messageVariant: "danger"
            })
        });
        this.onLoginCancelled();
    }

    onLoginWithGoogle = () => {
        loginWithGoogle((user) => {
            this.setState({
                ...this.state,
                currentUserId: user.uid,
                message: "Welcome, " + user.email,
                messageVariant: "success"
            })
        }, failureMessage => {
            this.setState({
                ...this.state,
                message: failureMessage,
                messageVariant: "danger"
            })
        });
        this.onLoginCancelled();
    }

    onRegister = (userInfo) => {
        register(userInfo, user => {
            this.setState({
                ...this.state,
                message: <React.Fragment>Account created successfully. <b style={{cursor:"pointer"}} onClick={()=>{
                    this.handleLogin(userInfo.email);
                }}>login now</b></React.Fragment>,
                messageVariant: "success"
            })
        }, failureMessage => {
            this.setState({
                ...this.state,
                message: failureMessage,
                messageVariant: "danger"
            })
        })
        this.onRegistrationCancelled();
    }
}

export default App;
