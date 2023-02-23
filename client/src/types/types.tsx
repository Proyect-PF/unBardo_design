// Definicion para usar como estado
export type AppState = {
  actual_user: User;
  total_products: Array<Product>;
  filter_products: Array<Product>;
  details_product: Product;
  checkout_products: Array<Product>;
};

// SOLO PARA DEFINICION - TIPOS GLOBALES
// ?: El campo puede existir o no. Permitiendo redefinir el modelo
export type User = {
  firstname?: string | undefined;
  lastname?: string | undefined;
  // Registro
  fullname?: string;
  password?: string;
  email: string;
  news_letter?: boolean;
  //
  google_id?: string;
  id?: number;
  id_role?: number | undefined;
};

export type Product = {
  id?: number;
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
};

export type Order = {
  id: number;
  firstname?: string;
  lastname?: string;
  fullname: string;
  email: string;
  createdAt: string;
  status: string;
};

export type Checkout = {
  id: string;
  name: string;
  size: string;
  price: number;
  ammount: number;
  imgF: string;
};

export type Item = {
  id_product?: number;
  quantity: number;
  title: string;
  unit_price: number;
  sizes?: {
    S?: number;
    M?: number;
    L?: number;
    XL?: number;
  };
};
export type OrderDetails = {
  id?: number;
  fullname?: string;
  email?: string;
  date_approved?: string;
  status: string;
  external_reference: number;
  items?: Item[];
  products?: Item[];
  payment_method: string;
  payment_type: string;
  total_amount?: number;
  cuotes: number;
  total_paid_amount?: number;
  dispatched: boolean;
  shipping_amount?: number;
  address?: {
    street_name: string;
    street_number: string;
    zip_code: string;
  };
  phone?: {
    area_code: string;
    number: string;
  };
  track_id?: string;
};

export type Favorites = {
  id: number;
  id_user: number;
  products_id: number[];
};

export type SetFavoritePayload = {
  id_user: number;
  id_product: number;
};

//semanal

// TYPES ANALITICS
export type AnaliticProducts = {
  timeUnit: string;
  totalProductsSold: number;
};


export type AnaliticFunnel = {
  timeunit: string;
  num: number;
  numbercarts: number;
  numbersales: number;
  numberlogins: number;
  numberregisters: number;
  numbervisits: number;
  numberpendingsales: number;
  visits_to_approved: number;
  cart_to_approved: number;
  mercadopago_to_approved: number;
};

// type chartValues = {
//   numberCarts?:number //Numero de carritos generados, se maneja desde el boton que se compra el carrito.
//   numberRegister?:number //Numero de registros, se maneja desde el Back la info que me trae.
//   numberDirections?:number //Numero de personas que ingresan sus datos, se maneja con el evento onclick del boton del componente.
//   numberSales?:number //Numero de ventas, se maneja en el back la info que me trae.
// }
