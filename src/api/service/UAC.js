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
            base.ref('/users/' + response.user.uid).once('value').then(function(snapshot) {
                onSuccess(response.user, snapshot.val());
            });
        }
    }).catch(error=>console.log(error));
}

export function loginWithGoogle(onSuccess, onFailure) {
    app.auth().signInWithPopup(googleAuthProvider).then((result, error)=>{
        if(error){
            onFailure("Authentication Failed. Try other way to log in");
        }else{
            onSuccess(result.user);
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
                    username: user.username
                });
                onSuccess(result.user);
            }
        }
    })
}