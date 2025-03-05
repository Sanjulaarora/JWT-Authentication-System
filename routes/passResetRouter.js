import express from 'express';
import { passwordReset } from '../controllers/passResetController.js';

const passResetRouter = express.Router();

// Route for resetting password
passResetRouter.post('/password-reset', passwordReset);

export default passResetRouter;