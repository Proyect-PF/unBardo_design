import { Favorites } from "../../types/types"
import { ActionType } from "../action-types";
import { ActionFavorites } from "../actions"

const initialState: Favorites = {
    id: 0,
    id_user: 0,
    products_id: [],
}

const favoritesReducer = (state= initialState, action: ActionFavorites) => {
    switch (action.type) {
        case ActionType.GET_FAVORITES:
            return {
                ...state,
                id: action.payload.id,
                id_user: action.payload.id_user,
                products_id: action.payload.products_id,
            }
        case ActionType.LOG_OUT_FAVORITES:
            return {
                ...state,
                id: 0,
                id_user: 0,
                products_id: [],
            }
        default:
            return {
                ...state
            }
    }
}

export default favoritesReducer