var express = require('express');
var fs=require('fs');
var path=require('path');
var axios=require('axios')

module.exports = function (app) {
    var router = express.Router();
    var logger = app.get('logger');

    router.get('/', function(req, res, next) {
      log = logger.child({ label: 'load-rss' });
      const url = app.get('rssurl');
      return axios({
                      url: url,
                      method: 'GET',
                      headers: {"Content-Type": "application/json"} 
      })
      .then (result=>{
        let r={ok: true, msg: result.data}
        res.status(200).json( r);
  
      })
      .catch(err=>{
        let er={ok: false, msg: err.message}
         return res.status(422).json( er);
      });
  



    });


    app.use('/loadrss', router);
}

