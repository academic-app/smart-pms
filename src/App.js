import React, {Component} from 'react';
import './App.css';
import boards from './images/boards.svg';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import LoginForm from "./components/Login/LoginForm";
import ServiceBroadCaster from "./components/ServiceBroadCaster/ServiceBroadCaster";

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
                            onLoginWithGoogle={this.onLoginWithGoogle}/>
                    )
                }
                <ServiceBroadCaster services={[
                    "Smart Management of tasks you care.",
                    "Get your activities in track.",
                    "Automation on your ease.",
                    "Analytical Reports for better control."
                ]} />
            </div>
        );
    }

    onLogin = (loginInfo) => {
        console.log(loginInfo);
    }

    onLoginWithGoogle = () => {

    }
}

export default App;
