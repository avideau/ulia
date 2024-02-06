const { app, BrowserWindow } = require('electron')
const httpProxy = require('http-proxy')
const axios = require('axios')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 200,
    height: 200
  })

  win.loadFile('index.html')
}

app.whenReady().then(async () => {
  createWindow()

  let key = '';
  let cert = '';
  await axios.get('https://static.ulia.stream/obs-tls/cert.pem').then(response => cert = response.data)
  await axios.get('https://static.ulia.stream/obs-tls/key.pem').then(response => key = response.data)

  httpProxy.createProxyServer({
    target: 'http://127.0.0.1:4455',
    ws: true,
    ssl: {
      key: key,
      cert: cert
    }
  }).listen(4458)
})
