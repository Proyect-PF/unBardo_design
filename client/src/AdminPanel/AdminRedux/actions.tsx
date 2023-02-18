import axios from "axios";
import { Dispatch } from "redux";
import { Product } from "../../state/types";
import { AdminAction, AdminActionType } from "./types-interfaces";
import Swal from "sweetalert2";
import { PORT, baseURL } from "../../utils/url&port";

//Product actions
export const ADMfetch_products = (query: string | null = null) => {
  return (dispatch: Dispatch<AdminAction>) => {
    axios.get(`${baseURL}:${PORT}/products/?${query}`).then((res) => {
      const payload: Product[] = res.data;
      dispatch({
        type: AdminActionType.GET_ALL_PRODUCTS,
        payload: payload,
      });
    });
  };
};

export const ADMfetch_products_id = (id: number) => {
  return (dispatch: Dispatch<AdminAction>) => {
    axios.get(`${baseURL}:${PORT}/products/${id}`).then((res) => {
      const payload = res.data;
      dispatch({
        type: AdminActionType.GET_PRODUCT_BY_ID,
        payload,
      });
    });
  };
};

export const ADMcreate_product = (payload: any, toast: any) => {
  toast.promise(axios.post(`${baseURL}:${PORT}/products/`, payload), {
    pending: "Creando...",
    success: "Se creo el producto con exito.",
    error: "Algo salio mal...",
  });
};

export const ADMupdate_product = (payload: any, toast: any) => {
  toast.promise(axios.put(`${baseURL}:${PORT}/products`, payload), {
    pending: "Editando...",
    success: "Se edito el producto con exito.",
    error: "Algo salio mal...",
  });
};

export const ADMdelete_product = (payload: number, toast: any) => {
  toast.promise(axios.delete(`${baseURL}:${PORT}/products/${payload}`), {
    pending: "Eliminando...",
    success: "Se elimino el producto con exito.",
    error: "Algo salio mal...",
  });
};

//Orders Actions
export const ADMfetch_orders = (query: string | null = null) => {
  return (dispatch: Dispatch<AdminAction>) => {
    axios
      .get(`${baseURL}:${PORT}/orders/?${query}`)
      .then((res) => {
        const payload = res.data.orders;
        dispatch({
          type: AdminActionType.GET_ALL_ORDERS,
          payload,
        });
        dispatch({
          type: AdminActionType.GET_ORDERS_COUNT,
          payload: res.data.count,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const ADMfetch_order_id = (id: number | undefined) => {
  return (dispatch: Dispatch<AdminAction>) => {
    axios
      .get(`${baseURL}:${PORT}/orders/${id}`)
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

export const ADMupdate_order = async (
  id: number | undefined,
  status: string,
  trackid: string
) => {
  axios
    .put(`${baseURL}:${PORT}/orders/?id=${id}&status=${status}`)
    .then(() =>
      axios.put(`${baseURL}:${PORT}/orders/track/?id=${id}&track_id=${trackid}`)
    );
};

//Users Actions
export const ADMfetch_users = () => {
  return (dispatch: Dispatch<AdminAction>) => {
    axios
      .get(`${baseURL}:${PORT}/users`)
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
      .get(`${baseURL}:${PORT}/users/${id}`)
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
