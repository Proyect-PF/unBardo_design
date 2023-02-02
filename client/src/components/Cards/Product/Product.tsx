import imageF from "../../../assets/images/remeras/unbardo-07F.png";
import imageB from "../../../assets/images/remeras/unbardo-07B.png";

const Product = () => {
  return (
    <div className="flex-col w-56 gap-4 m-auto my-4 text-center">
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
      <p className="mt-2 font-mono text-xs font-semibold">
        REMERA OVERSIZE UNBARDO BLACK
      </p>
    </div>
  );
};

export default Product;
