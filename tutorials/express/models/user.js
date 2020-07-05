const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

userSchema.statics.findByName = function(name){
  return this.find({name: name});
};

userSchema.methods.print = function(){
  console.log(this.name + '(' + this.age + ')');
};

userSchema.query.byName = function(name){
  return this.where({name: name});
};

module.exports = mongoose.model('users', userSchema);
