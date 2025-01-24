import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Zone } from './zone_model';
import { AlertType } from './alertType_model';

export class Alert extends Model {
  public id!: number;
  public alertTypeId!: number;
  public zoneId!: number;
  public dateTimeStart!: Date;
  public dateTimeEnd!: Date;
  public intensity!: number;
}

Alert.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dateTimeStart: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateTimeEnd: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    intensity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 10,
      },
    },
  },
  {
    sequelize,
    modelName: 'Alert',
    tableName: 'alerts',
    timestamps: false,
  },
);

Alert.belongsTo(Zone, { foreignKey: 'zoneId' });
Zone.hasMany(Alert, { foreignKey: 'zoneId' });

Alert.belongsTo(AlertType, { foreignKey: 'alertTypeId' });
AlertType.hasMany(Alert, { foreignKey: 'alertTypeId' });
