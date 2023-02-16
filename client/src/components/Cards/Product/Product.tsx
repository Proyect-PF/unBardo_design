import { Link } from "react-router-dom";
import discount from "../../../assets/svg/receipt-tax.svg";

interface Props {
  image: string;
  image2?: string;
  name: string;
  price: string;
  id: number;
  promotion: boolean | undefined;
  promotional_price: number | undefined;
}

const Product = ({
  price,
  image,
  image2,
  name,
  id,
  promotion,
  promotional_price,
}: Props) => {
  return (
    <div className="relative flex-col w-56 gap-4 m-auto my-4">
      {promotion && (
        <img src={discount} className="absolute z-10 h-8 right-2 top-2" />
      )}
      <Link to={`/product/${id}`}>
        {image2 && (
          <img
            className="absolute w-56 m-auto border-b-2 border-black opacity-0 hover:opacity-100"
            alt=" tshirt"
            src={image2}
          />
        )}
        <img
          className="w-56 m-auto border-b-2 border-black"
          alt="black tshirt"
          src={image}
        />
        <div className="flex flex-col mt-3 ml-3 ">
          <p className="text-lg font-semibold ">{name.toUpperCase()}</p>

          {promotion ? (
            <div className="flex flex-row gap-2">
              <p className="text-lg font-medium ">$ {promotional_price}</p>
              <p className="italic font-medium line-through text-medium ">
                $ {price}
              </p>
            </div>
          ) : (
            <p className="text-lg font-medium ">$ {price}</p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Product;
