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

export const ADMcreate_product = (payload: any, Toast: any) => {
  axios
    .post(`${baseURL}:${PORT}/products/`, payload)
    .then(() =>
      Toast.fire({
        icon: "success",
        title: "Producto creado con exito",
      })
    )
    .catch((e) =>
      Toast.fire({ icon: "error", title: "Hubo un fallo en el proceso..." })
    );
};

export const ADMupdate_product = (payload: any, Toast: any) => {
  axios
    .put(`${baseURL}:${PORT}/products`, payload)
    .then(() =>
      Toast.fire({
        icon: "success",
        title: "Producto actualizado con exito",
      })
    )
    .catch((e) =>
      Toast.fire({ icon: "error", title: "Hubo un fallo en el proceso..." })
    );
};

export const ADMdelete_product = (payload: number, Toast: any) => {
  axios
    .delete(`${baseURL}:${PORT}/products/${payload}`)
    .then(() =>
      Toast.fire({
        icon: "success",
        title: "Producto eliminado con exito",
      })
    )
    .catch((e) =>
      Toast.fire({ icon: "error", title: "Hubo un fallo en el proceso..." })
    );
};

//Orders Actions
export const ADMfetch_orders = (query: string | null = null) => {
  return (dispatch: Dispatch<AdminAction>) => {
    axios.get(`${baseURL}:${PORT}/orders/?${query}`).then((res) => {
      const payload = res.data.orders;
      dispatch({
        type: AdminActionType.GET_ALL_ORDERS,
        payload,
      });
      dispatch({
        type: AdminActionType.GET_ORDERS_COUNT,
        payload: res.data.count,
      });
    });
  };
};

export const ADMfetch_order_id = (id: number | undefined) => {
  return (dispatch: Dispatch<AdminAction>) => {
    axios.get(`${baseURL}:${PORT}/orders/${id}`).then((res) => {
      const payload = res.data;
      dispatch({
        type: AdminActionType.GET_ORDER_BY_ID,
        payload,
      });
    });
  };
};

export const ADMupdate_order = async (
  id: number | undefined,
  status: string,
  trackid: string,
  Toast: any
) => {
  axios
    .put(`${baseURL}:${PORT}/orders/?id=${id}&status=${status}`)
    .then(() =>
      axios.put(`${baseURL}:${PORT}/orders/track/?id=${id}&track_id=${trackid}`)
    )
    .then(() =>
      Toast.fire({
        icon: "success",
        title: "Orden actualizada con exito",
      })
    )
    .catch((e) =>
      Toast.fire({ icon: "error", title: "Hubo un fallo en el proceso..." })
    );
};

//Users Actions
export const ADMfetch_users = () => {
  return (dispatch: Dispatch<AdminAction>) => {
    axios.get(`${baseURL}:${PORT}/users`).then((res) => {
      const payload = res.data;
      dispatch({
        type: AdminActionType.GET_ALL_USERS,
        payload,
      });
    });
  };
};

export const ADMfetch_users_id = (id: number | undefined) => {
  return (dispatch: Dispatch<AdminAction>) => {
    axios.get(`${baseURL}:${PORT}/users/${id}`).then((res) => {
      const payload = res.data;
      dispatch({
        type: AdminActionType.GET_USER_BY_ID,
        payload,
      });
    });
  };
};

// type chartValues = {
//   numberCarts?:number //Numero de carritos generados, se maneja desde el boton que se compra el carrito.
//   numberRegister?:number //Numero de registros, se maneja desde el Back la info que me trae.
//   numberDirections?:number //Numero de personas que ingresan sus datos, se maneja con el evento onclick del boton del componente.
//   numberSales?:number //Numero de ventas, se maneja en el back la info que me trae.
// }

export const ADMfetch_chart_products_values = (timeUnit: string) => {
  return (dispatch: Dispatch<AdminAction>) => {
    axios
      .get(
        //status => cart, approved, rejected
        //timeUnit => month, day, year
        `http://localhost:3700/statistics/product-sales/?timeUnit=${timeUnit}&&status=rejected`
      )
      .then((res) => {
        const payload = res.data;

        dispatch({
          type: AdminActionType.GET_ANALITICS_PRODUCTS,
          payload,
        });
      });
  };
};

// export const ADMfetch_chart_funnel_values = (timeUnit: string) => {
//   return (dispatch: Dispatch<AdminAction>) => {
//     axios
//       .get(
//         `http://localhost:3700/statistics/product-sales/?timeUnit=${timeUnit}&&status=approved`
//       )
//       .then((res) => {
//         const payload = res.data;

//         dispatch({
//           type: AdminActionType.GET_ANALITICS,
//           payload,
//         });
//       });
//   };
// };

export const ADMupdate_pricing = (
  minus100: number,
  minus500: number,
  minus1000: number,
  plus100: number,
  Toast: any
) => {
  axios
    .put(
      `${baseURL}:${PORT}/shipments/?minus100=${minus100}&minus500=${minus500}&minus1000=${minus1000}&plus1000=${plus100}`
    )
    .then(() =>
      Toast.fire({
        icon: "success",
        title: "Precios actualizados con exito",
      })
    )
    .catch((e) =>
      Toast.fire({ icon: "error", title: "Hubo un fallo en el proceso..." })
    );
};
