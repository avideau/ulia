const fs = require('fs')
const path = require('path')
const httpProxy = require('http-proxy')

export default () => {
  httpProxy.createProxyServer({
    target: 'http://localhost:5173',
    // ws: true,
    ssl: {
      key: fs.readFileSync(path.resolve(__dirname, './certs/server.key'), 'utf8'),
      cert: fs.readFileSync(path.resolve(__dirname, './certs/server.crt'), 'utf8')
    }
  }).listen(8000)
}
