import express, { urlencoded } from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

import drinkRoutes from "./routes/order-pay-Routes/drinks.routes.js";
import categoryRoutes from "./routes/order-pay-Routes/category.routes.js";
import menuItemRoutes from "./routes/order-pay-Routes/menuItem.Routes.js";


// Routes declaration
app.use("/api/v1/drinks", drinkRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/menu", menuItemRoutes);

export { app };
