var http = require('http')

var app = http.createServer(function(request, response){
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.write('Hello World!!!!')
    response.end()
})

app.listen(8080)
