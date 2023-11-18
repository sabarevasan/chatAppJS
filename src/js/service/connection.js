import firebase from "firebase";
import repository from '../repository/firestore';

const getUserStatus = isOnline => ({
    state: isOnline ? 'online' : 'offline',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp()
})

export const setUserStatus = (uid, isOnline) => {
    const userRef = repository.doc(`/users/${uid}`);
    const updateUserStatus = getUserStatus(isOnline);
    return userRef.update(updateUserStatus);
}
export const onConnectionChange = onConnection => 
    firebase
        .database()
        .ref('.info/connected')
        .on('value', snapshot => {
            const isConnected = snapshot?.val() ? snapshot.val() : false;
            onConnection(isConnected)
        })
