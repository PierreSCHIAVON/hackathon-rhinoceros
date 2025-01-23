import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
const sequelize = new Sequelize('sqlite::memory:');

export class AlertTypeModel extends Model {
    public id!: string;
    public name!: string;
    public color!: string;
}

AlertTypeModel.init(
  {
    id: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name:  {
      type: DataTypes.STRING,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'AlertTypeModel',
  },
);


console.log(AlertTypeModel === sequelize.models.AlertTypeModel);
