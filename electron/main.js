const { app, BrowserWindow, dialog } = require('electron')
const isDev = require('electron-is-dev')
const { ipcMain } = require('electron/main')
const path = require('path')
const fs = require('fs')

let mainWindow = null

function createWindow() {
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    width: 800,
    height: 600,
    show: false,
  })

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000')
  } else {
    mainWindow.loadFile('../build/index.html')
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize()
    mainWindow.show()
    mainWindow.webContents.openDevTools()
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', () => {
  createWindow()

  ipcMain.on('event://send-new-message-per02', (event, message) => {
    mainWindow.webContents.send('event://arrival-message-per01', message)
  })

  ipcMain.handle('event://open-file', async function () {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      mainWindow,
      properties: ['openFile', 'multiSelections'],
      filters: [{ name: 'Images', extensions: ['jpg', 'png', 'jpeg'] }],
    })

    if (!canceled) {
      const files = filePaths.map((filePath) => {
        const file = fs.readFileSync(filePath)
        return file
      })
      return files
    }
  })
})
