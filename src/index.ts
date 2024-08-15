import "dotenv/config";
import { app } from "./app.js";
import connectDB from "./db/index.js";
import { env } from "./lib/envConfig.js";

connectDB()
  .then(() => {
    app.listen(env.PORT || 8000, () => {
      console.log(`Server is runnng at port : ${env.PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error("MONGODB connection Failed !!! ", err);
  });
