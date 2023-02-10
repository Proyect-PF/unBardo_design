import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { adminActions } from "../AdminRedux";
import { AdminState } from "../AdminRedux/reducer";

const InformationPanel = () => {
  const { allProducts, allUsers, allOrders } = useSelector(
    (state: AdminState) => state
  );
  const dispatch = useDispatch();
  const { ADMfetch_users, ADMfetch_orders } = bindActionCreators(
    adminActions,
    dispatch
  );

  useEffect(() => {
    ADMfetch_users();
    ADMfetch_orders();
  }, []);

  return (
    <div className="flex flex-col gap-8 m-10">
      <p className="text-2xl font-bold">Analiticas:</p>
      <div className="flex flex-row gap-20 mx-8">
        <div className="w-40">
          <p className="text-lg font-medium ">Total de productos:</p>
          <p className="text-2xl font-semibold">{allProducts.length}</p>
        </div>
        <div className="w-40">
          <p className="text-lg font-medium">Productos visibles:</p>
          <p className="text-2xl font-semibold">
            {allProducts.filter((e) => e.show_in_shop).length}
          </p>
        </div>
        <div className="w-40">
          <p className="text-lg font-medium">Productos sin Stock:</p>
          <p className="text-2xl font-semibold">
            {
              allProducts.filter(
                (e) => e.S === 0 && e.M === 0 && e.L === 0 && e.XL === 0
              ).length
            }
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-20 mx-8 ">
        <div className="w-40">
          <p className="text-lg font-medium">Ordenes Totales:</p>
          <p className="text-2xl font-semibold">{allOrders.length}</p>
        </div>
        <div className="w-40">
          <p className="text-lg font-medium">Ordenes por Despachar:</p>
          <p className="text-2xl font-semibold">
            {allOrders.filter((e) => e.status !== "completado").length}
          </p>
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
