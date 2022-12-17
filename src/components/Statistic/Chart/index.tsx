import React, { useMemo } from 'react';
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
import { StatisticMonth } from '../../../interfaces/common';

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

const Chart = ({ className, data }: { className?: string; data: StatisticMonth[] }) => {
  const dataChart = useMemo(
    () => ({
      labels: data?.map((item) => item?._id?.month + '-' + item?._id?.year),
      datasets: [
        {
          fill: true,
          label: 'Profit',
          data: data?.map((item) => item?.total),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    }),
    [data],
  );
  return (
    <div className={` ${className}`}>
      <Line options={options} data={dataChart} />
    </div>
  );
};
export default Chart;
