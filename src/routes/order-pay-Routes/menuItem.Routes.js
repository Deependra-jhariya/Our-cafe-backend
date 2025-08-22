import { Router } from "express";
import {
  createMenuItem,
  getMenuDetailsById,
  getMenuItem,
} from "../../controllers/order-pay-controller/menuItem.controller.js";
import { upload } from "../../middleware/multer.middleware.js";
const router = Router();

router
  .route("/create-menuItem")
  .post(upload.fields([{ name: "image", maxCount: 1 }]), createMenuItem);
router.route("/:categoryId").get(getMenuItem);
router.route("/").get(getMenuItem);
router.route("/details/:menuId").get(getMenuDetailsById);

export default router;
