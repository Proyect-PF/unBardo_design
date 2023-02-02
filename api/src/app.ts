//servidor de express
//TODO Middelwares de terceros Documentacion => https://expressjs.com/es/resources/middleware.html


import express,{Response, Request, NextFunction} from "express";
import router from "./routes";
//TODO Libreria para tipar los errores 
import { HttpError } from "http-errors";

import cookieParser from "cookie-parser";
import bodyParser from "body-parser"
import morgan from "morgan";
// import routes from "./routes"
import db from "./models";

const app = express()

let {name} = app
name = "UNBARDO_DESIGN_API"

//TODO parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//TODO parse application/json
app.use(bodyParser.json())


//TODO https://github.com/msemenistyi/connect-image-optimus

 app.use(cookieParser());
 app.use(morgan('dev'));
 app.use((req:Request, res:Response, next:NextFunction) => {
   res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
   res.header('Access-Control-Allow-Credentials', 'true');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
   next();
 });


//Listar Rutas =>
app.use(router);




// Error catching endware.
app.use((err:HttpError, req:Request, res:Response, next:NextFunction) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});



export default app;