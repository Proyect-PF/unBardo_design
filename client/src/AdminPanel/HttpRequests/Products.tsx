import axios from "axios";
import { Dispatch } from "redux";
import { ActionProducts } from "../../state/actions";
import { AddProductPayload } from "../../state/types";

// axios.defaults.headers.post["x-access-token"] = `hola`;

export const create_product = (payload: AddProductPayload) => {
  axios
    .post("http://localhost:3700/products/", payload)
    .then(() => console.log("OK"));
};
