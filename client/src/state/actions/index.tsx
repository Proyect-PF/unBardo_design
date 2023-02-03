import { ActionType } from "../action-types";

interface GetAllAction {
  type: ActionType.GET_ALL_PRODUCTS;
}

export type Action = GetAllAction;
