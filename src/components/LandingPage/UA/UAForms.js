import React, {Component} from "react";
import LoginForm from "./Login/LoginForm";
import RegisterForm from "./Register/RegisterForm";
import CryptoJS from "crypto-js";
import {loginWithEmailAndPassword, loginWithGoogle, register} from "../../../api/service/UAC";

class UAForms extends Component{

    onLogin = (loginInfo) => {
        loginWithEmailAndPassword(loginInfo, this.onUserLoggedIn, this.props.onLoginFailed);
    }

    onLoginWithGoogle = () => {
        loginWithGoogle((user) => {
            this.onUserLoggedIn(user, null);
        }, this.props.onLoginFailed);
    }

    onUserLoggedIn = (user, userInfo) => {
        localStorage.setItem("c-us", CryptoJS.AES.encrypt(user.uid, "nnDZyHWCkWEf2teEisnwafQTz365HKs9TrGwwtXQgLPeV2fw"));
        this.props.onUserLoggedIn(user, userInfo);
    }

    onRegister = (userInfo) => {
        register(userInfo, this.props.onUserRegistered, this.props.onRegistrationFailed)
    }

    render() {
        return this.props.showLoginForm ? (
            <LoginForm
                loginEmail={this.props.loginEmail}
                onLoginCancelled={this.props.onLoginCancelled}
                onLogin={this.onLogin}
                onLoginWithGoogle={this.onLoginWithGoogle} />
        ) : this.props.showRegistrationForm && (
            <RegisterForm
                onRegistrationCancelled={this.props.onRegistrationCancelled}
                onRegistrationRejected={this.props.onRegistrationRejected}
                onRegister={this.onRegister}
                onRegisterWithGoogle={this.onLoginWithGoogle} />
        )
    }
}
export default UAForms;