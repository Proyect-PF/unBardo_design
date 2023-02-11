import { string } from "yup";
import { getItem, setItem } from "../../utils/localStorage";
import { ActionType } from "../action-types";
import { ActionUser } from "../actions";
import { UserState } from "../types";

const initialState: UserState = {
  userId: getItem('userId') || null ,
  userInfo: getItem('userInfo') || null,
  userToken: getItem('userToken') || null,
  userType: getItem('userType') || null,
  error: getItem('error') || null,
  success: getItem('success') || false,
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
      setItem('userId', action.payload.id);
      setItem('userInfo', action.payload.fullname);
      setItem('userToken', action.payload.token);
      setItem('userType', action.payload.role);
      setItem('error', null);
      setItem('success', true);
      return {
        ...state,
        userId: getItem('userId'),
        userToken: getItem('userToken'),
        userInfo: getItem('userInfo'),
        success: true,
        userType: getItem('userType'),
      };
    case ActionType.USER_REGISTER:
        return {
          ...state,
        };
    case ActionType.USER_LOGOUT:
      setItem('userId', null);
      setItem('userInfo', null);
      setItem('userToken', null);
      setItem('userType', null);
      setItem('error', null);
      setItem('success', false);
          return {
            ...state,
            userId: getItem('userId'),
            userToken: getItem('userToken'),
            userInfo: getItem('userInfo'),
            success: getItem('success'),
            userType: getItem('userType'),
          };
    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
