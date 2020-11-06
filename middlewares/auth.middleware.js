const createError = require('http-errors');

module.exports.isAuthenticated = (req, _, next) => {
  console.log(req.session)
  if (req.session.userId) {
    next()
  } else {
    next(createError(401))
  }
}

module.exports.isNotAuthenticated = (req, _, next) => {
  console.log(req.session)
  if (req.session.userId) {
    next(createError(403))
  } else {
    next()
  }
}
