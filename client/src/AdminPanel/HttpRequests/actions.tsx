import axios from "axios";
import { Dispatch } from "redux";
import { actionCreators } from "../../state";
import { ActionType } from "../../state/action-types";
import { ActionOrders, ActionUser } from "../../state/actions";
import { AddProductPayload, Product } from "../../state/types";

// axios.defaults.headers.post["x-access-token"] = `hola`;

//Product Routes
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

//Orders Routes
export const fetch_orders = () => {
  return (dispatch: Dispatch<ActionOrders>) => {
    axios
      .get(`http://localhost:3700/orders`)
      .then((res) =>
        res.data.map((e: any) => {
          return {
            id: e.id,
            fullname: e.users.fullname,
            email: e.users.email,
            createdAt: e.createdAt,
            status: e.status,
          };
        })
      )
      .then((payload) =>
        dispatch({
          type: ActionType.GET_ALL_ORDERS,
          payload,
        })
      )
      .catch((error) => console.log(error));
  };
};

export const fetch_order_id = (id: number) => {
  return (dispatch: Dispatch<ActionOrders>) => {
    axios
      .get(`http://localhost:3700/orders/${id}`)
      .then((res) =>
        res.data
          ? dispatch({
              type: ActionType.GET_ORDER_BY_ID,
              payload: {
                id: res.data.id,
                fullname: res.data.users.fullname,
                email: res.data.users.email,
                createdAt: res.data.createdAt,
                status: res.data.status,
              },
            })
          : console.log("Id Not Found")
      )
      .catch((error) => console.log(error));
  };
};

export const fetch_users = () => {
  return (dispatch: Dispatch<ActionUser>) => {
    axios
      .get(`http://localhost:3700/users`)
      .then((res) => {
        const payload = res.data;
        dispatch({
          type: ActionType.GET_ALL_USERS,
          payload,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const update_order = (id: number, status: string) => {
  axios.put(`http://localhost:3700/orders/?id=${id}&status=${status}`);
};
