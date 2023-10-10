import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit'

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

    const activeChat = createReducer({}, {
        'CHAT_SET_ACTIVE': (state, action) => {
            const { chat } = action;
            state[chat.id] = chat;
        }
    })

    return combineReducers({
        joinedChats,
        availableChats,
        activeChat
    });
}

export default createChatReducer();