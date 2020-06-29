import {base} from "../base";
import {v4 as uuidv4} from "uuid";

export function fetchCards(bid, callback) {
    base.ref('/cards/' + bid).on('value', function(snapshot) {
        callback(snapshot.val());
    });
}

export function addNewCard(bid, title, description, callback) {
    const cid = uuidv4();
    base.ref('/cards/' + bid + "/" + cid).set({
        "title":title,
        "createdOn": new Date().toString()
    }, error=>{
        if(!error) {
            base.ref('/card-info/' + cid).set({
                "description": description
            }, error => {
                callback(error)
            });
        }else callback(error);
    });
}

export function moveCard(cid, card, boardSource, boardDest, callback) {
    base.ref('/cards/' + boardSource + "/" + cid).remove(error=>{
        if(!error) {
            base.ref('/cards/' + boardDest + "/" + cid).set({
                ...card
            }, callback);
        }else callback(error);
    });
}