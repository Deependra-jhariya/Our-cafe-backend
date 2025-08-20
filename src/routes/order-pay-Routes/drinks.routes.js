import { Router } from "express";
import {
  addDrink,
  fetchDrink,
} from "../../controllers/order-pay-controller/drinks.controller.js";
import { upload } from "../../middleware/multer.middleware.js";

const router = Router();
router
  .route("/add-drinks")
  .post(upload.fields([{ name: "img", maxCount: 1 }]), addDrink);
router.route("/").get(fetchDrink);

export default router;
