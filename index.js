import "dotenv/config";

import connectDb from "./src/db/index.js";
import {app} from "./src/app.js"
connectDb()
  .then(() => {
    app.listen(process.env.PORT || 7000, () => {
      console.log(`Server is running at ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDb connection failed !!", err);
  });
