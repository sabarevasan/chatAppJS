import Notification from "../../utils/notifications";

export default store => next => action => {
    //const state = store.getState();
    switch(action.type) {
        case 'APP_IS_ONLINE':
        case 'APP_IS_OFFLINE': {
            Notification.show({
                title: 'Connection Status', 
                body: action.isOnline ? 'Online' : 'Offline'});
        }
    }
    next(action);
}