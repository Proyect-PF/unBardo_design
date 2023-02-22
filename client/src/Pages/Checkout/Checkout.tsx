import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Buttons/Button/Button";
import CheckoutCard from "../../components/Cards/Checkout/CheckoutCard";
import { State } from "../../state/reducers";
import Swal from "sweetalert2";
import close from "../../assets/svg/googleIcons/close.svg";
import Scroll from "react-scroll";
import { baseURL, PORT } from "../../utils/url&port";

const Element = Scroll.Element;

interface ProductSize {
  [size: string]: number;
}

interface Product {
  id_product: number;
  sizes: ProductSize;
}

interface UserProducts {
  id_user: number;
  products: Product[];
}

interface Props {
  openClose: boolean;
  handleCheckout: any;
}

const Checkout = ({ openClose, handleCheckout }: Props): JSX.Element => {
  const navigate = useNavigate();
  const { checkoutList } = useSelector((state: State) => state.checkout);
  const { userId } = useSelector((state: State) => state.user);
  const { success } = useSelector((state: State) => state.user);

  // const checkoutData = localStorage.getItem('shoppingBag');

  const userProducts: UserProducts = {
    id_user: userId,
    products: checkoutList.reduce((acc: Product[], item: any) => {
      const foundItem = acc.find((p) => p.id_product === item.id);
      if (foundItem) {
        foundItem.sizes[item.size] = (foundItem.sizes[item.size] || 0) + 1;
      } else {
        acc.push({
          id_product: parseInt(item.id.split("-")[0]),
          sizes: {
            [item.size]: item.ammount,
          },
        });
      }
      return acc;
    }, []),
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (success) {
      axios.post(`${baseURL}/orders`, userProducts).then((response) => {
        return response;
      });
      handleCheckout();
      navigate("/checkout/payment");
    } else {
      Swal.fire({
        title:
          "<p class='mt-4 text-4xl font-bold font-rift text-black'>Inicia sesión</p>",
        showCancelButton: true,
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonColor: "#376B7E",
        denyButtonColor: "#376B7E",
        cancelButtonColor: "#e5e7eb",
        cancelButtonText:
          "<p class='font-rift text-lg text-black'>Por ahora no</p>",
        confirmButtonText: "<p class='font-rift text-lg'>Iniciar Sesión</p>",
        denyButtonText:
          "<p class='font-rift text-lg text-white'>Registrarse</p>",
        html: '<p class="font-poppins font-medium text-black italic" >Necesitas iniciar sesión para poder comprar los productos de la bolsa de compra</p>',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/account/login");
          handleCheckout();
        } else if (result.isDenied) {
          navigate("/account/register");
          handleCheckout();
        }
      });
    }
  };

  let style: string;
  if (openClose) style = "translate-x-[100%]";
  else {
    style = "translate-x-[0%]";
  }
  let style1: string;
  if (openClose) style1 = "opacity-0 invisible";
  else {
    style1 = "opacity-1 visible";
  }

  return (
    <div
      className={`flex fixed ${style1} ease-in-out duration-500 justify-end w-full bg-black/60 z-50`}
    >
      <div
        className={`h-screen flex flex-col ${style} ease-in-out duration-500 justify-between pt-5 pb-14 max-w-md bg-white w-4/5 items-center gap-4`}
      >
        <div className="flex flex-wrap justify-center w-full">
          <div className="flex items-center justify-between w-full h-12 border-b border-gray-400">
            <p className="pb-3 pl-3 font-medium font-poppins">
              Bolsa de Compra
            </p>
            <img
              onClick={handleCheckout}
              className="pb-3 hover:cursor-pointer"
              src={close}
              alt="close"
            />
          </div>
          <Element
            name="test7"
            className="element w-full scroll-hidden"
            id="containerElement"
            style={{
              position: "relative",
              height: "70vh",
              overflow: "scroll",
              scrollbarWidth: "none",
              overflowX: "hidden",
            }}
          >
            <div className="flex flex-wrap justify-center w-full">
              {checkoutList?.length > 0 &&
                checkoutList.map((e: any) => (
                  <CheckoutCard
                    key={e.id}
                    id={e.id}
                    name={e.name}
                    size={e.size}
                    price={e.price}
                    ammount={e.ammount}
                    imgF={e.imgF}
                    handleCheckout={handleCheckout}
                  />
                ))}
            </div>
          </Element>
        </div>
        <div className="w-full border-t border-gray-400">
          <p className="pt-3 mx-6 font-bold text-center">{`Total: $ ${
            checkoutList.length > 0
              ? checkoutList.reduce((acc: number, e: any) => {
                  return acc + e.price * e.ammount;
                }, 0)
              : 0
          }`}</p>

          <Button
            className={"justify-center"}
            type="button"
            name="Checkout"
            text={`Pagar ahora (${
              checkoutList.length > 0
                ? checkoutList.reduce((acc: number, e: any) => {
                    return acc + e.ammount;
                  }, 0)
                : 0
            })`}
            onClick={handleClick}
            // onClick={() => {}}
            disabled={checkoutList.length === 0}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
