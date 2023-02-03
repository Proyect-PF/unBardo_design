import imageF from "../../assets/images/remeras/unbardo-07F.png";
import imageB from "../../assets/images/remeras/unbardo-07B.png";
import React, { useState } from "react";
import AmountInput from "../../components/Inputs/Amount/AmountInput";
import SizeSelector from "../../components/Inputs/SizeSelector/SizeSelector";
import AddCart from "../../components/Buttons/AddCart/AddCart";
import { useLocation } from "react-router-dom";

const Details = (): JSX.Element => {
  const [show, setShow] = useState(false);
  const sizes: string[] = ["M", "L", "XL"];
  const location = useLocation();
  const name = location.pathname.split("/")[2].replaceAll("%20", " ");

  const handleShow = (): void => {
    show ? setShow(false) : setShow(true);
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
          <p className="mt-4 text-lg font-bold text-center ">{name}</p>
          <p className="my-2 text-lg font-bold ">$8.000</p>
        </div>
        <SizeSelector sizes={sizes} />
        <div className="flex justify-between my-8 font-mono text-lg text-center">
          <AmountInput />
          <AddCart />
        </div>
      </div>
    </div>
  );
};

export default Details;
