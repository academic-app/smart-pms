import React from "react";
import classes from "./board-container.module.css";
import {useDrop} from "react-dnd";
import {DragTypes} from "../../../../api/util/DragTypes";
import {moveBoard} from "../../../../api/service/Boards";

function BoardContainer(props){
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: DragTypes.BOARD,
        canDrop: (item) => {
            return props.index !== item.index && props.index !== item.index + 1
        },
        drop: (item) => { moveBoard(props.uid, props.wid, item.boardId, item.index, props.index, ()=>{}) },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        }),
    })
    const style1 = {
        width:"0px",
        marginRight:"20px",
        backgroundColor:"#ddd",
    }
    const style2 = {
        width:"0px",
        marginRight:"20px",
        backgroundColor:"black",
    }
    return (
        <React.Fragment>
            <td ref={drop} className={"board-container "+classes.Container} style={(canDrop && isOver) ? style2 : canDrop ? style1 : {
                width:"0px",
                display:"none"
            }}/>
            <td className={"board-container "+classes.Container} style={{width:props.width}}>
                {props.children}
            </td>
        </React.Fragment>
    )
}

export default BoardContainer;