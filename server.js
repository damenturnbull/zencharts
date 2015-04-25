// Simple Nodejs Server
var connect     = require('connect');
var serveStatic = require('serve-static');
var compression = require('compression');
connect().use(serveStatic(__dirname), 'compression').listen(8080);
console.log('Server running at http://127.0.0.1:8080/');
