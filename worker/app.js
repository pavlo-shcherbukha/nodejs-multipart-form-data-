var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var useragent = require('express-useragent');
var logger = require('morgan');
require('dotenv').config()
var  winston = require('./utils/winston');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('logger', winston);

const applogger = app.get('logger').child({ label: 'app' });
applogger.info("app logger added");

app.set('rssurl',  process.env.RSSURL )
app.set('axiostimeout',  parseInt(process.env.AXIOSTIMEOUT) )
app.set('beurl',  process.env.BEURL )

xx=app.get('beurl')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(useragent.express());

app.use(express.static(path.join(__dirname, 'public')));

applogger.info("Create Node Server");
applogger.info("making routers");

app.use('/', indexRouter);
app.use('/users', usersRouter);
require('./routes/loadrss')(app);
require('./routes/loadmulti')(app);
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
