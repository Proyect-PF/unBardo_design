export type Product = {
  id: number;
  name: string;
  description: string;
  S: number;
  M: number;
  L: number;
  XL: number;
  price: number;
  color: string;
  show_in_shop: boolean;
  image: string;
  image2?: string;
  image3?: string;
  image4?: string;
  promotion?: boolean;
  promotional_price?: number;
};

export type AddProductPayload = {
  name: string;
  description: string;
  S: number;
  M: number;
  L: number;
  XL: number;
  price: number;
  color: string;
  show_in_shop: boolean;
  image: string;
};

export type FilterProductPayload = {
  name: string;
  value: string;
}

export type ProductState = {
  productTotal: Product[];
  productList: Product[];
  productCount: number;
  activePromo: boolean;
  productDetails: Product;
  render: boolean;
  searchName: string;
  byColor: string;
  byOrder: string;
  byPromo: string;
  page: number;
  perPage: number
};

//------------------------------------------------
//Tipos de usuarios
export type User = {
  fullname: string;
  password: string;
  email: string;
  id: number;
  id_role: number;
  news_letter: boolean;
};

export type UserRegister = {
  fullname: string;
  password: string;
  email: string;
  role: string | undefined;
};
export type UserLog = {
  password: string;
  email: string;
};

export type UserState = {
  //allUsers: User[];
  //adminLogin: boolean;
  //userLogin: boolean;
  userId: null;
  userInfo: null;
  userToken: null;
  userType: null;
  error: null;
  success: boolean;
};

//------------------------------------------------
export type Checkout = {
  id: string;
  name: string;
  size: string;
  price: number | undefined;
  ammount: number;
  imgF: string;
};

export type CheckoutState = {
  checkoutList: Checkout[];
};
//---------Agus------------
export type Orders = {
  id: number;
  fullname: string;
  email: string;
  createdAt: string;
  status: string;
};

export type OrderState = {
  allOrders: Orders[];
  order: Orders;
};
