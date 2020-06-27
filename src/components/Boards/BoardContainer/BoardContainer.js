import React from "react";
import classes from "./board-container.module.css";

function BoardContainer(props){
    return (
        <td className={"board-container "+classes.Container} style={{width:props.width}}>
            {props.children}
        </td>
    )
}

export default BoardContainer;