import repository from '../repository/firestore';
import * as service from '../service/chats';

export const fetchChats = () => async (dispatch, getState) => {
    const { user } = getState().auth;
    dispatch({type: 'CHATS_FETCH_INIT'});
    const chats = await service.fetchChats();

    chats.forEach(chat => chat.joinedUsers = chat.joinedUsers.map(user => user.id));

    const sortedChats = chats.reduce((availableChats, chat) => {
        availableChats[chat.joinedUsers.includes(user.uid) ? 'chatsJoined' : 'chatsAvailable'].push(chat);
        return availableChats;
    }, {chatsJoined: [], chatsAvailable: []});

    dispatch({
        type: 'CHATS_FETCH_SUCCESS',
        ...sortedChats
    });

    return sortedChats;
}

/* export const fetchChats = () => dispatch => 
    service
        .fetchChats()
        .then(chats => dispatch({
            type: 'CHATS_FETCH_SUCCESS',
            chats
        })) */

/*
export function fetchChats() {
    return async function(dispatch) {
        const chats = await service.fetchChats();
        dispatch({
            type: 'CHATS_FETCH_SUCCESS',
            chats
        });
        return chats;
    }
}
*/

export const joinChat = (chat, userId) => dispatch => {
    service.joinChat(userId, chat.id)
        .then(_ => dispatch({type: 'CHAT_JOIN_SUCCESS', chat}))
}

export const createChat = (formData, userId) => async dispatch => {
    const buildChat = {...formData};
    buildChat.admin = repository.doc(`users/${userId}`);

    const chatId = await service.createChat(buildChat);
    dispatch({type: 'CHAT_CREATION_SUCCESS'});
    await service.joinChat(userId, chatId);
    dispatch({type: 'CHAT_JOIN_SUCCESS', chat: {...buildChat, id: chatId}});
    return chatId;
}