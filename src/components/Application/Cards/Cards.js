import React, {Component} from "react";
import classes from "./cards.module.css";
import {addNewCard, fetchCards} from "../../../api/service/Cards";
import CreateForm from "./Form/CreateForm";
import AppModal from "../../../hoc/AppModal/AppModal";
import {PropagateLoader} from "react-spinners";
import Card from "./Card/Card";

class Cards extends Component{
    state={
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
        addNewCard(this.props.bid, card.title, card.description, e=>{
            if(!e){
                this.hideModal();
            }
        })
    }

    componentDidMount() {
        fetchCards(this.props.bid, cards => {
            this.setState({
                cards:  <React.Fragment>
                            {cards && Object.keys(cards).map(cid => (
                                <Card
                                    key={cid}
                                    cid={cid}
                                    bid={this.props.bid}
                                    title={cards[cid].title}
                                    model={cards[cid]}
                                />
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
                    <PropagateLoader
                        css={`
                            margin-left:50%
                        `}
                        size={20}
                        color={"#aaa"}
                        loading={this.state.cards === null}
                    />
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