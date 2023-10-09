import firebase from 'firebase';

import repository from '../repository/firestore';

const extractSnapshotData = snapshot =>
    snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));

export const fetchChats = () => {
    return repository
        .collection('chats')
        .get()
        .then(extractSnapshotData)
}

export const createChat = chat => 
    repository
        .collection('chats')
        .add(chat)
        .then(docRef => docRef.id)

export const joinChat = async(userId, chatId) => {
    const userRef = repository.doc(`users/${userId}`);
    const chatRef = repository.doc(`chats/${chatId}`);

    await userRef.update({joinedChats: firebase.firestore.FieldValue.arrayUnion(chatRef)});
    await chatRef.update({joinedUsers: firebase.firestore.FieldValue.arrayUnion(userRef)});
}

export const exitChat = async(userId, chatId) => {
    const userRef = repository.doc(`users/${userId}`);
    const chatRef = repository.doc(`chats/${chatId}`);

    await userRef.update({joinedChats: firebase.firestore.FieldValue.arrayUnion(chatRef)});
    await chatRef.update({joinedUsers: firebase.firestore.FieldValue.arrayUnion(userRef)});
}