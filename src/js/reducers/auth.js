import { combineReducers } from "redux";

import { createErrorReducer, createIsProcessingReducer } from "./common";

function createLoginReducer() {
    return combineReducers({
        processing: createIsProcessingReducer('AUTH_LOGIN'),
        error: createErrorReducer('AUTH_LOGIN')
    })
}

function createRegisterReducer() {
    return combineReducers({
        processing: createIsProcessingReducer('AUTH_REGISTER'),
        error: createErrorReducer('AUTH_REGISTER')
    })
}

function authReducer() {
    const user = (state = null, action) => {
        switch(action.type) {
            case 'AUTH_ON_ERROR':
            case 'AUTH_ON_INIT':
                return null;
            case 'AUTH_REGISTER_SUCCESS':
            case 'AUTH_LOGIN_SUCCESS':
            case 'AUTH_ON_SUCCESS':
                return action.user;
            default:
                return state;
        }
    }

    return combineReducers({
        user,
        processing: createIsProcessingReducer('AUTH_ON'),
        login: createLoginReducer(),
        register: createRegisterReducer()
    })
}

export default authReducer();