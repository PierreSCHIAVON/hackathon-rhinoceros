import { Router } from 'express';
import { alertTypeController } from '../controllers/alertType_controller';

const router = Router();

router.post('/', alertTypeController.create);
router.get('/', alertTypeController.getAll);
router.get('/:id', alertTypeController.getById);
router.put('/:id', alertTypeController.update);
router.delete('/:id', alertTypeController.delete);

export default router;
