import { ActionType } from "../action-types";
import { ActionProducts } from "../actions";
import { Product, ProductState } from "../types";

//AL: initialState first defining, needs to match the type defined.
const initialState: ProductState = {
  productTotal: [], //AL:use this state for backup, if needs to retrieve total info for filtering/ordering/etc
  productList: [], //AL:this state is the one being rendered in the page
  //AL: this state is for information rendered in the details page of specific items
  productDetails: {
    id: 0,
    name: "",
    description: "",
    size: "",
    price: 0,
    color: "",
    show_in_shop: "",
    image: "",
  },
  //AL:this state is for future implementations (you can trigger a change here to force re-render)
  render: true,
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
    case ActionType.SEARCH_PRODUCTS:
      let productSearch: ProductState["productList"] = action.payload;
      if (productSearch.length === 0) productSearch = state.productTotal;
      return {
        ...state,
        productList: productSearch,
      };
    case ActionType.FILTER_PRODUCTS:
      let filteredProducts: ProductState["productList"] = action.payload;
      if (filteredProducts.length === 0) filteredProducts = state.productTotal;
      return {
        ...state,
        productList: filteredProducts,
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

    default:
      return {
        ...state,
      };
  }
};

export default productReducer;
