require("dotenv").config()

const config = {
  username: "postgres",
  password: "123456789",
  database: "unbardo_design",
  host: "localhost",
  dialect: "postgres",
  define: {
    timestamps: false
  }
}

module.exports = config