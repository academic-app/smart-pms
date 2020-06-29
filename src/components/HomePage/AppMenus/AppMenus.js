import React from "react";
import "./app-menus.css";

function AppMenus(props) {
    const name = props.userInfo && (props.userInfo.name || props.userInfo.email).split(" ");
    const label = props.userInfo && (name[0].charAt(0) + name[1].charAt(0)).toUpperCase();
    return (
        <span className={"menus"}>
            {props.userInfo && (
                <React.Fragment>
                    <i className="fa fa-tachometer tachometer" aria-hidden="true"/>
                    <i className="fa fa-bell notification-bell" aria-hidden="true"/>
                </React.Fragment>
            )}
            <label className={"user-label"}>{label}</label>
        </span>
    )
}

export default AppMenus;