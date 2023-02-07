import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { ActionProducts, ActionUser } from "../actions";
import { Product, ProductState } from "../types";

//AL: Here we're defining the actions to be consumed in the components

// Funcion que retorna Productos desde la API
export const fetch_products = () => {
  return (dispatch: Dispatch<ActionProducts>) => {
    let payload: ProductState["productList"] = [];
    axios.get("http://localhost:3700/products").then((res) => {
      payload = res.data;

      // ENVIAMOS PAYLOAD A REDUX
      dispatch({
        type: ActionType.GET_ALL_PRODUCTS,
        payload,
      });
    });
  };
};

// Funcion que retorna un Producto desde la API segun nombre
// Requiere un String como parametro
export const fetch_product_byname = (name: string) => {
  return (dispatch: Dispatch<ActionProducts>) => {
    let payload: ProductState["productList"] = [];
    axios.get(`http://localhost:3700/products/search/${name}`).then((res) => {
      payload = res.data;

      // ENVIAMOS PAYLOAD A REDUX
      dispatch({
        type: ActionType.SEARCH_PRODUCTS,
        payload,
      });
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
      id: -1,
      name: "error",
      description: "",
      size: "",
      price: 0,
      color: "",
      show_in_shop: "",
      image: "",
    };
    axios.get(`http://localhost:3700/products/id/${id}`).then((res) => {
      if (res.data?.id) {
        product = {
          id: res.data.id,
          name: res.data.name,
          description: res.data.description,
          size: res.data.size,
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

export const adminLog = () => {
  return (dispatch: Dispatch<ActionUser>) => {
    dispatch({
      type: ActionType.ADMIN_LOGIN,
    });
  };
};
