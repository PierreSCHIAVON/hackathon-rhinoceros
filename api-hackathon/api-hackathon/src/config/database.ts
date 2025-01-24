import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    dialect: 'postgres',
    logging: true,
    retry: {
      max: 5
    }
  },
);

export const syncDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie.');

    await sequelize.sync({ alter: true });
    console.log('Les tables ont été synchronisées avec succès.');
  } catch (error) {
    console.error(
      'Erreur lors de la connexion ou de la synchronisation des tables :',
      error,
    );
  }
};

export default sequelize;
