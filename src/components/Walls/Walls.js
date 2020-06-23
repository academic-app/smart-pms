import React, {Component} from "react";
import classes from "./walls.module.css"
import {fetchWalls} from "../../api/service/Walls";

class Walls extends Component {

    state = {
        walls: null
    }

    componentDidMount() {
        fetchWalls(this.props.uid, walls => {
            this.setState({
                ...this.state,
                walls: walls.map(wall=>(
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

    }

    render() {
        return (
            <div className={"col-md-12 col-sm-12 container " + classes.Dash}>
                <label><i className={"fa fa-th-large"}/>&nbsp;<b>Your Project Walls:</b></label>
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
        )
    }
}

export default Walls;