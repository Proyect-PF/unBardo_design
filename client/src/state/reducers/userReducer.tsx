import { ActionType } from "../action-types";
import { ActionUser } from "../actions";
import { UserState } from "../types";

const initialState: UserState = {
  allUsers: [],
  adminLogin: false,
};

const userReducer = (state: UserState = initialState, action: ActionUser) => {
  switch (action.type) {
    case ActionType.ADMIN_LOGIN:
      return {
        ...state,
        adminLogin: state.adminLogin ? false : true,
      };
    case ActionType.GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
