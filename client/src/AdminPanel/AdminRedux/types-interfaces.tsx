import { Product, User } from "../../state/types";
import { OrderDetails, Analitic } from "../../types/types";
export enum AdminActionType {
  GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS",
  GET_ALL_ORDERS = "GET_ALL_ORDERS",
  GET_ALL_USERS = "GET_ALL_USERS",
  GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID",
  GET_ORDER_BY_ID = "GET_ORDER_BY_ID",
  GET_USER_BY_ID = "GET_USER_BY_ID",
  GET_PRODUCT_BY_NAME = "GET_PRODUCT_BY_NAME",
  GET_ORDERS_COUNT = "GET_ORDERS_COUNT",
  GET_ANALITICS = "GET_ANALITICS",
}

interface IGetAllProducts {
  type: AdminActionType.GET_ALL_PRODUCTS;
  payload: Product[];
}
interface IGetAllOrder {
  type: AdminActionType.GET_ALL_ORDERS;
  payload: OrdersAdmin[];
}
interface IGetAllUsers {
  type: AdminActionType.GET_ALL_USERS;
  payload: User[];
}
interface IGetProductById {
  type: AdminActionType.GET_PRODUCT_BY_ID;
  payload: Product;
}
interface IGetOrderById {
  type: AdminActionType.GET_ORDER_BY_ID;
  payload: OrderDetails;
}
interface IGetUserById {
  type: AdminActionType.GET_USER_BY_ID;
  payload: User;
}
interface IGetProductByName {
  type: AdminActionType.GET_PRODUCT_BY_NAME;
  payload: Product[];
}
interface IGetOrdersCount {
  type: AdminActionType.GET_ORDERS_COUNT;
  payload: number;
}



interface IGetAnaliticsLine {
  type: AdminActionType.GET_ANALITICS;
  payload: Analitic[];
}

export type AdminAction =
  | IGetAllProducts
  | IGetAllOrder
  | IGetAllUsers
  | IGetProductById
  | IGetOrderById
  | IGetUserById
  | IGetProductByName
  | IGetOrdersCount
  | IGetAnaliticsLine

export type OrdersAdmin = {
  id: number;
  id_user: number;
  status: string;
  dispatched: boolean;
  createdAt: string;
  updatedAt: string;
  users: User;
};
