import React from 'react';
import { IoMdTrendingUp } from 'react-icons/io';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    scales: {
      y: {
        ticks: {
          // min: 0,
          beginAtZero: true,
          stepSize: 50,
        },
      },
    },
  },
};

const labels = ['January', 'February', 'March', 'April'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [234, 23, 234, 234],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      maxBarThickness: 30,
    },
  ],
};
const OverviewMonth = ({ className }: { className?: string }) => {
  return (
    <>
      <div className={`p-4 sm:p-5 bg-white ${className}`}>
        <h3>Monthly Revenue</h3>
        <div className="mt-2 flex items-center justify-between">
          <div className="w-2/5">
            <h5 className="text-gray-700 flex items-center">
              <IoMdTrendingUp />
              <span className="ml-2 text-sm">GROWTH</span>
            </h5>
            <h3 className="text-xl">$5,676</h3>
          </div>
          <div className="max-w-[400px] w-3/5">
            <Bar options={options} data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewMonth;
