const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressValidator = require('express-validator');
const config = require('./config');
const docs = require('./configs/docs');

const apiRouter = require('./routes/api');

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = config.get('PORT');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(docs);
app.use(express.static(path.join(__dirname, 'public')));

// register routes & middleware
app.use('/*', (req, res, next) => {
  req.io = io;
  next();
});
app.use('/api', apiRouter);

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

app.get('/', (req, res, next) => {
  return res.sendFile(`${__dirname}/views/index.html`);
});

io.on('connection', function(socket) {
  console.log('a user connected');
});

http.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;
