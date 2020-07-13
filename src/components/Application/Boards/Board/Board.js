import React from "react";
import classes from "./board.module.css";
import {useDrag} from "react-dnd";
import {DragTypes} from "../../../../api/util/DragTypes";

function Board(props) {
    const [{}, drag] = useDrag({
        item: {
            index: props.index,
            type: DragTypes.BOARD,
            boardId: props.bid,
        }
    })
    return(
        <div ref={props.index !== undefined? drag : null} className={"card "+ props.className} onClick={props.onClick}>
            {
                props.bid && (
                    <React.Fragment>
                        <i className={"fa fa-pencil "+classes.Edit} aria-hidden="true"/>
                        <i className={"fa fa-times-circle "+classes.Delete} aria-hidden="true"/>
                    </React.Fragment>
                )
            }
            { props.title && <p className={classes.Title}>{props.title}</p> }
            {props.children}
        </div>
    )
}

export default Board;