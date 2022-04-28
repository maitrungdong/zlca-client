const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  sendNewMessage: (message) => {
    ipcRenderer.send('event://send-new-message-per02', message)
  },
  onArrivalMessage: (callback) => {
    ipcRenderer.on('event://arrival-message-per02', callback)
  },
})
