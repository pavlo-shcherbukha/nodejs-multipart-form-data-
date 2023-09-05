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
        //let r={ok: true, msg: result.data}
        //res.status(200).json( r);
        form.append('myfff', "vvvvv vvvv   vvvv" )
        const buff = Buffer.from( result.data, "utf-8");
        form.append('file', buff,'rssfile.xml' );
        //form.append('image', response.data, 'kitten.jpg');
        //res.setHeader('x-Content-Type', 'multipart/form-data; boundary='+form._boundary);
        var h=form.getHeaders()
        return axios( { method:  "post",
                        timeout: 60000,
                        url:  "http://localhost:8080/uploadermp",
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

