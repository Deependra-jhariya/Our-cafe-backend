import mongoose from "mongoose";

const drinksSchema = new mongoose.Schema(
  {
    img: {
      type: String,
    },
    name: {
      type: String,
      require: true,
    },
    size: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
  },

  { timestamps: true }
);

export const Drink = mongoose.model("Dinks", drinksSchema);
