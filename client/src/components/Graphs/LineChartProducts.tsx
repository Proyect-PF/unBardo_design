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
import { Analitic } from "../../types/types";

export const LineChartProducts = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  //cart, approved, rejected
  const [date, setDate] = useState({
    timeUnit: "month",
  });
  const dispatch = useDispatch();
  const { ADMfetch_chartValues } = bindActionCreators(adminActions, dispatch);
  const { analitics } = useSelector((state: State) => state.admin);


  useEffect(() => {
    ADMfetch_chartValues(date.timeUnit);
  }, [date.timeUnit]);
  const arrData: any = [];
  analitics.forEach((date: Analitic) => {
    arrData.push(date.totalProductsSold);
  });
  const labels = analitics.map((obj: Analitic) => {
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
      {analitics.length > 0 && (
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
