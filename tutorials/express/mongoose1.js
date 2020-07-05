const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

// 1) defining schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

// 2) creating model (collection)
const User = mongoose.model('users', userSchema);

// 3) instantiating document
const kim = new User({ name: 'Kim', age: 45 });
console.log(kim); // 'Silence’

// 4) updating document
kim.save();
