// Module to control the application lifecycle and the native browser window.
const { app, BrowserWindow, protocol, ipcMain } = require("electron");
const KubeClient = require('./kubeClient/kubeClient');
const PromClient = require('./promClient/promClient');
const path = require("path");
const url = require("url");

let mainWindow;
// Create the native browser window.
function createWindow() {
  mainWindow = new BrowserWindow({
		width: 1100,
		height: 800,
    show: false,
    autoHideMenuBar: true,
    frame: false,
    // Set the path of an additional "preload" script that can be used to
    // communicate between node-land and browser-land.
    webPreferences: {
      nodeIntegration: true,
			contextIsolation: false,
    },
  });

  // In production, set the initial browser path to the local bundle generated
  // by the Create React App build process.
  // In development, set it to localhost to allow live/hot-reloading.
  const appURL = app.isPackaged
    ? url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true,
      })
    : "http://localhost:3000";

  new KubeClient(mainWindow);
	new PromClient(mainWindow);
  mainWindow.loadURL(appURL);

  mainWindow.once('ready-to-show', () => {
		mainWindow.show()
  });
  // Automatically open Chrome's DevTools in development mode.
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
}

// Setup a local proxy to adjust the paths of requested files when loading
// them from the local production bundle (e.g.: local fonts, etc...).
function setupLocalFilesNormalizerProxy() {
  protocol.registerHttpProtocol(
    "file",
    (request, callback) => {
      const url = request.url.substr(8);
      callback({ path: path.normalize(`${__dirname}/${url}`) });
    },
    (error) => {
      if (error) console.error("Failed to register protocol");
    }
  );
}

// This method will be called when Electron has finished its initialization and
// is ready to create the browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  setupLocalFilesNormalizerProxy();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('close-app', (evt, arg) => {
	app.quit()
});

ipcMain.on('minimize-app', (evt, arg) => {
	mainWindow.minimize();
});

ipcMain.on('maximize-app', (evt, arg) => {
	mainWindow.maximize();
});