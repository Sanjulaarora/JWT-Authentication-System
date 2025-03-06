import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/authRouter.js";
import passwordResetRouter from "./routes/passwordRouter.js";

dotenv.config();

const app = express();

const corsOptions = {
	origin: "http://localhost:3000",
	methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "HEAD"],
	credentials: true,
	allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(express.json());
app.use(cookieParser(""));
app.use(cors(corsOptions));

app.use("/auth", authRouter);
app.use("/password", passwordResetRouter);

app.get("/", (req, res) => {
	res.send("Incruiter Assignment Server is up and running!");
});

const PORT = process.env.PORT || 8005;

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on port: ${PORT}`);
	});

	app.on("error", (error) => {
		console.error(`Error: ${error}`);
		throw error;
	});
}).catch((err) => {
	console.error(`MongoDB connection failed: ${err}`);
});
