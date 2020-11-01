const createError = require("http-errors");
const Car = require("../models/Car.model");
const ServiceResume = require("../models/Service.resume.model");
const User = require("../models/User.model");
const nodemailer = require("../config/mailer.config");

module.exports.list = (req, res, next) => {
  Car.find()
    .populate("serviceResumes")
    .then((car) => {
      res.json(car);
    })
    .catch((e) => next(e));
};

module.exports.listUserCars = (req, res, next) => {
  console.log(req.params.id);
  // {user: [req.params.id]}

  Car.find({ user: req.params.id })
    .populate("serviceResumes")
    .then((car) => {
      res.json(car);
    })
    .catch((e) => next(e));
};

module.exports.profile = (req, res, next) => {
  Car.findById(req.params.id)
    .populate("serviceResumes")
    .then((car) => {
      res.json(car);
    })
    .catch((e) => next(e));
};

module.exports.create = (req, res, next) => {
  const car = new Car({
    ...req.body,
    // user: req.session.user.id,
  });
  car
    .save()
    .then((c) => {
      res.status(201).json(c);
    })
    .catch((e) => next(e));
};

module.exports.delete = (req, res, next) => {
  Car.findById(req.params.id)

    .then((c) => {
      if (!c) {
        throw createError(404, "Car not found");
      } else {
        if (c.user != req.session.userId) {
          throw createError(403, "You cannot delete cars that aren't yours");
        } else {
          return c.delete().then(() => {
            User.findById(req.session.userId).then((u) => {
              console.log(u);
              nodemailer.sendDeleteCarEmail(u.name, u.email);
            });

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
      console.log(req.session);
      if (c.user != req.session.userId) {
        throw createError(403, "You can't edit another user's cars");
      } else {
        return c.update(req.body).then((editedCar) => {
          res.status(200).json(editedCar);
        });
      }
    })
    .catch((e) => next(e));
};
