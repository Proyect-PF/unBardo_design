'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__dirname);
import config from "../config/config";



const db:any = {};

let sequelize:any;

sequelize = new Sequelize(config.db_deploy);
//sequelize = new Sequelize(config.database, config.username, config.password, config);

sequelize.authenticate()
.then(()=>console.log('- CONEXION A LA BASE DE DATOS EXITOSA -'))
.catch((err:any)=> console.error("Unable to connect to the database:", err))

fs

  .readdirSync(`${__dirname}/models`)
  .filter((file:string) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts' &&
      file.indexOf('.test.ts') === -1
    );
  })
  .forEach((file:any, i:number) => {
    console.log(file, i)
    //TODO: require(path.join(__dirname, file)) => devuelve un objeto con la propiedad default y es un array de funciones de todos los modelos en la carpeta models    


      const model = require(path.join(`${__dirname}/models`, file)).default(sequelize, Sequelize.DataTypes);

      db[model.name] = model;
    
  });
  ///../../api/src/models

// Esto es para hacer el associate de los modelos que lo necesiten
// Opcion 1

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// Opcion 2
// Esto permitiría imprimir el nombre del modelo al que está asociado y el tipo de asociación (por ejemplo, "belongsTo", "hasMany", etc.).
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
    //console.log("MODELO",db[modelName].associations);
    for (const association in db[modelName].associations) {
      console.log(` MODELO: ${association} : ASOCIACION ${db[modelName].associations[association].associationType}`);
    }
  }
});

//console.log(db)

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db
