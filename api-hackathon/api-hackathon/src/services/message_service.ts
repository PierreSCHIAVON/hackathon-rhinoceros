import { Message } from '../models/message_model';

export const messageService = {
  async createMessage(data: {
    username: string;
    content: string;
    createdAt: Date;
    ipAdress: string;
    zoneId: number;
  }) {
    return await Message.create(data);
  },

  async getAllMessages() {
    return await Message.findAll();
  },

  async getMessageById(id: number) {
    return await Message.findByPk(id);
  },

  async updateMessage(
    id: number,
    updates: Partial<{ username: string; content: string; ipAdress: string }>,
  ) {
    const message = await Message.findByPk(id);
    if (message) {
      return await message.update(updates);
    }
    return null;
  },

  async deleteMessage(id: number) {
    const message = await Message.findByPk(id);
    if (message) {
      await message.destroy();
      return true;
    }
    return false;
  },
};
