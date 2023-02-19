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
import { AnaliticFunnel, AnaliticProducts } from "../../types/types";
import { adminActions } from "../../AdminPanel/AdminRedux";
import { State } from "../../state/reducers";

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
    timeUnit: "month",
  });
  const dispatch = useDispatch();
  const { ADMfetch_chart_products_values } = bindActionCreators(
    adminActions,
    dispatch
  );
  const { analiticsProducts } = useSelector((state: State) => state.admin);

  // useEffect(() => {
  //   ADMfetch_chart_products_values(date.timeUnit);
  // }, [date.timeUnit]);
    
  const arrData:AnaliticFunnel[] = [
    {
      timeUnit: "Primera Semana",
      numberRegister: 100, //Porcentaje
      numberCarts: Math.round((220 * 100) / 350),
      numberDirections: Math.round((110 * 100) / 350),
      numberSales: Math.round((60 * 100) / 350),
    },
    {
      timeUnit: "Segunda Semana",
      numberRegister: 100, //Porcentaje
      numberCarts: Math.round((350 * 100) / 500),
      numberDirections: Math.round((50 * 100) / 500),
      numberSales: Math.round((25 * 100) / 500),
    },

  ];

  //Instanciacion para 
  const _data = arrData.map((productInfo: AnaliticFunnel) => productInfo.numberRegister);
  const _data2 = arrData.map((productInfo: AnaliticFunnel) => productInfo.numberCarts);
  const _data3 = arrData.map((productInfo: AnaliticFunnel) => productInfo.numberDirections);
  const _data4 = arrData.map((productInfo: AnaliticFunnel) => productInfo.numberSales);
  const labels = arrData.map((productInfo: AnaliticFunnel) => productInfo.timeUnit);

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //Configuracion Chart JS
  const options: any = {
    
    indexAxis: 'y' as const,
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
        label: "Usuarios Registrados",
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
  // const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
  //   const values = target.value;
  //   setDate({
  //     ...date,
  //     timeUnit: values,
  //   });
  // };

  return (
    <div>
      {analiticsProducts.length > 0 && (
        <div>
          {/* <select value={date.timeUnit} onChange={handleChange}>
            <option value="day">Dia</option>
            <option value="month" selected>
              Mes
            </option>
            <option value="year">Año</option>
          </select> */}
          <Bar options={options} data={data} />
        </div>
      )}
    </div>
  );
}
