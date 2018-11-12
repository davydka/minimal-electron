const {app, BrowserWindow} = require('electron')
const electron = require('electron');
const net = require('net');
let mainWindow;
let isShowing = false
function createWindow () {
  mainWindow = new BrowserWindow({
    x: 0,
    y: 0,
    frame: false,
    show: false,
    alwaysOnTop: true,
    fullscreen: true
  });
  mainWindow.loadURL('http://localhost:8080/', {"extraHeaders" : "pragma: no-cache\n"});
  mainWindow.on('closed', function () {
    mainWindow = null
  });
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    isShowing = true
  });
}
let timer
function connect() {
  const socket = net.createConnection(8080, 'localhost', function(err) {
    console.log('connecting')
    clearTimeout(timer)
    createWindow()
  })
  socket.on('error', function(err) {
    console.log('retry connection')
    clearTimeout(timer)
    timer = setTimeout(connect, 500)
  })
}
// connect()
app.on('ready', connect);
