import { ActionType } from "../action-types";
import { ActionProducts } from "../actions";
import { Product, ProductState } from "../types";

//AL: initialState first defining, needs to match the type defined.
const initialState: ProductState = {
  productTotal: [], //AL:use this state for backup, if needs to retrieve total info for filtering/ordering/etc
  productList: [], //AL:this state is the one being rendered in the page
  productCount: 0,
  activePromo: false,
  //AL: this state is for information rendered in the details page of specific items
  productDetails: {
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
    image2: "",
    image3: "",
    image4: "",
  },
  //AL:this state is for future implementations (you can trigger a change here to force re-render)
  render: true,
  searchName: "",
  byColor: "",
  byOrder: "",
  byPromo: "",
  page: 1,
  perPage: 20,
};

const productReducer = (
  state: ProductState = initialState,
  action: ActionProducts
) => {
  switch (action.type) {
    case ActionType.GET_ALL_PRODUCTS:
      let products: ProductState["productList"] = action.payload;
      return {
        ...state,
        productTotal: products,
        productList: products,
      };
    case ActionType.GET_PRODUCT_COUNT:
      return {
        ...state,
        productCount: action.payload,
      };
    case ActionType.GET_PRODUCT_PROMO:
      return {
        ...state,
        activePromo: action.payload,
      };
    case ActionType.SEARCH_PRODUCTS:
      return {
        ...state,
        searchName: action.payload
      };
    case ActionType.FILTER_PRODUCTS:
      let value: string | number = action.payload.value
      if(action.payload.name === "perPage") value = parseInt(value)
      return {
        ...state,
        [action.payload.name]: value,
        page: 1
      };
    case ActionType.PAGINATION_SET:
      let pageHere: number = state.page;
      if (action.payload === "-" && state.page !== 1)
        pageHere = state.page - 1
      if (
        action.payload === "+" &&
        Math.ceil(state.productCount / state.perPage) > state.page
      )
        pageHere = state.page + 1
      return {
        ...state,
        page: pageHere
      }
    case ActionType.CLEAR_FILTER:
        return {
          ...state,
          byColor: "",
          byOrder: "",
          byPromo: "",
          page: 1,
        };
    case ActionType.ADD_PRODUCT:
      const newProduct: Product = {
        ...action.payload,
        id: state.productList.length,
      };
      return {
        ...state,
        productList: [...state.productList, newProduct],
      };
    case ActionType.GET_PRODUCT_DETAILS:
      return {
        ...state,
        productDetails: action.payload,
      };
    case ActionType.UPDATE_RENDER:
      return {
        ...state,
        render: state.render ? false : true,
      };
    case ActionType.SORT_PRODUCTS:
      return {
        ...state,
        productList: action.payload,
      };
    case ActionType.CLEAR_PRODUCT_DETAILS:
      return {
        ...state,
        productDetails: {
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
          image2: "",
          image3: "",
          image4: "",
        },
      };
    default:
      return {
        ...state,
      };
  }
};

export default productReducer;
