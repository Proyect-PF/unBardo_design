import { Link } from "react-router-dom";

interface Props {
  imageF: string;
  imageB: string;
  name: string;
  price: string;
  id: number;
}

const Product = ({ price, imageB, imageF, name, id }: Props) => {
  return (
    <div className="flex-col w-56 gap-4 m-auto my-4">
      <Link to={`/product/${id}`}>
        {/* <img
          className="absolute w-56 m-auto border-b-2 border-black opacity-0 hover:opacity-100"
          alt="black tshirt"
          src={imageB}
        /> */}
        <img
          className="w-56 m-auto border-b-2 border-black"
          alt="black tshirt"
          src={imageF}
        />
        <div className="flex flex-col gap-2 mt-3 ml-3 ">
          <p className="text-lg font-semibold ">{name.toUpperCase()}</p>
          <p className="text-lg font-medium ">$ {price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
