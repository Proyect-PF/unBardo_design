import { ActionType } from "../action-types";
import { ActionUser } from "../actions";
import { UserState } from "../types";

const initialState: UserState = {
  adminLogin: false,
};

const userReducer = (state: UserState = initialState, action: ActionUser) => {
  switch (action.type) {
    case ActionType.ADMIN_LOGIN:
      return {
        ...state,
        adminLogin: state.adminLogin ? false : true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
