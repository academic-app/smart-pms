import React from "react";
import classes from "./board.module.css";

function Board(props) {
    return(
        <div className={"card "+ props.className} onClick={props.onClick}>
            { props.title && <p className={classes.Title}>{props.title}</p> }
            {props.children}
        </div>
    )
}

export default Board;