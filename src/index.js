import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running at http://locaalhost:${process.env.PORT}`);
    });
  })
  .catch(() => {
    console.log("MongoDB Connection FAILED");
  });

/*
import express from "express";

const app = express();


(async () => {
  try {
    awaitmongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
    app.on("error", (error) =>{
        console.log(error);
        throw error
        
    })
    app.listen(process.env.PORT, () => {
        console.log(`Server is running at http://loacalhost:${process.env.PORT}`);
        
    })
  } catch (error) {
    console.log(error);
  }
})();
*/
