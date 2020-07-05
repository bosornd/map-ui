var master = require('redis').createClient(process.env.REDIS_SERVICE_PORT,
                                           process.env.REDIS_SERVICE_HOST);
var slave = require('redis').createClient(process.env.REDIS_SLAVE_SERVICE_PORT,
                                          process.env.REDIS_SLAVE_SERVICE_HOST);

var http = require('http');
http.createServer(function(request, response) {
  slave.get('count', function(err, data){
    var count = 0;
    if ( !err && data != null) count = parseInt(data);

    count = count + 1;
    master.set('count', count);

    response.writeHead(200);
    response.end(count.toString());
  });
}).listen(8080);
