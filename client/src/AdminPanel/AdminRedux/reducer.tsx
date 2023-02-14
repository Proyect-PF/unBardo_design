import { Product, User } from "../../state/types";
import {
  AdminAction,
  AdminActionType,
  OrderAdmin,
  OrdersAdmin,
} from "./types-interfaces";

export type AdminState = {
  allProducts: Product[];
  productDetails: Product;
  allOrders: OrdersAdmin[];
  orderDetails: OrderAdmin;
  allUsers: User[];
  userDetails: User;
};

const initialState: AdminState = {
  allProducts: [],
  productDetails: {
    id: 0,
    name: "",
    description: "",
    S: 0,
    M: 0,
    L: 0,
    XL: 0,
    price: 0,
    color: "",
    show_in_shop: false,
    image: "",
  },
  allOrders: [],
  orderDetails: {
    id: 0,
    fullname: "",
    status: "",
    dispatched: false,
    updatedAt: "",
    email: "",
    orderProducts: [
      {
        id: 0,
        id_product: 0,
        sizes: {},
      },
    ],
  },
  allUsers: [],
  userDetails: {
    fullname: "",
    password: "",
    email: "",
    id: 0,
    id_role: 0,
    news_letter: true,
  },
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
    case AdminActionType.GET_PRODUCT_BY_NAME:
      return {
        ...state,
        allProducts: action.payload,
      };
    default:
      return { ...state };
  }
};

export default adminReducer;
