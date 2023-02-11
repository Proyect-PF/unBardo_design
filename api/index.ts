import app from './src/app';
import db from './src/database';
import {
  POST_rolesInitials,
  POST_usersInitials,
} from './src/helpers/initialSetup';
import dotenv from 'dotenv';

dotenv.config();
//const { USER_NAME, USER_EMAIL, USER_PASSWORD, USER_ROLE } = process.env;
const { USER_NAME, USER_EMAIL, USER_PASSWORD, USER_ROLE } = process.env;
const port = process.env.PORT || 3700;

// Syncing all the models at once.
db.sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`APP SERVER ESCUCHANDO EN EL PUERTO ${port}`);
    });
  })
  //Iniciamos roles por defecto
  .then(() => {
    POST_rolesInitials();
    POST_usersInitials(USER_NAME, USER_EMAIL, USER_PASSWORD, USER_ROLE);
  });
