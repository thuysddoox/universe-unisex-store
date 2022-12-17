import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { IoMdTrendingUp } from 'react-icons/io';
import { Category } from '../../../interfaces/common';
import _ from 'lodash';

ChartJS.register(ArcElement, Tooltip, Legend);
const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const OverviewCategory = ({ className, data }: { className?: string; data?: Category[] }) => {
  const dataChart = useMemo(
    () => ({
      labels: data?.map((item) => item?.name),
      datasets: [
        {
          label: '# of Votes',
          data: data?.map((item) => item?.total),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    }),
    [data],
  );
  const best = _.maxBy(data, 'total');
  return (
    <>
      <div className={`p-4 sm:p-6 bg-white ${className}`}>
        <h3>Category Overview</h3>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-center">
            <h5 className="uppercase text-gray-700 flex items-center">
              <IoMdTrendingUp />
              <span className="ml-2 text-sm">BEST GROWTH</span>
            </h5>
            <h3 className="text-sm italic">{best?.name}</h3>
            <h3 className="text-sm italic">{best?.sold} products</h3>
            <h3 className="text-sm italic">${best?.total}</h3>
          </div>
          <div className="max-w-[150px]">
            <Pie data={dataChart} options={options} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewCategory;
