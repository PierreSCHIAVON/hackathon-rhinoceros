import express from 'express';
import { AlertController } from '../controllers/AlertController';
import { AlertService } from '../services/AlertService';

const router = express.Router();
const alertController = new AlertController(new AlertService());

router.get('/alerts', alertController.getAlerts.bind(alertController));
//router.get('/alerts/:id', alertController.getAlert.bind(alertController));
//router.post('/alerts', alertController.createAlert.bind(alertController));
//router.put('/alerts/:id', alertController.updateAlert.bind(alertController));
//router.delete('/alerts/:id', alertController.deleteAlert.bind(alertController));


export default router;