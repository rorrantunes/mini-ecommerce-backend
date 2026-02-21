import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  price: {
    type: Number,
    required: true
  },
  thumbnail: {
    type: String,
    default: ""
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  stock: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    index: true
  },
  status: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export const ProductModel = mongoose.model("products", productSchema);