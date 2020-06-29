import React from "react";
import boards from "./boards.svg";
import {Alert} from "react-bootstrap";
import "./app-layout.css";

function AppLayout(props){
    return (
        <React.Fragment>
            <header id={"App-Header"} className={props.isUserLoggedIn && "logged-in"}>
                <h1 id={"App-Name"} className={props.isUserLoggedIn && "logged-in"}>{props.appName}</h1>
                {props.menus}
            </header>
            <img src={boards} id={"App-Logo"} alt="logo" />
            {props.alertMessage !== null && (
                <div>
                    <Alert className={"Alert"} variant={props.messageVariant} onClose={props.onClearMessage} dismissible>
                        {props.alertMessage}
                    </Alert>
                </div>
            )}
            <div id={"App-Content"} className={props.isUserLoggedIn && "logged-in"}>
                {props.children}
            </div>
        </React.Fragment>
    )
}

export default AppLayout;