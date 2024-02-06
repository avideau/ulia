const gttp = require('http');
const httpProxy = require('http-proxy');
const https = require('https');

httpProxy.createProxyServer({target:'http://localhost:5173'}).listen(8000);
