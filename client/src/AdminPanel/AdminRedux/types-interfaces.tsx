import { Product, User } from "../../state/types";

export enum AdminActionType {
  GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS",
  GET_ALL_ORDERS = "GET_ALL_ORDERS",
  GET_ALL_USERS = "GET_ALL_USERS",
  GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID",
  GET_ORDER_BY_ID = "GET_ORDER_BY_ID",
  GET_USER_BY_ID = "GET_USER_BY_ID",
  GET_PRODUCT_BY_NAME = "GET_PRODUCT_BY_NAME",
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
  payload: OrderAdmin;
}
interface IGetUserById {
  type: AdminActionType.GET_USER_BY_ID;
  payload: User;
}
interface IGetProductByName {
  type: AdminActionType.GET_PRODUCT_BY_NAME;
  payload: Product[];
}
export type AdminAction =
  | IGetAllProducts
  | IGetAllOrder
  | IGetAllUsers
  | IGetProductById
  | IGetOrderById
  | IGetUserById
  | IGetProductByName;

export type OrdersAdmin = {
  id: number;
  id_user: number;
  status: string;
  dispatched: boolean;
  createdAt: string;
  updatedAt: string;
  users: User;
};

export type OrderAdmin = {
  id: number;
  status: string;
  dispatched: boolean;
  updatedAt: string;
  fullname: string;
  email: string;
  orderProducts: {
    id: number;
    id_product: number;
    sizes: { S?: number; M?: number; L?: number; XL?: number };
  }[];
};
