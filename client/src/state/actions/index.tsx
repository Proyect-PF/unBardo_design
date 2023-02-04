import { ActionType } from "../action-types";

//AL: IMPORTANT!!!!
// all actions needs an interface, also be added to the Action type.
//define your interfaces here. (check below for action Type)

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

interface SearchProducts {
  type: ActionType.SEARCH_PRODUCTS;
  payload: any;
}

//AL: once you created the needed interface add it here with |
export type Action =
  | GetAllAction
  | AddProduct
  | UpdateRender
  | GetProductDetails
  | SearchProducts;

export type AddProductPayload = {
  name: string;
  description: string;
  size: string;
  price: number;
  image: string;
  show_in_shop: string;
};
