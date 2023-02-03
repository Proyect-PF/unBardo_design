import { ActionType } from "../action-types";

interface GetAllAction {
  type: ActionType.GET_ALL_PRODUCTS;
  payload: any;
}

interface AddProduct {
  type: ActionType.ADD_PRODUCT;
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

export type Action = GetAllAction | AddProduct;

export type AddProductPayload = {
  id: number;
  name: string;
  description: string;
  size: string;
  price: number;
  image: string;
  show_in_shop: string;
};
