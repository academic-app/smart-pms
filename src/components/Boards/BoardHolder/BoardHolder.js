import React from "react";
import classes from "./board-holder.module.css";

function BoardHolder(props) {
    return(
        <table className={"board-holder "+classes.Table} style={{width:props.width}}>
            <tbody>
                <tr>
                    {props.children}
                </tr>
            </tbody>
        </table>
    );
}

export default BoardHolder;