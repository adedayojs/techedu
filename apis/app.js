var createError = require('http-errors');
var express = require('express');
var path = require('path');
const fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const apiRouter = require('./routes/apis');

var app = express();
const databaseUrl = process.env.MONGO_URL;
mongoose
  .connect(databaseUrl, { useNewUrlParser: true, useCreateIndex: true })
  .catch(err => err);
const db = mongoose.connection;
db.on('error', () => {
  console.log('Connection Failed');
  let sec = new Number(3);
  let retry = setInterval(() => {
    if (sec > 0) {
      console.log(`Retrying In ${sec} Second(s)`);
    } else {
      console.log('Retrying Now......');
      clearInterval(retry);
      mongoose
        .connect(databaseUrl, { useNewUrlParser: true, useCreateIndex: true })
        .catch(err => err);
    }
    sec--;
  }, 1000);
});
db.once('open', function() {
  console.log('Connection Successfully Established');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/apis', apiRouter);

const clientDirectory = path.join(__dirname, '../', '/build');

if (fs.existsSync(clientDirectory) && process.env.NODE_ENV === 'production') {
  app.use(express.static(clientDirectory));
  app.get('/*', (_req, res) => {
    res.sendFile(path.join(clientDirectory, 'index.html'));
  });
}

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
