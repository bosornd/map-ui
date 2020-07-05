const MongoClient = require('mongodb').MongoClient
const client = new MongoClient('mongodb://localhost:27017')

client.connect(function(err) {
  console.log("Connected successfully to DB server")

  const db = client.db('yelp')
  const collection = db.collection('geodata')

  require('http').createServer(function(request, response){
    collection.find({ geometry: { $near: { $geometry: { type: 'Point', coordinates: [-80.8, 35.5] },
                                              $minDistance: 0, $maxDistance: 1000 }}}).toArray(function(err, docs){
       response.writeHead(200, { 'Content-Type': 'text/plain' })
       response.write(JSON.stringify(docs))
       response.end()
    })
  }).listen(8080)
})
