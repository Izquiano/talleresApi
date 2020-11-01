const mongoose = require("mongoose");
const User = require("./User.model");
const Workshop = require("./Workshop.model");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      enum: [],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Chapa y pintura", "Mecánica y mantenimiento"],
    },
    description: {
      type: String,
    },
    price: {
      type: String,
      required: [true, "Price is required"],
    },
    image: String,
    workshop: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workshop" }],
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

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
