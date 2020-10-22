const createError = require("http-errors");
const Car = require("../models/Car.model");
const ServiceResume = require("../models/Service.resume.model");



module.exports.list = (req, res, next) => {
  
  Car.find()
  .populate('serviceResumes')
    .then((car) => {
      res.json(car);
    }) 
    .catch((e) => next(e));
          
};

module.exports.profile = (req, res, next) => {
  
  Car.findById(req.params.id)
  .populate('serviceResumes')
    .then((car) => {
      res.json(car);
    }) 
    .catch((e) => next(e));
          
};

module.exports.create = (req, res, next) => {
  const car = new Car({
    ...req.body,
    user: req.session.user.id,
  });
  car
    .save()
    .then((c) => {
      res.json(c);
    })
    .catch((e) => next(e));
};


module.exports.delete = (req, res, next) => {
  
  Car.findById(req.params.id)
  
    .then((c) => {
      
      if (!c) {
        throw createError(404, "Service not found");
      } else {
        if (c.user != req.currentUser.id) {
          throw createError(
            403,
            "You cannot delete services that aren't yours"
          );
        } else {
          return c.delete().then(() => {
            return ServiceResume.remove({ car: c.id }).then((r) => {
              res.json({});
            });
          });
        }
      }
    })
    .catch((e) => next(e));
};

module.exports.edit = (req, res, next) => {
  Car.findById(req.params.id)
  
    .then((c) => {
      if (c.user != req.currentUser.id) {
        throw createError(403, "You can't edit another user's services");
      } else {
          return c.update(req.body).then((editedCar) => {
          res.json(editedCar);
        });
      }
    })
    .catch((e) => next(e));
};