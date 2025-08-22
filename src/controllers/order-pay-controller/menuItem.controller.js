import { MenuItem } from "../../models/order-Pay-model/menuItem.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { uploadCloudinary } from "../../utils/cloudinary.js";

const createMenuItem = asyncHandler(async (req, res) => {
  const { name, description, categoryId, sizes, ingredients, isAvailable } =
    req.body;

  if (!name || !description || !categoryId) {
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
  // ✅ Safely parse JSON fields
  let parsedSizes = [];
  let parsedIngredients = [];

  try {
    if (sizes) parsedSizes = JSON.parse(sizes);
    if (ingredients) parsedIngredients = JSON.parse(ingredients);
  } catch (err) {
    throw new ApiError(400, "Invalid JSON format in sizes/ingredients.");
  }

  const menuItem = await MenuItem.create({
    image: uploadImage?.url,
    name,
    description,
    category: categoryId || null,
    sizes: parsedSizes,
    ingredients: parsedIngredients,
    isAvailable: isAvailable ?? true,
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

  let catagoryWiseMenu;
  if (categoryId) {
    catagoryWiseMenu = await MenuItem.find({
      category: categoryId,
    }).populate("category", "name");
  } else {
    catagoryWiseMenu = await MenuItem.find().populate("category", "name");
  }

  if (!catagoryWiseMenu) {
    throw new ApiError(404, "menuItem not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, catagoryWiseMenu, "Menus fetched successfuly."));
});

const getMenuDetailsById = asyncHandler(async (req, res) => {
  const { menuId } = req.params;

  if (!menuId) {
    throw new ApiError(404, "Id is Required.");
  }

  const menuDetails = await MenuItem.findById(menuId).populate(
    "category",
    "name"
  );

  if (!menuDetails) {
    throw new ApiError(404, "Menu Details not found.");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, menuDetails, "Menu details fetch successfully.")
    );
});


export { createMenuItem, getMenuItem, getMenuDetailsById };
