import { Request, Response } from 'express';
import { alertTypeService } from '../services/alertType_service';

export const alertTypeController = {
  async create(req: Request, res: Response) {
    try {
      const alertType = await alertTypeService.createAlertType(req.body);
      res.status(201).json(alertType);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Erreur lors de la création du type d’alerte.' });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const alertTypes = await alertTypeService.getAllAlertTypes();
      res.status(200).json(alertTypes);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Erreur lors de la récupération des types d’alerte.' });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const alertType = await alertTypeService.getAlertTypeById(
        parseInt(req.params.id),
      );
      if (alertType) {
        res.status(200).json(alertType);
      } else {
        res.status(404).json({ error: 'Type d’alerte non trouvé.' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Erreur lors de la récupération du type d’alerte.' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const updatedAlertType = await alertTypeService.updateAlertType(
        parseInt(req.params.id),
        req.body,
      );
      if (updatedAlertType) {
        res.status(200).json(updatedAlertType);
      } else {
        res.status(404).json({ error: 'Type d’alerte non trouvé.' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Erreur lors de la mise à jour du type d’alerte.' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const isDeleted = await alertTypeService.deleteAlertType(
        parseInt(req.params.id),
      );
      if (isDeleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Type d’alerte non trouvé.' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Erreur lors de la suppression du type d’alerte.' });
    }
  },
};
