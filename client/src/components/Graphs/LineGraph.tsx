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
import { useRef } from "react";
import { Line, getElementsAtEvent } from "react-chartjs-2";


export const LineGraph = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options: any = {
    responsive: true,
    hoverBorderWidth:1,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Productos",
      },

    //   animations: {
    //     tension: {
    //       duration: 1000,
    //       easing: 'linear',
    //       from: 1,
    //       to: 0,
    //       loop: true
    //     }
    // }
},

    // scales: {
    //   x: {
    //     grid: {
    //       color: 'green',
    //       tickColor: 'green'
    //     }
    //   }
    // }
  };

  const labels: string[] = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const obj: any = {};
  labels.forEach((month) => {
    obj[month] = Math.floor(Math.random() * 100);
  });
  const obj2: any = {};
  labels.forEach((month) => {
    obj2[month] = Math.floor(Math.random() * 100);
    return obj2;
  });
  const data = {
    labels,
    datasets: [
      {
        label: "Productos vendidos",
        data: [100, 200, 20, 40],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.1,
      },
    ],
  };

// backgroundColor: "rgba(255, 99, 132, 0.5)"
// borderColor: "rgb(255, 99, 132)"
// borderWidth: 1
// hitRadius: 1
// hoverBorderWidth: 1
// hoverRadius: 4
// pointStyle: "circle"
// radius: 3
// rotation: 

  return <Line options={options} data={data}/>;
};
