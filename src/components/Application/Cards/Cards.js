import React, {Component} from "react";
import {addNewCard, fetchCards, fetchOrderedCards} from "../../../api/service/Cards";
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
        fetchOrderedCards(this.props.bid, cids => {
            fetchCards(this.props.bid, cards => {
                this.setState({
                    cards:  (
                        <React.Fragment>
                            <Card
                                cid={null}
                                index={0}
                                bid={this.props.bid}
                                onClick={this.onCreateNewCard}
                            >
                                <i className={"fa fa-plus"}/>&nbsp;Add New Card
                            </Card>
                            {cids && cards && cids.map((cid, index) => cards[cid] && (
                                <Card
                                    key={cid}
                                    index={index+1}
                                    cid={cid}
                                    bid={this.props.bid}
                                    title={cards[cid].title}
                                    model={cards[cid]}
                                />
                            ))}
                        </React.Fragment>
                    )
                })
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