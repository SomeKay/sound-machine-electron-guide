'use strict';

var electron = require('electron');

var {app, BrowserWindow, globalShortcut} = electron;

var ipc = require('electron').ipcMain;

var configuration = require('./configuration');

//var globalShortcut = require('electron').globalShortcut;

var mainWindow = null;

app.on('ready', function() {

    if (!configuration.readSettings('shortcutKeys')) {
        configuration.saveSettings('shortcutKeys', ['ctrl', 'shift']);
    }

    mainWindow = new electron.BrowserWindow({
        frame: false,
        height: 520,
        resizable: false,
        width: 368
    });

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');

    setGlobalShortcuts();

});

var settingsWindow = null;

ipc.on('open-settings-window', function () {
    if (settingsWindow) {
        return;
    }

    settingsWindow = new BrowserWindow({
        frame: false,
        height: 200,
        resizable: false,
        width: 200
    });

    settingsWindow.loadURL('file://' + __dirname + '/app/settings.html');

    settingsWindow.on('closed', function () {
        settingsWindow = null;
    });
});

ipc.on('close-settings-window', function () {
    if (settingsWindow) {
        settingsWindow.close();
    }
});

ipc.on('set-global-shortcuts', function () {
    setGlobalShortcuts();
});

ipc.on('close-main-window', function () {
    app.quit();
});

function setGlobalShortcuts() {
    globalShortcut.unregisterAll();

    var shortcutKeysSetting = configuration.readSettings('shortcutKeys');
    var shortcutPrefix = shortcutKeysSetting.length === 0 ? '' : shortcutKeysSetting.join('+') + '+';

/*
// Implement shortcut binding in a loop
    for (var i = 0; i <= 7; i++) {
        globalShortcut.register((shortcutPrefix + i + 1), function () {
            mainWindow.webContents.send('global-shortcut', i);
        });
    }
*/

    globalShortcut.register(shortcutPrefix + '1', function () {
        mainWindow.webContents.send('global-shortcut', 0);
    });
    globalShortcut.register(shortcutPrefix + '2', function () {
        mainWindow.webContents.send('global-shortcut', 1);
    });
    globalShortcut.register(shortcutPrefix + '3', function () {
        mainWindow.webContents.send('global-shortcut', 2);
    });
    globalShortcut.register(shortcutPrefix + '4', function () {
        mainWindow.webContents.send('global-shortcut', 3);
    });
    globalShortcut.register(shortcutPrefix + '5', function () {
        mainWindow.webContents.send('global-shortcut', 4);
    });
    globalShortcut.register(shortcutPrefix + '6', function () {
        mainWindow.webContents.send('global-shortcut', 5);
    });
    globalShortcut.register(shortcutPrefix + '7', function () {
        mainWindow.webContents.send('global-shortcut', 6);
    });
    globalShortcut.register(shortcutPrefix + '8', function () {
        mainWindow.webContents.send('global-shortcut', 7);
    });

}