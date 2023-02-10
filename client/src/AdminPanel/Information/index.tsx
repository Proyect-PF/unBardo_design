import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { State } from "../../state/reducers";
import { adminActionCreators } from "../HttpRequests";

const InformationPanel = () => {
  const { productTotal } = useSelector((state: State) => state.products);
  const { allUsers } = useSelector((state: State) => state.user);
  const dispatch = useDispatch();
  const { fetch_users } = bindActionCreators(adminActionCreators, dispatch);
  useEffect(() => {
    fetch_users();
  }, []);

  return (
    <div className="flex flex-col gap-8 m-10">
      <p className="text-2xl font-bold">Analiticas:</p>
      <div className="flex flex-row gap-20 mx-8">
        <div className="w-40">
          <p className="text-lg font-medium ">Total de productos:</p>
          <p className="text-2xl font-semibold">{productTotal.length}</p>
        </div>
        <div className="w-40">
          <p className="text-lg font-medium">Productos visibles:</p>
          <p className="text-2xl font-semibold">
            {productTotal.filter((e) => e.show_in_shop).length}
          </p>
        </div>
        <div className="w-40">
          <p className="text-lg font-medium">Productos sin Stock:</p>
          <p className="text-2xl font-semibold">
            {
              productTotal.filter(
                (e) => e.S === 0 && e.M === 0 && e.L === 0 && e.XL === 0
              ).length
            }
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-20 mx-8 ">
        <div className="w-40">
          <p className="text-lg font-medium">Ordenes Completadas:</p>
          <p className="text-2xl font-semibold">X</p>
        </div>
        <div className="w-40">
          <p className="text-lg font-medium">Ordenes Activas:</p>
          <p className="text-2xl font-semibold">X</p>
        </div>
      </div>
      <div className="mx-8 ">
        <div className="w-40">
          <p className="text-lg font-medium">Usuarios Activos:</p>
          <p className="text-2xl font-semibold">{allUsers.length}</p>
        </div>
      </div>
    </div>
  );
};

export default InformationPanel;
