import { ActionType } from '../action-types';
import {
  AddProductPayload,
  Checkout,
  Orders,
  Product,
  User,
  Order,
} from '../types';

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

interface ClearProductDetails {
  type: ActionType.CLEAR_PRODUCT_DETAILS;
}

//AL: once you created the needed interface add it here with |
export type ActionProducts =
  | GetAllAction
  | AddProduct
  | UpdateRender
  | GetProductDetails
  | SearchProducts
  | SortProducts
  | FilterProducts
  | ClearProductDetails;

interface UserLogin {
  type: ActionType.USER_LOGIN;
  payload: { token: string; role: string; fullname: string; id: string };
}
interface UserRegister {
  type: ActionType.USER_REGISTER;
  //Token
  payload: object | string;
}
interface UserLogout {
  type: ActionType.USER_LOGOUT;
  //Token
}
interface GetAllUsers {
  type: ActionType.GET_ALL_USERS;
  payload: User[];
}

export type ActionUser = UserLogin | GetAllUsers | UserLogout | UserRegister;

//LG: Interfaces & types for CHECKOUT STATE

interface AddCheckout {
  type: ActionType.ADD_CHECKOUT;
  payload: Checkout;
}

interface RemoveCheckout {
  type: ActionType.REMOVE_CHECKOUT;
  payload: string;
}
interface ClearCheckoutList {
  type: ActionType.CLEAR_CHECKOUT_LIST;
}

export type ActionCheckout = AddCheckout | RemoveCheckout | ClearCheckoutList;

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

interface GetOrderCheckout {
  type: ActionType.GET_ORDER_CHECKOUT;
  payload: Order;
}

export type ActionOrderCheckout = GetOrderCheckout;
