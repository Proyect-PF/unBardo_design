import { Express, Request, Response } from "express";
import filterByColor from "../middleware/filterByColors";



interface RequestParams {}

interface ResponseBody {}

interface RequestBody {}

interface RequestQuery {
  color: string;
}

const filterProdByColor = async (request: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, response:Response) => {
  try {
    const { color } = request.query;

    let filteredProducts = await filterByColor(color);
    if (filteredProducts)
    response.status(200).json(filteredProducts);
  } catch (error) {
    response.status(400).json(error);
  }
};

export default filterProdByColor;


// import db from "../../models";
// import sequelize from "sequelize";

// interface RequestParams {}

// interface ResponseBody {}

// interface RequestBody {}

// interface RequestQuery {
//   username: string;
// }


// const getAdmins = async (req:Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, res:Response)=>{ 
//     try {
//         const {username} = req.query
//         if(username){
//             const user = await getByUsername(username)
//             return res.status(200).json(user)
//         }else{
//             const arrusers = await Admin(db.sequelize, sequelize.DataTypes).findByNameAll(username)
//             return res.status(200).json(arrusers)

//         }

//     } catch (error) {
//         res.status(400).json(error)
//     }

// }

// export default getAdmins
