const { app, BrowserWindow } = require('electron')
const httpProxy = require('http-proxy')
const fs = require('fs')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 200,
    height: 200
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  httpProxy.createProxyServer({
    target: 'http://127.0.0.1:4455',
    ws: true,
    ssl: {
      key: fs.readFileSync(path.resolve(__dirname, './certs/obs.ulia.stream.key'), 'utf8'),
      cert: fs.readFileSync(path.resolve(__dirname, './certs/obs.ulia.stream.crt'), 'utf8')
    }
  }).listen(4458)
})
