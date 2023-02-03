import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import { Action, AddProductPayload } from "../actions";
import axios from "axios";
import { ProductState } from "../reducers/productReducer";

export const getAllProducts = () => {
  return (dispatch: Dispatch<Action>) => {
    let payload: ProductState["productList"] = [];
    axios.get("http://localhost:3700/products").then((res) => {
      res.data.forEach((e: any) => {
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
    axios({
      method: "post",
      url: "http://localhost:3700/products",
      data: payload,
    }).then((res) =>
      dispatch({
        type: ActionType.ADD_PRODUCT,
        payload,
      })
    );
  };
};
