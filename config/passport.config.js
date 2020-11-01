const passport = require("passport");
const User = require("../models/User.model");
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const randomPassword = () => Math.random().toString(36).substring(7)


const google = new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google",
  scope: ['https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
  ]
},
(accessToken, refreshToken, profile, done) => {
  // to see the structure of the data in received response:
  console.log("Google account details:", profile);

  User.findOne({ email: profile.emails[0].value })
      .then(user => {

          if (user) {
              done(null, user);
              return;
          } else {
              const newUser = new User({
                 
                  
                  name: profile.displayName,
                  
                  email: profile.emails[0].value,
                  password: profile.provider + Math.random().toString(36).substring(7),
                  activation: {
                     active: true
                  }

              });
              newUser
                  .save()
                  .then((user) => {
                      done(null, user);
                  })
                  .catch((err) => done(err));
          }
      })
      .catch(err => done(err)); // closes User.findOne()
}
)


const facebook = new FacebookStrategy({

  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: "/auth/facebook",
  profileFields: ['id', 'displayName', 'name', 'gender', 'photos', 'emails'],
  scope: ['email']

},
(accessToken, refreshToken, profile, next) => {

  User.findOne({ "social.facebookID": profile.id })
      .then((user) => {
          if (user) {
              next(null, user);
          } else {

              const newUser = new User({
                  name: profile.displayName,
                  email: profile.emails[0].value,
                  password: profile.provider + randomPassword(),
                  social: {
                      facebook: profile.id,
                  },
                  activation: {
                      active: true
                  }
              });

              newUser
                  .save()
                  .then((user) => {
                      next(null, user);
                  })
                  .catch((err) => next(err));
          }
      })
      .catch((err) => next(err));
}
);

passport.serializeUser(function(user, next) {
next(null, user);
});
passport.deserializeUser(function(user, next) {
next(null, user);
});

passport.use(facebook)
passport.use(google)
module.exports = passport.initialize()
