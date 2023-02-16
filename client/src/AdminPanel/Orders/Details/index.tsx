import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { bindActionCreators } from "redux";
import Button from "../../../components/Buttons/Button/Button";
import { State } from "../../../state/reducers";
import { adminActions } from "../../AdminRedux";

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

  console.log(orderDetails);

  return (
    <div>
      <ToastContainer />
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
        <div className="flex flex-col gap-10 mx-12">
          <div className="flex gap-4 text-2xl font-medium">
            <p>{`Orden numero: ${orderDetails.id}`}</p>
            <p></p>
          </div>
          <div className="flex flex-col gap-4 text-xl">
            <p className="text-2xl font-medium">Datos del cliente:</p>
            <div className="flex flex-col gap-3 mx-8">
              <label>{`Nombre: ${orderDetails.fullname}`}</label>
              <label>{`Email: ${orderDetails.email}`}</label>
              <label>{`Nombre: ${orderDetails.fullname}`}</label>
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
              <p className="text-xl">{`Fecha: ${
                orderDetails.updatedAt?.split("T")[0]
              }`}</p>
              <p className="text-xl">{`Total: ${orderDetails.total_amount}`}</p>
              <p className="text-xl">{`Metodo:  ${orderDetails.payment_type} - ${orderDetails.payment_method}`}</p>
              <p className="text-xl">{`Cuotas: ${orderDetails.cuotes}`}</p>
              <p className="text-xl">{`Total Pagado: ${orderDetails.total_paid_amount}`}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 text-xl">
            <p className="text-2xl font-medium">Resumen:</p>
            {orderDetails &&
              orderDetails.products.map((e) => (
                <div className="flex flex-col gap-3 mx-8">
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
        </div>
      )}

      <Button
        text="Marcar como Despachado"
        name="deleteProd"
        onClick={() => {
          adminActions.ADMupdate_order(orderDetails.id, "true", toast);
        }}
        disabled={false}
        type="button"
        className={"justify-center"}
      />
    </div>
  );
};

export default OrderDetails;
