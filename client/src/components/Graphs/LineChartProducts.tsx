import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
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

  
  const [date, setDate] = useState({
    timeUnit: "month",
  });
  const dispatch = useDispatch();
  const { ADMfetch_chart_products_values } = bindActionCreators(adminActions, dispatch);
  const { analiticsProducts } = useSelector((state: State) => state.admin);


  useEffect(() => {
    ADMfetch_chart_products_values(date.timeUnit);
  }, [date.timeUnit]);
  const arrData: any = [];
  analiticsProducts.forEach((date: AnaliticProducts) => {
    arrData.push(date.totalProductsSold);
  });
  const labels = analiticsProducts.map((obj: AnaliticProducts) => {
    return obj.timeUnit;
  });
  const options: any = {
    responsive: true,
    hoverBorderWidth: 1,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Productos vendidos al año",
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: "Productos",
        data: arrData,
        borderColor: "#376B7E",
        backgroundColor: "rgba(55, 107, 126, .4)",
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
            <option value="month" selected>Mes</option>
            <option value="year">Año</option>
          </select>
          <Line options={options} data={data} />
        </div>
      )}
    </div>
  );
};
