import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import chatReducer from '../reducers/chats';
import authReducer from '../reducers/auth';
import globalReducer from '../reducers/global';
import globalMiddleware from '../store/middlewares/global';

export default function configureStore() {

    const middlewares = [
        thunkMiddleware, 
        globalMiddleware
    ];
    
    const store = createStore(
        combineReducers({
            chats: chatReducer,
            auth: authReducer,
            global: globalReducer
    }), applyMiddleware(...middlewares));

    return store;
}