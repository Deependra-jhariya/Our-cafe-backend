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
    type: Number,
    required: true,
  },
  calories: {
    type: Number,
  },
});

const ingredientsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
  },
  isOptional: {
    type: Boolean,
    default: false,
  },
});

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
    image: {
      type: String,
      required: true,
    },
    sizes: [sizeSchema],
    ingredients: [ingredientsSchema],
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

export { MenuItem };
