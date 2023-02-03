import { Link } from "react-router-dom";

interface Props {
  imageF: string;
  imageB: string;
  name: string;
  id: number;
}

const Product = ({ imageB, imageF, name, id }: Props) => {
  return (
    <div className="flex-col w-56 gap-4 m-auto my-4 text-center">
      <Link to={`/product/${id}`}>
        <img
          className="absolute w-56 m-auto border-b-2 border-black opacity-0 hover:opacity-100"
          alt="black tshirt"
          src={imageB}
        />
        <img
          className="w-56 m-auto border-b-2 border-black"
          alt="black tshirt"
          src={imageF}
        />
        <p className="mt-2 font-mono text-xs font-semibold">{name}</p>
      </Link>
    </div>
  );
};

export default Product;
