import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
const sequelize = new Sequelize('sqlite::memory:');

export class MessageModel extends Model {
    public id!: string;
    public username!: string;
    public content!: string;
    public created_at!:Date;
    public ip_adress!:string;
}

MessageModel.init(
  {
    id: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    username:  {
      type: DataTypes.STRING,
      allowNull: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    ip_adress: {
        type: DataTypes.STRING,
        allowNull: true,
    },  
  },
  {
    sequelize,
    modelName: 'MessageModel',
  },
);


console.log(MessageModel === sequelize.models.MessageModel);
