import {base} from "../base";
import { v4 as uuidv4 } from 'uuid';

export function fetchWalls(uid, callback) {
    base.ref('/walls/' + uid).on('value', function(snapshot) {
        callback(snapshot.val());
    });
}

export function addNewWall(uid, index, name, description, callback) {
    const wid = uuidv4();
    base.ref('/walls/' + uid+"/"+index).set({
        "wid":wid,
        "name":name
    }, error=>{
        if(!error) {
            base.ref('/wall-info/' + wid).set({
                "description": description,
                "createdOn": new Date().toString(),
                "isTemplate": false
            }, error => {
                callback(error)
            });
        }else callback(error);
    });
}