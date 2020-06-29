import React, {Component} from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ServiceDisplay from "./components/LandingPage/ServiceDisplay/ServiceDisplay";
import {fetchUserInfo} from "./api/service/UAC";
import Dash from "./components/HomePage/Dash/Dash";
import CryptoJS from "crypto-js";
import AppLayout from "./hoc/AppLayout/AppLayout";
import AppMenus from "./components/HomePage/AppMenus/AppMenus";
import UAMenus from "./components/LandingPage/UA/UAMenus";
import UAForms from "./components/LandingPage/UA/UAForms";

class App extends Component{

    state = {
        loginEmail: null,
        showLoginForm: false,
        showRegistrationForm: false,
        alertMessage: null,
        messageVariant: "",
        // TODO
        currentUserId:
            // "dummy",
            (localStorage.getItem("c-us")||null) !== null ?
            CryptoJS.AES.decrypt(localStorage.getItem("c-us"), "nnDZyHWCkWEf2teEisnwafQTz365HKs9TrGwwtXQgLPeV2fw")
                .toString(CryptoJS.enc.Utf8):null,
        currentUser:
            null
            // { name: "John Doe" }
    }

    componentDidMount() {
        if(this.state.currentUser === null && this.state.currentUserId !== null){
            fetchUserInfo(this.state.currentUserId, userInfo => {
                this.setState({
                    ...this.state,
                    currentUser: userInfo
                });
            })
        }
    }

    onLoginAction = (email) => {
        this.setState({
            ...this.state,
            loginEmail: typeof email === 'string' ? email : "" ,
            showLoginForm: !this.state.showLoginForm,
            showRegistrationForm: false
        });
    }

    onRegistrationAction = () => {
        this.setState({
            ...this.state,
            showLoginForm: false,
            showRegistrationForm: !this.state.showRegistrationForm
        });
    }

    onUserLoggedIn = (user, userInfo) => {
        this.setState({
            ...this.state,
            currentUserId: user.uid,
            currentUser: userInfo || user,
            message: "Welcome, "+(userInfo? userInfo.name : user.email),
            messageVariant: "success"
        })
    }

    onUserRegistered = (user) => {
        this.displayMessage((
            <React.Fragment>Account created successfully.
                <b
                    style={{cursor:"pointer"}}
                    onClick={()=>{this.handleLogin(user.email);}}
                >
                    login now
                </b>
            </React.Fragment>
        ), "success");
    }

    hideLoginForm = () => {
        this.setState({
            ...this.state,
            showLoginForm: false
        });
    }

    hideRegistrationForm = () => {
        this.setState({
            ...this.state,
            showRegistrationForm: false
        });
    }

    displayMessage = (message, variant) => {
        this.setState({
            ...this.state,
            message: message,
            messageVariant: variant
        })
    }

    clearMessage = () => {
        this.setState({
            ...this.state,
            alertMessage: null
        })
    }

    getMenus = () => {
        return this.state.currentUserId ? (
            <AppMenus userInfo={this.state.currentUser}/>
        ):(
            <UAMenus
                onLoginAction={this.onLoginAction}
                onRegistrationAction={this.onRegistrationAction}
            />
        );
    }

    getContent = () => {
        return this.state.currentUserId?(
            <Dash uid={this.state.currentUserId}/>
        ):(
            <ServiceDisplay
                onLoginAction={this.onLoginAction}
                onRegistrationAction={this.onRegistrationAction}
            >
                <p>Smart Management of tasks you care.</p>
                <p>Get your activities in track.</p>
                <p>Automation on your ease.</p>
                <p>Analytical Reports for better control.</p>
            </ServiceDisplay>
        );
    }

    getUAForms = () => {
        return this.state.currentUserId === null && (
            <UAForms
                showLoginForm={this.state.showLoginForm}
                showRegistrationForm={this.state.showRegistrationForm}
                onUserLoggedIn={this.onUserLoggedIn}
                onUserRegistered={this.onUserRegistered}
                onLoginCancelled={this.hideLoginForm}
                onRegistrationCancelled={this.hideRegistrationForm}
                onLoginFailed={failureMessage => this.displayMessage(failureMessage, "danger")}
                onRegistrationFailed={failureMessage => this.displayMessage(failureMessage, "danger")}
                onRegistrationRejected={detail => this.displayMessage(detail, "danger")}
            />
        )
    }

    render = () => {
        return (
            <div className={"App"}>
                <AppLayout
                    appName={"SMART TASK MANAGEMENT"}
                    isUserLoggedIn={this.state.currentUserId}
                    menus={this.getMenus()}
                    alertMessage={this.state.alertMessage}
                    messageVariant={this.state.messageVariant}
                    onClearMessage={this.clearMessage}
                >
                    {this.getContent()}
                    {this.getUAForms()}
                </AppLayout>
            </div>
        );
    }
}

export default App;
