import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { ActionProducts, ActionUser } from "../actions";
import { AddProductPayload, Product, ProductState } from "../types";

//AL: Here we're defining the actions to be consumed in the components

//AL: this function fetch all products in the database
export const getAllProducts = () => {
  return (dispatch: Dispatch<ActionProducts>) => {
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
  return (dispatch: Dispatch<ActionProducts>) => {
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
export const addProduct = (payload: Product) => {
  return (dispatch: Dispatch<ActionProducts>) => {
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
  return (dispatch: Dispatch<ActionProducts>) => {
    let product: Product = {
      id: -1,
      name: "error",
      description: "",
      size: "",
      price: 0,
      color: "",
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
          color: res.data.color,
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

//AL: route needs to match http://localhost:3700/products/price/desc
//so filter needs to be ["price","asc or desc"]
export const sortProducts = (sort: string[]) => {
  return (dispatch: Dispatch<ActionProducts>) => {
    let payload: ProductState["productList"] = [];
    axios
      .get(`http://localhost:3700/products/${sort[0]}/${sort[1]}`)
      .then((res) => {
        if (res.data) {
          payload = res.data;
          dispatch({
            type: ActionType.SEARCH_PRODUCTS,
            payload,
          });
        }
      });
  };
};

//AL: route needs to match http://localhost:3700/products/filterColor/black
//so filter needs to be ["filterColor","color that needs to be filtered"]
export const filterProducts = (filter: string[]) => {
  return (dispatch: Dispatch<ActionProducts>) => {
    let payload: ProductState["productList"] = [];
    axios
      .get(`http://localhost:3700/products/${filter[0]}/${filter[1]}`)
      .then((res) => {
        if (res.data) {
          payload = res.data;
          dispatch({
            type: ActionType.FILTER_PRODUCTS,
            payload,
          });
        }
      });
  };
};

export const adminLog = () => {
  return (dispatch: Dispatch<ActionUser>) => {
    dispatch({
      type: ActionType.ADMIN_LOGIN,
    });
  };
};
