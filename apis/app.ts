import createError from 'http-errors';
import express from 'express';
import path from 'path';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
require('dotenv').config();

import usersRouter from './routes/users';
import apiRouter from './routes';
var app = express();

//  Mongo Connect String
let databaseUrl: string;

databaseUrl = process.env.MONGO_URL || 'mongodb://localhost/development';

// Connect To your Database
mongoose
  .connect(databaseUrl, { useNewUrlParser: true, useCreateIndex: true })
  .catch(err => err);
const db = mongoose.connection;

//  Handle Database Connection Error To Retry Connecting
db.on('error', () => {
  console.log('Connection Failed');
  let sec: number = 3;
  //  Set Interval to connect after 3 seconds
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
  console.log(`Connected to ${databaseUrl}`);
});

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/apis', apiRouter);

const clientDirectory = path.join(__dirname, '../../', '/build');

//  Forward All Routes By Default to React Build if In Production Mode
if (fs.existsSync(clientDirectory) && process.env.NODE_ENV === 'production') {
  console.log('Production Environment');
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
app.use(function(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err.status });
});

module.exports = app;
