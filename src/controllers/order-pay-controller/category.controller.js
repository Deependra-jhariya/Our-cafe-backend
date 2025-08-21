import { Category } from "../../models/order-Pay-model/category.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new ApiError(404, "Category name is require.");
  }

  const alredyExists = await Category.findOne({name});

  if (alredyExists) {
    throw new ApiError(404, "Category already exists.");
  }

  const category = await Category.create({ name });

  if (!category) {
    throw new ApiError(404, "Category not created.");
  }

  return res.status(200).json(new ApiResponse(200, category, "Category "));
});

const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.find();

  if (!category) {
    throw new ApiError(404, "Category not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category fetched successfully."));
});

export { createCategory, getCategory };
