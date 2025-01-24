interface CreateAlertDto {
  alertType_id: string;
  zone_id: string;
  dateTime_start: Date;
  dateTime_end: Date;
  waterLevel?: number;
  magnitude?: number;
}

interface UpdateAlertDto {
  alertType_id?: string;
  zone_id?: string;
  dateTime_start?: Date;
  dateTime_end?: Date;
  waterLevel?: number;
  magnitude?: number;
}