export class AlertService {
  constructor(private db: Database) {}

  async findAll() {
    return this.db.alerts.findMany({
      include: {
        alertType: true,
        zone: true
      }
    });
  }

  async findOne(id: string) {
    return this.db.alerts.findUnique({
      where: { id },
      include: {
        alertType: true,
        zone: true
      }
    });
  }

  async create(data: CreateAlertDto) {
    return this.db.alerts.create({
      data: {
        alertType: { connect: { id: data.alertType_id } },
        zone: { connect: { id: data.zone_id } },
        dateTime_start: data.dateTime_start,
        dateTime_end: data.dateTime_end,
        waterLevel: data.waterLevel,
        magnitude: data.magnitude
      }
    });
  }

  async update(id: string, data: UpdateAlertDto) {
    return this.db.alerts.update({
      where: { id },
      data
    });
  }

  async delete(id: string) {
    return this.db.alerts.delete({
      where: { id }
    });
  }
}