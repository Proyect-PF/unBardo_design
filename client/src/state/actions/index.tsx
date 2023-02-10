import { ActionType } from "../action-types";
import { AddProductPayload, Product, Checkout, User, Orders } from "../types";

//AL: IMPORTANT!!!!
// all actions needs an interface, also be added to the Action type.
//define your interfaces here. (check below for action Type)

interface GetAllAction {
  type: ActionType.GET_ALL_PRODUCTS;
  payload: Product[];
}
interface UpdateRender {
  type: ActionType.UPDATE_RENDER;
  payload: boolean;
}

interface AddProduct {
  type: ActionType.ADD_PRODUCT;
  payload: AddProductPayload;
}
interface GetProductDetails {
  type: ActionType.GET_PRODUCT_DETAILS;
  payload: Product;
}

interface SearchProducts {
  type: ActionType.SEARCH_PRODUCTS;
  payload: Product[];
}

interface SortProducts {
  type: ActionType.SORT_PRODUCTS;
  payload: Product[];
}

interface FilterProducts {
  type: ActionType.FILTER_PRODUCTS;
  payload: Product[];
}

//AL: once you created the needed interface add it here with |
export type ActionProducts =
  | GetAllAction
  | AddProduct
  | UpdateRender
  | GetProductDetails
  | SearchProducts
  | SortProducts
  | FilterProducts;

//AL: Interfaces & types for USER STATE

interface AdminLogin {
  type: ActionType.ADMIN_LOGIN;
}

interface IUserRegister {
  type: ActionType.GET_TOKEN_USER_LOG;
  //Token
  payload: object | string;
}
interface IUserLog {
  type: ActionType.GET_TOKEN_USER_LOG;
  //Token
  payload: string | object;
}

interface GetAllUsers {
  type: ActionType.GET_ALL_USERS;
  payload: User[];
}

export type ActionUser = AdminLogin | GetAllUsers | IUserLog | IUserRegister;

//LG: Interfaces & types for CHECKOUT STATE

interface AddCheckout {
  type: ActionType.ADD_CHECKOUT;
  payload: Checkout;
}

interface RemoveCheckout {
  type: ActionType.REMOVE_CHECKOUT;
  payload: string;
}

export type ActionCheckout = AddCheckout | RemoveCheckout;

//Interfaces & types for ORDERS STATE

interface GetAllOrders {
  type: ActionType.GET_ALL_ORDERS;
  payload: Orders[];
}

interface GetOrderById {
  type: ActionType.GET_ORDER_BY_ID;
  payload: Orders;
}

export type ActionOrders = GetAllOrders | GetOrderById;
