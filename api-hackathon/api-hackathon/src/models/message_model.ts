import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Zone } from './zone_model';

export class Message extends Model {
  public id!: number;
  public username!: string;
  public content!: string;
  public createdAt!: Date;
  public ipAdress!: string;
  public zoneId!: number;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    ipAdress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Message',
    tableName: 'messages',
    timestamps: false,
  },
);

Message.belongsTo(Zone, { foreignKey: 'zoneId' });
Zone.hasMany(Message, { foreignKey: 'zoneId' });
