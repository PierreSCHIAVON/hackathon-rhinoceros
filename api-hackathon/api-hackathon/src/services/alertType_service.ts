import { AlertType } from '../models/alertType_model';

export const alertTypeService = {
  async createAlertType(data: { name: string; color: string }) {
    return await AlertType.create(data);
  },

  async getAllAlertTypes() {
    return await AlertType.findAll();
  },

  async getAlertTypeById(id: number) {
    return await AlertType.findByPk(id);
  },

  async updateAlertType(
    id: number,
    updates: Partial<{ name: string; color: string }>,
  ) {
    const alertType = await AlertType.findByPk(id);
    if (alertType) {
      return await alertType.update(updates);
    }
    return null;
  },

  async deleteAlertType(id: number) {
    const alertType = await AlertType.findByPk(id);
    if (alertType) {
      await alertType.destroy();
      return true;
    }
    return false;
  },
};
