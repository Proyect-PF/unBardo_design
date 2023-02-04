import { ActionType } from "../action-types";

interface GetAllAction {
  type: ActionType.GET_ALL_PRODUCTS;
  payload: any;
}
interface UpdateRender {
  type: ActionType.UPDATE_RENDER;
}

interface AddProduct {
  type: ActionType.ADD_PRODUCT;
  payload: {
    name: string;
    description: string;
    size: string;
    price: number;
    image: string;
    show_in_shop: string;
  };
}
interface GetProductDetails {
  type: ActionType.GET_PRODUCT_DETAILS;
  payload: {
    id: number;
    name: string;
    description: string;
    size: string;
    price: number;
    image: string;
    show_in_shop: string;
  };
}

export type Action =
  | GetAllAction
  | AddProduct
  | UpdateRender
  | GetProductDetails;

export type AddProductPayload = {
  name: string;
  description: string;
  size: string;
  price: number;
  image: string;
  show_in_shop: string;
};
