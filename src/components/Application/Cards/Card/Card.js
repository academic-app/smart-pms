import React from "react";
import classes from "../cards.module.css";
import {useDrag} from "react-dnd";
import {DragTypes} from "../../../../api/util/DragTypes";

function Card(props){
    const [{ isDragging }, drag] = useDrag({
        item: {
            cid: props.cid,
            type: DragTypes.CARD,
            boardId: props.bid,
            card: props.model
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    })

    const style = {
        opacity: "0.7",
        backgroundColor: "#ddd",
        boxShadow: "none"
    }

    return (
        <div
            ref={drag}
            className={"card " + classes.Card}
            style={isDragging? style : null}

            onClick={}
        >
            {props.title}
        </div>
    )
}

export default Card;