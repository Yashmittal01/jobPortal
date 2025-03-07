import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
  await  mongoose .connect(process.env.MONGO_URL, {
        dbName: "MERN_JOB_SEEKING_WEBAPP",
      });
      
        console.log("Connected to database.");
     
  } catch (error) {
    console.log(`Some Error occured. ${error}`);
  }

}