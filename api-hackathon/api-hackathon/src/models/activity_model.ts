import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Zone } from './zone_model';

export class Activity extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public type!: string;
  public zoneId!: number;
}

Activity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Activity',
    tableName: 'activities',
    timestamps: false,
  },
);

Activity.belongsTo(Zone, { foreignKey: 'zoneId' });
Zone.hasMany(Activity, { foreignKey: 'zoneId' });
