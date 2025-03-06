import express from 'express';
import { passwordReset } from '../controllers/passwordController.js';

const passwordResetRouter = express.Router();

// Route for resetting password
passwordResetRouter.post('/password-reset', passwordReset);

export default passwordResetRouter;