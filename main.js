'use strict';

var electron = require('electron');
var {app, BrowserWindow, globalShortcut, Menu, Tray} = electron;
var ipc = require('electron').ipcMain;
var configuration = require('./configuration');
var mainWindow = null;
let tray = null;
var path = require('path');

app.on('ready', function() {

    if (!configuration.readSettings('shortcutKeys')) {
        configuration.saveSettings('shortcutKeys', ['ctrl', 'shift']);
    }

    mainWindow = new electron.BrowserWindow({
        title: 'Sound Machine',
        icon: (path.join(__dirname, 'app/img/app-icon.png')),
        frame: false,
        height: 540,
        resizable: false,
        width: 368
    });

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');

    setGlobalShortcuts();

    if (process.platform === 'darwin') {
        tray = new Tray(path.join(__dirname, 'app/img/app-icon.png'));
    }
    else {
        tray = new Tray(path.join(__dirname, 'app/img/app-icon.png'));
    }

    const contextMenu = Menu.buildFromTemplate([
      {label: 'Sound Machine', enabled: false},
      {type: 'separator'},
      {label: 'Settings',
      click: function () {
          if (settingsWindow) {
              settingsWindow.focus();
              return;
          }

          settingsWindow = new BrowserWindow({
              frame: false,
              height: 220,
              resizable: false,
              width: 200
          });

          settingsWindow.loadURL('file://' + __dirname + '/app/settings.html');

          settingsWindow.on('closed', function () {
              settingsWindow = null;
          });
      }
      }, //open settings on click
      {label: 'Help',
      click: function () {
          if (aboutWindow) {
              aboutWindow.focus();
              return;
          }

          aboutWindow = new BrowserWindow({
              frame: false,
              height: 230,
              resizable: false,
              width: 200
          });

          aboutWindow.loadURL('file://' + __dirname + '/app/about.html');

          aboutWindow.on('closed', function (){
              aboutWindow = null;
          });
      }
      },
      {type: 'separator'},
      {label: 'Quit', click: app.quit }
    ])
    tray.setToolTip('Sound Machine')
    tray.setContextMenu(contextMenu)

});

var settingsWindow = null;

ipc.on('open-settings-window', function () {
    if (settingsWindow) {
        settingsWindow.focus();
        return;
    }

    settingsWindow = new BrowserWindow({
        frame: false,
        height: 220,
        resizable: false,
        width: 200
    });

    settingsWindow.loadURL('file://' + __dirname + '/app/settings.html');

    settingsWindow.on('closed', function () {
        settingsWindow = null;
    });
});

var aboutWindow = null;

ipc.on('open-about-window', function () {
    if (aboutWindow) {
        aboutWindow.focus();
        return;
    }

    aboutWindow = new BrowserWindow({
        frame: false,
        height: 230,
        resizable: false,
        width: 200
    });

    aboutWindow.loadURL('file://' + __dirname + '/app/about.html');

    aboutWindow.on('closed', function (){
        aboutWindow = null;
    });
});

ipc.on('close-about-window', function () {
    if (aboutWindow) {
        aboutWindow.close();
    }
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
