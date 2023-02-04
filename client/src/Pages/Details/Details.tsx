import imageF from "../../assets/images/remeras/unbardo-07F.png";
import imageB from "../../assets/images/remeras/unbardo-07B.png";
import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import AmountInput from "../../components/Inputs/Amount/AmountInput";
import SizeSelector from "../../components/Inputs/SizeSelector/SizeSelector";
import { useLocation } from "react-router-dom";
import Button from "../../components/Buttons/Button/Button";
import { State } from "../../state/reducers";
import { actionCreators } from "../../state";

const Details = (): JSX.Element => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { getProductDetails } = bindActionCreators(actionCreators, dispatch);

  const idS = location.pathname.split("/")[2]; //retrieve the id from the url
  const id = Number(idS);
  const { productDetails, render } = useSelector(
    (state: State) => state.products
  );

  const [loading, setLoading] = useState(true);

  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState(1);
  const [size, setSize] = useState("");

  useEffect(() => {
    setLoading(true);
    getProductDetails(id);
  }, [dispatch]);

  useEffect(() => {
    if (productDetails.id !== -1) setLoading(false);
  }, [productDetails]);

  const handleShow = (): void => {
    show ? setShow(false) : setShow(true);
  };

  const handleCart = () => {
    if (amount && size) alert(size + " " + amount);
  };

  return (
    <div>
      <div
        className={`my-8 flex justify-center ${
          !loading ? "hidden" : "visible"
        }`}
      >
        <div className="border-8 border-black border-solid rounded-full w-44 h-44 border-t-transparent animate-spin"></div>
      </div>
      <div
        className={`flex flex-col md:flex-row md:gap-5 ${
          loading ? "hidden" : "visible"
        }`}
      >
        <div className="relative">
          <img
            className={`absolute ${show ? "opacity-100" : "opacity-0"}`}
            alt="black tshirt"
            src={imageB}
          />
          <img className="" alt="black tshirt" src={imageF} />
          {/* <img
          className="absolute w-16 border-2 border-black left-4 top-4 z-1"
          alt="black tshirt"
          src={show ? imageF : imageB}
          onClick={handleShow}
        /> */}
        </div>
        <div className="mx-auto w-fit md:h-1/2 md:flex md:flex-col md:justify-between md:mt-8">
          <div>
            <p className="mt-4 text-lg font-bold text-center ">
              {productDetails.name}
            </p>
            <p className="my-2 text-lg font-bold ">{`$ ${productDetails.price}`}</p>
          </div>
          <div className="flex justify-between my-8 text-lg text-center">
            <SizeSelector sizes={[productDetails.size]} setter={setSize} />
            <AmountInput setter={setAmount} />
          </div>
          <Button
            text="Añadir al carrito"
            onClick={handleCart}
            name="Carrito"
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
