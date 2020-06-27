import React, {Component} from "react";
import classes from "./walls.module.css"
import {addNewWall, fetchWalls} from "../../api/service/Walls";
import AppModal from "../AppModal/AppModal";
import CreateWallForm from "./Form/CreateWallForm";

class Walls extends Component {

    state = {
        totalWalls: 0,
        walls: null,
        showModal: false,
        modalTitle: null,
        modalBody: null
    }

    hideModal = () =>{
        this.setState({
            ... this.state,
            showModal: false
        })
    }

    componentDidMount() {
        fetchWalls(this.props.uid, walls => {
            this.setState({
                ...this.state,
                totalWalls: (walls||[]).length,
                walls: (walls||[]).map(wall=>(
                    <div key={wall.wid} className={"col-lg-3 col-md-4 col-sm-6 col-xs-10 row"}>
                        <span
                            className={"col-md-11 col-sm-11 col-xs-12 " + classes.WallCard}
                            onClick={()=>this.props.onExploreProjectWall(wall.wid)}>
                            { wall.name }
                        </span>
                    </div>
                ))
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
        addNewWall(this.props.uid, this.state.totalWalls, wall.name, wall.description, e=>{
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
                        <div className={"col-lg-3 col-md-4 col-sm-6 col-xs-10 row"}>
                            <span className={"col-md-11 col-sm-11 col-xs-12 " + classes.Card} onClick={this.onCreateNewWall}>
                                <i className={"fa fa-plus "+classes.AddIcon}/><br/>
                                Create New Project Wall
                            </span>
                        </div>
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