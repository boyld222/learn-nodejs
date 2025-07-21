import express, { json } from "express";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';


config(); // load .env
connectDB(); // connect to MongoDB

const app = express();
app.use(json()); // parse JSON in requests

app.use("/api/auth",authRoutes); // use our auth routes
app.use("/api/user",userRoutes); // use our user routes


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));