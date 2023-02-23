import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { adminActions } from "../../AdminPanel/AdminRedux";
import { State } from "../../state/reducers";
import { AnaliticFunnel } from "../../types/types";

export function BarChartFunnel() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  //cart, approved, rejected
  const [date, setDate] = useState({
    timeUnit: "days",
    num: "1",
  });
  const dispatch = useDispatch();
  const { ADMfetch_chart_funnel } = bindActionCreators(adminActions, dispatch);
  const { analiticsFunnel } = useSelector((state: State) => state.admin);
  useEffect(() => {
    ADMfetch_chart_funnel(date.timeUnit, date.num);
  }, [date.timeUnit, date.num]);

  // //Instanciacion para
  const _data = analiticsFunnel?.map(() => 100);

  const _data2 = analiticsFunnel?.map((productInfo: AnaliticFunnel) => {
    return (productInfo.numbercarts * 100) / productInfo.numberregisters;
  });
  //numberregisters
  const _data3 = analiticsFunnel?.map((productInfo: AnaliticFunnel) => {
    return (productInfo.numberpendingsales * 100) / productInfo.numberregisters;
  });
  const _data4 = analiticsFunnel?.map((productInfo: AnaliticFunnel) => {
    return (productInfo.numbersales * 100) / productInfo.numberregisters;
  });

  const labels = analiticsFunnel?.map((productInfo: AnaliticFunnel) => {
    return productInfo.timeunit.split("T", 1);
  });

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //Configuracion Chart JS
  const options: any = {
    indexAxis: "y" as const,
    elements: {
      bar: {
        borderWidth: 2.3,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Compras Efectivas",
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: "Usuarios Registrados %",
        data: _data,
        borderColor: "rgb(10, 0, 80)",
        backgroundColor: "rgba(10, 0, 80, 0.5) ",
      },
      {
        label: "Carritos llenados %",
        data: _data2,
        borderColor: "rgb(0, 99, 132)",
        backgroundColor: "rgba(0, 99, 132, 0.4)",
      },
      {
        label: "Registro de Datos %",
        data: _data3,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Compras Realizadas %",
        data: _data4,
        borderColor: "rgb(255, 99, 0)",
        backgroundColor: "rgba(255, 99, 0, 0.5)",
      },
    ],
  };
  const handleChange = ({
    target,
  }:
    | React.ChangeEvent<HTMLSelectElement>
    | React.ChangeEvent<HTMLInputElement>) => {
    const values = target.value;
    const names = target.name;
    if ((names === "num" && Number(values) > 0) || names === "timeUnit")
      setDate({
        ...date,
        [names]: values,
      });
  };

  return (
    <div>
      {analiticsFunnel.length > 0 && (
        <div className="flex flex-col gap-6 p-8">
          <p className="text-2xl font-medium ">Trafico de usuarios:</p>
          <div className="flex justify-center gap-8 pt-5 pb-5">
            <select
              value={date.timeUnit}
              name="timeUnit"
              onChange={handleChange}
              className="p-2 pr-4 text-base text-center border-b border-black h-fit"
            >
              <option value="days">Diarios</option>
              <option value="months">Mensuales</option>
              <option value="trimesters">Trimestrales</option>
              <option value="years">Anuales</option>
            </select>
            <input
              type="number"
              name="num"
              placeholder="Ciclos en cuenta..."
              onChange={handleChange}
              min={1}
              className="p-2 pr-4 text-base text-center border-b border-black h-fit"
            />
          </div>
          <p className="text-sm font-medium text-slate-500">
            De {labels[0]} al {labels[labels.length - 1]}
          </p>
          <div className="">
            <Bar options={options} data={data} />
          </div>
        </div>
      )}
    </div>
  );
}
