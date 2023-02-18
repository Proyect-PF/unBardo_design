import { Router } from "express";
const statisticRoutes = Router();
import {
  getProductSalesStats,
  getFunnelStats,
} from "../controllers/statistic.controller";

//Obtener Productos vendidos por fechas en diario, semanal, mensual, trimestral, y anual
/**
 * !Dar prioridad a obtener esta informacion por mes
 * 
 * 
export type AnaliticProducts = {
            timeUnit:string
            totalProductsSold:number
        }
        Este es el formato que debe de tener la respuesta desde esta ruta en un array guardar las diferentes fechas en objetos

        //! DIARIO 
        Ej => [
            {
            timeUnit: "Lunes"
            totalProductsSold: 2000
        },
                    {
            timeUnit: "Martes"
            totalProductsSold: 1000
        },
                    {
            timeUnit: "Miercoles"
            totalProductsSold: 300
        },
                            {
            timeUnit: "Jueves"
            totalProductsSold: 300
        }
        ]
        //! MESUAL 
        Ej => [
            {
            timeUnit: "primera semana"
            totalProductsSold: 2000
        },
                    {
            timeUnit: "segunda Semana"
            totalProductsSold: 1000
        },
                    {
            timeUnit: "tercera Semana"
            totalProductsSold: 300
        },
                            {
            timeUnit: "cuarta Semana"
            totalProductsSold: 300
        }
        ]

              //! ANUAL 
        Ej => [
            {
            timeUnit: "enero"
            totalProductsSold: 1000
        },
                    {
            timeUnit: "febrero"
            totalProductsSold: 4000
        },
                    {
            timeUnit: "marzo"
            totalProductsSold: 2000
        } ....... sigue.....
        ]


              //! TRIMESTRAL 
        Ej => [
            {
            timeUnit: "enero"
            totalProductsSold: 1000
        },
                    {
            timeUnit: "febrero"
            totalProductsSold: 4000
        },
                    {
            timeUnit: "marzo"
            totalProductsSold: 2000
        }
        ]
 */
statisticRoutes.get("/product-sales", getProductSalesStats);

//Obtener envudo de clientes
/**
 * !Numeros a tener en cuenta:
 * @Registros_Usuario Numeros
 * @Carritos_Estado_Pendiente Numeros
 * @Datos_Usuario Numeros
 * @Carrito_Estado_Vendido Numeros
 * 
 * Estos numeros los podemos filtrar por fechas como lo es como los productos, pero por defecto se pide desede el front por mes.
 * !Dar prioridad a obtener esta informacion por mes
 * 
 * !FORMATO
type AnaliticFunnel = {
    numberCarts?:number  =>   Numero de carritos generados, se maneja desde el boton que se compra el carrito.
    numberRegister?:number  =>   Numero de registros, se maneja desde el Back la info que me trae.
    numberDirections?:number  =>   Numero de personas que ingresan sus datos, se maneja con el evento onclick del boton del componente.
    numberSales?:number  =>   Numero de ventas, se maneja en el back la info que me trae.
}
        Este es el formato que debe de tener la respuesta desde esta ruta
        *!EJEMPLO
        Ej => [
            {
            timeUnit: "primera semana"
            numberSales: 2000 =>  numero de ordenes completadas
            numberCarts: (numberCarts x 100) / 2000  =>  Porcentaje segun los carritos Hechos (pero no vendidos) 
            numberRegister: (numberRegister x 100) / 2000  =>  Porcentaje segun los usuarios registrados
            numberDirections: (numberDirections x 100) / 2000  =>  Porcentaje segun las direcciones completadas
        },
                    {
            timeUnit: "segunda Semana"
            numberSales: 4000 =>  numero de ordenes completadas
            numberCarts: (numberCarts x 100) / 2000  =>  Porcentaje segun los carritos Hechos (pero no vendidos) 
            numberRegister: (numberRegister x 100) / 2000  =>  Porcentaje segun los usuarios registrados
            numberDirections: (numberDirections x 100) / 2000  =>  Porcentaje segun las direcciones completadas
        },
                    {
            timeUnit: "tercera Semana"
            numberSales: 5000 =>  numero de ordenes completadas
            numberCarts: (numberCarts x 100) / 2000  =>  Porcentaje segun los carritos Hechos (pero no vendidos) 
            numberRegister: (numberRegister x 100) / 2000  =>  Porcentaje segun los usuarios registrados
            numberDirections: (numberDirections x 100) / 2000  =>  Porcentaje segun las direcciones completadas
        },
                            {
            timeUnit: "cuarta Semana"
            numberSales: 1000 =>  numero de ordenes completadas
            numberCarts: (numberCarts x 100) / 2000  =>  Porcentaje segun los carritos Hechos (pero no vendidos) 
            numberRegister: (numberRegister x 100) / 2000  =>  Porcentaje segun los usuarios registrados
            numberDirections: (numberDirections x 100) / 2000  =>  Porcentaje segun las direcciones completadas
        }
        ]




 */
statisticRoutes.get("/funnel", getFunnelStats);

export default statisticRoutes;
