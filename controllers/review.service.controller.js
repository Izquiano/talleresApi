const ServiceResume = require("../models/Service.resume.model");
const ReviewService = require("../models/Review.service.model");
const createError = require("http-errors");




module.exports.list = (req, res, next) => {
  ReviewService.find()
    .then((rs) => {
      res.json(rs);
    })
    .catch((e) => next(e));
};



module.exports.createReview = (req, res, next) => {
  ServiceResume.findById(req.params.id)
    .then((rs) => {
      if (!rs) {
        throw createError(404, "Service not found");
      } else {
        if (rs.user === req.currentUser.id) {
          throw createError(
            403,
            "You cannot leave reviews for your own product"
          );
        } else {
          const review = new ReviewService({
            ...req.body,
            user: req.currentUser.id,
            serviceResume: rs.id
          });
          return review.save().then((rs) => {
            res.json(rs);
          });
        }
      }
    })
    .catch((e) => next(e));
};


module.exports.detail = (req, res, next) => {
  ReviewService.findById(req.params.id)
    .then((rs) => {
      if (!rs) {
        throw createError(404, "Review not found");
      } else {
        
          res.json(rs);
        
      }
    })
    .catch((e) => next(e));
};

module.exports.deleteReview = (req, res, next) => {
  ReviewService.findById(req.params.id)
    .then((r) => {
      if (!r) {
        throw createError(404, "Review not found");
      } else {
        if (r.user != req.currentUser.id) {
          throw createError(403, "You cannot delete another user's reviews");
        } else {
          return r.delete().then((r) => {
            res.json({});
          });
        }
      }
    })
    .catch((e) => next(e));
};


module.exports.editReview = (req, res, next) => {
  ReviewService.findById(req.params.id)
  
    .then((r) => {
      if (r.user != req.currentUser.id) {
        throw createError(403, "You can't edit another user's reviews");
      } else {
          return r.update(req.body).then((editedReview) => {
          res.json(editedReview);
        });
      }
    })
    .catch((e) => next(e));
};