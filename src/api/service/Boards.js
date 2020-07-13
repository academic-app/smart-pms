import {base} from "../base";
import {v4 as uuidv4} from "uuid";

export function fetchOrderedBoards(uid, wid, callback) {
    base.ref('/ordered-boards/' + uid+"/"+wid+"/").on('value', snapshot=>{
        callback(snapshot.val());
    });
}

export function fetchBoards(uid, wid, callback) {
    base.ref('/boards/' + uid + "/" + wid + "/").on('value',snapshot => {
        callback(snapshot.val());
    });
}

export function addNewBoard(uid, wid, title, description, callback) {
    const bid = uuidv4();
    base.ref('/boards/' + uid+"/"+wid+"/"+bid).set({
        "title":title,
        "createdOn": new Date().toString()
    }, error=>{
        if(!error) {
            base.ref('/board-info/' + bid).set({
                "description": description
            }, error => {
                callback(error)
            });
            base.ref('/ordered-boards/' + uid+"/"+wid+"/").once('value').then(snapshot=>{
                const oldArr = snapshot.val() || [];
                const arr = [...oldArr, bid];
                base.ref('/ordered-boards/' + uid+"/"+wid+"/").set(arr);
            });
        }else callback(error);
    });
}

export function moveBoard(uid, wid, bid, oldIndex, index, callback) {
    base.ref('/ordered-boards/'+ uid+"/"+wid+"/").once('value').then(snapshot=>{
        const arr = [ ...snapshot.val() ];
        arr.splice(index, 0, bid)
        if(oldIndex > index) oldIndex += 1;
        arr.splice(oldIndex, 1);
        base.ref('/ordered-boards/' + uid+"/"+wid+"/").set(arr);
    });
}