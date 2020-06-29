import React from "react";
import classes from "../walls.module.css";

function NewWall(props){
    return (
        <div className={"col-lg-3 col-md-4 col-sm-6 col-xs-10 row"}>
            <span className={"col-md-11 col-sm-11 col-xs-12 " + classes.Card} onClick={props.onCreate}>
                <i className={"fa fa-plus "+classes.AddIcon}/><br/>
                Create New Project Wall
            </span>
        </div>
    );
}

export default NewWall;