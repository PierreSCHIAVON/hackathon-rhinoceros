import { Router } from 'express';
import { notifyController } from '../controllers/notify_controller';

const router = Router();

router.post('/', notifyController.getAll);

export default router;
