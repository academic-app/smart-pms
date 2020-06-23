import {base} from "../base";

export function fetchWalls(uid, callback) {
    base.ref('/walls/' + uid).on('value', function(snapshot) {
        callback(snapshot.val());
    });
}