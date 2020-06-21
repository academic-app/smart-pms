import React, {Component} from 'react';
import boards from './images/boards.svg';
import './App.css';
import $ from 'jquery';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';

class App extends Component{

    services =  "Will Be on your service soon." +
                "Smart Management of tasks you care." +
                "Get your activities in track." +
                "Automation on your ease." +
                "Analytical Reports for better control." ;
    componentDidMount() {
        this.displayServices();
    }

    displayServices = () => {
        const chars = this.services.split('');
        let i = 0;
        let string = "<i class=\"fa fa-hand-o-right\"/> ";
        this.displayString(string);
        const interval = setInterval(()=>{
            if(i < this.services.length) {
                string = string + chars[i];
                this.displayString(string);
                if(chars[i] === '.' && i < this.services.length-1){
                    string = string + "<br/><br/><i class=\"fa fa-hand-o-right\"/> ";
                    this.displayString(string);
                }
                i++;
            } else {
                string = string + "<br/><br/><i class=\"fa fa-hand-o-right\"/> <span class='btn btn-link'>Login</span> or <span class='btn btn-link'>Register</span> to begin.. ";
                this.displayString(string);
                clearInterval(interval);
            }
        },100);
    }

    displayString(string) {
        $('#serviceDisplay').html(string+"<b id='display-cursor'> _</b>");
    }

    render = () => {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 id={"app-header"}>SMART TASK MANAGEMENT</h1>
                    <img src={boards} className={"App-logo"} alt="logo" />
                    <Button id={"logInBtn"} type={"button"} variant={"dark"} className={"mr-2 sm-2"}>Login <i className={"fa fa-sign-in"}/></Button>
                    <Button id={"registerBtn"} type={"button"} variant={"dark"} className={"mr-2 sm-2"}>Register <i className={"fa fa-id-card"}/></Button>
                    <span id={"l-logInBtn"}>login</span>
                    <span id={"l-registerBtn"}>register</span>
                </header>
                <p id={"serviceDisplay"}/>
            </div>
        );
    }
}

export default App;
