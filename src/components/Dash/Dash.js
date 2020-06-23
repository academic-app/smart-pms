import React, {Component} from "react";
import Walls from "../Walls/Walls";
import Boards from "../Boards/Boards";

class Dash extends Component{

    state={
        component: <React.Fragment/>
    }

    componentDidMount() {
        this.setState({
            component: <Walls uid={this.props.uid} onExploreProjectWall={this.onExploreProjectWall}/>
        })
    }

    onExploreProjectWall = wallId => {
        this.setState({
            component: <Boards uid={this.props.uid} wallId={wallId}/>
        })
    }

    render() {
        return this.state.component;
    }
}

export default Dash;