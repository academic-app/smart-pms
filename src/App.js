import React, {Component} from 'react';
import boards from './images/boards.svg';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';

class App extends Component{

    services =  "Will Be on your service soon." +
                "Smart Management of tasks you care." +
                "Get your activities in track." +
                "Automation on your ease." +
                "Analytical Reports for better control." ;

    state = {
        services: null
    }

    componentDidMount() {
        this.displayServices();
    }

    displayServices = () => {
        const chars = this.services.split('');
        let i = 0;
        let string = <span><i className={"fa fa-hand-o-right"}/> </span>;
        this.updateServices(string);
        const interval = setInterval(()=>{
            if(i < this.services.length) {
                string = this.concatElement(string, chars[i]);
                this.updateServices(string);
                if(chars[i] === '.' && i < this.services.length-1){
                    string = this.concatElement(string, <br/>);
                    // string = this.concatElement(string, <br/>);
                    string = this.concatElement(string, <span><i className={"fa fa-hand-o-right"}/> </span>);
                    this.updateServices(string);
                }
                i++;
            } else {
                string = this.concatElement(string, <br/>);
                // string = this.concatElement(string, <br/>);
                string = this.concatElement(string, <span><i className={"fa fa-hand-o-right"}/> </span>);
                string = this.concatElement(string, <span><span className={'btn btn-link'} onClick={this.handleLogin}>Login</span> or <span className={'btn btn-link'} onClick={this.handleRegister}>Register</span> to begin..</span>);
                this.updateServices(string);
                clearInterval(interval);
            }
        },100);
    }

    concatElement = (el1, el2)=>{
        return <span>{el1}{el2}</span>
    }

    updateServices = (el) => {
        this.setState({
            services : <span>{el} <b id={'display-cursor'}> _</b></span>
        })
    }

    handleLogin = () => {
        alert("to login");
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
                <p id={"serviceDisplay"}>
                    {this.state.services}
                </p>
            </div>
        );
    }
}

export default App;
