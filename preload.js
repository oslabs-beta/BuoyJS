const { contextBridge, ipcRenderer } = require('electron')

window.myAPI = {
  pleaseWork: () => { console.log("fml") }
}