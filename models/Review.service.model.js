const mongoose = require("mongoose");
const User = require("./User.model");
const ServiceResume = require("./Service.resume.model");

const reviewServiceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    score: {
      type: Number,
      get: (v) => Math.round(v),
      set: (v) => Math.round(v),
      required: [true, "Score is required"],
    },
    serviceResume: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ServiceResume",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    car:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Car",
    }
  },
  {
    timestamps: true,
    toJSON: {
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

const ReviewService = mongoose.model("ReviewService", reviewServiceSchema);

module.exports = ReviewService;
