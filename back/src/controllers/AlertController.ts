import { Request, Response } from 'express';
import { alertNamespace } from '../app';
import { AlertService } from '../services/AlertService';

export class AlertController {
  constructor(private alertService: AlertService) {}

  async getAlerts(req: Request, res: Response) {
    const alerts = await this.alertService.findAll();
    res.json(alerts);
  }

  async getAlert(req: Request, res: Response) {
    const alert = await this.alertService.findOne(req.params.id);
    if (!alert) return res.status(404).json({ message: 'Alert not found' });
    res.json(alert);
  }

  async createAlert(req: Request, res: Response) {
    console.log('Creating alert...');
    const alertData = req.body;

    // Emit alert to WebSocket clients
    alertNamespace.emit('new_alert', alertData);
    console.log('Alert emitted to WebSocket namespace /alertSocket');

    // Send response
    res.status(201).json({ message: 'Alert created', alert: alertData });
  }

  async updateAlert(req: Request, res: Response) {
    const alert = await this.alertService.update(req.params.id, req.body);
    if (!alert) return res.status(404).json({ message: 'Alert not found' });
    res.json(alert);
  }

  async deleteAlert(req: Request, res: Response) {
    await this.alertService.delete(req.params.id);
    res.status(204).send();
  }
}