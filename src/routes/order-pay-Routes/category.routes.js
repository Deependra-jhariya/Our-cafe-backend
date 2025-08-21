import { Router } from "express";
import { createCategory, getCategory } from "../../controllers/order-pay-controller/category.controller.js";

const router = Router();

router.route("/create-category").post(createCategory);
router.route("/").get(getCategory);
export default router;
