const createError = require("http-errors");
const Workshop = require("../models/Workshop.model");



module.exports.list = (req, res, next) => {
  
  Workshop.find()
  .populate('services')
    .then((workshop) => {
      res.json(workshop);
    })
    .catch((e) => next(e));
          
};