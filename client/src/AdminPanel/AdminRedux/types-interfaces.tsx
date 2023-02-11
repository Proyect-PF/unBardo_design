export enum AdminActionType {
  GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS",
  GET_ALL_ORDERS = "GET_ALL_ORDERS",
  GET_ALL_USERS = "GET_ALL_USERS",
  GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID",
  GET_ORDER_BY_ID = "GET_ORDER_BY_ID",
  GET_USER_BY_ID = "GET_USER_BY_ID",
}

interface IGetAllProducts {
  type: AdminActionType.GET_ALL_PRODUCTS;
  payload: any;
}
interface IGetAllOrder {
  type: AdminActionType.GET_ALL_ORDERS;
  payload: any;
}
interface IGetAllUsers {
  type: AdminActionType.GET_ALL_USERS;
  payload: any;
}
interface IGetProductById {
  type: AdminActionType.GET_PRODUCT_BY_ID;
  payload: any;
}
interface IGetOrderById {
  type: AdminActionType.GET_ORDER_BY_ID;
  payload: any;
}
interface IGetUserById {
  type: AdminActionType.GET_USER_BY_ID;
  payload: any;
}

export type AdminAction =
  | IGetAllProducts
  | IGetAllOrder
  | IGetAllUsers
  | IGetProductById
  | IGetOrderById
  | IGetUserById;
