import { Action } from "../actions";
import { ActionType } from "../action-types";

type ProductState = {
  products: {
    name: string;
    description: string;
    size: string;
    price: number;
    image: string;
    show_in_shop: string;
  }[];
};

const initialState: ProductState = {
  products: [],
};

const productReducer = (state: ProductState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.GET_ALL_PRODUCTS:
      let products = [
        {
          name: "remera",
          description: "remera",
          size: "M",
          price: 8000,
          image: "url",
          show_in_shop: "string",
        },
      ];
      return {
        ...state,
        products,
      };
    default:
      return {
        ...state,
      };
  }
};

export default productReducer;
