import { Router } from 'express';
import { alertController } from '../controllers/alert_controller';

const router = Router();

router.get('/', alertController.getAll);
router.get('/new', alertController.create);
router.get('/:id', alertController.getById);
router.put('/:id', alertController.update);
router.delete('/:id', alertController.delete);

export default router;
