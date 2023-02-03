import { ActionType } from "../action-types";

interface GetAllAction {
  type: ActionType.GET_ALL_PRODUCTS;
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

export type Action = GetAllAction | AddProduct;

export type AddProductPayload = {
  name: string;
  description: string;
  size: string;
  price: number;
  image: string;
  show_in_shop: string;
};
