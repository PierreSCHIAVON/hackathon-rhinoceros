import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';

class Alert extends Model {
  id!: string;
  alertType_id!: string;
  zone_id!: string;
  dateTime_start!: Date;
  dateTime_end!: Date;
  waterLevel?: number;
  magnitude?: number;
}

Alert.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  alertType_id: DataTypes.UUID,
  zone_id: DataTypes.UUID,
  dateTime_start: DataTypes.DATE,
  dateTime_end: DataTypes.DATE,
  waterLevel: DataTypes.FLOAT,
  magnitude: DataTypes.FLOAT
}, {
  sequelize,
  modelName: 'Alert'
});

export default Alert;