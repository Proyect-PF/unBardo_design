import { AdminAction, AdminActionType } from "./types-interfaces";
export type AdminState = {
  allProducts: any;
  productDetails: any;
  allOrders: any;
  orderDetails: any;
  allUsers: any;
  userDetails: any;
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
      console.log(action.payload);
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
      return { ...state };
  }
};

export default adminReducer;
