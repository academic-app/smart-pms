import {base} from "../base";
import {v4 as uuidv4} from "uuid";

export function fetchCards(bid, callback) {
    base.ref('/cards/' + bid).on('value', function(snapshot) {
        callback(snapshot.val());
    });
}

export function addNewCard(bid, index, title, description, callback) {
    const cid = uuidv4();
    base.ref('/cards/' + bid+"/"+index).set({
        "cid":cid,
        "title":title
    }, error=>{
        if(!error) {
            base.ref('/card-info/' + cid).set({
                "description": description,
                "createdOn": new Date().toString()
            }, error => {
                callback(error)
            });
        }else callback(error);
    });
}