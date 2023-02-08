import { useState } from "react";

interface Props {
  products: {
    name: string;
    size: string;
    price: number;
    ammount: number;
    imgF: string;
    imgB: string;
  }[];
  setter: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        size: string;
        price: number;
        ammount: number;
        imgF: string;
        imgB: string;
      }[]
    >
  >;
  index: number;
}

const CheckoutCard = ({ products, setter, index }: Props): JSX.Element => {
  const [product, setProduct] = useState(products[index]);

  return (
    <div className="flex gap-2 m-4 border border-black">
      <img src={product.imgF} className=" w-28" />
      <div className="flex flex-col justify-around">
        <div className="font-semibold">
          <p>{product.name}</p>
          <p>{product.size}</p>
        </div>
        <div className="flex justify-between mr-4 font-bold">
          <p>{product.ammount}</p>
          <p>{`$ ${product.price * product.ammount}`}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCard;
