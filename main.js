/**
 * ************************************
 *
 * @module main.js
 * @author team Buoy
 * @description Electron app location to handle IPC 
 *
 * ************************************
 */

const path = require('path');
const url = require('url');
const { app, BrowserWindow, ipcRenderer } = require('electron');
const KubeClient = require('./kubeclient/kubeClient');
const { ipcMain } = require('electron');
const PromClient = require('./promclient/promClient');
let mainWindow;

let isDev = false;

// initializes development mode if run in dev
if (process.env.NODE_ENV !== undefined && process.env.NODE_ENV === 'development') {
	isDev = true
}

// creates window for desktop app
function createMainWindow() {
	mainWindow = new BrowserWindow({
		width: 1100,
		height: 800,
		show: false,
		autoHideMenuBar: true,
		frame: false,
		webPreferences: {
		
			nodeIntegration: true,
			contextIsolation: false,
		},
	});
	
	let indexPath;

		indexPath = url.format({
			protocol: 'http:',
			host: 'localhost:8080',
			pathname: 'index.html',
			slashes: true,
		});

	new KubeClient(mainWindow);
	new PromClient(mainWindow);

	mainWindow.loadURL(indexPath);

	// Don't show until we are ready and loaded
	mainWindow.once('ready-to-show', () => {
		mainWindow.show()

		// Open devtools if dev
		if (isDev) {
			const {
				default: installExtension,
				REACT_DEVELOPER_TOOLS,
			} = require('electron-devtools-installer');

			installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
				console.log('Error loading React DevTools: ', err)
			);
			mainWindow.webContents.openDevTools();
		}
	});

	mainWindow.on('closed', () => (mainWindow = null))
};

// IPC listeners

// X button listener to close application
ipcMain.on('close-app', (evt, arg) => {
	app.quit();
});

// minimize button listener to minimize application
ipcMain.on('minimize-app', (evt, arg) => {
	mainWindow.minimize();
});

// maximize button listener to maximize application
ipcMain.on('maximize-app', (evt, arg) => {
	mainWindow.maximize();
});

app.on('ready', createMainWindow);

// closes window when app is closed
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

// initializes new window
app.on('activate', () => {
	if (mainWindow === null) {
		createMainWindow();
	}
});

// Stop error
app.allowRendererProcessReuse = true;