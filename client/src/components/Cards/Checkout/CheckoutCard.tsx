import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

interface Props {
  id: string;
  name: string;
  size: string;
  price: number;
  ammount: number;
  imgF: string;
  handleCheckout: any;
}

const CheckoutCard = ({
  id,
  name,
  size,
  price,
  ammount,
  imgF,
  handleCheckout,
}: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { removeCheckout } = bindActionCreators(actionCreators, dispatch);

  const handleClick = (e: any) => {
    e.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-white border-black rounded-none",
        cancelButton: "btn btn-danger",
      },
    });

    swalWithBootstrapButtons
      .fire({
        title:
          '<p class="mt-4 text-4xl font-bold font-rift text-black">¿Estás seguro?</p>',
        html: '<p class="font-poppins font-medium text-black italic" >Sacaras este producto de tu bolsa de compras</p>',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: "#e5e7eb",
        cancelButtonColor: "#376B7E",
        confirmButtonText:
          '<p class="font-rift text-lg text-black">Si, Remover!</p>',
        cancelButtonText: '<p class="font-rift text-lg">No, cancelar!</p>',
        focusConfirm: false,
        reverseButtons:true
      })
      .then((result) => {
        if (result.isConfirmed) {
          removeCheckout(id);
        }
      });
  };

  return (
    <div className="flex justify-between gap-2 pr-6 m-4 maw w-4/5 md:mt-12">
      <img src={imgF} className="w-20 sm:w-28" alt="product"/>
      <div className="flex flex-col justify-around w-full pl-4">
        <div className="flex flex-col gap-1">
          <Link onClick={() => handleCheckout()} className="text-xxs font-bold sm:text-base" to={`/product/${id.split("-")[0]}`}>
            {name}
          </Link>
          <p className="text-xs sm:text-sm">
            {size === "S" ? "Talle 1" : size === "M" ? "Talle 2" : "Talle 3"}
          </p>
          <p className="font-bold text-xs sm:text-xxs">{`$ ${price * ammount}`}</p>
        </div>
        <div className="flex items-center justify-between mr-4 text-xs sm:text-sm">
          <p>{` ${ammount}`}</p>
          <p
            className="text-xs sm:text-sm font-medium underline hover:cursor-pointer"
            onClick={handleClick}
          >
            Remover
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCard;
