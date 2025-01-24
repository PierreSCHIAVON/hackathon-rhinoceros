import { Router } from 'express';
import { messageController } from '../controllers/message_controller';

const router = Router();

router.post('/', messageController.create);
router.get('/', messageController.getAll);
router.get('/:id', messageController.getById);
router.put('/:id', messageController.update);
router.delete('/:id', messageController.delete);

export default router;
