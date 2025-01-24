import { Request, Response } from 'express';
import { messageService } from '../services/message_service';

export const messageController = {
  async create(req: Request, res: Response) {
    try {
      const message = await messageService.createMessage(req.body);
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création du message.' });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const messages = await messageService.getAllMessages();
      res.status(200).json(messages);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Erreur lors de la récupération des messages.' });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const message = await messageService.getMessageById(
        parseInt(req.params.id),
      );
      if (message) {
        res.status(200).json(message);
      } else {
        res.status(404).json({ error: 'Message non trouvé.' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Erreur lors de la récupération du message.' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const updatedMessage = await messageService.updateMessage(
        parseInt(req.params.id),
        req.body,
      );
      if (updatedMessage) {
        res.status(200).json(updatedMessage);
      } else {
        res.status(404).json({ error: 'Message non trouvé.' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Erreur lors de la mise à jour du message.' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const isDeleted = await messageService.deleteMessage(
        parseInt(req.params.id),
      );
      if (isDeleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Message non trouvé.' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Erreur lors de la suppression du message.' });
    }
  },
};
