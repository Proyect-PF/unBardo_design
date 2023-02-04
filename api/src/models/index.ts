'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
import config from "../../config/config";



const db:any = {};

let sequelize:any;

sequelize = new Sequelize(config.database, config.username, config.password, config);

sequelize.authenticate()
.then(()=>console.log('Conection to Database'))
.catch((err:any)=> console.error("Unable to connect to the database:", err))

fs
  .readdirSync(__dirname)
  .filter((file:string) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts' &&
      file.indexOf('.test.ts') === -1
    );
  })
  //TODO:
  .forEach((file:any, i:number) => {
    console.log(file, i)
    //TODO: require(path.join(__dirname, file)) => devuelve un objeto con la propiedad default y es un array de funciones de todos los modelos en la carpeta models    

      const model = require(path.join(__dirname, file)).default(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    
  });


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

console.log(db)
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db
