import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import { Action, AddProductPayload } from "../actions";

export const getAllProducts = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.GET_ALL_PRODUCTS,
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
