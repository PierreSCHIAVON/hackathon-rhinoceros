import { Router } from 'express';
import { zoneController } from '../controllers/zone_controller';

const router = Router();

router.post('/', zoneController.create);
router.get('/', zoneController.getAll);
router.get('/:id', zoneController.getById);
router.put('/:id', zoneController.update);
router.delete('/:id', zoneController.delete);

export default router;
