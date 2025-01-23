import { Request, Response } from 'express';
import { activityService } from '../services/activity_service';

export const activityController = {
  async create(req: Request, res: Response) {
    try {
      const activity = await activityService.createActivity(req.body);
      res.status(201).json(activity);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Erreur lors de la création de l’activité.' });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const activities = await activityService.getAllActivities();
      res.status(200).json(activities);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Erreur lors de la récupération des activités.' });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const activity = await activityService.getActivityById(
        parseInt(req.params.id),
      );
      if (activity) {
        res.status(200).json(activity);
      } else {
        res.status(404).json({ error: 'Activité non trouvée.' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Erreur lors de la récupération de l’activité.' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const updatedActivity = await activityService.updateActivity(
        parseInt(req.params.id),
        req.body,
      );
      if (updatedActivity) {
        res.status(200).json(updatedActivity);
      } else {
        res.status(404).json({ error: 'Activité non trouvée.' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Erreur lors de la mise à jour de l’activité.' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const isDeleted = await activityService.deleteActivity(
        parseInt(req.params.id),
      );
      if (isDeleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Activité non trouvée.' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Erreur lors de la suppression de l’activité.' });
    }
  },
};
