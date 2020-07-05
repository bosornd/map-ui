var redis = require('redis').createClient(process.env.REDIS_SERVICE_PORT,
                                                       process.env.REDIS_SERVICE_HOST);
var http = require('http');
http.createServer(function(request, response) {
  redis.incr('count', function(err, data){
    var count = 0;
    if ( !err && data != null) count = parseInt(data);

    response.writeHead(200);
    response.end(count.toString());
  });
}).listen(8080);
