import express from "express";
import authenticate from "../middleware/authenticate.js";
import { signUp, signIn, signOut} from "../controllers/userController.js";

const userRouter = express.Router();

// Routes for user authentication
userRouter.post("/sign-up", signUp);
userRouter.post("/sign-in", signIn);
userRouter.get("/sign-out", authenticate, signOut);

export default userRouter;