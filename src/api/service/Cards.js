import {base} from "../base";

export function fetchCards(bid, callback) {
    base.ref('/cards/' + bid).on('value', function(snapshot) {
        callback(snapshot.val());
    });
}