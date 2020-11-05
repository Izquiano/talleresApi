const ServiceResume = require("../models/Service.resume.model");
const ReviewService = require("../models/Review.service.model");
const Workshop = require("../models/Workshop.model");
const User = require("../models/User.model");

const nodemailer = require("../config/mailer.config");

const createError = require("http-errors");

module.exports.list = (req, res, next) => {
  ServiceResume.find()
  .sort({ active: -1, date: -1 })
  .populate({
    path: "services",
    populate: {
      path: "workshop",
    },
  })
  .populate("car")
  .populate("user")
  .populate({
    path: "workshop",
    populate:{
      path: "services"
    }
  })
    .then((servicesResume) => {
      res.json(servicesResume);
    })
    .catch((e) => next(e));
};

module.exports.listByUser = (req, res, next) => {
  const { id } = req.params;
  ServiceResume.find({ user: id })
    .sort({ active: -1, date: -1 })
    .populate({
      path: "services",
      populate: {
        path: "workshop",
      },
    })
    .populate("car")
    .populate("workshop")

    .then((servicesResume) => {
      res.json(servicesResume);
    })
    .catch((e) => next(e));
};

module.exports.create = (req, res, next) => {
  const serviceResume = new ServiceResume(req.body);
  serviceResume
    .save()
    .then((sr) => {
      Workshop.findById(sr.workshop).then((w) => {
        User.findById(req.session.userId).then((u) => {
          ServiceResume.findById(sr.id)
            .populate("services")
            .populate("car")
            .populate("user")
            .populate("workshop")
            .then((parte) => {
              nodemailer.sendCreatedServiceResumeToWorkshop(u, parte);
              nodemailer.sendCreatedServiceResumeToUser(u, parte);
            });
        });
      });

      res.json(sr);
    })
    .catch((e) => next(e));
};

module.exports.edit = (req, res, next) => {
  ServiceResume.findById(req.params.id)
    .then((rs) => {
      if (rs.user != req.session.userId) {
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
    .populate("services")
    .populate("car")
    .populate("user")
    .populate("workshop")
    .then((serviceResume) => {
      res.json(serviceResume);
    })
    .catch((e) => next(e));
};

module.exports.delete = (req, res, next) => {
  ServiceResume.findById(req.params.id)
  
  .populate("workshop")
  
  .populate("user")
    .then((sr) => {
      console.log(sr)
      if (!sr) {
        throw createError(404, "Service Resume not found");
      } else {
        if (sr.user._id != req.session.userId) {
          throw createError(
            403,
            "You cannot delete Services Resume that aren't yours"
          );
        } else {
          nodemailer.sendDeleteResumeToUser(sr.user, sr.workshop.name, sr.date);
          return sr.delete().then(() => {
            
            res.status(200).json({})
          });
        }
      }
    })
    .catch((e) => next(e));
};

module.exports.cerrarParte = (req, res, next) => {
  ServiceResume.findById(req.params.id)

    .then((sr) => {
      if (!sr) {
        throw createError(404, "Service Resume not found");
      } else {
          return sr.update({ active: false }).then((srClosed) => {
            res.status(201).send(`<div>Parte Cerrado correctamente</div>`)
          })
      }
    })
    
    .catch((e) => next(e));
};
