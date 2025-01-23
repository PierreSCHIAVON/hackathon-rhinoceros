import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
const sequelize = new Sequelize('sqlite::memory:');

export class AlertModel extends Model {
    public id!: string;
    public type!: string;
    public magnitude!: string;
    public id_zone!: string;
    public water_level!: string;
    public alert_typeId!: string;
    public disaster_start!: Date;
    public disaster_end!: Date;
}

AlertModel.init(
  {
    id: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    type:  {
      type: DataTypes.STRING,
      allowNull: true,
    },
    magnitude: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id_zone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    water_level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alert_typeId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    disaster_start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    disaster_end: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'AlertModel', // We need to choose the model name
  },
);

// the defined model is the class itself
console.log(AlertModel === sequelize.models.AlertModel); // true
