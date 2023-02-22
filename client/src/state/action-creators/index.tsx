import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import Swal from "sweetalert2";
import {
  ActionCheckout,
  ActionFavorites,
  ActionOrderCheckout,
  ActionOrders,
  ActionProducts,
  ActionUser,
} from "../actions";
import { Checkout, FilterProductPayload, Product, ProductState } from "../types";
import { OrderDetails, SetFavoritePayload } from "../../types/types";
import { User } from "../../types/types";
import { PORT, baseURL } from "../../utils/url&port";
import Toast from "../../components/Toast";

//AL: Here we're defining the actions to be consumed in the components

// Funcion que retorna Productos desde la API

export const fetch_products = (query: string | null = null) => {
  return (dispatch: Dispatch<ActionProducts>) => {
    let payload: ProductState["productList"] = [];
    axios.get(`${baseURL}/products/?${query}`).then((res) => {
      payload = res.data.data;

      // ENVIAMOS PAYLOAD A REDUX
      dispatch({
        type: ActionType.GET_ALL_PRODUCTS,
        payload,
      });
      dispatch({
        type: ActionType.GET_PRODUCT_COUNT,
        payload: res.data.count,
      });
      dispatch({
        type: ActionType.GET_PRODUCT_PROMO,
        payload: res.data.promo,
      });
    });
  };
};

// Funcion que retorna un Producto desde la API segun nombre
// Requiere un String como parametro
export const fetch_product_byname = (name: string) => {
  return (dispatch: Dispatch<ActionProducts>) => {

    dispatch({
      type: ActionType.SEARCH_PRODUCTS,
      payload: name
    })

  };
};

// Funcion que retorna un Producto desde la API segun id
// Requiere un Number como parametro
export const fetch_product_detail = (id: number) => {
  return (dispatch: Dispatch<ActionProducts>) => {
    let product: Product = {
      id: 0,
      name: "",
      description: "",
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
      price: 0,
      color: "",
      show_in_shop: true,

      image: "",
      promotion: false,
      promotional_price: 0,
    };
    axios.get(`${baseURL}/products/${id}`).then((res) => {
      if (res.data?.id) {
        product = {
          id: res.data.id,
          name: res.data.name,
          description: res.data.description,
          S: res.data.S,
          M: res.data.M,
          L: res.data.L,
          XL: res.data.XL,
          price: res.data.price,
          color: res.data.color,
          show_in_shop: res.data.show_in_shop,
          image: res.data.image,
          image2: res.data.image2,
          image3: res.data.image3,
          image4: res.data.image4,
          promotion: res.data.promotion,
          promotional_price: res.data.promotional_price,
        };
      }
      // ENVIAMOS PAYLOAD A REDUX
      dispatch({
        type: ActionType.GET_PRODUCT_DETAILS,
        payload: product,
      });
    });
  };
};

//Funcion para limpiar la pag details y que no se vea el producto anteriormente cargado
export const clear_product_detail = () => {
  return (dispatch: Dispatch<ActionProducts>) => {
    dispatch({
      type: ActionType.CLEAR_PRODUCT_DETAILS,
    });
  };
};

// Funcion que retorna Productos desde la API de manera filtrada
// Requiere una query String como parametro. A EXTENDER !
export const fetch_filtered_products = (payload: FilterProductPayload) => {
  return (dispatch: Dispatch<ActionProducts>) => {
    dispatch({
      type: ActionType.FILTER_PRODUCTS,
      payload
    })
  };
};


export const clearFilter = () => {
  return (dispatch: Dispatch<ActionProducts>) => {
    dispatch({
      type: ActionType.CLEAR_FILTER,
    })
  };
};

export const pagination = (payload: string) => {
  return (dispatch: Dispatch<ActionProducts>) => {
    dispatch({
      type: ActionType.PAGINATION_SET,
      payload
    })
  };
};

export const updateRender = (payload: boolean) => {
  return (dispatch: Dispatch<ActionProducts>) => {
    dispatch({
      type: ActionType.UPDATE_RENDER,
      payload,
    });
  };
};

export const addCheckout = (payload: Checkout) => {
  return (dispatch: Dispatch<ActionCheckout>) => {
    dispatch({
      type: ActionType.ADD_CHECKOUT,
      payload,
    });
  };
};

export const removeCheckout = (payload: string) => {
  return (dispatch: Dispatch<ActionCheckout>) => {
    dispatch({
      type: ActionType.REMOVE_CHECKOUT,
      payload,
    });
  };
};
export const clearCheckoutList = () => {
  return (dispatch: Dispatch<ActionCheckout>) => {
    dispatch({
      type: ActionType.CLEAR_CHECKOUT_LIST,
    });
  };
};

