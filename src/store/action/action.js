import { authConst } from '../constant';
import * as firebase from 'firebase'

export function signup(user) {
    return dispatch => {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((createUser) => {
                delete user.password;
                user.uid = createUser.uid;
                console.log(user, 'new user data')
                firebase.database().ref('users/' + user.uid + '/').set(user)
                    .then((userData) => {
                        console.log(user, 'user data')
                        dispatch({ type: authConst.CREATE_USER_SUCCESSFULLY, payload: user })
                    })
            }).catch((error) => {
                alert(error.message)
            })
    }
}

export function login(user) {
    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((userData) => {
                user.uid = userData.uid
                console.log(userData, 'user logged in')
                dispatch({ type: authConst.LOGIN_USER_SUCCESSFULLY, payload: user })
            }).catch((error) => {
                alert(error.message)
            })
    }
}

export function signout() {
    return dispatch => {
        firebase.auth().signOut().then(function () {
            dispatch({ type: authConst.REGISTER_SHOW })
        }).catch(function (error) {
            alert(error)
        });
    }
}