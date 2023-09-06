var express = require('express');
var fs=require('fs');
var path=require('path');


module.exports = function (app) {
    var router = express.Router();
    var logger = app.get('logger');
    router.post('/', function(req, res, next) {
        var b = req.body;
        log = logger.child({ label: 'uploaderxmpl-post' });
        var headers = req.headers;
        var filelist=[]
        try{
          if(!req.files){
            res.status(400).json({error_code:1,err_desc:"No file passed"});
            return;
          }
          for (const item of  req.files.file) {
          
                //console.log(item, index);
            
              log.info(`Uploading file  ${item.name}`);
              useTempFiles=app.get('useTempFiles')
              if (useTempFiles){
                  fs.copyFileSync( item.tempFilePath, app.get('uplstrg')+'/'+item.name);              
              } 
              else {
                  var rawdata = item.data ;
                  fs.writeFileSync(app.get('uplstrg')+'/'+item.name,  rawdata);
              }
              filelist.push(
                { 
                  fname: item.name,
                  fsize: item.size,
                  fmime: item.mimetype,
                  ftemp: item.tempFilePath
                }

              )
          }    
          /*
          return res.status(200).json({  ok: 'true', 
                                          status: 200, 
                                          data:  {files: filelist, fields: b }
                                      }
                                    ) ;      
          */                          
          return res.render('browse_list.pug', {title: 'Results', data: {files: filelist, fields: b } })                                      
        }
        catch( err){

          log.error(`Global error ${err.message}`)
          res.status(400).json({error_code:1,err_desc: err.message});
        }    


    });





    app.use('/uploadermu', router);
}

