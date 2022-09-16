const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      max: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    productNumber: {
      type: Number,
      required: true,
      trim: true, //valid number/decimal
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    categoryId: {
      type: ObjectId,
      required: true,
      ref: "Category",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", productSchema);
