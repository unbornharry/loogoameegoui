var http = require('http');
var httpProxy = require('http-proxy');

httpProxy.createServer({
    changeOrigin: true,
    hostRewrite: true,
    autoRewrite: true,
    ws: true,
    target: 'http://localhost:5001'
}).listen(process.env.PORT || 80);