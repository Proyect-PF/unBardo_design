import { Action } from "../actions";
import { ActionType } from "../action-types";
import axios from "axios";

//AL: States Type need to be defined, all properties used & future implemented needs
//  to be defined here first.
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

//AL: initialState first defining, needs to match the type defined.
const initialState: ProductState = {
  productTotal: [], //AL:use this state for backup, if needs to retrieve total info for filtering/ordering/etc
  productList: [], //AL:this state is the one being rendered in the page
  //AL: this state is for information rendered in the details page of specific items
  productDetails: {
    id: 0,
    name: "",
    description: "",
    size: "",
    price: 0,
    image: "",
    show_in_shop: "",
  },
  //AL:this state is for future implementations (you can trigger a change here to force re-render)
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
