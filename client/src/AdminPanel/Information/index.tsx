import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { State } from "../../state/reducers";
import { adminActions } from "../AdminRedux";
import { LineChartProducts } from "../../components/Graphs/LineChartProducts";
import { BarChartFunnel } from "../../components/Graphs/BarChartFunnel";
import EmailList from "../Email";

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
        <div className="m-6">
          <div>
            <p className="mx-4 mt-12 text-2xl font-semibold">
              UnBardo Dashboard:
            </p>
            <div className="flex flex-row justify-around mx-6 my-8">
              <div className="p-8 shadow-xl w-60 shadow-slate-400 rounded-2xl">
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
              <div className="p-8 shadow-xl w-60 shadow-slate-400 rounded-2xl">
                <p className="text-lg font-medium">Ordenes por Despachar:</p>
                <p className="text-2xl font-semibold">
                  {allOrders.filter((e: any) => e.dispatched !== true).length}
                </p>
              </div>

              <div className="p-8 shadow-xl w-60 shadow-slate-400 rounded-2xl">
                <p className="text-lg font-medium">Usuarios Activos:</p>
                <p className="text-2xl font-semibold">{allUsers.length}</p>
              </div>
              <EmailList />
            </div>
          </div>
          {/* <div className="flex flex-col gap-12 m-10">
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

          </div> */}

          <section className="flex flex-col justify-center gap-20 mt-20 2xl:flex-row">
            <div className="self-center shadow-xl md:self-start shadow-slate-400 w-800 h-800 rounded-2xl">
              <BarChartFunnel />
            </div>
            <div className="self-center shadow-xl shadow-slate-400 w-800 h-800 rounded-2xl">
              <LineChartProducts />
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default InformationPanel;
