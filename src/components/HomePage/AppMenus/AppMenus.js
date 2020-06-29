import React from "react";
import "./app-menus.css";
import {BounceLoader} from "react-spinners";
import {Dropdown} from "react-bootstrap";
import {Label} from "@blueprintjs/core";

function AppMenus(props) {
    const name = props.userInfo && (props.userInfo.name || props.userInfo.email).split(" ");
    const label = props.userInfo && (name[0].charAt(0) + (name[1]?name[1].charAt(0):"")).toUpperCase();
    return (
        <span className={"menus"}>
            {props.userInfo && (
                <React.Fragment>
                    <i className="fa fa-tachometer tachometer" aria-hidden="true"/>
                    <i className="fa fa-bell notification-bell" aria-hidden="true"/>
                </React.Fragment>
            )}
            <Dropdown className={"label-dropdown"}>
              <Dropdown.Toggle variant="default" id="dropdown-basic" style={{
                  backgroundColor:"transparent",
                  boxShadow:"none"
              }}>
                <Label className={"user-label"}>
                    {label}
                    <BounceLoader
                        size={28}
                        color={"#eee"}
                        loading={label === null}
                    />
                </Label>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={props.onUserLogOut}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
        </span>
    )
}

export default AppMenus;