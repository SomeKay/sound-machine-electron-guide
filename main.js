'use strict';

const {app, BrowserWindow} = require('electron');
const {ipcMain} = require('electron');

let mainWindow;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        frame: false,
        height: 700,
        resizable: false,
        width: 368
    });

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');
});

ipcMain.on('window-close', (event, arg) => {
  console.log(arg);
  app.quit();
});

ipcMain.on('async-msg', (event, arg) => {
  console.log(arg);
  //app.quit();
});
