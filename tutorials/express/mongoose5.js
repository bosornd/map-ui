const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

const express = require('express');
const app = express();
const port = 3000;

app.use('/api/user', require('./api/user'));

app.listen(port);
