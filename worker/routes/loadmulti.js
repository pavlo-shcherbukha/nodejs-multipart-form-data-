var express = require('express');
var fs=require('fs');
var path=require('path');
var axios=require('axios')
var FormData=require("form-data")

module.exports = function (app) {
    var router = express.Router();
    var logger = app.get('logger');

    router.get('/', function(req, res, next) {
      log = logger.child({ label: 'load-rss' });

      var form = new FormData();
      form.append("description","Load number of files")
      form.append("text", "free text")
      form.append('file', fs.createReadStream('public/images/cpic-1.jpg'), 'cpic-1.jpg');
      form.append('file', fs.createReadStream('public/images/cpic-2.jpg'), 'cpic-2.jpg');
      var h=form.getHeaders()
      return axios( { method:  "post",
                        timeout: app.get('axiostimeout'),
                        url:  app.get("beurl") + "/uploadermu",
                        data:   form, 
                        headers: form.getHeaders()
                      }
                    )
      .then( result=>{
        return res.status(200).end(result.data) 
      })
      .catch(err=>{
        let er={ok: false, msg: err.message}
         return res.status(422).json( er);
      });
  



    });


    app.use('/loadmulti', router);
}

