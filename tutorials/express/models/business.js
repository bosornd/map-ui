const mongoose = require('mongoose');
const businessSchema = new mongoose.Schema({
    business_id: { type: String, unique: true, index: true, required: true },
    name: String,
    address: String,
    city: String,
    state: String,
    postal_code: String,
    latitude: Number,
    longitude: Number,
    stars: Number,
    review_count: Number,
    is_open: Boolean,
    attributes: Object,
    categories: [String],
    hours: {
      Monday: String,
      Tuesday: String,
      Wednesday: String,
      Thursday: String,
      Friday: String,
      Saturday: String,
      Sunday: String,
    }
  },
  {
    collection: 'business'            // collection name
  }
);

businessSchema.index({name: 'text', categories: 'text'});

businessSchema.statics.findByID = function(ID){
  return this.find({business_id: ID});
};

businessSchema.statics.findByKeyword = function(keyword){
  return this.find({$text: {$search: keyword}});
};

module.exports = mongoose.model('business', businessSchema);
