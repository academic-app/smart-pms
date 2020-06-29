import React, {Component} from "react";
import arrayShuffle from "../../../api/util/arrayShuffle/arrayShuffle";
import classes from "./service-display.module.css";

class ServiceDisplay extends Component {

    state = {
        servicesToDisplay: null
    }

    componentDidMount() {
        this.displayServices();
    }

    displayServices = () => {
        const arr = this.props.children.map(i => i.props.children);
        const chars = arrayShuffle(arr).join('').split('');
        let i = 0;
        let string = <React.Fragment><i className={"fa fa-hand-o-right"}/> </React.Fragment>;
        this.updateServices(string);
        const interval = setInterval(()=>{
            if(i < chars.length) {
                string = this.concatElement(string, chars[i]);
                this.updateServices(string);
                if(chars[i] === '.' && i < chars.length-1){
                    string = this.concatElement(string, <React.Fragment><br/><i className={"fa fa-hand-o-right"}/> </React.Fragment>);
                    this.updateServices(string);
                }
                i++;
            } else {
                string = this.concatElement(string,
                    <React.Fragment>
                        <br/>
                        <i className={"fa fa-hand-o-right"}/>
                        <span className={'btn btn-link'} onClick={this.props.onLoginAction}>Login</span>
                        or
                        <span className={'btn btn-link'} onClick={this.props.onRegistrationAction}>Register</span>
                        to begin..
                    </React.Fragment>
                );
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
            servicesToDisplay : <React.Fragment>{el} <b className={classes.displayCursor}> _</b></React.Fragment>
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

export default ServiceDisplay;