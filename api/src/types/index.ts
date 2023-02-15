
// SOLO PARA DEFINICION - TIPOS GLOBALES
// ?: El campo puede existir o no. Permitiendo redefinir el modelo
export type TypeUser = {
  firstname?: string | undefined;
  lastname?: string | undefined;
  // Registro
  fullname: string;
  password?: string;
  email: string;
  news_letter?: boolean;
  //
  google_id?: number;
  id?: number;
  id_role?: number | undefined;
};

export type TypeRole = {
  name: string;
  id?: number;

}


export type TypeProduct = {
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
  promotional_price:number;
  promotion:boolean;
};

export type TypeOrder = {
  id: number;
  firstname?: string;
  lastname?: string;
  fullname: string;
  email: string;
  createdAt: string;
  status: string;
};

export type TypeCheckout = {
  id: string;
  name: string;
  size: string;
  price: number;
  ammount: number;
  imgF: string;
};

export type TypeProductVariantAttributes = {
  id: number;
  size: string;
  color: string;
  stock: number;
  price: number;
  quantity: number;
  SKU: string;
  release_date: Date;
}