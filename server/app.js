import express from "express";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./database/db.js";
import errorMiddleWare from "./middlewares/errorMiddlewares.js";
import authRouter from "./routes/authRouter.js"
export const app = express();

config({ path: "./config/config.env"});

app.use(cors({
    origin:[process.env.FRONTEND_URL],
methods: ["GET", "POST", "PUT", "DELETE"],
credentials: true,
})
);


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api/v1/auth", authRouter);
http://localhost:4000/api/v1/auth/register
connectDB();


app.use(errorMiddleWare);

