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

export type ProductState = {
  productTotal: Product[];
  productList: Product[];
  productDetails: Product;
  render: boolean;
};

export type User = {
  email: string;
  id: number;
  id_role: number;
};

export type UserState = {
  allUsers: User[];
  adminLogin: boolean;
};

export type Checkout = {
  id: string;
  name: string;
  size: string;
  price: number;
  ammount: number;
  imgF: string;
};

export type CheckoutState = {
  checkoutList: Checkout[];
};

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
