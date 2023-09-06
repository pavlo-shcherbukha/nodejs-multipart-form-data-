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

      var infilename=null
      var infilemime=null
      var infileprop=null
      var infilecontent=null
      
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
            infilemime=file.headers["content-type"];
            infileprop=file
            infilecontent = fileContent
            fs.writeFileSync(`${uplodedstrg}/${file.originalFilename}`, fileContent );
            log.info(`Content is saved`);

      
          }) ;

          form.on('fields',  function( name, value ){
            log.info(`Processing fields: ${name}  ${value}`)

   
    
      
          }) ;

          form.on('close', function() {
            log.info('Upload completed!');

            if ( infilemime==='image/png'){
                return res.render('browse_content_mp.pug', {title: 'результат обробки файла от GIANOSa', data: {fname:   infileprop , fileptath: infileprop.originalFilename} })
            } else if (infilemime==='image/jpeg'){
              return res.render('browse_content_mp.pug', {title: 'результат обробки файла от GIANOSa', data: {fname:   infileprop , fileptath: infileprop.originalFilename} })
            } else if (infilemime==='text/plain'||infilemime==='application/json'|| infilemime==='application/xml'){
              return res.render('browse_content_mp_text.pug', {title: 'результат обробки файла от GIANOSa', data: {fname:   infileprop , text: infilecontent} })
            } else {

              return res.render('browse_content_mp_xz.pug', {title: 'результат обробки файла от GIANOSa', data: {fname:   infileprop } })
            }

           
  
          });


          form.parse(req);
        } 
        catch( err){

          log.error(`Global error ${err.message}`)
        }    

      //res.status(200).json( r);
    });


    router.get('/', function(req, res, next) {
      let r={ok: true, msg: "uploader"}
      //res.status(200).json( r);
      res.render('uploader_mp', {layout: true});
    });
    router.delete('/', function(req, res, next) {
      let r={ok: true, msg: "uploader"}
      res.status(200).json( r);
    });


    app.use('/uploader', router);
}

