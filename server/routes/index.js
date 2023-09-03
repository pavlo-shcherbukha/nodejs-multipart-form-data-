var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'server upload files using multypart/form-data' });
});

module.exports = router;
