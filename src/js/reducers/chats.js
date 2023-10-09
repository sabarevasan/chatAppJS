import { combineReducers } from "redux";

function createChatReducer() {
    const joinedChats = (state=[], action) => {
        switch(action.type) {
            case 'CHATS_FETCH_RESET':
                return [];
            case 'CHATS_FETCH_SUCCESS':
                return action.chatsJoined;
            case 'CHAT_JOIN_SUCCESS':
                return [...state, action.chat];
            default: {
                return state;
            }
        }
    }
    const availableChats = (state=[], action) => {
        switch(action.type) {
            case 'CHATS_FETCH_RESET':
                return [];
            case 'CHATS_FETCH_SUCCESS':
                return action.chatsAvailable;
            case 'CHAT_JOIN_SUCCESS':
                return state.filter(chat => chat.id !== action.chat.id);
            default: {
                return state;
            }
        }
    }

    return combineReducers({
        joinedChats,
        availableChats
    });
}

export default createChatReducer();