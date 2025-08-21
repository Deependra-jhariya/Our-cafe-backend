import { MenuItem } from "../../models/order-Pay-model/menuItem.model";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { uploadCloudinary } from "../../utils/cloudinary.js";

const createMenuItem = asyncHandler(async (req, res) => {
  const { name, price, description } = req.body;

  if (!name || !price || !description) {
    throw new ApiError(404, "All feild are required.");
  }

  const imageLocalPath = req?.files?.images?.[0]?.path;

  if (!imageLocalPath) {
    throw new ApiError(404, "imageLocalPath is required.");
  }

  const uploadImage = await uploadCloudinary(imageLocalPath);

  if (!uploadImage) {
    throw new ApiError(404, "upload image not found");
  }

  const menuItem = await MenuItem.create({
    image: uploadImage?.url,
    name,
    price,
    description,
  });

  if (!menuItem) {
    throw new ApiError(404, "MenuItem not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, menuItem, "Menus created successfully."));
});

const getMenuItem = asyncHandler(async (req, res) => {

});

export { createMenuItem };
