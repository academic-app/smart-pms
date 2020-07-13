import {base} from "../base";
import {v4 as uuidv4} from "uuid";

export function fetchOrderedCards(bid, callback) {
    base.ref('/ordered-cards/' + bid).on('value', function(snapshot) {
        callback(snapshot.val());
    });
}

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
            base.ref('/ordered-cards/' + bid+"/").once('value').then(snapshot=>{
                const oldArr = snapshot.val() || [];
                const arr = [cid, ...oldArr];
                base.ref('/ordered-cards/' + bid+"/").set(arr);
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

export function moveCardLocation(source, dest, cid, card, oldIndex, index, callback) {
    base.ref('/ordered-cards/' + dest + "/").once('value').then(snapshot => {
        const arr = [...(snapshot.val()||[])];
        arr.splice(index, 0, cid);
        if (dest === source) {
            if (oldIndex < index) oldIndex -= 1;
            arr.splice(oldIndex, 1);
        }
        console.log(source);
        console.log(dest);
        base.ref('/ordered-cards/' + dest + "/").set(arr, e=>{
            if (dest !== source){
                base.ref('/ordered-cards/' + source + "/").once('value').then(snapshot => {
                    const arr = [...snapshot.val()];
                    arr.splice(oldIndex-1, 1);
                    base.ref('/ordered-cards/' + source + "/").set(arr);
                    moveCard(cid, card, source, dest, callback);
                });
            }
        });
    });
}