const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

// 1) defining schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

// 2) creating model (collection)
const User = mongoose.model('users', userSchema);

// 3) finding document
const query = User.find().where('age').gt(40).lt(60);
query.exec(function(error, result){
  console.log(result.length);       // result is array
  result.forEach(function(user){
    console.log(user.name + '(' + user.age + ')');
  });
});
