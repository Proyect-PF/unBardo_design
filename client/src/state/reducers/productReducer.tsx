import { Action } from "../actions";
import { ActionType } from "../action-types";
import axios from "axios";

export type ProductState = {
  productList: {
    name: string;
    description: string;
    size: string;
    price: number;
    image: string;
    show_in_shop: string;
  }[];
};

const initialState: ProductState = {
  productList: [],
};

const productReducer = (state: ProductState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.GET_ALL_PRODUCTS:
      let products: ProductState["productList"] = action.payload;
      return {
        ...state,
        productList: products,
      };
    case ActionType.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.productList, action.payload],
      };
    default:
      return {
        ...state,
      };
  }
};

export default productReducer;
