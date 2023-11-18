import * as service from '../service/connection';

export const checkUserConnection = (uid) => dispatch => 
    service.onConnectionChange((isConnected) => {
        service.setUserStatus(uid, isConnected)
        dispatch({type: 'CONNECTION_BASED_USER_STATUS_UPDATE'})
    })