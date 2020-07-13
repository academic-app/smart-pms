import React, {Component} from "react";
import classes from "./boards.module.css"
import boardClasses from "./Board/board.module.css"
import {addNewBoard, fetchBoards, fetchOrderedBoards} from "../../../api/service/Boards";
import Cards from "../Cards/Cards";
import AppModal from "../../../hoc/AppModal/AppModal";
import CreateForm from "./Form/CreateForm";
import BoardContainer from "./BoardContainer/BoardContainer";
import Board from "./Board/Board";
import BoardHolder from "./BoardHolder/BoardHolder";
import {PropagateLoader} from "react-spinners";

class Boards extends Component {

    state = {
        totalBoards: 0,
        boards: null,
        showModal: false,
        modalTitle: null,
        modalBody: null,
        holder: null,
    }

    hideModal = () =>{
        this.setState({
            ...this.state,
            showModal: false
        })
    }

    /**
     * Add event listener
     */
    componentDidMount() {
        fetchOrderedBoards(this.props.uid, this.props.wallId, bids => {
            let _boards = null;
            bids && fetchBoards(this.props.uid, this.props.wallId, boards=>{
                _boards = bids.map((bid, index) => {
                    const board = boards[bid];
                    return (
                        <BoardContainer
                            index={index}
                            key={bid}
                            uid={this.props.uid}
                            wid={this.props.wallId}
                            total={bids.length}
                            width={this.calculateContainerWidth(bids.length)}
                        >
                            <Board
                                index={index}
                                bid={bid}
                                className={boardClasses.Board}
                                title={board.title}
                            >
                                <Cards bid={bid}/>
                            </Board>
                        </BoardContainer>
                    )
                })
                this.updateHolder((bids||[]).length, _boards);
            });
            this.updateHolder((bids||[]).length, _boards);
        });
        window.addEventListener("resize", () =>{
            let items = document.getElementsByClassName("board-container");
            for(let i=0; i<items.length; i++){
                items[i].style.width = this.calculateContainerWidth(this.state.totalBoards);
            }
            document.getElementsByClassName("board-holder")[0].style.width =
                this.calculateHolderWidth(this.state.totalBoards);
            document.getElementsByClassName("board-holder")[0].style.height = (window.innerHeight - 100) + "px";
        });
    }

    updateHolder(total, boards){
        this.setState({
            totalBoards: total,
            holder: (
                <BoardHolder
                    total={total}
                    width={this.calculateHolderWidth(total)}
                    height={(window.innerHeight - 100)+"px"}
                >
                    {boards}
                    <BoardContainer index={total} uid={this.props.uid} wid={this.props.wallId} total={total} width={this.calculateContainerWidth(total)}>
                        <Board bid={null} className={boardClasses.NewBoard} onClick={this.onAddNewBoard}>
                            <span><i className={"fa fa-plus"}/>&nbsp;&nbsp;Add New Board</span>
                        </Board>
                    </BoardContainer>
                </BoardHolder>
            )
        })
    }

    calculateContainerWidth(totalBoards){
        const windowWidth = window.innerWidth;
        let width = (windowWidth <= 600)? ((totalBoards + 1) * windowWidth) - 30 : null;
        return  width? width+"px": null;
    }

    calculateHolderWidth(totalBoards){
        const windowWidth = window.innerWidth;
        let width = null;
        if(windowWidth > 1000) {
            width = (totalBoards+1) * 450;
        } else {
            if(windowWidth > 600) {
                width = (totalBoards+1) * 350;
            } else {
                width = ((totalBoards+1) * windowWidth) - 20;
            }
        }
        return  width? width+"px": null;
    }

    onAddNewBoard = () => {
        const newState = {
            ...this.state,
            showModal: true,
            modalTitle: "Add New Board",
            modalBody: <CreateForm
                onSubmit={this.createNewBoard}
                onCancel={this.hideModal}/>
        }
        this.setState(newState);
    }

    createNewBoard = board => {
        addNewBoard(this.props.uid, this.props.wallId, board.title, board.description, e=>{
            if(!e){
                this.hideModal();
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                <label className={classes.Label}><i className={"fa fa-th-large"}/>&nbsp;<b>Boards In This Wall:</b></label>
                <div className={classes.Collection} style={{
                    minHeight: (window.innerHeight - 50)+"px"
                }}>
                    {this.state.holder}
                    <PropagateLoader
                        css={`
                            margin-left:50%
                        `}
                        size={20}
                        color={"#aaa"}
                        loading={this.state.holder === null}
                    />
                </div>
                <AppModal
                    show={this.state.showModal}
                    onHide={this.hideModal}
                    title={this.state.modalTitle}>
                    {this.state.modalBody}
                </AppModal>
            </React.Fragment>
        )
    }

}

export default Boards;