import firebase from "firebase/app";
import 'firebase/auth';

import repository from '../repository/firestore';

const createUserDoc = user => {
    repository
        .collection('users')
        .doc(user.uid)
        .set(user);
}

export const getUserDoc = async (uid) => {
    const userProfile = await repository
        .collection('users')
        .doc(uid)
        .get()
        .then(snapshot => snapshot.data());

        return userProfile;
    }


export async function fireRegisterUser({email, password, username, avatar}) {
    const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const userProfile = {uid: user.uid, username, email, avatar, joinedChats: []}
    createUserDoc(userProfile)
    return userProfile;
}

export const fireLoginUser = async ({email, password}) => {
    const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
    const userProfile = getUserDoc(user.uid);
    return userProfile;
  }

export const fireLogoutUser = () => firebase.auth().signOut();

export const fireAuthStateChanged = onAuth => {
    firebase.auth().onAuthStateChanged(onAuth);
}