import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Analitic } from '../../types/types';
import { adminActions } from '../../AdminPanel/AdminRedux';
import { State } from '../../state/reducers';



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
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
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



  return     <div>
      {analitics.length > 0 && (
        <div>
          <select value={date.timeUnit} onChange={handleChange}>
            <option value="day">Dia</option>
            <option value="month" selected>Mes</option>
            <option value="year">Año</option>
          </select>
          <Bar options={options} data={data} />
        </div>
      )}
    </div>
}
