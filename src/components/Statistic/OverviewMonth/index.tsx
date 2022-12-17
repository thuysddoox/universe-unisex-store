import React, { useMemo } from 'react';
import { IoMdTrendingUp } from 'react-icons/io';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { SafeAny, StatisticMonth } from '../../../interfaces/common';
import _ from 'lodash';

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

const OverviewMonth = ({ className, data }: { className?: string; data?: StatisticMonth[] }) => {
  const dataChart = useMemo(
    () => ({
      labels: data?.map((item) => item?._id?.month + '-' + item?._id?.year),
      datasets: [
        {
          label: 'Amount',
          data: data?.map((item) => item?.count),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          maxBarThickness: 30,
        },
      ],
    }),
    [data],
  );
  const best = _.maxBy(data, 'count');
  return (
    <>
      <div className={`p-4 sm:p-5 bg-white ${className}`}>
        <h3>Monthly Order</h3>
        <div className="mt-2 flex items-center justify-between ">
          <div className="w-2/5 text-center">
            <h5 className="text-gray-700 flex justify-center items-center mr-5">
              <IoMdTrendingUp />
              <span className="ml-2 text-sm">BEST GROWTH</span>
            </h5>
            <h3 className="text-sm italic ">{best?._id?.month + '-' + best?._id?.year}</h3>
            <h3 className="text-sm italic ">{best?.count} orders</h3>
            <h3 className="text-sm italic ">${best?.total}</h3>
          </div>
          <div className="max-w-[400px] w-3/5">
            <Bar options={options} data={dataChart} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewMonth;
