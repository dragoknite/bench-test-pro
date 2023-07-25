const express = require('express');
const app = express();
const electron_1 = require("electron");
const path = require('path');
const url = require('url');
// parse incoming JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Testing Hello, World Testing');
});


function createWindow() {  
  // Create a new window
  let window = new electron_1.BrowserWindow({
    width: 750,
    height: 700,
    show: false,
    title: 'Bench Test Pro',
    icon: path.join(__dirname, './icon.png'),
  });

  // This platform is checking to see if the OS is Mac, and setting the icon
  if (process.platform === 'darwin') {
    electron_1.app.dock.setIcon(path.join(__dirname, './icon.png'));
  }

  // Event listeners on the window
  window.webContents.on("did-finish-load", () => {
    window.show();
    window.focus();
  });

  indexPath = url.format({
    protocol: 'file:',
    pathname: path.join(__dirname, '../../dist', 'index.html'),
    slashes: true,
  });

  // Load our HTML file
  // window.loadFile("dist/index.html");
  window.loadURL(indexPath);
};

electron_1.app.whenReady().then(() => {
  createWindow();

  electron_1.app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
  });
});


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});