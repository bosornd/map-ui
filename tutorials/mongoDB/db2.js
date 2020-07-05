const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db('yelp');
  const collection = db.collection('geodata');

  collection.find({ geometry: { $near: { $geometry: { type: "Point", coordinates: [-80.8, 35.5] },
                                         $minDistance: 0, $maxDistance: 1000 }}}).toArray(function(err, docs){
    assert.equal(null, err);
    console.log("Found the following records");
    console.log(docs);

    client.close();
  });
});
