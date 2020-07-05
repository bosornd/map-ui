const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yelp',
            {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.set('debug', true);

const express = require('express');
const app = express();
const port = 3000;

app.use('/api/business', require('./api/business'));
app.use('/api/geodata', require('./api/geodata'));

app.listen(port);
