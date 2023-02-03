import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import { Action } from "../actions";

export const getAllProducts = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.GET_ALL_PRODUCTS,
    });
  };
};
