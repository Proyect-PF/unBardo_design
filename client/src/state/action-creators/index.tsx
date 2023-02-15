import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import Swal from "sweetalert2";
import { ActionCheckout, ActionProducts, ActionUser } from "../actions";
import userIcon from "../../assets/svg/user-icon.svg";
import alertIcon from "../../assets/svg/alert.svg";
import {
  Checkout,
  Product,
  ProductState,
  User,
  UserLog,
  UserRegister,
} from "../types";
import { PORT, baseURL } from "../../utils/url&port";
//AL: Here we're defining the actions to be consumed in the components

// Funcion que retorna Productos desde la API

export const fetch_products = (query: string | null = null) => {
  return (dispatch: Dispatch<ActionProducts>) => {
    let payload: ProductState["productList"] = [];
    axios.get(`${baseURL}:${PORT}/products/?${query}`).then((res) => {
      payload = res.data;
      // ENVIAMOS PAYLOAD A REDUX
      dispatch({
        type: ActionType.GET_ALL_PRODUCTS,
        payload,
      });
    });
  };
};

{
  /** 
export const fetch_products = (color: string | null = null) => {
  return (dispatch: Dispatch<ActionProducts>) => {
    let payload: ProductState["productList"] = [];
    let url = `http://localhost:3700/products`;
    if (color) {
      url += `?filter={"color": "${color}"}`;
      console.log(url)
    }
    axios.get(url).then((res) => {
      payload = res.data;

      // ENVIAMOS PAYLOAD A REDUX
      dispatch({
        type: ActionType.GET_ALL_PRODUCTS,
        payload,
      });
    });
  };
};*/
}
// Funcion que retorna un Producto desde la API segun nombre
// Requiere un String como parametro
export const fetch_product_byname = (name: string) => {
  return (dispatch: Dispatch<ActionProducts>) => {
    let payload: ProductState["productList"] = [];
    axios
      .get(`${baseURL}:${PORT}/products/search/${name}`)
      .then((res) => {
        payload = res.data;

        // ENVIAMOS PAYLOAD A REDUX
        dispatch({
          type: ActionType.SEARCH_PRODUCTS,
          payload,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// Funcion que envia un Producto a la API para ser creado.
// Requiere Payload:Product

// export const create_product = (payload: Product) => {
//   return (dispatch: Dispatch<ActionProducts>) => {
//     axios({
//       method: "post",
//       url: "http://localhost:3700/products/new",
//       data: payload,
//     }).then(() =>
//       // ENVIAMOS PAYLOAD A REDUX
//       dispatch({
//         type: ActionType.ADD_PRODUCT,
//         payload,
//       })
//     );
//   };
// };

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
    axios.get(`${baseURL}:${PORT}/products/${id}`).then((res) => {
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
export const fetch_filtered_products = (query: string) => {
  return (dispatch: Dispatch<ActionProducts>) => {
    let payload: ProductState["productList"] = [];
    axios
      .get(`${baseURL}:${PORT}/products/filtered/?${query}`)
      .then((response) => {
        if (response.data) {
          payload = response.data;

          // ENVIAMOS PAYLOAD A REDUX
          dispatch({
            type: ActionType.FILTER_PRODUCTS,
            payload,
          });
        }
      });
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

export const userRegister = (user: UserRegister, registerLogin: any) => {
  // return (dispatch: Dispatch<ActionUser>)=> {

  axios
    .post(`${baseURL}:${PORT}/auth/signup`, user)
    .then((response) => {
      // const data = response.data;
      // console.log(data);
      // alert("registrado");
      // dispatch({
      //   type: ActionType.GET_TOKEN_USER_LOG,
      //   payload: ""
      // })
      Swal.fire({
        imageUrl: userIcon,
        imageHeight: 80,
        title:
          "<p class='mt-4 text-4xl font-bold font-rift text-black'>¡Registrado!</p>",
        showConfirmButton: true,
        confirmButtonColor: "#000",
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
        imageUrl: alertIcon,
        imageHeight: 80,
        title:
          "<p class='mt-4 text-4xl font-bold font-rift text-black'>No se pudo registrar</p>",
        showConfirmButton: true,
        confirmButtonColor: "#000",
        confirmButtonText:
          "<p class='font-rift text-lg'>Cambiar dirección de email</p>",
        html: `<p class="font-poppins font-medium text-black italic">${err.response.data.message}</p>`,
      });
    });
  // }
};

// Recibimos en la response token y role
export const userLogin = (user: UserLog, navigate: any) => {
  return (dispatch: Dispatch<ActionUser>) => {
    axios
      .post(`${baseURL}:${PORT}/auth/signin`, user)
      .then((response) => {
        axios.defaults.headers.common[
          "x-access-token"
        ] = `${response.data.token}`;
        dispatch({
          type: ActionType.USER_LOGIN,
          payload: response.data,
        });
        window.history.back();
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title:
            "<p class='font-bold font-rift text-black'>Se inició sesión correctamente</p>",
        });
      })
      .catch((err) => {
        Swal.fire({
          imageUrl: alertIcon,
          imageHeight: 80,
          title:
            "<p class='text-4xl font-bold font-rift text-black'>No se pudo iniciar Sesión</p>",
          showConfirmButton: true,
          confirmButtonColor: "#000",
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
