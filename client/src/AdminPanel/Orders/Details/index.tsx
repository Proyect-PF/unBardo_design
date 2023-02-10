import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "../../../components/Buttons/Button/Button";
import { State } from "../../../state/reducers";
import { adminActionCreators } from "../../HttpRequests";
import { update_order } from "../../HttpRequests/actions";

type Props = {
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};
const OrderDetails = ({ setSelected }: Props) => {
  const { order } = useSelector((state: State) => state.orders);
  const dispatch = useDispatch();
  const { fetch_order_id, fetch_orders } = bindActionCreators(
    adminActionCreators,
    dispatch
  );

  return (
    <div>
      <Button
        type="button"
        text="atras"
        name="back"
        onClick={() => {
          setSelected("list");
          fetch_orders();
        }}
        disabled={false}
        className="justify-end pr-12"
      />
      <div className="flex flex-col gap-10 mx-12">
        <p className="text-2xl ">{`Order: ${order.id}`}</p>
        <div className="flex flex-col gap-2">
          <label className="text-xl">{`Nombre: ${order.fullname}`}</label>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl">{`Email: ${order.email}`}</label>
        </div>
        <div className="flex gap-8">
          <p className="text-xl">{`Fecha: ${order.createdAt}`}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl">{`Status: ${order.status}`}</p>
        </div>
      </div>

      <Button
        text="Marcar como Despachado"
        name="deleteProd"
        onClick={() => {
          update_order(order.id, "dispatched");
        }}
        disabled={false}
        type="button"
        className={"justify-center"}
      />
    </div>
  );
};

export default OrderDetails;
