import { Order, Product, User } from "../../state/types";
import { AdminAction, AdminActionType, OrdersAdmin } from "./types-interfaces";

export type AdminState = {
  allProducts: Product[];
  productDetails: Product;
  allOrders: OrdersAdmin[];
  orderDetails: Order;
  allUsers: User[];
  userDetails: User;
  ordersCount: number;
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
  ordersCount: 0,
  orderDetails: {
    status: "",
    external_reference: 0,
    products: [],
    payment_method: "",
    payment_type: "",
    total_amount: 0,
    cuotes: 0,
    total_paid_amount: 0,
    dispatched: false,
    address: {
      street_name: "",
      street_number: "",
      zip_code: "",
    },
    phone: {
      area_code: "",
      number: "",
    },
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
    case AdminActionType.GET_ORDERS_COUNT:
      return {
        ...state,
        ordersCount: action.payload,
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
