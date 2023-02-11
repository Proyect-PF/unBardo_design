import { string } from "yup";
import { ActionType } from "../action-types";
import { ActionUser } from "../actions";
import { UserState } from "../types";

const initialState: UserState = {
  //allUsers: [],
  //adminLogin: false,
  //userLogin: false, // YA NO SE USA MAS
  userId: null,
  userInfo: null,
  userToken: null,
  userType: null,
  error: null,
  success: false,
  
};


// Estaria bueno poder inicializar los valores directo en los parametros
// Tambien eliminar el Action User y definirlos en los parametros para que matcheen
// mas facil y a la vista con la response del endpoint
const userReducer = (state: UserState = initialState,   action: ActionUser) => {
  switch (action.type) {

    // Action para cuando se logea un usuario, la respuesta está en el ocontrolador
    // controllers_auth.ts
    // 11/02 return res.json({ token: token , role: roleA, fullname: userFound["fullname"]});
    case ActionType.USER_LOGIN:
      return {
        ...state,
        userId: action.payload.id,
        userToken: action.payload.token,
        userInfo: action.payload.fullname,
        success: true,
        userType: action.payload.role,
      };
    case ActionType.USER_REGISTER:
        return {
          ...state,
        };
    case ActionType.USER_LOGOUT:
          return {
            ...state,
            ...initialState
          };
    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
