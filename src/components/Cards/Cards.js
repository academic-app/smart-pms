import React, {Component} from "react";
import classes from "./cards.module.css";
import {addNewCard, fetchCards} from "../../api/service/Cards";
import CreateForm from "./Form/CreateForm";
import AppModal from "../AppModal/AppModal";

class Cards extends Component{
    state={
        totalCards:0,
        cards: null,
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

    onCreateNewCard = () => {
        const newState = {
            ...this.state,
            showModal: true,
            modalTitle: "Create New Card",
            modalBody: <CreateForm
                onSubmit={this.createNewCard}
                onCancel={this.hideModal}/>
        }
        this.setState(newState);
    }

    createNewCard = card => {
        addNewCard(this.props.bid, this.state.totalCards, card.title, card.description, e=>{
            if(!e){
                this.hideModal();
            }
        })
    }

    componentDidMount() {
        fetchCards(this.props.bid, cards => {
            this.setState({
                totalCards: (cards || []).length,
                cards:  <React.Fragment>
                            {(cards || []).map(card => (
                                <div key={card.cid} className={"card " + classes.Card}>
                                    {card.title}
                                </div>
                            ))}
                            <div
                                className={"card "+classes.Card}
                                style={{
                                    fontSize:"9pt",
                                    textAlign:"center"
                                }} onClick={this.onCreateNewCard}>
                                <i className={"fa fa-plus"}/>&nbsp;Add New Card
                            </div>
                        </React.Fragment>
            })
        })
    }

    render() {
        return <React.Fragment>
                    {this.state.cards}
                    <AppModal
                        show={this.state.showModal}
                        onHide={this.hideModal}
                        title={this.state.modalTitle}>
                        {this.state.modalBody}
                    </AppModal>
                </React.Fragment>
    }
}

export default Cards;