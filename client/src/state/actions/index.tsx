import { ActionType } from "../action-types";
import { AddProductPayload, Product } from "../types";

//AL: IMPORTANT!!!!
// all actions needs an interface, also be added to the Action type.
//define your interfaces here. (check below for action Type)

interface GetAllAction {
  type: ActionType.GET_ALL_PRODUCTS;
  payload: Product[];
}
interface UpdateRender {
  type: ActionType.UPDATE_RENDER;
}

interface AddProduct {
  type: ActionType.ADD_PRODUCT;
  payload: AddProductPayload;
}
interface GetProductDetails {
  type: ActionType.GET_PRODUCT_DETAILS;
  payload: Product;
}

interface SearchProducts {
  type: ActionType.SEARCH_PRODUCTS;
  payload: Product[];
}

//AL: once you created the needed interface add it here with |
export type Action =
  | GetAllAction
  | AddProduct
  | UpdateRender
  | GetProductDetails
  | SearchProducts;
