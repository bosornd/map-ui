const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

// 1) defining schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

// 1-A) adding static
userSchema.statics.findByName = function(name){
  return this.find({name: name});
};

// 1-B) adding instance method
userSchema.methods.print = function(){
  console.log(this.name + '(' + this.age + ')');
};

// 1-C) adding query helper
userSchema.query.byName = function(name){
  return this.where({name: name});
};
// NOTE: they must be added to the schema before compiling it with mongoose.model()

// 2) creating model (collection)
const User = mongoose.model('users', userSchema);

// 3) finding document
User.findByName('Kim').exec(function(error, result){
  result.forEach(function(user){
    user.print();
  })
})

User.find().byName('Kim').exec(function(error, result){
  result.forEach(function(user){
    user.print();
  })
})
