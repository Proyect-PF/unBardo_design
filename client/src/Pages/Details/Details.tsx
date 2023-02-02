import imageF from "../../assets/images/remeras/unbardo-06F.png";
import imageB from "../../assets/images/remeras/unbardo-06B.png";
import { useState } from "react";

const Details = () => {
  const [show, setShow] = useState(false);
  const [ammount, setAmmount] = useState(1);

  const handleShow = (): void => {
    show ? setShow(false) : setShow(true);
  };
  const handleMinus = (): void => {
    if (ammount > 1) setAmmount(ammount - 1);
  };
  const handlePlus = (): void => {
    if (ammount < 10) setAmmount(ammount + 1);
  };

  return (
    <div className="flex flex-col font-mono md:flex-row md:gap-5">
      <div className="relative">
        <img
          className={`absolute ${show ? "opacity-100" : "opacity-0"}`}
          alt="black tshirt"
          src={imageB}
        />
        <img className="" alt="black tshirt" src={imageF} />
        <img
          className="absolute w-16 border-2 border-black left-4 top-4 z-1"
          alt="black tshirt"
          src={show ? imageF : imageB}
          onClick={handleShow}
        />
      </div>
      <div className="mx-auto w-fit md:h-1/2 md:flex md:flex-col md:justify-between md:mt-8">
        <div>
          <p className="mt-4 text-lg font-bold text-center ">
            REMERA OVERSIZE KING KONG BLACK
          </p>
          <p className="my-2 text-lg font-bold ">$8.000</p>
        </div>
        <div className="flex gap-4 my-4 font-mono text-lg font-bold text-center">
          <p className="w-8 h-8 border border-black">M</p>
          <p className="w-8 h-8 border border-black ">L</p>
          <p className="w-8 h-8 border border-black ">XL</p>
        </div>
        <div className="flex justify-between my-8 font-mono text-lg text-center">
          <div className="flex content-center self-center gap-4 ml-3 font-bold">
            <p onClick={handleMinus}>-</p>
            <p>{ammount}</p>
            <p onClick={handlePlus}>+</p>
          </div>
          <div className="w-40 mr-4 font-semibold border border-black">
            <p>Añadir al carrito</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
