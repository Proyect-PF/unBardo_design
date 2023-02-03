import imageF from "../../assets/images/remeras/unbardo-07F.png";
import imageB from "../../assets/images/remeras/unbardo-07B.png";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AmountInput from "../../components/Inputs/Amount/AmountInput";
import SizeSelector from "../../components/Inputs/SizeSelector/SizeSelector";
import { useLocation } from "react-router-dom";
import Button from "../../components/Buttons/Button/Button";
import { State } from "../../state/reducers";

const Details = (): JSX.Element => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState(1);
  const [size, setSize] = useState("");

  const { productList } = useSelector((state: State) => state.products);
  const [product, setProduct] = useState(productList[0]);

  useEffect(() => {
    if (productList.length > 0) {
      let target = productList.filter((e) => e.id.toString() === id)[0];
      setProduct(target);
    }
  }, [productList]);

  const handleShow = (): void => {
    show ? setShow(false) : setShow(true);
  };

  const handleCart = () => {
    if (amount && size) alert(size + " " + amount);
    console.log(product);
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
          <p className="mt-4 text-lg font-bold text-center ">{product?.name}</p>
          <p className="my-2 text-lg font-bold ">{`$ ${product?.price}`}</p>
        </div>
        <div className="flex justify-between my-8 font-mono text-lg text-center">
          <SizeSelector sizes={[product?.size]} setter={setSize} />
          <AmountInput setter={setAmount} />
        </div>
        <Button text="Añadir al carrito" onClick={handleCart} name="Carrito" />
      </div>
    </div>
  );
};

export default Details;
