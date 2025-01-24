import { Request, Response } from 'express';
import { alertNamespace } from '../app';
import { alertService } from '../services/alert_service';

export const alertController = {
  async create(req: Request, res: Response) {
    console.log('Creating alert...', req.body);  // Affiche les données reçues

    try {
      alertNamespace.emit('new_alert', "test");
      console.log('Alert emitted to WebSocket namespace /alertSocket');

      res.status(201).json({ message: 'Alert created', alert: req.body });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la création de l’alerte.' });
    }
  },

  async getAll(req: Request, res: Response) {

    try {
      const alerts = await alertService.getAllAlerts();
      res.status(200).json(alerts);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Erreur lors de la récupération des alertes.' });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const alert = await alertService.getAlertById(parseInt(req.params.id));
      if (alert) {
        res.status(200).json(alert);
      } else {
        res.status(404).json({ error: 'Alerte non trouvée.' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Erreur lors de la récupération de l’alerte.' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const updatedAlert = await alertService.updateAlert(
        parseInt(req.params.id),
        req.body,
      );
      if (updatedAlert) {
        res.status(200).json(updatedAlert);
      } else {
        res.status(404).json({ error: 'Alerte non trouvée.' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Erreur lors de la mise à jour de l’alerte.' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const isDeleted = await alertService.deleteAlert(parseInt(req.params.id));
      if (isDeleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Alerte non trouvée.' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Erreur lors de la suppression de l’alerte.' });
    }
  },
};
