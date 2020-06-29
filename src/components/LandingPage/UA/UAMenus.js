import React from "react";
import {Button} from "react-bootstrap";
import "./ua-menus.css";

function UAMenus(props) {
    return (
        <React.Fragment>
            {/*for web browsers*/}
            <span id={"l-logInBtn"} onClick={props.onLoginAction}>login</span>
            <span id={"l-registerBtn"} onClick={props.onRegistrationAction}>register</span>
            {/*for mobile devices*/}
            <Button id={"logInBtn"} type={"button"} variant={"dark"} className={"mr-2 sm-2"} onClick={props.onLoginAction}>Login <i className={"fa fa-sign-in"}/></Button>
            <Button id={"registerBtn"} type={"button"} variant={"dark"} className={"mr-2 sm-2"} onClick={props.onRegistrationAction}>Register <i className={"fa fa-id-card"}/></Button>
        </React.Fragment>
    )
}

export default UAMenus;