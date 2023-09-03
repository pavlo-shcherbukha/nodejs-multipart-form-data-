var express = require('express');
var fs=require('fs');
var path=require('path');


module.exports = function (app) {
    var router = express.Router();
    var logger = app.get('logger');
    router.post('/', function(req, res, next) {
      //var b = req.body;
      
        log = logger.child({ label: 'uploaderxmpl-post' });
        var headers = req.headers;
        try{
          if(!req.files){
            res.status(400).json({error_code:1,err_desc:"No file passed"});
            return;
          }
          var rawdata = req.files.file.data ;
          log.info(`Uploading file  ${req.files.file.name}`);
          fs.writeFileSync(app.get('uplstrg')+'/'+req.files.file.name,  rawdata);
          return res.status(200).json({  ok: 'true', 
                                          status: 200, 
                                          data:  { 
                                                  fname: req.files.file.name,
                                                  fsize: req.files.file.size,
                                                  fmime: req.files.file.mimetype,
                                                  ftemp: req.files.file.tempFilePath
                                                }}
                                    ) ;        
        }
        catch( err){

          log.error(`Global error ${err.message}`)
          res.status(400).json({error_code:1,err_desc: err.message});
        }    


    });


    router.get('/', function(req, res, next) {
      let r={ok: true, msg: "uploader_smpl"}
      //res.status(200).json( r);
      res.render('uploader_smpl', {layout: true});
    });
    router.delete('/', function(req, res, next) {
      let r={ok: true, msg: "uploader"}
      res.status(200).json( r);
    });


    app.use('/uploadersmpl', router);
}

