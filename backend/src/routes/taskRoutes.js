import { Router } from 'express';
import * as taskController from '../controllers/taskController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateTaskCreate, validateTaskUpdate, validateTaskQuery, handleValidationErrors } from '../validators/taskValidator.js';

const router = Router();

router.use(authMiddleware);

router.get('/', validateTaskQuery, handleValidationErrors, taskController.getTasks);
router.post('/', validateTaskCreate, handleValidationErrors, taskController.createTask);
router.get('/:id', taskController.getTaskById);
router.put('/:id', validateTaskUpdate, handleValidationErrors, taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;
