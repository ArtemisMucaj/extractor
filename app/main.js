const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// Report crashes to our server.
electron.crashReporter.start();
var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 970, height: 600, minWidth : 750,
                minHeight : 500,
               'node-integration':true, frame : true });
  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
