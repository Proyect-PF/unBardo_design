import { Router } from "express";
const statisticRoutes = Router();
import {
    getProductSalesStats,
    getGeneralStats
}
from "../controllers/statistic/statistic.controller";

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
statisticRoutes.get("/general-stats", getGeneralStats);
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
 const arrData:AnaliticFunnel[] = [
 {
      timeUnit: "Enero",
      numberRegister: 100 %,
      numberCarts: (220 * 100) / 350,
      numberDirections: (110 * 100) / 350,
      numberSales: (60 * 100) / 350,
    },
 {
      timeUnit: "Febrero",
      numberRegister: 100,
      numberCarts: (350 * 100) / 400,
      numberDirections: (50 * 100) / 400,
      numberSales: (25 * 100) / 400,
    },
 {
      timeUnit: "Marzo",
      numberRegister: 100,
      numberCarts: (150 * 100) / 200,
      numberDirections: (40 * 100) / 200,
      numberSales: (20 * 100) / 200,
    },
 Ej => [
 {
            timeUnit: "primera semana"
            numberRegister: 200 =>  numero de ordenes completadas
            numberCarts: (150 * 100) / 200,  =>  Porcentaje segun los carritos Hechos (pero no vendidos)
            numberDirections: (40 * 100) / 200,  => Porcentaje segun las direcciones completadas
            numberSales: (60 * 100) / 350,  =>   Porcentaje segun los usuarios registrados
        },
 {
            timeUnit: "segunda Semana"
            numberRegister: 400, =>  numero de ordenes completadas
                  numberCarts: (350 * 100) / 400,  =>  Porcentaje segun los carritos Hechos (pero no vendidos)
                  numberDirections: (50 * 100) / 400,  => Porcentaje segun las direcciones completadas
                  numberSales: (25 * 100) / 400,  =>   Porcentaje segun los usuarios registrados
        },
 {
            timeUnit: "tercera Semana"
                  numberRegister: 350, =>  numero de ordenes completadas
                  numberCarts: (220 * 100) / 350,  =>  Porcentaje segun los carritos Hechos (pero no vendidos)
                  numberDirections: (110 * 100) / 350,  => Porcentaje segun las direcciones completadas
                 numberSales: (60 * 100) / 350,  =>   Porcentaje segun los usuarios registrados
        },
 {
            timeUnit: "cuarta Semana"
            numberRegister: 200 =>  numero de ordenes completadas
            numberCarts: (150 * 100) / 200,  =>  Porcentaje segun los carritos Hechos (pero no vendidos)
            numberDirections: (40 * 100) / 200,  => Porcentaje segun las direcciones completadas
            numberSales: (60 * 100) / 350,  =>   Porcentaje segun los usuarios registrados
        }
 ]
 */



export default statisticRoutes;