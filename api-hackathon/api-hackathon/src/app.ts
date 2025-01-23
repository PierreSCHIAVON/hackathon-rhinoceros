import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize, { syncDatabase } from './config/database';

import zoneRoutes from './routes/zone_route';
import alertRoutes from './routes/alert_route';
import alertTypeRoutes from './routes/alertType_route';
import messageRoutes from './routes/message_route';
import activityRoutes from './routes/activity_route';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/zones', zoneRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/alert-types', alertTypeRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/activities', activityRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Une erreur interne est survenue.' });
});

const startServer = async () => {
  try {
    await syncDatabase();

    const PORT: number = parseInt(process.env.PORT || '3000', 10);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  } catch (error) {
    console.error('Erreur lors du démarrage du serveur :', error);
  }
};

startServer();
