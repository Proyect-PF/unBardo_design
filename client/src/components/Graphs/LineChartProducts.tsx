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
  ChartEvent,
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
  const arrData: number[] = analiticsProducts.map(
    (date: AnaliticProducts) => date.totalProductsSold
  );

  const labels: string[][] = analiticsProducts.map((date: AnaliticProducts) => {
    const time = new Date(date.timeUnit);
    const timeShort = time.toString().split(":", 1);
    return timeShort.concat(" hs");
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
              ? "Productos venidos en los ultimos 7 Dias"
              : infoBack.timeUnit === "weeks"
              ? "Productos venidos en las ultimas 4 Semanas"
              : infoBack.timeUnit === "trimesters"
              ? "Productos venidos en los ultimos 3 Meses"
              : infoBack.timeUnit === "months"
              ? "Productos venidos en los ultimos 12 Meses"
              : "Otras Fechas"
              //Estado de carrito en rejected
            : infoBack.status === "rejected"
            ? infoBack.timeUnit === "days"
              ? "Productos cancelados en los ultimos 7 Dias"
              : infoBack.timeUnit === "weeks"
              ? "Productos cancelados en las ultimas 4 Semanas"
              : infoBack.timeUnit === "trimesters"
              ? "Productos cancelados en los ultimos 3 Meses"
              : infoBack.timeUnit === "months"
              ? "Productos cancelados en los ultimos 12 Meses"
              : "Otras Fechas"
              //Estado de carrito en cart
            : infoBack.timeUnit === "days"
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
  const hanldle = (e: any)=> {
    console.log(e)
  }
  return (
    <div>
      {analiticsProducts.length > 0 && (
        <div>
          <select
            value={infoBack.timeUnit}
            name="timeUnit"
            onChange={handleChange}
          >
            <option value="days" selected>
              Ultimos 7 Dias
            </option>
            <option value="weeks">Ultimas 4 Semanas</option>
            <option value="trimesters">Ultimos 3 Meses</option>
            <option value="months">Ultimos 12 Meses</option>
            {/* <option value="years">Ultimo Año</option>  */}
          </select>
          <select value={infoBack.status} name="status" onChange={handleChange}>
            <option value="approved" selected>
              Aprobados
            </option>
            <option value="rejected">Cancelados</option>
            <option value="cart">Carrito</option>
          </select>
          <Line options={options} data={data} onClick={hanldle}/>
        </div>
      )}
    </div>
  );
};
