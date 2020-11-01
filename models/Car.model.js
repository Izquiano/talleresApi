const mongoose = require("mongoose");
const User = require("./User.model");
const ServiceResume = require("./Service.resume.model");

const carSchema = new mongoose.Schema(
  {
    carBrand: {
      type: String,
      required: [true, "Car Brand is required"],
    },
    model: {
      type: String,
      required: [true, "Model is required"],
    },
    year: {
      type: String,
      required: [true, "Year is required"],
    },
    registration: {
      type: String,
      required: [true, "Registration is required"],
    },
    frameNumber: {
      type: String,
      required: [true, "Chasis Number is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    
    
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

carSchema.virtual('serviceResumes', {
  ref: 'ServiceResume',
  foreignField: 'car',
  localField: '_id'
})


const Car = mongoose.model("Car", carSchema);

module.exports = Car;
