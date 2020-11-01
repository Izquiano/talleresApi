const ServiceResume = require("../models/Service.resume.model");
const ReviewService = require("../models/Review.service.model");
const Workshop = require("../models/Workshop.model");
const User = require("../models/User.model");

const nodemailer = require("../config/mailer.config");

const createError = require("http-errors");

module.exports.list = (req, res, next) => {
  ServiceResume.find()
    .populate("reviewService")
    .populate("services")

    .then((services) => {
      res.json(services);
    })
    .catch((e) => next(e));
};

module.exports.listByUser = (req, res, next) => {
  const { id } = req.params;
  ServiceResume.find({ user: id })
    .sort({ date: -1 })
    // .populate('reviewService')
    .populate({
      path: "services",
      populate: {
        path: "workshop",
      },
    })
    .populate("car")
    .populate("workshop")

    .then((servicesResume) => {
      // console.log("User Services Resume: " + servicesResume)
      res.json(servicesResume);
    })
    .catch((e) => next(e));
};

module.exports.create = (req, res, next) => {
  const serviceResume = new ServiceResume(
    req.body
    // user: req.session.user.id,
  );
  serviceResume
    .save()
    .then((sr) => {
      console.log(sr)
      
      Workshop.findById(sr.workshop).then((w) => {
        User.findById(req.session.userId).then((u) => {
          ServiceResume.findById(sr.id)
          .populate("services")
          .populate("car")
          .populate("user")
          .populate("workshop").then ((parte) => {
            
          nodemailer.sendCreatedServiceResumeToWorkshop(
            
            
            u,
            parte
          );
          nodemailer.sendCreatedServiceResumeToUser(
           
            u,
            parte
          );

          })
          
        });
      });

      res.json(sr);
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

module.exports.serviceResumeDetail = (req, res, next) => {
  console.log(req.params.id);
  ServiceResume.findById(req.params.id)
    // .populate('reviewService')
    .populate("services")
    .populate("car")
    .populate("user")
    .populate("workshop")

    .then((serviceResume) => {
      res.json(serviceResume);
    })
    .catch((e) => next(e));
};
