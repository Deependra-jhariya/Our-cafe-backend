import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  volume: {
    type: String,
  },
  price: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
  },
});

const cartItemSchema = new mongoose.Schema({
  menuItems: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem",
  },
  size: [sizeSchema],
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    item: [cartItemSchema],
    totalPrice: {
      type: Number,
      default: 0,
    },
  },

  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
