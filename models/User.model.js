const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const ReviewServices = require("./Review.service.model");
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const SALT_WORK_FACTOR = 10;

const generateRandomToken = () => {
  const characters =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let token = "";
  for (let i = 0; i < 25; i++) {
      token += characters[Math.floor(Math.random() * characters.length)];
  }
  return token;
};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [EMAIL_PATTERN, "Email is not valid"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [10, "Password must have 10 characters or more"],
    },
    activation: {
      active: {
          type: Boolean,
          default: false,
      },
      token: {
          type: String,
          default: generateRandomToken,
      },
    },
    social: {
        googleID: String,
        facebookID: String,
    },

      
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (document, toReturn) => {
        toReturn.id = document._id;
        delete toReturn.password;
        delete toReturn.__v;
        delete toReturn._id;
        delete toReturn.createdAt;
        delete toReturn.updatedAt;
        return toReturn;
      },
    },
  }
);

userSchema.virtual('car', {
  ref: 'Car',
  foreignField: 'user',
  localField: '_id'
})
 
userSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    // Hash password
    bcrypt
      .genSalt(SALT_WORK_FACTOR)
      .then((salt) => {
        return bcrypt.hash(user.password, salt).then((hash) => {
          user.password = hash;
          next();
        });
      })
      .catch((e) => next(e));
  } else {
    next(); 
  }
});



 

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.post("remove", function(next) {
  Promise.all([
      ReviewServices.deleteMany({ user: this._id }),
  ]).then(next);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
