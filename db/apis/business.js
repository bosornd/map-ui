const express = require('express');
const router = express.Router();

const Business = require('../models/business');

router.get('/search', function(request, response) {
  console.log(request.query.keyword);
  Business.findByKeyword(request.query.keyword)
          .sort({stars: -1}).limit(10).exec(function(error, result){
    if (error) return response.status(500).json(error);
    return response.json(result);
  });
});

router.get('/:id', function(request, response) {
  Business.findByID(request.params.id).exec(function(error, result){
    if (error) return response.status(500).json(error);
    return response.json(result[0]);
  });
});
// 순서가 중요하다.

module.exports = router;
