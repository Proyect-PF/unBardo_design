export type AddProductAction = {
    type: "ADD_PRODUCT";
    payload: {
        title: string;
        description: string;
        price: number;
        image: string;
        color: string;
    };
}

export const addProduct = (payload: AddProductAction['payload']): AddProductAction => ({
    type: 'ADD_PRODUCT',
    payload,
  });