module.exports = {
  apps: [
    {
      name: 'stoicbible-api',
      script: 'build/server.js',
      instances: 1,
      max_memory_restart: '500M',
      exec_mode : 'cluster',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
