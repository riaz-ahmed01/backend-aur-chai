import dotenv from "dotenv"
import connectDB from "./db/index.js";



dotenv.config()















connectDB();


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