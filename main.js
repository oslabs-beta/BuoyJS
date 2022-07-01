const path = require('path')
const url = require('url')
const { app, BrowserWindow, ipcRenderer } = require('electron')
const KubeClient = require('./kubeclient/kubeClient')
const { ipcMain } = require('electron');
const PromClient = require('./promclient/promClient')
let mainWindow

let isDev = false

if (
	process.env.NODE_ENV !== undefined &&
	process.env.NODE_ENV === 'development'
) {
	isDev = true
}

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
	})

	/*
	ipcMain.on('set-title', (e, title) => {

		const webContents = e.sender
		const win = BrowserWindow.fromWebContents(webContents);
		win.setTitle('Something')
	});
	*/
	
	let indexPath

	//if (isDev && process.argv.indexOf('--noDevServer') === -1) {
		indexPath = url.format({
			protocol: 'http:',
			host: 'localhost:8080',
			pathname: 'index.html',
			slashes: true,
		})
	/*
	} else {
		indexPath = url.format({
			protocol: 'file:',
			pathname: path.join(__dirname, 'build', 'index.html'),
			slashes: true,
		})
	}
	*/

	new KubeClient(mainWindow);
	new PromClient(mainWindow);

	console.log("Please run");
	mainWindow.loadURL(indexPath)

	// Don't show until we are ready and loaded
	mainWindow.once('ready-to-show', () => {
		mainWindow.show()

		// Open devtools if dev
		if (isDev) {
			const {
				default: installExtension,
				REACT_DEVELOPER_TOOLS,
			} = require('electron-devtools-installer')

			installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
				console.log('Error loading React DevTools: ', err)
			)
			mainWindow.webContents.openDevTools()
		}
	})

	mainWindow.on('closed', () => (mainWindow = null))
}

ipcMain.on('load:cpu-usage', (evt, arg) =>{
	//PromClient.testQuery()
})

ipcMain.on('close-app', (evt, arg) => {
	app.quit()
});

ipcMain.on('minimize-app', (evt, arg) => {
	mainWindow.minimize();
});

ipcMain.on('maximize-app', (evt, arg) => {
	mainWindow.maximize();
});

// ipcMain.on('get:cpuUsage', (evt, arg) => {
// 	ipcRenderer.send
// })

app.on('ready', createMainWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createMainWindow()
	}
})

// Stop error
app.allowRendererProcessReuse = true