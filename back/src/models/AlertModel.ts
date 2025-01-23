interface Alert {
  id: string;
  alertType_id: string;
  zone_id: string;
  dateTime_start: Date;
  dateTime_end: Date;
  waterLevel?: number;
  magnitude?: number;
}

interface Zone {
  id: string;
  name: string;
  type_zone: string;
  latitude: number;
  longitude: number;
  rayon: number;
}

interface AlertType {
  id: string;
  name: string;
  color: string;
}