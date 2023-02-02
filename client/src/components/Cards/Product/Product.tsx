import imageF from "../../../assets/images/remeras/unbardo-07F.png";
// import imageB from "../../../assets/images/remeras/unbardo-07B.png";

const Product = () => {
  return (
    <div className="flex-col w-40 gap-4 m-auto my-4 text-center">
      <img
        className="w-32 m-auto border-b-2 border-black "
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
