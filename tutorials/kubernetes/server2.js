var count = 0;

var fs = require('fs');
var http = require('http');
http.createServer(function(request, response) {
  fs.readFile('/data/count.txt', 'utf8', function(err, data){
    if ( !err ) count = parseInt(data);

    count = count + 1;
    fs.writeFileSync('/data/count.txt', count);

    response.writeHead(200);
    response.end(count.toString());
  });
}).listen(8080);
