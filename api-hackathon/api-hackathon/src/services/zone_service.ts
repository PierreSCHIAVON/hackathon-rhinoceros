import { Zone } from '../models/zone_model';

export const zoneService = {
  async createZone(data: {
    name: string;
    typeZone: string;
    latitude: number;
    longitude: number;
    rayon: number;
  }) {
    return await Zone.create(data);
  },

  async getAllZones() {
    return await Zone.findAll();
  },

  async getZoneById(id: number) {
    return await Zone.findByPk(id);
  },

  async updateZone(
    id: number,
    updates: Partial<{
      name: string;
      typeZone: string;
      latitude: number;
      longitude: number;
      rayon: number;
    }>,
  ) {
    const zone = await Zone.findByPk(id);
    if (zone) {
      return await zone.update(updates);
    }
    return null;
  },

  async deleteZone(id: number) {
    const zone = await Zone.findByPk(id);
    if (zone) {
      await zone.destroy();
      return true;
    }
    return false;
  },
};
