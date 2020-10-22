const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Service = require("../models/Service.model");

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const generateRandomToken = () => {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let token = "";
  for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }
  return token;
};

const workshopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name needs at last 3 chars"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [EMAIL_PATTERN, "Email is invalid"],
    },
    telephone: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    location: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
    
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


workshopSchema.virtual('services', {
  ref: 'Service',
  foreignField: 'workshop',
  localField: '_id' 
})

workshopSchema.post("remove", function (next) {
  Promise.all([
    Service.deleteMany({ workshop: this._id}),
  ]).then(next);
});



const Workshop = mongoose.model("Workshop", workshopSchema);

module.exports = Workshop;
