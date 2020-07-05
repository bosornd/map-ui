const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  type: { type: String, enum: ['Point'], required: true },
  coordinates: { type: [Number], required: true }
});

const geodataSchema = new mongoose.Schema({
    geometry: pointSchema,
    properties: {
      business_id: { type: String, unique: true, index: true, required: true },
      name: String,
      stars: Number,
      review_count: Number,
      categories: [String],
    }
  },
  {
    collection: 'geodata'            // collection name
  }
);

geodataSchema.index({'properties.name': 'text', 'properties.categories': 'text'});

geodataSchema.statics.findByID = function(ID){
  return this.find().where('properties.business_id', ID);
};

geodataSchema.statics.findByKeyword = function(keyword){
  return this.find({$text: {$search: keyword}});
};

geodataSchema.index({geometry: '2dsphere'});

geodataSchema.statics.findInBox = function(lowerLeft, upperRight){
  return this.find().where('geometry').box(lowerLeft, upperRight);
};

geodataSchema.statics.findNear = function(center, maxDistance){
  return this.find().where('geometry')
                    .near({center: center, maxDistance: maxDistance, spherical: true});
};

module.exports = mongoose.model('geodata', geodataSchema);
