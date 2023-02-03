import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import { Action, AddProductPayload } from "../actions";
import axios from "axios";
import { ProductState } from "../reducers/productReducer";

export const getAllProducts = () => {
  return (dispatch: Dispatch<Action>) => {
    let payload: ProductState["productList"] = [];
    fetch("http://localhost:3700/products")
      .then((response) => response.json())
      .then((res) => {
        res.forEach((e: any) => {
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

export const addProduct = (payload: AddProductPayload) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.ADD_PRODUCT,
      payload,
    });
  };
};
