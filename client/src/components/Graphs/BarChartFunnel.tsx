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
import { AnaliticProducts } from "../../types/types";
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

  useEffect(() => {
    ADMfetch_chart_products_values(date.timeUnit);
  }, [date.timeUnit]);

  //Instanciacion para 
  const _data = analiticsProducts.map((productInfo: AnaliticProducts) => {
    return productInfo.totalProductsSold
  });
  const labels = analiticsProducts.map((productInfo: AnaliticProducts) => {
    return productInfo.timeUnit;
  });





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
        label: "Envudo de Clientes",
        data: _data,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4,
      },
    ],
  };
  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const values = target.value;
    setDate({
      ...date,
      timeUnit: values,
    });
  };

  return (
    <div>
      {analiticsProducts.length > 0 && (
        <div>
          <select value={date.timeUnit} onChange={handleChange}>
            <option value="day">Dia</option>
            <option value="month" selected>
              Mes
            </option>
            <option value="year">Año</option>
          </select>
          <Bar options={options} data={data} />
        </div>
      )}
    </div>
  );
}
