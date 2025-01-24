import { Router } from 'express';
import { alertController } from '../controllers/alert_controller';

const router = Router();

router.post('/', alertController.create);
router.get('/', alertController.getAll);
router.get('/:id', alertController.getById);
router.put('/:id', alertController.update);
router.delete('/:id', alertController.delete);

export default router;
