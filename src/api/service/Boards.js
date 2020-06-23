import {base} from "../base";

export function fetchBoards(uid, wid, callback) {
    base.ref('/boards/' + uid + "/" + wid).on('value', function(snapshot) {
        callback(snapshot.val());
    });
}