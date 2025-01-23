import { AlertService } from '../services/AlertService';
import { Request, Response } from 'express';

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
    const alert = await this.alertService.create(req.body);
    res.status(201).json(alert);
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