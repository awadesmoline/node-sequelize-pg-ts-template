import 'reflect-metadata'; // We need this in order to use @Decorators

import app from './app';
import { Logger } from './app/setup/logger';
import config from './common/config';

const port = config.port || 8000;

app
  .listen(port, () => {
    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${port} 🛡️
      ################################################
    `);
  })
  .on('error', (err) => {
    Logger.error(err);
    process.exit(1);
  });
