import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { bindActionCreators } from "redux";
import Button from "../../components/Buttons/Button/Button";
import ImageSlider from "../../components/ImageSlider";
import AmountInput from "../../components/Inputs/Amount/AmountInput";
import SizeSelector from "../../components/Inputs/SizeSelector/SizeSelector";
import { actionCreators } from "../../state";
import { State } from "../../state/reducers";
import { getItem } from "../../utils/localStorage";
import Swal from "sweetalert2";
import plus from "../../assets/svg/googleIcons/plus.svg";
import minus from "../../assets/svg/googleIcons/minus.svg";
import heartF from "../../assets/svg/googleIcons/heart.svg";
import heartUF from "../../assets/svg/googleIcons/heartunfilled.svg";
import Toast from "../../components/Toast";

const Details = (): JSX.Element => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    fetch_product_detail,
    addCheckout,
    setFavorite,
    getFavorites,
    deleteFavorite,
  } = bindActionCreators(actionCreators, dispatch);

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
  //state for the description
  const [desc, showDesc] = useState(false);
  //state for the sizes chart
  const [sChart, showSChart] = useState(false);

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
    Toast.fire({
      icon: "success",
      title:
        "<p class='font-bold font-rift text-black'>Se añadió correctamente!</p>",
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
    let findProduct = products_id.find((x) => x === productDetails.id);
    if (!findProduct) return false;
    return true;
  };

  const handleFavorite = () => {
    if (success) {
      if (isFavorite()) {
        deleteFavorite(
          {
            id_product: productDetails.id,
            id_user: userId,
          },
          getFavorites
        );
      } else {
        setFavorite(
          {
            id_product: productDetails.id,
            id_user: userId,
          },
          getFavorites
        );
      }
    } else {
      Swal.fire({
        title:
          "<p class='mt-4 text-4xl font-bold font-rift text-black'>Inicia sesión</p>",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: "#376B7E",
        cancelButtonColor: "#e5e7eb",
        cancelButtonText:
          "<p class='font-rift text-lg text-black'>Por ahora no</p>",
        confirmButtonText: "<p class='font-rift text-lg'>Iniciar Sesión</p>",
        reverseButtons: true,
        html: '<p class="font-poppins font-medium text-black italic" >Necesitas iniciar sesión para poder agregar productos a tus favoritos</p>',
        //text: 'Necesitas iniciar sesión para poder agregar productos a la bolsa de compra',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/account/login");
        }
      });
    }
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
        className={`flex flex-col md:flex-row md:gap-5 md:mx-20 md:mt-12 ${
          loading ? "hidden" : "visible"
        }`}
      >
        <div className="flex justify-center">
          <ImageSlider slides={images} />
        </div>
        <div className="w-4/5 mx-auto md:flex md:flex-col md:justify-between md:mt-8 md:mx-20 md:h-fit">
          <div>
            <p className="my-4 text-3xl font-medium text-center md:text-left ">
              {productDetails.name}
            </p>

            {stock > 0 ? (
              productDetails.promotion ? (
                <div className="flex flex-row justify-center gap-4 md:justify-start">
                  <p className="my-2 text-3xl">{`$ ${productDetails.promotional_price}`}</p>
                  <p className="my-2 text-xl italic text-gray-400 line-through">{`$ ${productDetails.price}`}</p>
                </div>
              ) : (
                <p className="my-2 text-3xl ">{`$ ${productDetails.price}`}</p>
              )
            ) : (
              <div className="flex flex-row gap-4">
                <p className="my-2 text-3xl italic text-gray-500 line-through">{`$ ${productDetails.price}`}</p>
                <p className="my-2 text-xl italic font-medium ">Out of Stock</p>
              </div>
            )}
          </div>
          <div>
            <div className="flex justify-around my-8 text-lg text-center md:justify-center md:w-fit ">
              <div className="flex gap-4">
                <p className="self-center">Talle:</p>
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
              </div>
              <AmountInput
                stock={stockSize}
                size={size}
                amount={ammount}
                setter={setAmmount}
              />
            </div>

            <div className="flex items-center justify-center gap-4 ">
              <Button
                className={"justify-center"}
                type="button"
                text="Añadir al carrito"
                onClick={handleCart}
                name="Carrito"
                disabled={size === ""}
              />
              <img
                src={isFavorite() ? heartF : heartUF}
                onClick={handleFavorite}
                className="h-6 mt-4 cursor-pointer"
                alt="favorite"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-8 md:mt-20">
            <div
              className="flex flex-row justify-between py-2 border-t border-b"
              onClick={() => showDesc(desc ? false : true)}
            >
              <p className="text-lg font-medium ">DESCRIPCION</p>
              <img src={desc ? minus : plus} className="h-6" alt="open/close" />
            </div>
            <p
              className={` text-lg italic  ${desc ? "visible" : "hidden"}`}
            >{`${productDetails.description}`}</p>
            <div
              className="flex flex-row justify-between py-2 border-t border-b"
              onClick={() => showSChart(sChart ? false : true)}
            >
              <p className="text-lg font-medium ">TALLES</p>
              <img
                src={sChart ? minus : plus}
                className="h-6"
                alt="open/close"
              />
            </div>
            <div
              className={`flex flex-col gap-2 ${sChart ? "visible" : "hidden"}`}
            >
              <div>
                <p>Talle 1 (Ideal para mujeres):</p>
                <div className="mx-20">
                  <div className="flex gap-4">
                    <p className="w-16">Ancho: </p>
                    <p>56 cm</p>
                  </div>
                  <div className="flex gap-4">
                    <p className="w-16">Largo: </p>
                    <p>70 cm</p>
                  </div>
                  <div className="flex gap-4">
                    <p className="w-16">Manga: </p>
                    <p>24 cm</p>
                  </div>
                </div>
              </div>
              <div>
                <p>Talle 2 (Ideal para hombres):</p>
                <div className="mx-20">
                  <div className="flex gap-4">
                    <p className="w-16">Ancho: </p>
                    <p>60 cm</p>
                  </div>
                  <div className="flex gap-4">
                    <p className="w-16">Largo: </p>
                    <p>74 cm</p>
                  </div>
                  <div className="flex gap-4">
                    <p className="w-16">Manga: </p>
                    <p>26 cm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
