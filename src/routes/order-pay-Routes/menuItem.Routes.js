import { Router } from "express";
import {
  createMenuItem,
  getMenuItem,
} from "../../controllers/order-pay-controller/menuItem.controller.js";
import { upload } from "../../middleware/multer.middleware.js";
const router = Router();

router
  .route("/create-menuItem")
  .post(upload.fields([{ name: "image", maxCount: 1 }]), createMenuItem);
router.route("/:categoryId").get(getMenuItem);

export default router;
