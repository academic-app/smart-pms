import {base} from "../base";
import { v4 as uuidv4 } from 'uuid';

export function fetchWalls(uid, callback) {
    base.ref('/walls/' + uid).on('value', function(snapshot) {
        callback(snapshot.val());
    });
}

export function addNewWall(uid, name, description, callback) {
    const wid = uuidv4();
    base.ref('/walls/' + uid+"/"+wid).set({
        "name":name,
        "createdOn": new Date().toString()
    }, error=>{
        if(!error) {
            base.ref('/wall-info/' + wid).set({
                "description": description,
                "isTemplate": false
            }, error => {
                callback(error)
            });
        }else callback(error);
    });
}