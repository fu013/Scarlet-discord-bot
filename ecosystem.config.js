module.exports = {
  apps: [
    {
      name: "_scarlet",
      script: "./dist/index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "2500M",
      env: {
        NODE_ENV: "prod",
      },
      /* env_production: {
        NODE_ENV: "prod",
      }, */
    },
  ],
};
