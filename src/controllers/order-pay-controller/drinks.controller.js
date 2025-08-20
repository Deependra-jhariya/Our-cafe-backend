import { Drink } from "../../models/order-Pay-model/drinks.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadCloudinary } from "../../utils/cloudinary.js";
const addDrink = asyncHandler(async (req, res) => {
  const {name, price, size } = req.body;

  if (!name || !size || !price) {
    throw new ApiError(400, "All feild is required.");
  }


  const drinkImgLocalPath = req?.files?.img?.[0]?.path;
  console.log("drinkImgLocalPath", drinkImgLocalPath);

  if (!drinkImgLocalPath) {
    throw new ApiError(404, "drinkImgLocalPath is required. ");
  }

  const drinkImg = await uploadCloudinary(drinkImgLocalPath);

  if (!drinkImg) {
    throw new ApiError(404, "drinkImg not available.");
  }


  const createDrink = await Drink.create({ img:drinkImg?.url, name, price, size });

  if (!createDrink) {
    throw new ApiError(400, "Drink not found");
  }

  return res.status(200).json(new ApiResponse(200, "Drink added successfully"));
});

const fetchDrink = asyncHandler(async (req, res) => {
  const allDrinks = await Drink.find();

  if (!allDrinks) {
    throw new ApiError(404, "drinks not found.");
  }

  res
    .status(200)
    .json(new ApiResponse(200,allDrinks,"Drinks fetched successfully."));
});

export { addDrink, fetchDrink };
