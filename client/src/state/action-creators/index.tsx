import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import { Action, AddProductPayload } from "../actions";
import axios from "axios";
import { ProductState } from "../reducers/productReducer";

//AL: Here we're defining the actions to be consumed in the components

//AL: this function fetch all products in the database
export const getAllProducts = () => {
  return (dispatch: Dispatch<Action>) => {
    let payload: ProductState["productList"] = [];
    axios.get("http://localhost:3700/products").then((res) => {
      res.data.forEach((e: any) => {
        //AL: this properties needs to be revisited for implementation of the blank strings
        payload.push({
          id: e.id,
          name: e.name,
          description: e.description,
          size: e.size,
          price: e.price,
          image: "",
          show_in_shop: "",
        });
      });
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
      res.data.forEach((e: any) => {
        //AL: this properties needs to be revisited for implementation of the blank strings
        payload.push({
          id: e.id,
          name: e.name,
          description: e.description,
          size: e.size,
          price: e.price,
          image: "",
          show_in_shop: "",
        });
      });
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
    let product = {
      id: -1,
      name: "error",
      description: "",
      size: "",
      price: 0,
      image: "",
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
          image: "",
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
