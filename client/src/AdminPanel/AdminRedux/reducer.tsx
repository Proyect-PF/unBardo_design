import { Order, Product, User } from "../../types/types";
import { AdminAction, AdminActionType } from "./types-interfaces";
export type AdminState = {
  allProducts: Product[];
  productDetails: Product;
  allOrders: Order[];
  orderDetails: Order;
  allUsers: User[];
  userDetails: User;
};

const initialState = {
  allProducts: [],
  productDetails: {},
  allOrders: [],
  orderDetails: {},
  allUsers: [],
  userDetails: {},
};

const adminReducer = (
  state: AdminState = initialState,
  action: AdminAction
) => {
  switch (action.type) {
    case AdminActionType.GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
      };
    case AdminActionType.GET_ALL_ORDERS:
      return {
        ...state,
        allOrders: action.payload,
      };
    case AdminActionType.GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case AdminActionType.GET_PRODUCT_BY_ID:
      return {
        ...state,
        productDetails: action.payload,
      };
    case AdminActionType.GET_ORDER_BY_ID:
      return {
        ...state,
        orderDetails: action.payload,
      };
    case AdminActionType.GET_USER_BY_ID:
      return {
        ...state,
        userDetails: action.payload,
      };
    default:
      return initialState;
  }
};

export default adminReducer;
