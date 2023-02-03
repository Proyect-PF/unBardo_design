import { AddProductAction } from '../actions/index';

export type ProductState = {
    name: string;
    description: string;
    size: string;
    price: number;
    image: string;
    show_in_shop: string;
};

const initialState: ProductState = {
  name: '',
  description: '',
  size: '',
  price: 0,
  image: '',
  show_in_shop: '',
};

export const productReducer = (state = initialState, action: AddProductAction): ProductState => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};