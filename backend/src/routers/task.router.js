import {Router} from 'express'
import {getTask,getTasks,createTask,updateTask,deleteTask} from '../controllers/task.controller.js'
import {authRequired} from '../middlewares/validateToken.js'

import {validateSchema} from '../middlewares/validate.middleware.js'
import {createTaskSchema} from '../schemas/task.schema.js'
const router = Router();

router.get('/tasks', authRequired, getTasks);
router.get('/task/:id', authRequired, getTask);
router.post('/task', authRequired, validateSchema(createTaskSchema), createTask);
//router.post('/task', createTask);
router.delete('/task/:id', authRequired, deleteTask);
router.put('/task/:id', authRequired, updateTask);

export default router;
