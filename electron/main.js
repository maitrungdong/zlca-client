const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const { ipcMain } = require('electron/main')
const path = require('path')

let mainWindow = null
let secWindow = null

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

  secWindow = new BrowserWindow({
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload02.js'),
    },
    width: 800,
    height: 600,
    show: false,
  })

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000')
    secWindow.loadURL('http://localhost:3000')
  } else {
    mainWindow.loadFile('../build/index.html')
    secWindow.loadFile('../build/index.html')
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize()
    mainWindow.show()
    mainWindow.webContents.openDevTools()
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  secWindow.once('ready-to-show', () => {
    secWindow.maximize()
    secWindow.show()
    secWindow.webContents.openDevTools()
  })
  secWindow.on('closed', () => {
    secWindow = null
  })
}

app.on('ready', () => {
  createWindow()

  ipcMain.on('event://send-new-message-per01', (event, message) => {
    secWindow.webContents.send('event://arrival-message-per02', message)
  })

  ipcMain.on('event://send-new-message-per02', (event, message) => {
    mainWindow.webContents.send('event://arrival-message-per01', message)
  })
})
