import React, {Component} from "react";
import classes from "./cards.module.css";
import {fetchCards} from "../../api/service/Cards";

class Cards extends Component{
    state={
        cards: null
    }
    componentDidMount() {
        fetchCards(this.props.bid, cards => {
            this.setState({
                cards: cards.map(card=>(
                            <div key={card.id} className={"card "+classes.Card}>
                                {card.title}
                            </div>
                        ))
            })
        })
    }

    render() {
        return this.state.cards;
    }
}

export default Cards;