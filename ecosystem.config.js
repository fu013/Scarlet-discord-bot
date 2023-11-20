module.exports = {
  apps: [
    {
      name: "scarlet-discord-bot",
      script: "./dist/index.js",
      env: {
        NODE_ENV: "dev",
      },
      env_production: {
        NODE_ENV: "prod",
        TZ: "Asia/Seoul",
      },
    },
  ],
};
