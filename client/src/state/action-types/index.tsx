//AL: Define your actionType here

export enum ActionType {
  // MANEJO PRODUCTS
  GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS",
  ADD_PRODUCT = "ADD_PRODUCT",
  GET_PRODUCT_DETAILS = "GET_PRODUCT_DETAILS",
  CLEAR_PRODUCT_DETAILS = "CLEAR_PRODUCT_DETAILS",
  ////
  UPDATE_RENDER = "UPDATE_RENDER",
  SEARCH_PRODUCTS = "SEARCH_PRODUCTS",
  SORT_PRODUCTS = "SORT_PRODUCTS",
  FILTER_PRODUCTS = "FILTER_PRODUCTS",
  ADD_CHECKOUT = "ADD_CHECKOUT",
  REMOVE_CHECKOUT = "REMOVE_CHECKOUT",
  CLEAR_CHECKOUT_LIST = "CLEAR_CHECKOUT_LIST",
  GET_ALL_ORDERS = "GET_ALL_ORDERS",
  GET_ORDER_BY_ID = "GET_ORDER_BY_ID",
  GET_ALL_USERS = "GET_ALL_USERS",
  // MANEJO SESION USUARIO
  USER_LOGIN = "USER_LOGIN",
  USER_REGISTER = "USER_REGISTER",
  USER_LOGOUT = "USER_LOGOUT",
}
