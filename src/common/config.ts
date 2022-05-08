import dotenv from 'dotenv';

dotenv.config();

export const config = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  mailer: {
    apiKey: process.env.SENDGRID_API_KEY,
    clientUrl: process.env.CLIENT_URL,
  },
  jwtSecret: process.env.JWT_SECRET,
  passport: {
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    facebook: {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
    },
  },
  db: {
    development: {
      url: process.env.DATABASE_URL_DEV,
    },
    test: {
      url: process.env.DATABASE_URL_TEST,
    },
    production: {
      url: process.env.DATABASE_URL,
    },
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    endpointSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },
  sentry_dsn: process.env.SENTRY_DSN,
};

export default config;
