const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  sendNewMessage: (message) => {
    ipcRenderer.send('event://send-new-message-per01', message)
  },
  onArrivalMessage: (callback) => {
    ipcRenderer.on('event://arrival-message-per01', callback)
  },

  openFile: async () => await ipcRenderer.invoke('event://open-file'),
})
