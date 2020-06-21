import React, {Component} from "react";
import arrayShuffle from "../arrayShuffle/arrayShuffle";
import classes from "./ServiceBroadCaster.module.css";

class ServiceBroadCaster extends Component {

    state = {
        servicesToDisplay: null
    }

    componentDidMount() {
        this.displayServices();
    }

    displayServices = () => {
        const chars = arrayShuffle(this.props.services).join('').split('');
        let i = 0;
        let string = <React.Fragment><i className={"fa fa-hand-o-right"}/> </React.Fragment>;
        this.updateServices(string);
        const interval = setInterval(()=>{
            if(i < chars.length) {
                string = this.concatElement(string, chars[i]);
                this.updateServices(string);
                if(chars[i] === '.' && i < chars.length-1){
                    string = this.concatElement(string, <br/>);
                    string = this.concatElement(string, <React.Fragment><i className={"fa fa-hand-o-right"}/> </React.Fragment>);
                    this.updateServices(string);
                }
                i++;
            } else {
                string = this.concatElement(string, <br/>);
                string = this.concatElement(string, <React.Fragment><i className={"fa fa-hand-o-right"}/> </React.Fragment>);
                string = this.concatElement(string, <React.Fragment><span className={'btn btn-link'} onClick={this.handleLogin}>Login</span> or <span className={'btn btn-link'} onClick={this.handleRegister}>Register</span> to begin..</React.Fragment>);
                this.updateServices(string);
                clearInterval(interval);
            }
        },100);
    }

    concatElement = (el1, el2)=>{
        return <React.Fragment>{el1}{el2}</React.Fragment>
    }

    updateServices = (el) => {
        this.setState({
            servicesToDisplay : <React.Fragment>{el} <b id={'display-cursor'}> _</b></React.Fragment>
        })
    }

    render = () => {
        return (
            <p className={classes.serviceBroadcastArea}>
                {this.state.servicesToDisplay}
            </p>
        );
    }
}

export default ServiceBroadCaster;