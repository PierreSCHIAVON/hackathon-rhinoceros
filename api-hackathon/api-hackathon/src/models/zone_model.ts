import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class Zone extends Model {
  public id!: number;
  public name!: string;
  public typeZone!: string;
  public latitude!: number;
  public longitude!: number;
  public rayon!: number;
}

Zone.init(
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
    typeZone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    rayon: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Zone',
    tableName: 'zones',
    timestamps: false,
  },
);
