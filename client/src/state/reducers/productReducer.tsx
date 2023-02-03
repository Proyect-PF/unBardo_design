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
          name: "Remera Oversize unBardo Black",
          description: "Remera Oversize unBardo Black",
          size: "M",
          price: 8000,
          image: "url",
          show_in_shop: "string",
        },
        {
          name: "Remera Oversize unBardo Black",
          description: "Remera Oversize unBardo Black",
          size: "M",
          price: 8000,
          image: "url",
          show_in_shop: "string",
        },
        {
          name: "Remera Oversize unBardo Black",
          description: "Remera Oversize unBardo Black",
          size: "M",
          price: 8000,
          image: "url",
          show_in_shop: "string",
        },
        {
          name: "Remera Oversize unBardo Black",
          description: "Remera Oversize unBardo Black",
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
    case ActionType.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    default:
      return {
        ...state,
      };
  }
};

export default productReducer;
