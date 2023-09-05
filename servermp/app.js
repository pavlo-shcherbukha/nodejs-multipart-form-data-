var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var useragent = require('express-useragent');
var logger = require('morgan');
var fileUpload = require('express-fileupload');

require('dotenv').config()
var winston = require('./utils/winston');
var apputils = require('./utils/apputils');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('logger', winston);



app.set('upltemp', path.join(__dirname, process.env.UPLOAD_TMP))
app.set('uplstrg', path.join(__dirname, process.env.UPLOAD_STORE))
app.set('useTempFiles', apputils.stringToBoolean(process.env.EXPR_USETEMPFILES))

const applogger = app.get('logger').child({ label: 'app' });
applogger.info("app logger added");



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(useragent.express());

// File upload configuration

app.use(fileUpload( 
                    { 
                      useTempFiles: app.get('useTempFiles'), 
                      tempFileDir: app.get('upltemp'), 
                      debug: true, 
                      limits: { fileSize: 50 * 1024 * 1024 }  
                    }
                  )
);





app.use(express.static(path.join(__dirname, 'public')));





applogger.info("Create Node Server");

applogger.info("making routers");
app.use('/', indexRouter);
app.use('/users', usersRouter);
require('./routes/uploader_mp')(app);
require('./routes/uploader_smpl')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
