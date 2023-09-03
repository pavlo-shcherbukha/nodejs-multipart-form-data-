var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Worker. Makes multipart form-data programmatically' });
});

module.exports = router;
