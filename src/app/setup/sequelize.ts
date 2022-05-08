import { Sequelize } from 'sequelize';
import config from '../../common/config';
import dbConfig from '../db/config';

const env = config.node_env || 'development';

const envConfig = dbConfig[env];

export class SequelizeSingleton extends Sequelize {
  private static instance: SequelizeSingleton;

  public static getInstance(): SequelizeSingleton {
    if (!SequelizeSingleton.instance) {
      SequelizeSingleton.instance = new Sequelize(
        config.db[env].url,
        envConfig,
      );
    }
    return SequelizeSingleton.instance;
  }
}
