import { Activity } from '../models/activity_model';

export const activityService = {
  async createActivity(data: {
    name: string;
    description: string;
    type: string;
    zoneId: number;
  }) {
    return await Activity.create(data);
  },

  async getAllActivities() {
    return await Activity.findAll();
  },

  async getActivityById(id: number) {
    return await Activity.findByPk(id);
  },

  async updateActivity(
    id: number,
    updates: Partial<{ name: string; description: string; type: string }>,
  ) {
    const activity = await Activity.findByPk(id);
    if (activity) {
      return await activity.update(updates);
    }
    return null;
  },

  async deleteActivity(id: number) {
    const activity = await Activity.findByPk(id);
    if (activity) {
      await activity.destroy();
      return true;
    }
    return false;
  },
};
