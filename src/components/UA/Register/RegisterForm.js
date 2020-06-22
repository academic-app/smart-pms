import React, {Component} from "react";
import formLayout from "./form-layout.svg";
import classes from "./register-form.module.css"

class RegisterForm extends Component {

    state = {
        name: "",
        username: "",
        email: "",
        password: "",
        confirm: ""
    }

    userInfoChanged = (event) => {
        const item = event.target.name;
        this.setState({
            ...this.state,
            [item]: event.target.value
        })
    }

    clearForm = ()=>{
        this.setState({
            name: "",
            username: "",
            email: "",
            password: "",
            confirm: ""
        });
    }

    onRegistrationCancelled = () => {
        this.clearForm();
        this.props.onRegistrationCancelled();
    }

    render() {
        return (
            <form className={classes.Form} onSubmit={(event) => {
                event.preventDefault();
                if(this.state.password === this.state.confirm) {
                    this.props.onRegister({
                        name: this.state.name.trim(),
                        username: this.state.username.trim(),
                        email: this.state.email,
                        password: this.state.password
                    });
                    this.clearForm();
                }else{
                    this.props.onRegistrationRejected("Failed to confirm password");
                }
            }}>
                <img src={formLayout} className={classes.Layout}  alt={"registration-form-layout"} />
                <input type={"text"} name={"name"} className={classes.name} placeholder={"Full Name"} onChange={this.userInfoChanged} value={this.state.name} pattern={"^ *[a-zA-Z]+ +([a-zA-Z]+ +|)[a-zA-Z]+ *$"}/><br/>
                <input type={"text"} name={"username"} className={classes.username} placeholder={"Username"} onChange={this.userInfoChanged} value={this.state.username} pattern={"^ *[a-zA-Z0-9]{4,} *$"}/><br/>
                <input type={"email"} name={"email"} className={classes.email} placeholder={"Email"} onChange={this.userInfoChanged} value={this.state.email}/><br/>
                <input type={"password"} name={"password"} className={classes.password} placeholder={"Password"} onChange={this.userInfoChanged} value={this.state.password} pattern={"^ *[a-zA-Z0-9 ]{6,} *$"}/><br/>
                <input type={"password"} name={"confirm"} className={classes.confirm} placeholder={"Confirm"} onChange={this.userInfoChanged} value={this.state.confirm}/><br/>
                <button type={"submit"} className={classes.register}>REGISTER</button><br/>
                <button type={"button"} className={classes.sso} onClick={this.props.onRegisterWithGoogle}><i style={{
                    "color":"#4285f4",
                    backgroundColor: "white",
                    padding: "5px",
                    borderRadius: "15px"
                }} className={"fa fa-google"}/>&nbsp;&nbsp;Login with Google</button>
                <span className={"btn btn-link "+classes.cancel} onClick={this.onRegistrationCancelled}>Cancel</span>
            </form>
        )
    }
}

export default RegisterForm;