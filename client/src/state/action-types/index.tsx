//AL: Define your actionType here

export enum ActionType {
  // MANEJO PRODUCTS
  GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS",
  ADD_PRODUCT = "ADD_PRODUCT",
  GET_PRODUCT_DETAILS = "GET_PRODUCT_DETAILS",
  CLEAR_PRODUCT_DETAILS = "CLEAR_PRODUCT_DETAILS",
  GET_PRODUCT_COUNT = "GET_PRODUCT_COUNT",
  GET_PRODUCT_PROMO = "GET_PRODUCT_PROMO",
  ////
  UPDATE_RENDER = "UPDATE_RENDER",
  SEARCH_PRODUCTS = "SEARCH_PRODUCTS",
  SORT_PRODUCTS = "SORT_PRODUCTS",
  FILTER_PRODUCTS = "FILTER_PRODUCTS",
  CLEAR_FILTER = "CLEAR_FILTER",
  PAGINATION_SET = "PAGINATION_SET",
  ADD_CHECKOUT = "ADD_CHECKOUT",
  REMOVE_CHECKOUT = "REMOVE_CHECKOUT",
  CLEAR_CHECKOUT_LIST = "CLEAR_CHECKOUT_LIST",
  GET_ORDER_DETAILS_SUCCESS = "GET_ORDER_DETAILS_SUCCESS",
  GET_ORDER_DETAILS_FAILURE = "GET_ORDER_DETAILS_FAILURE",
  GET_ALL_ORDERS = "GET_ALL_ORDERS",
  GET_ORDER_BY_ID = "GET_ORDER_BY_ID",
  GET_ALL_USERS = "GET_ALL_USERS",
  GET_ORDER_BY_UID = "GET_ORDER_BY_UID",
  // MANEJO SESION USUARIO
  USER_LOGIN = "USER_LOGIN",
  USER_REGISTER = "USER_REGISTER",
  USER_LOGOUT = "USER_LOGOUT",
  GET_FAVORITES = "GET_FAVORITES",
  SET_FAVORITE = "SET_FAVORITE",
  DELETE_FAVORITE = "DELETE_FAVORITE",
  DELETE_ALL_FAVORITES = "DELETE_ALL_FAVORITES",
  LOG_OUT_FAVORITES = "LOG_OUT_FAVORITES",
}
