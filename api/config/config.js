
require("dotenv").config()

module.exports = {
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "123456789",
  database: process.env.DB_NAME || "unbardo_design",
  host: process.env.DB_HOST || "localhost",
  db_deploy: process.env.DB_DEPLOY || "postgresql://postgres:KrtCd8IyxfLRYO6YYSyv@containers-us-west-185.railway.app:7203/railway",
  dialect: "postgres",
  define: {
    timestamps: true,
    freezeTableName: true,

  },
  native: false,
  logging:false
}

