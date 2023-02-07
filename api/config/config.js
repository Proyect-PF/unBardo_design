
require("dotenv").config()

module.exports = {
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "123456789",
  database: process.env.DB_NAME || "unbardo_design",
  host: process.env.DB_HOST || "localhost",
  dialect: "postgres",
  define: {
    timestamps: true,
    freezeTableName: true,

  },
  native: false,
  logging:false
}

