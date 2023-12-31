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
      const url = app.get('rssurl');
      var form = new FormData();
      return axios({
                      url: url,
                      method: 'GET',
                      headers: {"Content-Type": "application/json"} 
      })
      .then (result=>{

        form.append('RSSURL',  app.get('rssurl') )
        const buff = Buffer.from( result.data, "utf-8");
        form.append('file', buff,'rssfile.xml' );

        u= app.get("beurl")
        var h=form.getHeaders()
        return axios( { method:  "post",
                        timeout: app.get('axiostimeout'),
                        url:  app.get("beurl") + "/uploader",
                        data:   form, 
                        headers: form.getHeaders()
                      }
                    );

      })
      .then( result=>{
        return res.status(200).end(result.data) 
      })
      .catch(err=>{
        let er={ok: false, msg: err.message}
         return res.status(422).json( er);
      });
  



    });


    app.use('/loadrss', router);
}

