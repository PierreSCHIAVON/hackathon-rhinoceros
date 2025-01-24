import { Request, Response } from 'express';
import { alertNamespace } from '../app';

export const notifyController = {

  async getAll(req: Request, res: Response) {

      try {
        console.log('Creating alert...');

        const alertData = req.body;

        // Emit alert to WebSocket clients
        alertNamespace.emit('new_alert', alertData);
        console.log('Alert emitted to WebSocket namespace /alertSocket');

        // Send response
        res.status(201).json({ message: 'Alert created', alert: alertData });
      } catch (error) {
        res
          .status(500)
          .json({ error: 'Erreur lors de la notification.' });
      }
    }
};
