const mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.MONGO_DB_SERVICE_HOST + '/yelp',
            {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.set('debug', true);

const express = require('express');
const app = express();
const port = 8080;

app.use('/api/business', require('./apis/business'));
app.use('/api/geodata', require('./apis/geodata'));

app.listen(port);
