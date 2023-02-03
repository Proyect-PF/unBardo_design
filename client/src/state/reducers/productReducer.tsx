import { Action } from "../actions";
import { ActionType } from "../action-types";
import axios from "axios";

export type ProductState = {
  productList: {
    id: number;
    name: string;
    description: string;
    size: string;
    price: number;
    image: string;
    show_in_shop: string;
  }[];
  render: boolean;
};

const initialState: ProductState = {
  productList: [],
  render: true,
};

const productReducer = (state: ProductState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.GET_ALL_PRODUCTS:
      let products: ProductState["productList"] = action.payload;
      console.log("reducer", products);
      return {
        ...state,
        productList: products,
      };
    case ActionType.ADD_PRODUCT:
      const newProduct = { ...action.payload, id: state.productList.length };
      return {
        ...state,
        productList: [...state.productList, newProduct],
      };
    case ActionType.UPDATE_RENDER:
      return {
        ...state,
        render: state.render ? false : true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default productReducer;
