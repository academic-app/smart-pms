import React, {Component} from "react";
import classes from "./boards.module.css"
import {fetchBoards} from "../../api/service/Boards";
import Cards from "../Cards/Cards";

class Boards extends Component {

    state = {
        boardHolderWidth: 0,
        boardContainerWidth: null,
        boardList:[],
        boards: null
    }

    /**
     * Calculate & Update state of new dimensions
     */
    getUpdatableState = () => {
        const windowWidth = window.innerWidth;
        let newState;
        if(windowWidth > 900) {
            newState = {
                ...this.state,
                ...this.getUpdatedWidth(windowWidth)
            }
        } else {
            if(windowWidth > 600) {
                newState = {
                    ...this.state,
                    ...this.getUpdatedWidth(windowWidth)
                };
            } else {
                newState = {
                    ...this.state,
                    ...this.getUpdatedWidth(windowWidth)
                }
            }
        }
        return {
            ...newState,
            boardList : [
                ...this.state.boardList
            ],
        };
    }

    getUpdatedWidth = (windowWidth) => {
        if(windowWidth > 900) {
            return {
                boardHolderWidth: (this.state.boardList.length+1) * 450,
                boardContainerWidth: null
            }
        } else {
            if(windowWidth > 600) {
                return {
                    boardHolderWidth: (this.state.boardList.length+1) * 350,
                    boardContainerWidth: null
                }
            } else {
                return {
                    boardHolderWidth: ((this.state.boardList.length + 1) * window.innerWidth) - 20,
                    boardContainerWidth: ((this.state.boardList.length + 1) * window.innerWidth) - 20
                }

            }
        }
    }

    /**
     * Add event listener
     */
    componentDidMount() {
        window.addEventListener("resize", () => this.setState(this.getUpdatableState()));
        fetchBoards(this.props.uid, this.props.wallId, boards => {
            this.setState({
                ...this.state,
                boardList: boards
            });
            const newState = {
                ...this.getUpdatableState(),
                boards: boards.map(board => (
                    <td key={board.bid} className={classes.BoardContainer} style={
                        this.state.boardContainerWidth !== null ? {
                            width: this.state.boardContainerWidth + "px"
                        }: {}}>
                        <div className={"card "+ classes.Board}>
                            <p className={classes.BoardTitle}>{board.title}</p>
                            <Cards bid={board.bid}/>
                        </div>
                    </td>
                ))
            }
            this.setState(newState);
        });
    }

    render() {
        return (
            <div className={classes.Wall}>
                <label><i className={"fa fa-th-large"}/>&nbsp;<b>Boards In This Wall:</b></label>
                <table style={{
                    overflowX:"hidden",
                    width: (this.state.boardHolderWidth)+"px"
                }}>
                    <tbody>
                    <tr>
                        {this.state.boards}
                        <td className={classes.BoardContainer}>
                            <div className={"card "+ classes.NewBoard}>
                                <span><i className={"fa fa-plus"}/>&nbsp;&nbsp;Add New Board</span>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Boards;