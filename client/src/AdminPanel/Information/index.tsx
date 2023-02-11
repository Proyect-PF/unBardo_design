import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { State } from "../../state/reducers";
import { adminActions } from "../AdminRedux";

const InformationPanel = () => {
  const { allProducts, allOrders, allUsers } = useSelector(
    (state: State) => state.admin
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
    <div>
      {allProducts && allOrders && allUsers && (
        <div className="flex flex-col gap-8 m-10">
          <p className="text-2xl font-bold">Estadisticas:</p>
          <div className="flex flex-row gap-20 mx-8">
            <div className="w-40">
              <p className="text-lg font-medium ">Total de productos:</p>
              <p className="text-2xl font-semibold">{allProducts.length}</p>
            </div>
            <div className="w-40">
              <p className="text-lg font-medium">Productos visibles:</p>
              <p className="text-2xl font-semibold">
                {allProducts.filter((e: any) => e.show_in_shop).length}
              </p>
            </div>
            <div className="w-40">
              <p className="text-lg font-medium">Productos sin Stock:</p>
              <p className="text-2xl font-semibold">
                {
                  allProducts.filter(
                    (e: any) =>
                      e.S === 0 && e.M === 0 && e.L === 0 && e.XL === 0
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
                {allOrders.filter((e: any) => e.status !== "dispatched").length}
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
      )}
    </div>
  );
};

export default InformationPanel;
