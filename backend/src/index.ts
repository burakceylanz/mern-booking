import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";

mongoose.connect(process.env.MONGO_CONNECTION_STRING as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('MongoDB connection error:', error));


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
 origin: process.env.FRONTEND_URL,
 credentials:true 
}));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);


//connect frontend and backend
app.use(express.static(path.join(__dirname,"../../frontend/dist")));

app.listen(7000, () => {
  console.log("server running on port 7000");
});
