import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Proceeds',
      font: {
        size: 20,
      },
    },
    scales: {
      y: {
        ticks: {
          // min: 0,
          beginAtZero: true,
          stepSize: 100,
        },
      },
    },
  },
};

const labels = ['January', 'February', 'March', 'April'];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Dataset 1',
      data: [234, 23, 234, 234],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};
const Chart = ({ className }: { className?: string }) => {
  return (
    <div className={` ${className}`}>
      <Line options={options} data={data} />
    </div>
  );
};
export default Chart;
