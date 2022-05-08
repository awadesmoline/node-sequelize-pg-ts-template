import type { SequelizeSingleton } from './sequelize';
import type { Models } from './models';

export const dbInit = (
  connection: SequelizeSingleton,
  models: Models,
): void => {
  Object.values(models).forEach((model) => {
    model.initialize(connection);
  });

  Object.values(models).forEach((model) => {
    if (model.associate) {
      model.associate(models);
    }
  });
};
