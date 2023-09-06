var express = require('express');
var multiparty = require('multiparty');
var fs=require('fs');
var path=require('path');


module.exports = function (app) {
    var router = express.Router();
    var logger = app.get('logger');
    router.post('/', function(req, res, next) {
      //var b = req.body;
      
      log = logger.child({ label: 'uploadermp-post' });
      var headers = req.headers;
      let r={ok: true, msg: "uploader", headers: headers}
      var form = new multiparty.Form();
      form.autoFiles=true;
      form.autoFields=true;
      form.uploadDir=app.get("upltemp");
      var uplodedstrg=app.get("uplstrg");

      var infiles=[]
      var infields=[]
      
      try{
          form.on('error',  function( error ){
            log.error('-on error: ' + error.message);
            var r={ok: false, message: error.message};
            return res.status(422).json(r)
         
          }) ;

          form.on('file',  function( name, file ){
            log.info(`Uploading file ${name}`);
            log.info(`Uploading file properties ${ JSON.stringify(file) }`);
            log.info(`Uploading file content type is `)
            fileContent = fs.readFileSync(  file.path);
            infilename=file.originalFilename;
            infiles.push({filename: file.originalFilename, filemime: file.headers["content-type"]})
            fs.writeFileSync(`${uplodedstrg}/${file.originalFilename}`, fileContent );
            log.info(`Content is saved`);

      
          }) ;

          form.on('field',  function( name, value ){
            log.info(`Processing fields: ${name}  ${value}`)
            infields.push({fieldname: name, fieldvalue: value})

   
    
      
          }) ;

          form.on('close', function() {
            log.info('Upload completed!');

              return res.render('browse_list.pug', {title: 'результат обробки файла от GIANOSa', data: {files: infiles, fields: infields } })
          });


          form.parse(req);
        } 
        catch( err){

          log.error(`Global error ${err.message}`)
        }    

      //res.status(200).json( r);
    });

    app.use('/uploadermu', router);
}

