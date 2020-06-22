import React, {Component} from "react";
import formLayout from "./form-layout.svg";
import classes from "./login-form.module.css"

class LoginForm extends Component {

    state = {
        user: this.props.loginEmail,
        password: ""
    }

    loginInfoChanged = (event) => {
        const item = event.target.name;
        this.setState({
            ...this.state,
            [item]: event.target.value
        })
    }

    clearForm = ()=>{
        this.setState({
            user: "",
            password: ""
        });
    }

    onLoginCancelled = () => {
        this.clearForm();
        this.props.onLoginCancelled();
    }

    render() {
        return (
            <form className={classes.Form} onSubmit={(event) => {
                event.preventDefault();
                this.props.onLogin({user: this.state.user, password: this.state.password});
                this.clearForm();
            }}>
                <img src={formLayout} className={classes.Layout}  alt={"login-form-layout"} />
                <input type={"email"} name={"user"} className={classes.user} placeholder={"Email"} onChange={this.loginInfoChanged} value={this.state.user}/><br/>
                <input type={"password"} name={"password"} className={classes.password} placeholder={"Password"} onChange={this.loginInfoChanged} value={this.state.password}/><br/>
                <button type={"submit"} className={classes.login}>LOGIN</button><br/>
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