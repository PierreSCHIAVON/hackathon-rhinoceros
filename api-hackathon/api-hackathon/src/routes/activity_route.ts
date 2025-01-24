import { Router } from 'express';
import { activityController } from '../controllers/activity_controller';

const router = Router();

router.post('/', activityController.create);
router.get('/', activityController.getAll);
router.get('/:id', activityController.getById);
router.put('/:id', activityController.update);
router.delete('/:id', activityController.delete);

export default router;
