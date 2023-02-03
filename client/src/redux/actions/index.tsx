export type AddProductAction = {
    type: "ADD_PRODUCT";
    payload: {
        name: string;
        description: string;
        size: string;
        price: number;
        show_in_shop: string;
    };
}

export const addProduct = (payload: AddProductAction['payload']): AddProductAction => ({
    type: 'ADD_PRODUCT',
    payload,
  });