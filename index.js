import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/userRouter.js";
import passResetRouter from "./routes/passResetRouter.js";

dotenv.config();

const app = express();

const corsOptions = {
	origin: '*',
	methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'HEAD'],
	credentials: true,
	allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(express.json());
app.use(cookieParser(""));
app.use(cors(corsOptions));

app.use("/user", userRouter);
app.use("/password", passResetRouter);

app.get("/", (req, res) => {
	res.send("Incruiter Assignment Server is up and running!");
});

const PORT = process.env.PORT || 8005;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});