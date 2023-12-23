import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { loginApi } from "./loginApi";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(loginApi());

app.listen(process.env.PORT || 3000);
