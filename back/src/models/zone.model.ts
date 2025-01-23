import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
const sequelize = new Sequelize('sqlite::memory:');

export class ZoneModel extends Model {
    public id!: string;
    public latitude!: string;
    public longitude!: string;
    public rayon!:string;
}

ZoneModel.init(
  {
    id: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    latitude:  {
      type: DataTypes.STRING,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rayon: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  },
  {
    sequelize,
    modelName: 'ZoneModel',
  },
);


console.log(ZoneModel === sequelize.models.ZoneModel);
