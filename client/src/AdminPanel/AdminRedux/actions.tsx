import axios from "axios";
import { Dispatch } from "redux";
import { Product } from "../../state/types";
import { AdminAction, AdminActionType } from "./types-interfaces";
import Swal from "sweetalert2";

axios.defaults.headers.common[
  "x-access-token"
] = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc2MDI4NDI5LCJleHAiOjE2NzYxMTQ4Mjl9.92JhKvWFk6gi0M41zsyxGkxpuHs_xicYpHKvXEbRraM`;

//Product actions
export const ADMfetch_products = () => {
  return (dispatch: Dispatch<AdminAction>) => {
    axios.get("http://localhost:3700/products/").then((res) => {
      const payload: Product[] = res.data;
      dispatch({
        type: AdminActionType.GET_ALL_PRODUCTS,
        payload: payload,
      });
    });
  };
};

export const ADMfetch_products_name = (name: string) => {
  return (dispatch: Dispatch<AdminAction>) => {
    axios.get(`http://localhost:3700/products/search/${name}`).then((res) => {
      const payload = res.data;
      dispatch({
        type: AdminActionType.GET_PRODUCT_BY_NAME,
        payload,
      });
    });
  };
};

export const ADMfetch_products_id = (id: number | undefined) => {
  return (dispatch: Dispatch<AdminAction>) => {
    axios.get(`http://localhost:3700/products/${id}`).then((res) => {
      const payload = res.data;
      dispatch({
        type: AdminActionType.GET_PRODUCT_BY_ID,
        payload,
      });
    });
  };
};

export const ADMcreate_product = (payload: any) => {
  axios
    .post("http://localhost:3700/products/", payload)
    .then((res) => {
      Swal.fire({
        title: "Se creo el producto con exito",
        confirmButtonText: "OK",
      });
    })
    .catch((err) => {
      Swal.fire({
        title: err.response.data.message,
        cancelButtonText: "OK",
      });
    });
};

export const ADMupdate_product = (payload: any) => {
  axios
    .put(`http://localhost:3700/products`, payload)
    .then(() =>
      Swal.fire({
        title: "Se edito el producto con exito",
        confirmButtonText: "OK",
      })
    )
    .catch((err) =>
      Swal.fire({
        title: err.response.data.message,
        cancelButtonText: "OK",
      })
    );
};

export const ADMdelete_product = (payload: number | undefined) => {
  axios
    .delete(`http://localhost:3700/products/${payload}`)
    .then(() =>
      Swal.fire({
        title: "Se elimino el producto con exito",
        confirmButtonText: "OK",
      })
    )
    .catch((err) =>
      Swal.fire({
        title: err.response.data.message,
        cancelButtonText: "OK",
      })
    );
};

//Orders Actions
export const ADMfetch_orders = () => {
  return (dispatch: Dispatch<AdminAction>) => {
    axios
      .get(`http://localhost:3700/orders`)
      .then((res) => {
        const payload = res.data;

        dispatch({
          type: AdminActionType.GET_ALL_ORDERS,
          payload,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const ADMfetch_order_id = (id: number | undefined) => {
  return (dispatch: Dispatch<AdminAction>) => {
    axios
      .get(`http://localhost:3700/orders/${id}`)
      .then((res) => {
        const payload = res.data;
        dispatch({
          type: AdminActionType.GET_ORDER_BY_ID,
          payload,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const ADMupdate_order = (id: number | undefined, status: string) => {
  axios
    .put(`http://localhost:3700/orders/?id=${id}&status=${status}`)
    .then(() => alert("OK"));
};

//Users Actions
export const ADMfetch_users = () => {
  return (dispatch: Dispatch<AdminAction>) => {
    axios
      .get(`http://localhost:3700/users`)
      .then((res) => {
        const payload = res.data;
        dispatch({
          type: AdminActionType.GET_ALL_USERS,
          payload,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const ADMfetch_users_id = (id: number | undefined) => {
  return (dispatch: Dispatch<AdminAction>) => {
    axios
      .get(`http://localhost:3700/users/${id}`)
      .then((res) => {
        const payload = res.data;
        dispatch({
          type: AdminActionType.GET_USER_BY_ID,
          payload,
        });
      })
      .catch((error) => console.log(error));
  };
};
