import React, {Component} from "react";
import classes from "./walls.module.css"
import {addNewWall, fetchWalls} from "../../../api/service/Walls";
import AppModal from "../../../hoc/AppModal/AppModal";
import CreateWallForm from "./Form/CreateWallForm";
import {DotLoader} from "react-spinners";
import NewWall from "./NewWall/NewWall";

class Walls extends Component {

    state = {
        walls: null,
        showModal: false,
        modalTitle: null,
        modalBody: null
    }

    hideModal = () =>{
        this.setState({
            ...this.state,
            showModal: false
        })
    }

    componentDidMount() {
        fetchWalls(this.props.uid, walls => {
            this.setState({
                ...this.state,
                walls: walls? Object.keys(walls).map(wid=>(
                    <div key={wid} className={"col-lg-3 col-md-4 col-sm-6 col-xs-10 row"}>
                        <span
                            className={"col-md-11 col-sm-11 col-xs-12 " + classes.Card}
                            onClick={()=>this.props.onExploreProjectWall(wid)}>
                            { walls[wid].name }
                        </span>
                    </div>
                )):""
            });
        })
    }

    onCreateNewWall = () => {
        const newState = {
            ...this.state,
            showModal: true,
            modalTitle: "Create New Project Wall",
            modalBody: <CreateWallForm
                            onSubmit={this.createNewWall}
                            onCancel={this.hideModal}/>
        }
        this.setState(newState);
    }

    createNewWall = (wall) => {
        addNewWall(this.props.uid, wall.name, wall.description, e=>{
            if(!e){
                this.hideModal();
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                <label className={classes.Label}><i className={"fa fa-th-large"}/>&nbsp;<b>Your Project Walls:</b></label>
                <div className={"col-md-12 col-sm-12 container " + classes.Dash}>
                    <div className={"row"}>
                        {this.state.walls}
                        <DotLoader
                            css={`
                                margin:25px
                            `}
                            size={40}
                            color={"#aaa"}
                            loading={this.state.walls === null}
                        />
                        <NewWall onCreate={this.onCreateNewWall}/>
                    </div>
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

export default Walls;