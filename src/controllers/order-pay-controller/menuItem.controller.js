import { MenuItem } from "../../models/order-Pay-model/menuItem.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { uploadCloudinary } from "../../utils/cloudinary.js";

const createMenuItem = asyncHandler(async (req, res) => {
  const { name, price, description, categoryId } = req.body;

  if (!name || !price || !description || !categoryId) {
    throw new ApiError(404, "All feild are required.");
  }

  const imageLocalPath = req?.files?.image?.[0]?.path;

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
    category: categoryId || null,
  });

  if (!menuItem) {
    throw new ApiError(404, "MenuItem not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, menuItem, "Menus created successfully."));
});

const getMenuItem = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  if (!categoryId) {
    throw new ApiError(404, "Categoryid is required.");
  }

  const catagoryWiseMenu = await MenuItem.find({
    category: categoryId,
  }).populate("category", "name");

  console.log("catagoryWiseMenu",catagoryWiseMenu)
  if(!catagoryWiseMenu){
    throw new ApiError(404,"menuItem not found.")
  }

  return res.status(200).json(new ApiResponse(200,catagoryWiseMenu,"Menus fetched successfuly."))
});

export { createMenuItem,getMenuItem };
