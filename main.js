const {app, BrowserWindow} = require('electron');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
      height: 700,
      width: 1200
  });

  mainWindow.loadURL('file://' + __dirname + '/index.html');
});
