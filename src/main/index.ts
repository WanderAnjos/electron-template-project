import path from 'node:path'

import { is } from '@electron-toolkit/utils'
import { app, BrowserWindow } from 'electron'
import { createFileRoute, createURLRoute } from 'electron-router-dom'

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

let mainWindow: BrowserWindow

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1120,
    height: 700,
    show: false,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })

  const devServerURL = createURLRoute(MAIN_WINDOW_WEBPACK_ENTRY, 'main')

  const fileRoute = createFileRoute(
    path.join(__dirname, '../renderer/index.html'),
    'main',
  )

  if (is.dev && MAIN_WINDOW_WEBPACK_ENTRY) {
    mainWindow.loadURL(devServerURL)
  } else {
    mainWindow.loadFile(...fileRoute)
  }

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
}

app.on('ready', () => {
  createWindow()
})
