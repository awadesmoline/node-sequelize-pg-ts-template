import type { Application } from 'express';
import { SequelizeSingleton } from './sequelize';
import { dbInit } from './dbInit';
import { models } from './models';
import { dependencyInjector } from './dependencyInjector';
import { expressSetup } from './expressSetup';
import { errorHandler } from './errorHandler';

const setup = (app: Application): Application => {
  const sequelize = SequelizeSingleton.getInstance();

  dbInit(sequelize, models);

  dependencyInjector({ models, sequelize });

  expressSetup(app);

  // final application error handler.
  // No middleware should come after this
  errorHandler(app);
  return app;
};

export default setup;
