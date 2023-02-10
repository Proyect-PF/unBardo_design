import axios from "axios";

import { AddProductPayload, Product } from "../../state/types";

// axios.defaults.headers.post["x-access-token"] = `hola`;

export const create_product = (payload: AddProductPayload) => {
  axios
    .post("http://localhost:3700/products/", payload)
    .then(() => console.log("OK"));
};

export const update_product = (payload: Product) => {
  axios
    .put(`http://localhost:3700/products`, payload)
    .then(() => console.log("OK"));
};

export const delete_product = (payload: number) => {
  axios
    .delete(`http://localhost:3700/products/${payload}`)
    .then(() => console.log("OK"));
};
