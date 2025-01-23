import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
const sequelize = new Sequelize('sqlite::memory:');

export class ActivityModel extends Model {
    public id!: string;
    public title!: string;
    public description!: string;
}

ActivityModel.init(
  {
    id: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title:  {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'ActivityModel',
  },
);


console.log(ActivityModel === sequelize.models.ActivityModel);
