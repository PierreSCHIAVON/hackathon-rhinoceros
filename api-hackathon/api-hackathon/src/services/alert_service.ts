import { Alert } from '../models/alert_model';

export const alertService = {
  async createAlert(data: {
    alertTypeId: number;
    zoneId: number;
    dateTimeStart: Date;
    dateTimeEnd: Date;
    intensity: number;
  }) {
    return await Alert.create(data);
  },

  async getAllAlerts() {
    return await Alert.findAll();
  },

  async getAlertById(id: number) {
    return await Alert.findByPk(id);
  },

  async updateAlert(
    id: number,
    updates: Partial<{
      alertTypeId: number;
      zoneId: number;
      dateTimeStart: Date;
      dateTimeEnd: Date;
      intensity: number;
    }>,
  ) {
    const alert = await Alert.findByPk(id);
    if (alert) {
      return await alert.update(updates);
    }
    return null;
  },

  async deleteAlert(id: number) {
    const alert = await Alert.findByPk(id);
    if (alert) {
      await alert.destroy();
      return true;
    }
    return false;
  },
};
