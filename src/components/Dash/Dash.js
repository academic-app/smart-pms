import React, {Component} from "react";
import Walls from "../Walls/Walls";
import Boards from "../Boards/Boards";
import {Pages} from "../Pages";

class Dash extends Component{

    state={
        component: <React.Fragment/>,
        page: Pages.WALL,
        wid: null
    }

    componentDidMount() {
        switch (this.state.page) {
            case Pages.WALL:
                this.onListWalls();
                break;
            case Pages.BOARD:
                this.onExploreProjectWall(this.state.wid)
                break;
        }
    }

    onListWalls = () => {
        this.setState({
            component: <Walls uid={this.props.uid} onExploreProjectWall={this.onExploreProjectWall}/>,
            page: Pages.WALL,
        })
    }

    onExploreProjectWall = wallId => {
        this.setState({
            component: <Boards uid={this.props.uid} wallId={wallId}/>,
            page: Pages.BOARD,
            wid: wallId
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.component}
            </React.Fragment>
        );
    }
}

export default Dash;