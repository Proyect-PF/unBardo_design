import {Express, Request, Response} from "express";
import {Op} from "sequelize";
import db from "../database/database";

//Post para crear el producto => llama a la funcion "ConsultOrCreate", la cual se encarga de crear y agregar productos a favoritos
export const POST_Favorite = async (request: Request, response: Response) => {
    const {id_user, id_product} = request.body;
    try {
        const favoriteResponse = await ConsultOrCreate(id_user, id_product);        
        return response.status(201).json(favoriteResponse);
    } catch (error: any) {
        return response.status(400).json({error: error.message});
    }
};

//Esta funcion consulta si existe algun favorito de ese usuario, si no existe lo crea (agregando el id del producto). Si existe favorito de ese usuario, consulta si el producto esta agregado a favorito, sino lo agrega
const ConsultOrCreate = async (id_user: number, id_product: number) => {
    try {
        const favoriteAll = await db.Favorites.findOne({where: {id_user}});
        const findProd = favoriteAll.products_id.includes(id_product);

        if(findProd === true) return favoriteAll;
        else {
            favoriteAll.products_id.push(id_product);
            const favUpdate = await db.Favorites.update({
                products_id: favoriteAll.products_id
            },{
                where: {id_user: favoriteAll.id_user}
            })
        }
    } catch (error) {
        const favCreate = await db.Favorites.create({
            id_user,
            products_id: [id_product],
        })
        return favCreate;
    }
};

//Ruta GET para obtener todos los favoritos de un usuario
export const GET_FavoritesByUser = async (request: Request, response: Response) => {
    try {
        const {id_user} = request.params;
        
        const userFavorites = await db.Favorites.findOne({
            where: {
                id_user,
            }
        });
        return response.status(200).json(userFavorites);
    } catch (error: any) {
        return response.status(400).json({error: error.message});
    }
}

//Actualiza los favoritos eliminando el producto seleccionado
export const DELETE_FavoriteProductByUser = async (request: Request, response: Response) => {
    try {
        const {id_user, id_product} = request.query;
        let array = [];
        const deleteFav = await db.Favorites.findOne({
            where: {
                id_user,
            }
        });
        if (deleteFav) {            
            for (let i = 0; i < deleteFav.products_id.length; i++) {
                if (deleteFav.products_id[i] !== Number(id_product)) {
                    array.push(deleteFav.products_id[i])   
                }
            }
            const updateFav = await db.Favorites.update({
                products_id: array
            },{
                where: {id_user}
            })
            return response.status(200).json(updateFav);
        }
        return response.status(200).json(deleteFav);
    } catch (error: any) {
        return response.status(400).json({error: error.message});
    }
}

//Elimina todos los favoritos de un usuario
export const DELETE_AllFavoriteByUser = async (request: Request, response: Response) => {
    try {
        const {id_user} = request.params;
        
        const favToDelete = await db.Favorites.findOne({
            where: {
                id_user,
            }
        });
        if (favToDelete) {
            const deletedfav = await db.Favorites.destroy({
                where: {
                    id_user
                }
            });
        }
        return response.status(200).json(favToDelete);
    } catch (error: any) {
        return response.status(400).json({error: error.message});
    }
}