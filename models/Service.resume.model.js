const mongoose = require("mongoose");
const User = require("./User.model");
const ReviewService = require("./Review.service.model");
const Car = require("./Car.model");

const serviceResumeSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
    },

    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
    services: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Service",
        },
      ],
    },
    user: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    active:{
      type: Boolean,
      default: true
    }, 
    workshop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workshop",

    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (document, toReturn) => {
        toReturn.id = document._id;
        delete toReturn.__v;
        delete toReturn._id;
        delete toReturn.createdAt;
        delete toReturn.updatedAt;
        return toReturn;
      },
    },
  }
);

serviceResumeSchema.virtual("reviewService", {
  ref: "ReviewService",
  foreignField: "serviceResume",
  localField: "_id",
});



const ServiceResume = mongoose.model("ServiceResume", serviceResumeSchema);

module.exports = ServiceResume;
