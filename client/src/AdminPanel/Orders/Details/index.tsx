import { useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Swal from "sweetalert2";
import Button from "../../../components/Buttons/Button/Button";
import Input from "../../../components/Inputs/Input";
import Toast from "../../../components/Toast";
import { State } from "../../../state/reducers";
import { adminActions } from "../../AdminRedux";
import { ADMupdate_order } from "../../AdminRedux/actions";

type Props = {
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};
const OrderDetails = ({ setSelected }: Props) => {
  const { orderDetails } = useSelector((state: State) => state.admin);
  const dispatch = useDispatch();
  const { ADMfetch_order_id, ADMfetch_orders } = bindActionCreators(
    adminActions,
    dispatch
  );
  const [trackid, setTrackid] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackid(e.target.value);
  };

  return (
    <div>
      <Button
        type="button"
        text="atras"
        name="back"
        onClick={() => {
          setSelected("list");
          ADMfetch_orders();
        }}
        disabled={false}
        className="justify-end pr-12"
      />
      {orderDetails && (
        <div className="flex flex-col gap-10 p-8 m-10 mx-12 border shadow-xl shadow-slate-400 rounded-2xl">
          <div className="flex gap-4 text-2xl font-medium">
            <p>{`Orden numero: ${orderDetails.id}`}</p>
            <p></p>
          </div>
          <div className="flex flex-col gap-4 text-xl">
            <p className="text-2xl font-medium">Datos del cliente:</p>
            <div className="flex flex-col gap-3 mx-8">
              <label>{`Nombre: ${orderDetails.fullname}`}</label>
              <label>{`Email: ${orderDetails.email}`}</label>
              <label>{`Contacto:`}</label>
              <div className="flex flex-col gap-3 mx-8">
                <label>{`Calle: ${orderDetails.address?.street_name}`}</label>
                <label>{`Numero: ${orderDetails.address?.street_number}`}</label>
                <label>{`Codigo Postal: ${orderDetails.address?.zip_code}`}</label>
                <label>{`Telefono: ${orderDetails.phone?.area_code} - ${orderDetails.phone?.number}`}</label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 text-xl">
            <p className="text-2xl font-medium">Datos de la orden:</p>
            <div className="flex flex-col gap-3 mx-8">
              <p className="text-xl">{`Status: ${orderDetails.status}`}</p>
              <p className="text-xl">{`Despachado: ${
                orderDetails.dispatched ? "Si" : "No"
              }`}</p>
              <p className="text-xl">{`Track Id: ${orderDetails.track_id}`}</p>
              <p className="text-xl">{`Fecha de aprobacion: ${
                orderDetails.date_approved &&
                new Date(orderDetails.date_approved)
              }`}</p>
              <p className="text-xl">{`Total: $ ${orderDetails.total_amount}`}</p>
              <p className="text-xl">{`Costo envio: $ ${orderDetails.shipping_amount}`}</p>
              <p className="text-xl">{`Metodo:  ${orderDetails.payment_type} - ${orderDetails.payment_method}`}</p>
              <p className="text-xl">{`Cuotas: ${orderDetails.cuotes}`}</p>
              <p className="text-xl">{`Total Pagado: $ ${orderDetails.total_paid_amount}`}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 text-xl">
            <p className="text-2xl font-medium">Resumen:</p>
            {orderDetails.products &&
              orderDetails.products.map((e) => (
                <div key={e.id_product} className="flex flex-col gap-3 mx-8">
                  <label>{`Id: ${e.id_product}`}</label>
                  <label>{`Producto: ${e.title}`}</label>
                  <label>{`Cantidades:`}</label>
                  <div className="flex flex-row gap-4 mx-4">
                    {e.sizes?.S && <p>{`Talle 1: ${e.sizes.S}`}</p>}
                    {e.sizes?.M && <p>{`Talle 2: ${e.sizes.M}`}</p>}
                    {e.sizes?.L && <p>{`Talle 3: ${e.sizes.L}`}</p>}
                  </div>
                </div>
              ))}
          </div>
          <div className="flex flex-col items-center justify-center">
            <Input
              id="track_id"
              name="track_id"
              type="text"
              placeholder="Numero de tracking..."
              onChange={handleChange}
              onBlur={handleChange}
              value={trackid}
              className="mt-8 w-96"
            />
            <Button
              text="Marcar como Despachado"
              name="dispatchOrder"
              onClick={() => {
                Swal.fire({
                  title:
                    "<p class='mt-4 text-4xl font-bold text-black'>Marcar como despachado</p>",
                  showConfirmButton: true,
                  showCancelButton: true,
                  confirmButtonColor: "#376B7E",
                  cancelButtonColor: "#e5e7eb",
                  cancelButtonText:
                    "<p class='text-lg text-black'>Mejor no</p>",
                  confirmButtonText: "<p class='text-lg'>Despachar</p>",
                  // html: '<p class="font-medium text-black italic">Revisa que el numero de trackeo sea el correcto</p>',
                  text:
                    "El siguiente numero de tracking sera asociado a la orden: " +
                    trackid,
                }).then((result) => {
                  if (result.isConfirmed) {
                    ADMupdate_order(orderDetails.id, "true", trackid, Toast);
                  }
                });
              }}
              disabled={false}
              type="button"
              className={"justify-center"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
