const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    notification: {
        sendNotification(message) {
            ipcRenderer.send('notify', message);
        }
    }
});