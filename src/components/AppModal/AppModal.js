import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal} from 'react-bootstrap';

const AppModal = props => {
    return (
        <Modal
            show={props.show||false}
            onHide={props.onHide}
            backdrop={props.backdrop || "static"}
            keyboard={false}
        >
            {
                (props.onHide || props.title) && (
                    <Modal.Header closeButton={props.onHide || false}>
                        <Modal.Title>{props.title}</Modal.Title>
                    </Modal.Header>
                )
            }
            <Modal.Body>
                {props.children}
            </Modal.Body>
            {
                props.buttons && (
                    <Modal.Footer>
                        {props.buttons}
                    </Modal.Footer>
                )
            }
        </Modal>
    );
}

export default AppModal;