'use strict';

var ipc = require('electron').ipcRenderer;

var closeEl = document.querySelector('.close');
closeEl.addEventListener('click', function (e) {
    ipc.send('close-about-window');
});
