import "dotenv/config";
import { app } from "./app";
import connectDB from "./db";
import { env } from "./lib/envConfig";

connectDB()
  .then(() => {
    app.listen(env.PORT || 8000, () => {
      console.log(`Server is runnng at port : ${env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MONGODB connection Failed !!! ", err);
  });
