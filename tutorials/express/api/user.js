const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', function(request, response) {
  User.find(function(error, result){
    if (error) return response.status(500).json(error);
    return response.json(result);
  });
});

router.get('/search', function(request, response) {
  User.findByName(request.query.name).exec(function(error, result){
    if (error) return response.status(500).json(error);
    return response.json(result);
  });
});

module.exports = router;
