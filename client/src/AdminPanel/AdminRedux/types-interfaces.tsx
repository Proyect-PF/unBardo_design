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
  payload: Product[];
}
interface IGetAllOrder {
  type: AdminActionType.GET_ALL_ORDERS;
  payload: Order[];
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
  payload: Order;
}
interface IGetUserById {
  type: AdminActionType.GET_USER_BY_ID;
  payload: User;
}

export type AdminAction =
  | IGetAllProducts
  | IGetAllOrder
  | IGetAllUsers
  | IGetProductById
  | IGetOrderById
  | IGetUserById;
