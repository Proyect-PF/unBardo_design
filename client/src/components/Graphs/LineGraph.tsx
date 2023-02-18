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
import { Line} from "react-chartjs-2";
import axios from "axios";


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
  const [da, setDa] = useState([])
    useEffect(()=> {
      const ADMfetch_chartValues = () => {
        axios
            .get(`http://localhost:3700/statistics/product-sales/?timeUnit=year`)
            .then((res) => {
              const payload = res.data;
              setDa(payload)
              console.log(payload)
            })
            .catch((error) => console.log(error));
      };
      ADMfetch_chartValues()
    },[])


  const options: any = {
    responsive: true,
    hoverBorderWidth:1,
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

  type Month = {
    totalProductsSold: number
    timeUnit: string
  }
   const arr:any = [];
  da.forEach((month:Month) => {
    arr.push(month.totalProductsSold)
  });

  const labels = da.map((obj:Month)=> {
    return obj.timeUnit
  })
  const data = {
    labels,
    datasets: [
      {
        label: "Productos",
        data: arr,
        borderColor: "rgb(0, 0, 100)",
        backgroundColor: "rgba(0, 0, 100, 0.2)",
        tension: 0.4,
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
