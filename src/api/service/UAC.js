import {app, base, googleAuthProvider} from "../base";

export function loginWithEmailAndPassword(loginInfo, onSuccess, onFailure) {
    app.auth().fetchSignInMethodsForEmail(loginInfo.user).then((providers) => {
        if(providers.length === 0){
            // return app.auth().createUserWithEmailAndPassword(loginInfo.user, this.state.password);
            return false;
        }else if(providers.indexOf("password") === -1){
            return null;
        }else{
            return app.auth().signInWithEmailAndPassword(loginInfo.user, loginInfo.password);
        }
    }).then(response=>{
        if(response === null){
            onFailure("user other method for login");
        }else if (response === false){
            onFailure("username or password not valid");
        }else if ('user' in response){
            fetchOnceUserInfo(response.user.uid, userInfo => onSuccess(response.user, userInfo));
        }
    }).catch(error=>console.log(error));
}

export function fetchUserInfo(uid, callback) {
    base.ref('/users/' + uid).on('value', function(snapshot) {
        callback(snapshot.val());
    });
}

export function fetchOnceUserInfo(uid, callback) {
    base.ref('/users/' + uid).once('value').then(function(snapshot) {
        callback(snapshot.val());
    });
}

export function loginWithGoogle(onSuccess, onFailure) {
    app.auth().signInWithPopup(googleAuthProvider).then((result, error)=>{
        if(error){
            onFailure("Authentication Failed. Try other way to log in");
        }else{
            fetchOnceUserInfo(result.user.uid, userInfo => {
                if(userInfo === null){
                    console.log("...")
                    const name = (result.user.displayName && result.user.displayName.trim() !== "")? result.user.displayName : result.user.email.split("@")[0];
                    const username = name.toLowerCase().split(" ").join(".");
                    const userInfo = {
                        name: name,
                        username: username,
                        email: result.user.email
                    };
                    base.ref('users/' + result.user.uid).set(userInfo);
                    onSuccess(result.user, userInfo);
                }else{
                    onSuccess(result.user, userInfo);
                }
            })
        }
    })
}

export function register(user, onSuccess, onFailure) {
    app.auth().createUserWithEmailAndPassword(user.email, user.password).then((result, error) =>{
        if(error){
            onFailure("Failed to create account");
        }else{
            if(result.user !== null && result.user.uid !== null) {
                base.ref('users/' + result.user.uid).set({
                    name: user.name,
                    username: user.username,
                    email: user.email
                });
                onSuccess(result.user);
            }
        }
    })
}