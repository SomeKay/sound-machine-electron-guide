'use strict';

var soundButtons = document.querySelectorAll('.button-sound');
var path = require('path');

const notifier = require('node-notifier');

for (var i = 0; i < soundButtons.length; i++) {
    var soundButton = soundButtons[i];
    var soundName = soundButton.attributes['data-sound'].value;

    prepareButton(soundButton, soundName);
}

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function prepareButton(buttonEl, soundName) {
    buttonEl.querySelector('span').style.backgroundImage = 'url("img/icons/' + soundName + '.png")';

    var audio = new Audio(__dirname + '/wav/' + soundName + '.wav');
    buttonEl.addEventListener('click', function () {
        audio.currentTime = 0;
        audio.play();
        notifier.notify({
           'title': 'Sound playing:',
           'message': soundName.capitalizeFirstLetter().replace(/-/g, ' '),
           'sound' : false,
           'icon': __dirname + '/img/icons/' + soundName + '.png'
        });
    });
}

var ipc = require('electron').ipcRenderer;

var aboutEl = document.querySelector('.about');
aboutEl.addEventListener('click', function () {
    ipc.send('open-about-window');
});

var settingsEl = document.querySelector('.settings');
settingsEl.addEventListener('click', function () {
    ipc.send('open-settings-window');
});

var closeEl = document.querySelector('.close');
closeEl.addEventListener('click', function () {
    ipc.send('close-main-window');
});

ipc.on('global-shortcut', function(event, arg) {
    var event = new MouseEvent('click');
    soundButtons[arg].dispatchEvent(event);
});
