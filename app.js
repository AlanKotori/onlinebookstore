var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('cookie-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var databaseRouter = require('./routes/database');
var userbaseRouter = require('./routes/userbase');
var apiRouter = require('./routes/api');
var bookbaseRouter = require('./routes/bookbase');
var buyingRouter = require('./routes/buying');
var searchbookRouter = require('./routes/searchbook');
var swiperbaseRouter = require('./routes/swiperbase');
var cartRouter = require('./routes/cart');
const { request } = require('express');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static',express.static(path.join(__dirname,'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/database',databaseRouter);
app.use('/userbase',userbaseRouter);
app.use('/api',apiRouter);
app.use('/bookbase',bookbaseRouter);
app.use('/buying',buyingRouter);
app.use('/searchbook',searchbookRouter);
app.use('/swiperbase',swiperbaseRouter);
app.use('/cart',cartRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(session({
  keys:['secret'],
  maxAge:1000*60*30
}))

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
