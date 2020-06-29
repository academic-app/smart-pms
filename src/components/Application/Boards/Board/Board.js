import React from "react";
import classes from "./board.module.css";
import {useDrop} from "react-dnd";
import {DragTypes} from "../../../../api/util/DragTypes";
import {moveCard} from "../../../../api/service/Cards";

function Board(props) {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: DragTypes.CARD,
        canDrop: (item) => {return props.bid !== null && props.bid !== item.boardId},
        drop: (item) => {moveCard(item.cid, item.card, item.boardId, props.bid, ()=>{console.log("done")})},
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        }),
    })
    return(
        <div ref={drop} className={"card "+ props.className} onClick={props.onClick}>
            { props.title && <p className={classes.Title}>{props.title}</p> }
            <div className={classes.DropSuggestion} style={{
                display: canDrop? "block" : "none",
                opacity: isOver? 0.7 : 0.3
            }}>
                Drop to move here
            </div>
            {props.children}
        </div>
    )
}

export default Board;