export const userRegister = (registerLogin: Function, user?: User) => {
  axios
    .post(`${baseURL}/auth/signup`, user)
    .then((response) => {
      Swal.fire({
        title:
          "<p class='mt-4 text-4xl font-bold font-rift text-black'>¡Registrado!</p>",
        showConfirmButton: true,
        confirmButtonColor: "#376B7E",
        confirmButtonText: "<p class='font-rift text-lg'>Cerrar</p>",
        html: '<p class="font-poppins font-medium text-black italic" >¡Bienvenido!</p>',
      }).then((result) => {
        if (result.isConfirmed) {
          registerLogin();
        }
      });
    })
    .catch((err) => {
      Swal.fire({
        title:
          "<p class='mt-4 text-4xl font-bold font-rift text-black'>No se pudo registrar</p>",
        showConfirmButton: true,
        confirmButtonColor: "#376B7E",
        confirmButtonText:
          "<p class='font-rift text-lg'>Cambiar dirección de email</p>",
        html: `<p class="font-poppins font-medium text-black italic">${err.response.data.message}</p>`,
      });
    });
  // }
};

// Recibimos en la response token y role
export const userLogin = (user: User, navigate: any) => {

  return (dispatch: Dispatch<ActionUser>) => {
    axios
      .post(`${baseURL}/auth/signin`, user)
      .then((response) => {
        axios.defaults.headers.common[
          "x-access-token"
        ] = `${response.data.token}`;
        dispatch({
          type: ActionType.USER_LOGIN,
          payload: response.data,
        });

        navigate("/");

        Toast.fire({
          icon: "success",
          title:
            "<p class='font-bold font-rift text-black'>Se inició sesión correctamente</p>",
        });
      })
      .catch((err) => {
        Swal.fire({
          title:
            "<p class='text-4xl font-bold font-rift text-black'>No se pudo iniciar Sesión</p>",
          showConfirmButton: true,
          confirmButtonColor: "#376B7E",
          confirmButtonText: "<p class='font-rift text-lg'>Cerrar</p>",
          html: `<p class="font-poppins font-medium text-black italic">${err.response.data.message}</p>`,
        });
      });
  };
};

export const userLogout = () => {
  return (dispatch: Dispatch<ActionUser>) => {
    dispatch({
      type: ActionType.USER_LOGOUT,
    });
  };
};

export const fetch_orders_user = (id: number | undefined) => {
  return (dispatch: Dispatch<ActionOrders>) => {
    axios
      .get(`${baseURL}/orders/users/${id}`)
      .then((res) => {
        const payload = res.data;
        dispatch({
          type: ActionType.GET_ORDER_BY_UID,
          payload,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const getOrderDetailsSuccess = (
  orderData: OrderDetails
): ActionOrderCheckout => {
  return {
    type: ActionType.GET_ORDER_DETAILS_SUCCESS,
    payload: orderData,
  };
};

export const getOrderDetailsFailure = (error: any) => {
  return {
    type: ActionType.GET_ORDER_DETAILS_FAILURE,
    payload: error,
  };
};

export const getOrderDetails = (
  payment_id: string,
  external_reference: string
) => {
  return async (dispatch: Dispatch<ActionOrderCheckout>) => {
    try {
      const response = await axios.post(`${baseURL}/orders/feedback`, {
        payment_id,
        external_reference,
      });
      dispatch(getOrderDetailsSuccess(response.data));
    } catch (error) {
    }
  };
};

export const getFavorites = (id: number) => {
  return (dispatch: Dispatch<ActionFavorites>) => {
    axios.get(`${baseURL}/favorites/${id}`).then((res) => {
      const payload = res.data;
      dispatch({
        type: ActionType.GET_FAVORITES,
        payload,
      });
    });
  };
};

export const setFavorite = (payload: SetFavoritePayload, getFavorites: any) => {
  return (dispatch: Dispatch<ActionFavorites>) => {
    axios
      .post(`${baseURL}/favorites`, payload)
      .then((res) => {
        Toast.fire({
          icon: "success",
          title:
            "<p class='font-bold font-rift text-black'>Se agregó a tus favoritos</p>",
        });
        getFavorites(payload.id_user);
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title:
            "<p class='font-bold font-rift text-black'>No se pudo agregar a tus favoritos</p>",
        });
      });
  };
};

export const deleteFavorite = (
  payload: SetFavoritePayload,
  getFavorites: any
) => {
  return (dispatch: Dispatch<ActionFavorites>) => {
    axios
      .delete(
        `${baseURL}/favorites?id_user=${payload.id_user}&id_product=${payload.id_product}`
      )
      .then((res) => {
        Toast.fire({
          icon: "success",
          title:
            "<p class='font-bold font-rift text-black'>Se eliminó de tus favoritos</p>",
        });
        getFavorites(payload.id_user);
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title:
            "<p class='font-bold font-rift text-black'>No se pudo eliminar de tus favoritos</p>",
        });
      });
  };
};

export const logOutFavorites = () => {
  return (dispatch: Dispatch<ActionFavorites>) => {
    dispatch({
      type: ActionType.LOG_OUT_FAVORITES,
    });
  };
};
