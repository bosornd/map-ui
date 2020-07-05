const MongoClient = require('mongodb').MongoClient
const client = new MongoClient('mongodb://localhost:27017')

client.connect(function(err) {
  const db = client.db('yelp')
  const collection = db.collection('geodata')

  const express = require('express')
  const app = express()
  const port = 3000

  app.get('/search', function(request, response){
    const keyword = request.query.keyword
    console.log(keyword)

    if (keyword == undefined){
      response.sendFile(__dirname + '/search.html')
    }
    else {
      collection.find({ $text:  { $search:  keyword }}).limit(5).toArray(function(err, docs){
        response.json(docs)
      })
    }
  })

  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
})
