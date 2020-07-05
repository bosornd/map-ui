var http = require('http');
var os = require('os');

var host = os.hostname();
var handleRequest = function(request, response) {
  console.log('Received request for URL: ' + request.url);
  response.writeHead(200);
  response.end('Server is running on: ' + host);
};

var www = http.createServer(handleRequest);
www.listen(8080);
