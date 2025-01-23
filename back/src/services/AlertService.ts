import Alert from '../models/AlertModel';

export class AlertService {
  async findAll() {
    return Alert.findAll();
  }

  async findOne(id: string) {
    return Alert.findByPk(id);
  }

  async create(data: any) {
    return Alert.create(data);
  }

  async update(id: string, data: any) {
    const alert = await Alert.findByPk(id);
    if (alert) {
      return alert.update(data);
    }
    return null;
  }

  async delete(id: string) {
    const alert = await Alert.findByPk(id);
    if (alert) {
      return alert.destroy();
    }
    return null;
  }
}