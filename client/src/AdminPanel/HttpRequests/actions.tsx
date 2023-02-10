import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../../state/action-types";
import { ActionUser } from "../../state/actions";
import { AddProductPayload, Product } from "../../state/types";

axios.defaults.headers.common["x-access-token"] = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc2MDI4NDI5LCJleHAiOjE2NzYxMTQ4Mjl9.92JhKvWFk6gi0M41zsyxGkxpuHs_xicYpHKvXEbRraM`;

export const create_product = (payload: AddProductPayload) => {
    axios
    .post("http://localhost:3700/products/",payload)
    .then((res) => alert("OK")).catch((err)=> alert(err.response.data.message))
};

export const update_product = (payload: Product) => {
  axios
    .put(`http://localhost:3700/products`, payload)
    .then(() => alert("OK")).catch((err)=> alert(err.response.data.message))
};

export const delete_product = (payload: number) => {
  axios
    .delete(`http://localhost:3700/products/${payload}`)
    .then(() => alert("OK")).catch((err)=> alert(err.response.data.message))
};





//Orders Routes
export const fetch_orders = () => {
  axios.get(`http://localhost:3700/orders`);
};

export const fetch_users = () => {
  return (dispatch: Dispatch<ActionUser>) => {
    axios
      .get(`http://localhost:3700/users`)
      .then((res) => {
        console.log(res.data);
        const payload = res.data;
        dispatch({
          type: ActionType.GET_ALL_USERS,
          payload,
        });
      })
      .catch((error) => console.log(error));
  };
};




