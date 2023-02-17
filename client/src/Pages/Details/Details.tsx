import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { bindActionCreators } from "redux";
import Button from "../../components/Buttons/Button/Button";
import ImageSlider from "../../components/ImageSlider";
import AmountInput from "../../components/Inputs/Amount/AmountInput";
import SizeSelector from "../../components/Inputs/SizeSelector/SizeSelector";
import { actionCreators } from "../../state";
import { State } from "../../state/reducers";
import { getItem } from "../../utils/localStorage";
import logged from "../../assets/svg/logged.svg"
import Swal from "sweetalert2";

const Details = (): JSX.Element => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fetch_product_detail, addCheckout, setFavorite, getFavorites, deleteFavorite } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const { productDetails } = useSelector((state: State) => state.products);
  const { userId, success } = useSelector((state: State) => state.user);
  const { products_id } = useSelector((state: State) => state.favorites);
  //AL: loading state for loading implementation (done)
  const [loading, setLoading] = useState(true);
  //AL: size / amount state retrieve the selection for future add to cart implementation
  const [ammount, setAmmount] = useState(1);
  const [size, setSize] = useState("");
  //AL:retrieve the id from the url & transform to number to match type
  const idS = location.pathname.split("/")[2];
  const id = Number(idS);
  //image state for the slider
  const [images, setImages] = useState<string[]>([]);

  //AL:Same loading implementation as HOME page
  useEffect(() => {
    setLoading(true);
    fetch_product_detail(id);
  }, [dispatch, id]);

  //AL: checks if the data is correct an set loading state, also confirms if the product is avalible for display and sets the images in the slider
  useEffect(() => {
    setLoading(true);
    !productDetails.show_in_shop && navigate("/");
    if (productDetails.name !== "") setLoading(false);
    setImages([
      productDetails.image,
      productDetails.image2 ? productDetails.image2 : "",
      productDetails.image3 ? productDetails.image3 : "",
      productDetails.image4 ? productDetails.image4 : "",
    ]);
  }, [productDetails]);



  //AL: this function manages the add to cart functionality, needs to be implemented
  const handleCart = (e: any) => {
    e.preventDefault();
    const payload = {
      id: productDetails.id + "-" + size,
      name: productDetails.name,
      size: size,
      price: productDetails.promotion
        ? productDetails.promotional_price
        : productDetails.price,
      ammount: ammount,
      imgF: productDetails.image,
    };
    addCheckout(payload);
    setSize("");
    setAmmount(1);
    toast.success("Se añadió correctamente!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const stock =
    productDetails.S + productDetails.L + productDetails.M + productDetails.XL;

  const stockSize = (size: string) => {
    let checkoutList = getItem("shoppingBag");
    if (size === "S") {
      if (checkoutList?.length > 0) {
        let findCard = checkoutList.find(
          (x: any) => x.id === productDetails.id + "-1"
        );
        if (findCard) {
          return productDetails.S - findCard.ammount;
        }
      }
      return productDetails.S;
    }
    if (size === "M") {
      if (checkoutList?.length > 0) {
        let findCard = checkoutList.find(
          (x: any) => x.id === productDetails.id + "-2"
        );
        if (findCard) {
          return productDetails.M - findCard.ammount;
        }
      }
      return productDetails.M;
    }
    if (size === "L") {
      if (checkoutList?.length > 0) {
        let findCard = checkoutList.find(
          (x: any) => x.id === productDetails.id + "-3"
        );
        if (findCard) {
          return productDetails.L - findCard.ammount;
        }
      }
      return productDetails.L;
    }
    if (size === "XL") {
      if (checkoutList?.length > 0) {
        let findCard = checkoutList.find(
          (x: any) => x.id === productDetails.id + "-4"
        );
        if (findCard) {
          return productDetails.XL - findCard.ammount;
        }
      }
      return productDetails.XL;
    } else {
      return 1;
    }
  };

  const isFavorite = () => {
    let findProduct = products_id.find(x => x === productDetails.id)
    if(!findProduct) return false;
    return true;
  }

  const handleFavorite = () => {
    if(success){
      if(isFavorite()){
        deleteFavorite({
          id_product: productDetails.id,
          id_user: userId
        }, getFavorites)
      } else {
        setFavorite({
          id_product: productDetails.id,
          id_user: userId
        }, getFavorites)
      }
    } else {
      Swal.fire({
        imageUrl: logged,
        title: "<p class='mt-4 text-4xl font-bold font-rift text-black'>Inicia sesión</p>",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: "#000",
        cancelButtonColor: "#e5e7eb",
        cancelButtonText: "<p class='font-rift text-lg text-black'>Por ahora no</p>",
        confirmButtonText: "<p class='font-rift text-lg'>Iniciar Sesión</p>",
        reverseButtons: true,
        html: 
        '<p class="font-poppins font-medium text-black italic" >Necesitas iniciar sesión para poder agregar productos a tus favoritos</p>',
        //text: 'Necesitas iniciar sesión para poder agregar productos a la bolsa de compra',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/account/login')
        } 
      })
    }
  }

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
        <ImageSlider slides={images} />
        <div className="w-4/5 mx-auto md:flex md:flex-col md:justify-between md:mt-8">
          <div>
            <p className="mt-4 text-4xl font-bold ">{productDetails.name}</p>

            {stock > 0 ? (
              productDetails.promotion ? (
                <div className="flex flex-row gap-4">
                  <p className="my-2 text-3xl font-bold">{`$ ${productDetails.promotional_price}`}</p>
                  <p className="my-2 text-xl italic font-bold text-gray-400 line-through">{`$ ${productDetails.price}`}</p>
                </div>
              ) : (
                <p className="my-2 text-3xl font-bold ">{`$ ${productDetails.price}`}</p>
              )
            ) : (
              <div className="flex flex-row gap-4">
                <p className="my-2 text-3xl italic font-bold text-gray-500 line-through">{`$ ${productDetails.price}`}</p>
                <p className="my-2 text-xl italic font-bold ">Out of Stock</p>
              </div>
            )}

            <p className="my-2 text-lg italic font-medium font-poppins">{`${productDetails.description}`}</p>
          </div>
          <div>
            <div className="flex justify-around my-8 text-lg text-center">
              <SizeSelector
                detailId={productDetails.id}
                selected={size}
                sizes={[
                  productDetails.S,
                  productDetails.M,
                  productDetails.L,
                  productDetails.XL,
                ]}
                setter={setSize}
              />
              <AmountInput
                stock={stockSize}
                size={size}
                amount={ammount}
                setter={setAmmount}
              />
            </div>

            <div className="flex items-center justify-center">
              <Button
                className={"justify-center"}
                type="button"
                text="Añadir al carrito"
                onClick={handleCart}
                name="Carrito"
                disabled={size === ""}
              />
              <svg width="45" height="40" viewBox="0 0 20 18" fill={isFavorite() ? "black": "none"} xmlns="http://www.w3.org/2000/svg"
              className="pl-4 pt-3 hover:cursor-pointer duration-300"
              onClick={handleFavorite}>
              <path d="M2.3314 9.04738L10 17L17.6686 9.04738C18.5211 8.16332 19 6.96429 19 5.71405C19 3.11055 16.9648 1 14.4543 1C13.2487 1 12.0925 1.49666 11.24 2.38071L10 3.66667L8.75997 2.38071C7.90749 1.49666 6.75128 1 5.54569 1C3.03517 1 1 3.11055 1 5.71405C1 6.96429 1.47892 8.16332 2.3314 9.04738Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Details;
