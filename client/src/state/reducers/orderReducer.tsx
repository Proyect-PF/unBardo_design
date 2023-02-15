import { Order } from '../../types/types';
import { ActionType } from '../action-types';
import { ActionOrderCheckout } from '../actions';

export interface OrderState {
  order: Order | [];
}

const initialOrderState: OrderState = {
  order: [],
};

const orderCheckoutReducer = (
  state = initialOrderState,
  action: ActionOrderCheckout
) => {
  switch (action.type) {
    case ActionType.GET_ORDER_CHECKOUT:
      return { ...state, order: action.payload };
    default:
      return state;
  }
};
export default orderCheckoutReducer;
