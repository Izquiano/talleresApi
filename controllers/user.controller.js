const createError = require("http-errors");
const User = require("../models/User.model");
const nodemailer = require("../config/mailer.config");
const passport = require("passport");
const mongoose = require("mongoose");

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    
    throw createError(400, "Missing credentials");
  }
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        // res.status(400).json({})
        throw createError(400, "Wrong credentials");
      } else {
        return user.checkPassword(password).then((match) => {
          if (!match) {
            throw createError(400, "Wrong credentials");
          } else {
            if (user.activation.active) {
              req.session.userId = user._id;

              // req.session.user = user;
              console.log(req.session.userId);
              res.json(user);
            } else {
              throw createError(
                400,
                "Your account is not active, check your email!"
              );
            }
          }
        });
      }
    })
    .catch((e) => {
      next();
    });
};

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  res.status(204).json();
};

module.exports.profile = (req, res, next) => {
  User.findById(req.params.id)
    .populate("car")

    .then((u) => {
      if (u._id != req.session.userId) {
        throw createError(403, "You can't view another user's profile");
      } else {
        res.status(200).json(u);
      }
    })
    .catch((err) => console.log(err));
};

module.exports.editProfile = (req, res, next) => {
  User.findById(req.params.id)

    .then((u) => {
      if (u._id != req.session.userId) {
        throw createError(403, "You can't edit another user's profile");
      } else {
        return u.update(req.body).then((editedProfile) => {
          res.json(editedProfile);
        });
      }
    })
    .catch((e) => next(e));
};

module.exports.list = (req, res, next) => {
  User.find()
    .populate("car")
    .then((users) => {
      res.json(users);
    })
    .catch((e) => next(e));
};

module.exports.activateUser = (req, res, next) => {
  User.findOne({ "activation.token": req.params.token })
    .then((user) => {
      user.activation.active = true;
      user
        .save()
        .then((user) => {
          res.send(`<h2>Bienvenido ${user.name}</h2>
          <p>Gracias por activar su cuenta</p>
          <p>Vuelva a la App Talleres para hacer login</p>
          <a href="${process.env.APP_TALLERES_URL}/login">APP TALLERES</a>
          
          `);
        })
        .catch((e) => next);
    })
    .catch((e) => next);
};

module.exports.createUser = (req, res, next) => {
  const user = new User(req.body);

  user
    .save()

    .then((user) => {
      nodemailer.sendValidationEmail(
        user.name,
        user.email,
        user._id,
        user.activation.token
      );
      res.status(201).json(user);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.send({ error: error.errors, user });
      } else if (error.code === 11000) {
        // error when duplicated user

        res.json(error);
      } else {
        next(error);
      }
    })
    .catch(next);
};

// module.exports.doSocialLoginFacebook = (req, res, next) => {
//   const passportController = passport.authenticate(
//     "facebook",
//     (error, user) => {
//       if (error) {
//         next(error);
//       } else {
//         req.session.userId = user._id;
//         res.json(user);
//       }
//     }
//   );

//   passportController(req, res, next);
// };

module.exports.doSocialLoginGoogle = (req, res, next) => {
  const passportController = passport.authenticate("google", (error, user) => {
    if (error) {
      next(error);
    } else {
      req.session.userId = user._id;
      res.json(user);
    }
  });

  passportController(req, res, next);
};
