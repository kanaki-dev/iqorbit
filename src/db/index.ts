import mongoose from "mongoose";
import { DB_NAME } from "../lib/constant.js";
import { env } from "../lib/envConfig.js";

type Mongoose = typeof mongoose;

export default async function connectDB() {
  try {
    const connectionInstance: Mongoose = await mongoose.connect(
      `${env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n Mongodb connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`ERROR :: MONGODB Connection FAILED `, error);
    process.exit(1);
  }
}
