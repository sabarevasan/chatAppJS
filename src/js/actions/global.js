const onConnectionStatusChange = dispatch => () => {
    const isOnline = navigator.onLine;
    const action = isOnline ?
     {type: 'APP_IS_ONLINE', isOnline} :
     {type: 'APP_IS_OFFLINE', isOnline}
    dispatch(action);
}

export const listenToConnectionChanges = () => dispatch => {
    const alertConnectionStatus = onConnectionStatusChange(dispatch);

    window.addEventListener('online', alertConnectionStatus);
    window.addEventListener('offline', alertConnectionStatus);

    return() => {
        window.removeEventListener('online', alertConnectionStatus);
        window.removeEventListener('offline', alertConnectionStatus);
    }
}