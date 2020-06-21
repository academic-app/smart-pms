import React, {Component} from "react";
import loginForm from "./login-form.svg";
import classes from "./LoginForm.module.css"

class LoginForm extends Component {

    state = {
        user: "",
        password: ""
    }

    loginInfoChanged = (event) => {
        const item = event.target.name;
        this.setState({
            ...this.state,
            [item]: event.target.value
        })
    }

    onLoginCancelled = () => {
        this.setState({
            ...this.state,
            user: "",
            password: ""
        });
        this.props.onLoginCancelled();
    }

    render() {
        return (
            <form className={classes.Form} onSubmit={(event) => {
                event.preventDefault();
                this.props.onLogin({user: this.state.user, password: this.state.password})
            }}>
                <img src={loginForm} className={classes.Layout}  alt={"login-form-layout"} />
                <input type={"text"} name={"user"} className={classes.user} placeholder={"Username or Email"} onChange={this.loginInfoChanged} value={this.state.user}/>
                <input type={"password"} name={"password"} className={classes.password} placeholder={"Password"} onChange={this.loginInfoChanged} value={this.state.password}/>
                <button type={"submit"} className={classes.login}>LOGIN</button>
                <button type={"button"} className={classes.sso} onClick={this.props.onLoginWithGoogle}><i style={{
                    "color":"#4285f4",
                    backgroundColor: "white",
                    padding: "5px",
                    borderRadius: "15px"
                }} className={"fa fa-google"}/>&nbsp;&nbsp;Login with Google</button>
                <span className={"btn btn-link "+classes.cancel} onClick={this.onLoginCancelled}>Cancel</span>
            </form>
        )
    }
}

export default LoginForm;