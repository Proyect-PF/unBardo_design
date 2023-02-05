export type Product = {
  id?: number;
  name: string;
  description: string;
  size: string;
  price: number;
  color: string;
  show_in_shop: string;
  image?: File;
};

export type AddProductPayload = {
  name: string;
  description: string;
  size: string;
  price: number;
  color: string;
  show_in_shop: string;
};



export type ProductState = {
  productTotal: Product[];
  productList: Product[];
  productDetails: Product;
  render: boolean;
};
