import { Request, Response } from 'express';
import { zoneService } from '../services/zone_service';

export const zoneController = {
  async create(req: Request, res: Response) {
    try {
      const zone = await zoneService.createZone(req.body);
      res.status(201).json(zone);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création de la zone.' });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const zones = await zoneService.getAllZones();
      res.status(200).json(zones);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Erreur lors de la récupération des zones.' });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const zone = await zoneService.getZoneById(parseInt(req.params.id));
      if (zone) {
        res.status(200).json(zone);
      } else {
        res.status(404).json({ error: 'Zone non trouvée.' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Erreur lors de la récupération de la zone.' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const updatedZone = await zoneService.updateZone(
        parseInt(req.params.id),
        req.body,
      );
      if (updatedZone) {
        res.status(200).json(updatedZone);
      } else {
        res.status(404).json({ error: 'Zone non trouvée.' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Erreur lors de la mise à jour de la zone.' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const isDeleted = await zoneService.deleteZone(parseInt(req.params.id));
      if (isDeleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Zone non trouvée.' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Erreur lors de la suppression de la zone.' });
    }
  },
};
