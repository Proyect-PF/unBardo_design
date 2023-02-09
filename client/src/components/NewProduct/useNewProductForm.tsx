export const a = "a";
// import { useReducer } from "react";
// import { Product } from "../../state/types";

// interface FormState {
//   inputValues: Product;
// }

// const INITIAL_STATE = {
//   name: "",
//   description: "",
//   price: 0,
//   size: "",
//   color: "",
//   show_in_shop: "",
//   image: "",
// };

// // Tipo para definir las actions del reducer
// type FormReducerAction =
//   | {
//       type: "change_value";
//       payload: {
//         inputName: string;
//         inputValue: string;
//       };
//     }
//   | {
//       type: "clear";
//     };

// const formReducer = (
//   state: FormState["inputValues"],
//   action: FormReducerAction
// ) => {
//   switch (action.type) {
//     case "change_value":
//       const { inputName, inputValue } = action.payload;
//       return {
//         ...state,
//         [inputName]: inputValue,
//       };
//     case "clear":
//       return INITIAL_STATE;

//     default:
//       return state;
//   }
// };

// const useNewProductForm = () => {
//   return useReducer(formReducer, INITIAL_STATE);
// };

// export default useNewProductForm;
