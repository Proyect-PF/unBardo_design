import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ButtonSmall from "../../Buttons/ButtonSmall/ButtonSmall";
import Swal from "sweetalert2";
import trash from "../../../assets/svg/trash.svg";

interface Props {
  id: string;
  name: string;
  size: string;
  price: number;
  ammount: number;
  imgF: string;
}

const CheckoutCard = ({
  id,
  name,
  size,
  price,
  ammount,
  imgF,
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
        imageUrl: trash,
        html: '<p class="font-poppins font-medium text-black italic" >Sacaras este producto de tu bolsa de compras</p>',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: "#e5e7eb",
        cancelButtonColor: "#000",
        confirmButtonText:
          '<p class="font-rift text-lg text-black">Si, Remover!</p>',
        cancelButtonText: '<p class="font-rift text-lg">No, cancelar!</p>',
        focusConfirm: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          removeCheckout(id);
        }
      });
  };

  return (
    <div className="flex justify-between gap-2 pr-6 m-4 border border-black w-80">
      <img src={imgF} className="w-28" />
      <div className="flex flex-col justify-around w-full pl-4">
        <div className="font-semibold">
          <Link to={`/product/${id.split("-")[0]}`}>{name}</Link>
          <p>{size}</p>
          <p>{`$ ${price * ammount}`}</p>
        </div>
        <div className="flex items-center justify-between mr-4 font-bold">
          <p>{ammount}</p>
          <ButtonSmall
            type="button"
            text="Remover"
            onClick={handleClick}
            name="Carrito"
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutCard;
