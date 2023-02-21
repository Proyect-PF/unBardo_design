//servidor de express
//TODO Middelwares de terceros Documentacion => https://expressjs.com/es/resources/middleware.html


import express,{Response, Request, NextFunction, Express, json} from "express";
import router from "./routes";
//TODO Libreria para tipar los errores 
import { HttpError } from "http-errors";
import helmet from "helmet"
import cookieParser from "cookie-parser";
import bodyParser from "body-parser"
import morgan from "morgan";


const app:Express = express()

let {name} = app
name = "UNBARDO_DESIGN_API"




//TODO parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));
//TODO parse application/json
app.use(bodyParser.json())

//TODO helmet es un meddleware para proponer seguridad a los datos que entren por el header
app.use(helmet())

//TODO https://github.com/msemenistyi/connect-image-optimus

 app.use(cookieParser());
 app.use(morgan('dev'));
 app.use((req:Request, res:Response, next:NextFunction) => {
   res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
   res.header('Access-Control-Allow-Credentials', 'true');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
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