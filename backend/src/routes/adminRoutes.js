import { Router } from 'express';
import * as taskController from '../controllers/taskController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';

const router = Router();

router.use(authMiddleware);
router.use(roleMiddleware('ADMIN'));

router.get('/users', taskController.getAllUsers);

export default router;
