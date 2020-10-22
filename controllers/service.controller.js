const Service = require("../models/Service.model");
const ReviewService = require("../models/Review.service.model");
const createError = require("http-errors");

module.exports.list = (req, res, next) => {
  Service.find()
  .populate("users")
    
    .then((services) => {
      res.json(services);
    })
    .catch((e) => next(e));
};

module.exports.show = (req, res, next) => {
  Service.findById(req.params.id)
    .populate("reviewServices")
    .populate("users")
    .then((service) => {
      res.json(service);
    })
    .catch((e) => next(e));
};

module.exports.create = (req, res, next) => {
  const service = new Service({
    ...req.body,
    user: req.session.user.id,
    image: req.file ? req.file.path : undefined
  });
  service
    .save()
    .then((p) => {
      res.json(p);
    })
    .catch((e) => next(e));
};

module.exports.edit = (req, res, next) => {
  Service.findById(req.params.id)
  
    .then((s) => {
      // if (s.user != req.currentUser.id) {
      //   throw createError(403, "You can't edit another user's services");
      // } else {
        console.log('aaaa')
        return s.update(req.body).then((editedService) => {
          res.json(editedService);
        });
      // }
    })
    .catch((e) => next(e));
};

module.exports.delete = (req, res, next) => {
  Service.findById(req.params.id)
  
    .then((s) => {
      console.log(s, 'aaaa')
      if (!s) {
        throw createError(404, "Service not found");
      } else {
        if (s.user != req.currentUser.id) {
          throw createError(
            403,
            "You cannot delete services that aren't yours"
          );
        } else {
          return s.delete().then(() => {
            return Review.remove({ service: s.id }).then((r) => {
              res.json({});
            });
          });
        }
      }
    })
    .catch((e) => next(e));
};

