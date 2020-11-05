require('dotenv').config()

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')

require('./config/db.config');
const passportConfig = require('./config/passport.config')
const session = require('./config/session.config');
const cors = require('./config/cors.config')

/**
 * Configure express
 */
const app = express();
app.use(cors)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session);
app.use(passportConfig);

app.use((req, _, next) => {
  req.currentUser = req.session.user
  next()
})

/**
 * Configure routes
 */
const router = require('./config/routes.js');
app.use('/', router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

/** 
 * Listen on provided port
 */
const port = normalizePort(process.env.PORT || '3011');
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Helper functions

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
