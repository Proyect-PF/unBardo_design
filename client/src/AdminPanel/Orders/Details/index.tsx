import { useDispatch, useSelector } from "react-redux";
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
  const { ADMfetch_orders } = bindActionCreators(
    adminActions,
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
          ADMfetch_orders();
        }}
        disabled={false}
        className="justify-end pr-12"
      />
      <div className="flex flex-col gap-10 mx-12">
        <p className="text-2xl ">{`Order: ${orderDetails.id}`}</p>
        <div className="flex flex-col gap-2">
          <label className="text-xl">{`Nombre: ${orderDetails.fullname}`}</label>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl">{`Email: ${orderDetails.email}`}</label>
        </div>
        <div className="flex gap-8">
          <p className="text-xl">{`Fecha: ${orderDetails.updatedAt}`}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl">{`Status: ${orderDetails.status}`}</p>
        </div>
      </div>

      <Button
        text="Marcar como Despachado"
        name="deleteProd"
        onClick={() => {
          adminActions.ADMupdate_order(orderDetails.id, "dispatched");
        }}
        disabled={false}
        type="button"
        className={"justify-center"}
      />
    </div>
  );
};

export default OrderDetails;
