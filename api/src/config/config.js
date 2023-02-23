
require("dotenv").config()

if (process.env.NODE_ENV === 'production') {
  module.exports = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    // db_deploy: process.env.DB_DEPLOY || `postgresql://postgres:nNWeMPRZ5RvzZ1yRUjLm@containers-us-west-36.railway.app:6296/railway`,
    dialect: 'postgres',
    define: {
      timestamps: true,
      freezeTableName: true,
    },
    native: false,
    logging: false,
  };
} else {
  module.exports = {
    username: 'postgres',
    password: '123456789',
    database: 'unbardo_design',
    host: 'localhost',
    db_deploy: 'postgresql://postgres:nNWeMPRZ5RvzZ1yRUjLm@containers-us-west-36.railway.app:6296/railway',
    dialect: 'postgres',
    define: {
      timestamps: true,
      freezeTableName: true,
    },
    native: false,
    logging: false,
  };
}

