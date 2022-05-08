require('dotenv').config();

module.exports = {
  development: {
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL_DEV',
  },
  test: {
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL_TEST',
  },
  production: {
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
    dialectOptions: {
      ssl: {
        require: true,
        // Ref.: https://github.com/brianc/node-postgres/issues/2009
        rejectUnauthorized: false,
      },
    },
  },
};
