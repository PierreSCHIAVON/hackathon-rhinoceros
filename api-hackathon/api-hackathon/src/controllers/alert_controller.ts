import { Request, Response } from 'express';
import { alertService } from '../services/alert_service';

export const alertController = {
  async create(req: Request, res: Response) {
    try {
      const alert = await alertService.createAlert(req.body);
      res.status(201).json(alert);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Erreur lors de la création de l’alerte.' });
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
