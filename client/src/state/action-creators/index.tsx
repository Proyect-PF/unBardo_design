import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import { Action } from "../actions";
import axios from "axios";
import { AddProductPayload, ProductState, Product } from "../types";

//AL: Here we're defining the actions to be consumed in the components

//AL: this function fetch all products in the database
export const getAllProducts = () => {
  return (dispatch: Dispatch<Action>) => {
    let payload: ProductState["productList"] = [];
    axios.get("http://localhost:3700/products").then((res) => {
      payload = res.data;
      dispatch({
        type: ActionType.GET_ALL_PRODUCTS,
        payload,
      });
    });
  };
};

//AL: this actions searchs specific products by a string match in the database
export const searchProducts = (name: string) => {
  return (dispatch: Dispatch<Action>) => {
    let payload: ProductState["productList"] = [];
    axios.get(`http://localhost:3700/products/search/${name}`).then((res) => {
      payload = res.data;
      dispatch({
        type: ActionType.SEARCH_PRODUCTS,
        payload,
      });
    });
  };
};

//AL: this actions post a created product in the database
export const addProduct = (payload: AddProductPayload) => {
  return (dispatch: Dispatch<Action>) => {
    axios({
      method: "post",
      url: "http://localhost:3700/products",
      data: payload,
    }).then(() =>
      dispatch({
        type: ActionType.ADD_PRODUCT,
        payload,
      })
    );
  };
};

//AL: this actions searchs specific products by id in the database
export const getProductDetails = (id: number) => {
  return (dispatch: Dispatch<Action>) => {
    let product: Product = {
      id: -1,
      name: "error",
      description: "",
      size: "",
      price: 0,
      show_in_shop: "",
    };
    axios.get(`http://localhost:3700/products?id=${id}`).then((res) => {
      if (res.data?.id) {
        product = {
          id: res.data.id,
          name: res.data.name,
          description: res.data.description,
          size: res.data.size,
          price: res.data.price,
          show_in_shop: "",
        };
      }
      dispatch({
        type: ActionType.GET_PRODUCT_DETAILS,
        payload: product,
      });
    });
  };
};
