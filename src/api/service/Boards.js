import {base} from "../base";
import {v4 as uuidv4} from "uuid";

export function fetchBoards(uid, wid, callback) {
    base.ref('/boards/' + uid + "/" + wid).on('value', function(snapshot) {
        callback(snapshot.val());
    });
}

export function addNewBoard(uid, wid, index, title, description, callback) {
    const bid = uuidv4();
    base.ref('/boards/' + uid+"/"+wid+"/"+index).set({
        "bid":bid,
        "title":title
    }, error=>{
        if(!error) {
            base.ref('/board-info/' + bid).set({
                "description": description,
                "createdOn": new Date().toString()
            }, error => {
                callback(error)
            });
        }else callback(error);
    });
}