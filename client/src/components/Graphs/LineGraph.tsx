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
  
  import { Line } from "react-chartjs-2";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options:any = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Productos",
      },
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
  
  const labels:string[] = [
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
  
  const obj:any = {};
  labels.forEach((month) => {
    obj[month] = Math.floor(Math.random() * 100);
  
    return obj;
  });
  const obj2:any = {};
  labels.forEach((month) => {
    obj2[month] = Math.floor(Math.random() * 100);
    return obj2;
  });
  
  
  export const data = {
    labels,
    datasets: [
      {
        label: "Productos vendidos",
        data: obj2,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: .1,
  
      },
      {
        label: "Precio de productos",
        data: obj,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: .1,
      },
    ],
  };
  
  export const LineGraph =() => {
    return <Line options={options} data={data} />;
  }
  