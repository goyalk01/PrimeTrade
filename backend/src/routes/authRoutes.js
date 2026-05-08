import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import { validateRegister, validateLogin, handleValidationErrors } from '../validators/authValidator.js';

const router = Router();

router.post('/register', validateRegister, handleValidationErrors, authController.register);
router.post('/login', validateLogin, handleValidationErrors, authController.login);

export default router;
