import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "../../AdminPanel/AdminRedux";
import { State } from "../../state/reducers";
import { AnaliticProducts } from "../../types/types";

export const LineChartProducts = () => {
  //Register for generate chart
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  //Locals States and types >>>>>>>>>>>>>>>>>>>><
  type DateState = {
    timeUnit: string;
    num: number | undefined;
    status: string;
  };
  const InitialInfoFillBack: DateState = {
    timeUnit: "days", //days, weeks,trimesters, months, years
    num: 0, //Numero de dias, meses, semanas, años si dejamos cero, por efecto el back esta configurado
    status: "approved", //approved, rejected, cart
  };
  const [infoBack, setInfoBack] = useState(InitialInfoFillBack);

  //Global States and Types >>>>>>>>>>>>>>>>>>>><
  const dispatch = useDispatch();
  const { ADMfetch_chart_products_values } = bindActionCreators(
    adminActions,
    dispatch
  );
  const { analiticsProducts } = useSelector((state: State) => state.admin);

  useEffect(() => {
    ADMfetch_chart_products_values(
      infoBack.timeUnit,
      infoBack.status,
      infoBack.num
    );
  }, [infoBack.timeUnit, infoBack.status, infoBack.num]);

  //Manejo de la data que traemos del back >>>>>>>>>>>>>>>>>>>><
  const arrData: number[] = analiticsProducts?.map(
    (date: AnaliticProducts) => date.totalProductsSold
  );

  let sum: number = 0;
  for (let i = 0; i < analiticsProducts.length; i++) {
    sum = Number(analiticsProducts[i].totalProductsSold) + sum;
  }

  const labels: string[][] = analiticsProducts.map((date: AnaliticProducts) => {
    return  date.timeUnit.split("T", 1);
  });

  //Configuracion del Chart Line
  const options: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text:
          //Estado de carrito en approved
          infoBack.status === "approved"
            ? infoBack.timeUnit === "days"
              ? "Productos vendidos en los ultimos 7 Dias"
              : infoBack.timeUnit === "weeks"
              ? "Productos vendidos en las ultimas 4 Semanas"
              : infoBack.timeUnit === "trimesters"
              ? "Productos vendidos en los ultimos 3 Meses"
              : infoBack.timeUnit === "months"
              ? "Productos vendidos en los ultimos 12 Meses"
              : "Otras Fechas"
            : //Estado de carrito en rejected
            infoBack.status === "rejected"
            ? infoBack.timeUnit === "days"
              ? "Productos cancelados en los ultimos 7 Dias"
              : infoBack.timeUnit === "weeks"
              ? "Productos cancelados en las ultimas 4 Semanas"
              : infoBack.timeUnit === "trimesters"
              ? "Productos cancelados en los ultimos 3 Meses"
              : infoBack.timeUnit === "months"
              ? "Productos cancelados en los ultimos 12 Meses"
              : "Otras Fechas"
            : //Estado de carrito en cart
            infoBack.timeUnit === "days"
            ? "Productos totales en los ultimos 7 Dias"
            : infoBack.timeUnit === "weeks"
            ? "Productos totales en las ultimas 4 Semanas"
            : infoBack.timeUnit === "trimesters"
            ? "Productos totales en los ultimos 3 Meses"
            : infoBack.timeUnit === "months"
            ? "Productos totales en los ultimos 12 Meses"
            : "Otras Fechas",
      },
    },
  };
  const data = {
    point: "triangle",
    labels,
    datasets: [
      {
        label: "Numero de Productos",
        data: arrData,
        borderColor: "#376B7E",
        backgroundColor: "rgba(55, 107, 126, .4)",
        tension: 0.4,
      },
    ],
  };
  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const values = target.value;
    const names = target.name;
    setInfoBack({
      ...infoBack,
      [names]: values,
    });
  };
  return (
    <div>
      {analiticsProducts.length > 0 && (
        <div className="flex flex-col gap-8 p-8">
          <p className="text-2xl font-medium ">Estadisticas de Productos:</p>
          <div className="flex self-center gap-8">
            <select
              className="p-2 pr-4 text-base text-center border-b border-black h-fit"
              value={infoBack.timeUnit}
              name="timeUnit"
              onChange={handleChange}
            >
              <option value="days">
                Ultimos 7 Dias
              </option>
              <option value="weeks">Ultimas 4 Semanas</option>
              <option value="trimesters">Ultimos 3 Meses</option>
              <option value="months">Ultimos 12 Meses</option>
              {/* <option value="years">Ultimo Año</option>  */}
            </select>
            <select
              className="p-2 pr-4 text-base text-center border-b border-black h-fit"
              value={infoBack.status}
              name="status"
              onChange={handleChange}
            >
              <option value="approved">
                Aprobados
              </option>
              <option value="rejected">Cancelados</option>
              <option value="cart">Carrito</option>
            </select>
          </div>
          <p className="text-sm font-medium text-slate-500">
          De {labels[0]} al {labels[labels.length - 1]}
          </p>
          <Line options={options} data={data} />
          <div className="self-center mt-8 w-80">
            <p className="text-lg font-medium ">
              {` Total de productos
              ${
                infoBack.status === "cart"
                  ? "en Carrito"
                  : infoBack.status === "approved"
                  ? "Aprobados"
                  : "Cancelados"
              } `}
            </p>
            <p className="text-2xl font-semibold">{sum}</p>
          </div>
        </div>
      )}
    </div>
  );
};
