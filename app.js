var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
//var users = require('./routes/users');
//var gateway= require('./routes/gateway');
//var dbconfig = require('./routes/dbconfig');
//var sockettest = require('./routes/sockettest');
var linebot= require('./routes/linebot');
var lineImage= require('./routes/image');
var form1=require('./routes/form1');
var form1reg=require('./routes/form1reg')
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.engine('htm', require('ejs').renderFile);  //  <--追加
app.engine('html', require('ejs').renderFile);   //<--追加

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/image',express.static('local/image'));

app.use('/', routes);
//app.use('/users', users);
//app.use('/gateway',gateway);
//app.use('/dbconfig',dbconfig);
//app.use('/socket',sockettest);
app.use('/linebot',linebot);
app.use('/lineImage',lineImage);
app.use('/form1',form1);
app.use('/form1reg',form1reg);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
