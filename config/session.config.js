const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const SESSION_MAX_AGE_SECONDS = Number(process.env.SESSION_MAX_AGE_SECONDS) || 60 * 60 * 24 * 7;

module.exports = session({
  secret: process.env.SESSION_SECRET || 'Super Secret (change it)',
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: true, //en true para producción
    httpOnly: true,
    maxAge: SESSION_MAX_AGE_SECONDS * 1000,
    sameSite: 'none' // descomentar para producción
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: SESSION_MAX_AGE_SECONDS
  })
});
