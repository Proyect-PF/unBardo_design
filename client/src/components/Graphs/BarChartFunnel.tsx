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
      timeUnit: "Enero",
      numberRegister: 350,
      numberCarts: (220 * 100) / 350,
      numberDirections: (110 * 100) / 350,
      numberSales: (60 * 100) / 350,
    },
    {
      timeUnit: "Febrero",
      numberRegister: 400,
      numberCarts: (350 * 100) / 400,
      numberDirections: (50 * 100) / 400,
      numberSales: (25 * 100) / 400,
    },
    {
      timeUnit: "Marzo",
      numberRegister: 200,
      numberCarts: (150 * 100) / 200,
      numberDirections: (40 * 100) / 200,
      numberSales: (20 * 100) / 200,
    },
    // {
    //   timeUnit: "Jueves",
    //   numberSales: 100,
    //   numberCarts: (20 * 100) / 100,
    //   numberRegister: (200 * 100) / 100,
    //   numberDirections: (300 * 100) / 100,
    // },
    // {
    //   timeUnit: "Viernes",
    //   numberRegister: (1000 * 100) / 350,
    //   numberCarts: (100 * 100) / 350,
    //   numberDirections: (220 * 100) / 350,
    //   numberSales: 4,
    // },
    // {
    //   timeUnit: "Sabado",
    //   numberRegister: (900 * 100) / 400,
    //   numberCarts: (1000 * 100) / 400,
    //   numberDirections: (10 * 100) / 400,
    //   numberSales: 2  ,
    // },
    // {
    //   timeUnit: "Domingo",
    //   numberSales: 200,
    //   numberCarts: (200 * 100) / 200,
    //   numberRegister: (500 * 100) / 200,
    //   numberDirections: (40 * 100) / 200,
    // },
    // {
    //   timeUnit: "cuarta Semana",
    //   numberSales: 100,
    //   numberCarts: (20 * 100) / 100,
    //   numberRegister: (200 * 100) / 100,
    //   numberDirections: (300 * 100) / 100,
    // },
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
    responsive: true,
    hoverBorderWidth: 1,
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
        label: "Compras Realizadas",
        data: _data4,
        borderColor: "rgb(255, 99, 132)",
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
