import React from "react";
import classes from "../cards.module.css";
import {useDrag, useDrop} from "react-dnd";
import {DragTypes} from "../../../../api/util/DragTypes";
import {moveCardLocation} from "../../../../api/service/Cards";

function Card(props){
    const [{ isCardDragging }, drag] = useDrag({
        item: {
            cid: props.cid,
            index: props.index,
            type: DragTypes.CARD,
            boardId: props.bid,
            card: props.model
        },
        collect: (monitor) => ({
            isCardDragging: !!monitor.isDragging()
        })
    })

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: DragTypes.CARD,
        canDrop: (item) => {
            return (
                (item.boardId !== props.bid || props.index !== item.index) &&
                (item.boardId !== props.bid || props.index !== item.index - 1)
            )
        },
        drop: (item) => { moveCardLocation(item.boardId, props.bid, item.cid, item.card, item.index, props.index, ()=>{console.log("done")}) },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        }),
    })

    const style = {
        opacity: "0.7",
        backgroundColor: "#ddd",
        boxShadow: "none"
    }

    return (
        <React.Fragment>
            <div
                ref={props.cid && drag}
                className={"card " + classes.Card}
                style={isCardDragging? style : props.cid == null?{
                    fontSize:"9pt",
                    textAlign:"center"
                }:null}
                onClick={props.onClick}
            >
                {props.cid == null? props.children : props.title}
            </div>
            <div
                ref={drop}
                className={"card " + classes.Card}
                style={{
                    boxShadow: "none",
                    backgroundColor: isOver && canDrop? "black" : "transparent",
                    display: canDrop ? "block" : "none",
                    height:"10px"
                }}
            />
        </React.Fragment>
    )
}

export default Card;