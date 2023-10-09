// Main process
const { app, BrowserWindow, Notification, ipcMain } = require('electron');
const isDev = !app.isPackaged;
const path = require('path');

function createWindow() {
    // Browser Window <- Renderer process
    const window = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: "white",
        webPreferences: {
            // Must be FALSE to secure the application
            nodeIntegration: false,
            // Sanitize JS code
            worldSafeExecuteJavaScript: true,
            // Is a feature that ensures both preload 
            // scripts and elec tron internal logic 
            // run in seperate CONTEXT
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    window.loadFile('index.html');
    isDev && window.webContents.openDevTools({ mode: 'detach' });
}

if(isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    });
}

app.whenReady().then(createWindow);

/* ipcMain.on('notify', (_, message) => {
    new Notification({
        title: 'Application Notification', 
        body: message
    }).show();
}) */

ipcMain.on('app-quit', () => {
    app.quit();
})

app.on('window-all-closed', () => {
    if(process.platform !== 'win32') {
        app.quit();
    }
})

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})