import React, {Component} from 'react';
import boards from './images/boards.svg';
import './App.css';
import $ from 'jquery';
import 'font-awesome/css/font-awesome.min.css';

class App extends Component{

    services =  "Smart Management of tasks you care." +
                "Get your activities in track." +
                "Automation on your ease." +
                "Analytical Reports for better control." +
                "Will Be on your service soon.";
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
                    <h1 style={{color:"#555", fontFamily:"Cantarell Thin", marginLeft:"50px"}}>SMART TASK MANAGEMENT</h1>
                    <img src={boards} className="App-logo" alt="logo" />
                    <p id={"serviceDisplay"}/>
                </header>
            </div>
        );
    }
}

export default App;
