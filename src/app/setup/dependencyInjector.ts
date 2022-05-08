import type { Sequelize } from 'sequelize';
import { Container } from 'typedi';
import { Logger } from './logger';
import config from '../../common/config';
import mail from '@sendgrid/mail';
import { Models } from './models';

export enum Injected {
  sequelize = 'sequelize',
  logger = 'logger',
  mailer = 'mailer',
}

export const dependencyInjector = ({
  models,
  sequelize,
}: {
  models: Models;
  sequelize: Sequelize;
}): void => {
  try {
    Container.set(Injected.sequelize, sequelize);

    Object.entries(models).forEach(([name, value]) => {
      Container.set(name, value);
    });

    mail.setApiKey(config.mailer.apiKey);

    Container.set(Injected.logger, Logger);
    Container.set(Injected.mailer, mail);
  } catch (e) {
    Logger.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
