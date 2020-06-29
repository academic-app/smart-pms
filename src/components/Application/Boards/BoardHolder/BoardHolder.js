import React from "react";
import classes from "./board-holder.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function BoardHolder(props) {
    return(
        <DndProvider backend={HTML5Backend}>
            <table
                className={"board-holder "+classes.Table}
                style={{
                    width: props.width,
                    height: props.height
                }}
            >
                <tbody>
                <tr>
                    {props.children}
                </tr>
                </tbody>
            </table>
        </DndProvider>
    );
}

export default BoardHolder;