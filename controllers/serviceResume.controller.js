const ServiceResume = require("../models/Service.resume.model");
const ReviewService = require("../models/Review.service.model");

const createError = require("http-errors");

module.exports.list = (req, res, next) => {
  ServiceResume.find()
  .populate('reviewService')
  .populate("services")
    
    .then((services) => {
      res.json(services);
    })
    .catch((e) => next(e));
};


module.exports.create = (req, res, next) => {
  const serviceResume = new ServiceResume(
    req.body,
    // user: req.session.user.id,
  );
  serviceResume
    .save()
    .then((p) => {
      res.json(p);
    })
    .catch((e) => next(e));
};

module.exports.edit = (req, res, next) => {
  
  ServiceResume.findById(req.params.id)
      .then((rs) => {
      
        if (rs.user != req.currentUser.id) {
          throw createError(403, "You can't edit another user's Service Resume");
        } else {
            return rs.update(req.body).then((editedServiceResume) => {
            res.json(editedServiceResume);
          });
        }
      })
      .catch((e) => next(e));
};