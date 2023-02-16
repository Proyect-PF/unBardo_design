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
  google_id?: number;
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
