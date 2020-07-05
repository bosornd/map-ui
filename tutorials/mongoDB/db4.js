const MongoClient = require('mongodb').MongoClient
const client = new MongoClient('mongodb://localhost:27017')

client.connect(function(err) {
  console.log("Connected successfully to DB server")

  const db = client.db('yelp')
  const collection = db.collection('geodata')

  require('http').createServer(function(request, response){
    var url = request.url
    if(url == '/favicon.ico'){
      return response.writeHead(404);
    }

    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.write('                                    \
    <html>                                              \
      <head><title>Google Maps Tutorial</title></head>  \
      <body>                                            \
        <form action="/">                               \
          KEYWORD: <input type="text" name="keyword">   \
          <input type="submit" value="search" />        \
        </form>                                         \
    ')

    // /?keyword=KEYWORD
    var n = url.indexOf('?');
    var keyword = (n < 0) ? '' : url.substr(n + 9)
    console.log(keyword)

    if (keyword != ''){
      collection.find({ $text:  { $search:  keyword }}).limit(5).toArray(function(err, docs){
         response.write('<table border=1>')
         response.write('<thead><tr><th>name</th><th>categories</th></tr></thead>')
         for(var i = 0; i < docs.length; i++){
           response.write('<tr><td>' + docs[i].properties.name + '</td>')
           response.write('<td>' + docs[i].properties.categories + '</td></tr>')
         }
         response.write('</table></body></html>')
         response.end()
      })
    }
    else {
      response.write('</body></html>')
      response.end()
    }
  }).listen(8080)
})
