import { ActionType } from "../action-types";
import { ActionCheckout } from "../actions";
import { Checkout, CheckoutState } from "../types";

const initialState: CheckoutState = {
    checkoutList: []
}

const checkoutReducer = (
    state = initialState,
    action: ActionCheckout
    ) => {
        switch (action.type) {
          case ActionType.ADD_CHECKOUT:
            let card: Checkout = action.payload;
            let findCard = state.checkoutList.findIndex(x => x.id === action.payload.id) //busco si hay una card igual en el carrito
            let update: Checkout[] = []; //variable auxiliar en caso de que exista otra card igual
            if(findCard >= 0) { // si encuentra una card
              update = state.checkoutList // copio el estado
              update[findCard].ammount += action.payload.ammount // le sumo el amount del payload al de la card existente
            }
            return {
              ...state,
              checkoutList: findCard === -1? [...state.checkoutList, card]: update
            }
          case ActionType.REMOVE_CHECKOUT:
            let filterList = state.checkoutList.filter(x => x.id !== action.payload);
            return {
                ...state,
                checkoutList: filterList
            }
          default:
            return {...state}
        }
    }

export default checkoutReducer;
