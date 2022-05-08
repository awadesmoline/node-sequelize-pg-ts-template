import type { Application } from 'express';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import routes from '../routes';

export const expressSetup = (app: Application): void => {
  app.use(compression());
  app.use(cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  /* apply routes from the 'routes' folder */
  routes(app);
};
