import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class AlertType extends Model {
  public id!: number;
  public name!: string;
  public color!: string;
}

AlertType.init(
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
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'AlertType',
    tableName: 'alert_types',
    timestamps: false,
  },
);
