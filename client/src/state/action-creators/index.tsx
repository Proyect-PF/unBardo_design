import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { ActionCheckout, ActionProducts, ActionUser } from "../actions";
import {
  Checkout,
  Product,
  ProductState,
  User,
  UserLog,
  UserRegister,
} from "../types";

//AL: Here we're defining the actions to be consumed in the components

// Funcion que retorna Productos desde la API

export const fetch_products = (query: string | null = null) => {
  return (dispatch: Dispatch<ActionProducts>) => {
    let payload: ProductState["productList"] = [];
    axios.get(`http://localhost:3700/products/?${query}`).then((res) => {
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
      .get(`http://localhost:3700/products/search/${name}`)
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
export const create_product = (payload: Product) => {
  return (dispatch: Dispatch<ActionProducts>) => {
    axios({
      method: "post",
      url: "http://localhost:3700/products/new",
      data: payload,
    }).then(() =>
      // ENVIAMOS PAYLOAD A REDUX
      dispatch({
        type: ActionType.ADD_PRODUCT,
        payload,
      })
    );
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
    };
    axios.get(`http://localhost:3700/products/${id}`).then((res) => {
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

// Funcion que retorna Productos desde la API de manera filtrada
// Requiere una query String como parametro. A EXTENDER !
export const fetch_filtered_products = (query: string) => {
  return (dispatch: Dispatch<ActionProducts>) => {
    let payload: ProductState["productList"] = [];
    axios
      .get(`http://localhost:3700/products/filtered/?${query}`)
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

export const userRegister = (user: UserRegister, toast: any) => {
  // return (dispatch: Dispatch<ActionUser>)=> {
  toast.promise(
    axios
      .post(`http://localhost:3700/auth/signup`, user)
      .then((response) => {
        // const data = response.data;
        // console.log(data);
        // alert("registrado");
        // dispatch({
        //   type: ActionType.GET_TOKEN_USER_LOG,
        //   payload: ""
        // })
      })
      .catch((err) => console.log(err.response.data.message)),
    {
      pending: "Registrandose...",
      success: {
        render() {
          return "Bienvenido!";
        },
        autoClose: 1500,
      },
      error: " Algo salio mal",
    },
    { position: toast.POSITION.BOTTOM_RIGHT }
  );
  // }
};

// Recibimos en la response token y role
export const userLogin = (user: UserLog, toast: any, navigate: any) => {
  return (dispatch: Dispatch<ActionUser>) => {
    toast.promise(
      axios
        .post(`http://localhost:3700/auth/signin`, user)
        .then((response) => {
          axios.defaults.headers.common[
            "x-access-token"
          ] = `${response.data.token}`;
          console.log(response.data);
          dispatch({
            type: ActionType.USER_LOGIN,
            payload: response.data,
          });
        })
        .catch((err) => console.log(err.response.data.message)),
      {
        pending: "Iniciando sesion...",
        success: {
          render() {
            return "Bienvenido!";
          },
          onClose: () => navigate("/"),
          autoClose: 1500,
        },
        error: " Algo salio mal",
      },
      { position: toast.POSITION.BOTTOM_RIGHT }
    );
  };
};

export const userLogout = () => {
  return (dispatch: Dispatch<ActionUser>) => {
    dispatch({
      type: ActionType.USER_LOGOUT,
    });
  };
};
