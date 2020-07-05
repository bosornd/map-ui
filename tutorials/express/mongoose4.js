const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

const User = require('./models/user');

User.findByName('Kim').exec(function(error, result){
  result.forEach(function(user){
    user.print();
  })
})
