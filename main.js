'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');

var mainWindow = null;

var globalShortcut = require('global-shortcut');

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        frame: false,
        height: 700,
        resizable: false,
        width: 368
    });

    mainWindow.loadUrl('file://' + __dirname + '/app/index.html');

    globalShortcut.register('ctrl+shift+1', function () {
        mainWindow.webContents.send('global-shortcut', 0);
    });
    globalShortcut.register('ctrl+shift+2', function () {
        mainWindow.webContents.send('global-shortcut', 1);
    });
});

var ipc = require('ipc');

ipc.on('close-main-window', function () {
    app.quit();
});