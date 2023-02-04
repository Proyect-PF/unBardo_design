import { Action } from "../actions";
import { ActionType } from "../action-types";
import axios from "axios";

export type ProductState = {
  productTotal: {
    id: number;
    name: string;
    description: string;
    size: string;
    price: number;
    image: string;
    show_in_shop: string;
  }[];
  productList: {
    id: number;
    name: string;
    description: string;
    size: string;
    price: number;
    image: string;
    show_in_shop: string;
  }[];
  productDetails: {
    id: number;
    name: string;
    description: string;
    size: string;
    price: number;
    image: string;
    show_in_shop: string;
  };
  render: boolean;
};

const initialState: ProductState = {
  productTotal: [],
  productList: [],
  productDetails: {
    id: 0,
    name: "",
    description: "",
    size: "",
    price: 0,
    image: "",
    show_in_shop: "",
  },
  render: true,
};

const productReducer = (state: ProductState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.GET_ALL_PRODUCTS:
      let products: ProductState["productList"] = action.payload;
      return {
        ...state,
        productTotal: products,
        productList: products,
      };
    case ActionType.SEARCH_PRODUCTS:
      let productSearch: ProductState["productList"] = action.payload;
      if (productSearch.length === 0) productSearch = state.productTotal;
      return {
        ...state,
        productList: productSearch,
      };
    case ActionType.ADD_PRODUCT:
      const newProduct = { ...action.payload, id: state.productList.length };
      return {
        ...state,
        productList: [...state.productList, newProduct],
      };
    case ActionType.GET_PRODUCT_DETAILS:
      return {
        ...state,
        productDetails: action.payload,
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
