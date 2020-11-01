const express = require("express");
const router = express.Router();
const upload = require('../config/multer.config');
const authMiddleware = require("../middlewares/auth.middleware");
const baseController = require("../controllers/base.controller");
const userController = require("../controllers/user.controller");
const serviceController = require("../controllers/service.controller");
const reviewServiceController = require("../controllers/review.service.controller");
const workshopController = require("../controllers/workshop.controller");
const carController = require("../controllers/car.controller");
const serviceResumeController = require("../controllers/serviceResume.controller");

module.exports = router;

router.get("/", authMiddleware.isNotAuthenticated, baseController.index);

// Workshops
router.get(
  "/workshops",
  // authMiddleware.isAuthenticated,
  workshopController.list
);



// Services
router.get(
  "/services",
  // authMiddleware.isAuthenticated,
  serviceController.list
);
router.post(
  "/services",
  // authMiddleware.isAuthenticated, upload.single('image')
  serviceController.create
);
router.get(
  "/services/:id",
  // authMiddleware.isAuthenticated,
  serviceController.show
);
router.patch(
  "/services/:id",
  // authMiddleware.isAuthenticated,
  serviceController.edit
);
router.delete(
  "/services/:id",
  // authMiddleware.isAuthenticated,
  serviceController.delete
);

// Users
router.post(
  "/login", 
  authMiddleware.isNotAuthenticated, 
  userController.login
);

router.get(
  "/logout",
  authMiddleware.isAuthenticated,
  userController.logout
);

router.get(
  "/users",
  // authMiddleware.isAuthenticated,
  userController.list
);

router.get(
  "/user/:id",
  // authMiddleware.isAuthenticated,
  userController.profile
);
router.patch(
  "/user/:id",
  // authMiddleware.isAuthenticated,
  userController.editProfile
);

router.post(
  "/signup",
  authMiddleware.isNotAuthenticated,
  userController.createUser
);

router.get(
  "/users/:id/activate/:token",
  authMiddleware.isNotAuthenticated,
  userController.activateUser
);

router.get('/auth/google', authMiddleware.isNotAuthenticated, userController.doSocialLoginGoogle);

// Cars
router.get(
  "/cars",
  // authMiddleware.isAuthenticated,
  carController.list
);

router.post(
  "/cars",
  // authMiddleware.isAuthenticated,
  carController.create
);
router.get(
  "/cars/:id",
  // authMiddleware.isAuthenticated,
  carController.profile
);
router.get(
  "/user/cars/:id",
  // authMiddleware.isAuthenticated,
  carController.listUserCars
);

router.patch(
  "/cars/:id",
  // authMiddleware.isAuthenticated,
  carController.edit
);
router.delete(
  "/cars/:id",
  // authMiddleware.isAuthenticated,
  carController.delete
);

// Services Resume

router.post(
  "/services-resume",
  // authMiddleware.isAuthenticated,
  serviceResumeController.create
);
router.get(
  "/services-resume",
  // authMiddleware.isAuthenticated,
  serviceResumeController.list
);
router.patch(
  "/services-resume/:id",
  // authMiddleware.isAuthenticated,
  serviceResumeController.edit
);
router.get(
  "/services-resume/:id",
  // authMiddleware.isAuthenticated,
  serviceResumeController.listByUser
)
router.get(
  "/services-resume/detail/:id",
  // authMiddleware.isAuthenticated,
  serviceResumeController.serviceResumeDetail
)
router.delete(
  "/services-resume/delete/:id",
  // authMiddleware.isAuthenticated,
  serviceResumeController.delete
)


// Review Services
router.get(
  "/review-service",
  // authMiddleware.isAuthenticated,
  reviewServiceController.list
);

router.post(
  "/service/:id/review",
  authMiddleware.isAuthenticated,
  reviewServiceController.createReview
);
router.get(
  "/review-service/:id",
  authMiddleware.isAuthenticated,
  reviewServiceController.detail
);
router.patch(
  "/review-service/:id",
  authMiddleware.isAuthenticated,
  reviewServiceController.editReview
);
router.delete(
  "/review-service/:id",
  authMiddleware.isAuthenticated,
  reviewServiceController.deleteReview
);
