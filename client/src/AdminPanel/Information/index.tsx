import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { State } from "../../state/reducers";
import { adminActions } from "../AdminRedux";
import { LineChartProducts } from "../../components/Graphs/LineChartProducts";
import { BarChartFunnel } from "../../components/Graphs/BarChartFunnel";
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
    <div className="">
      {allProducts && allOrders && allUsers && (
        <div className="m-12">
          <p className="mt-8 text-2xl font-semibold">UnBardo Dashboard:</p>
          <div className="flex flex-row justify-around w-full gap-12 my-8">
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
            <div className="w-40">
              <p className="text-lg font-medium">Ordenes por Despachar:</p>
              <p className="text-2xl font-semibold">
                {allOrders.filter((e: any) => e.dispatched !== true).length}
              </p>
            </div>

            <div className="w-20">
              <p className="text-lg font-medium">Usuarios Activos:</p>
              <p className="text-2xl font-semibold">{allUsers.length}</p>
            </div>
          </div>
          <p className="mt-16 text-2xl font-medium">Trafico de usuarios:</p>
          <div></div>
          <p className="mt-16 text-2xl font-medium">Productos:</p>
          <div className="flex flex-col gap-12 m-10">
            <div className="flex flex-row justify-around gap-20 my-8">
              <div className="w-40">
                <p className="text-lg font-medium ">Ventas totales:</p>
                <p className="text-2xl font-semibold">
                  {allOrders.filter((e: any) => e.status === "approved").length}
                </p>
              </div>
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
            </div>

            <div className="w-6/12 ">
              <LineChartProducts />
            </div>
            <div className="w-6/12">
              <BarChartFunnel />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InformationPanel;
