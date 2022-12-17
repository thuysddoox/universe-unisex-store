import { User } from '@interfaces/common';
import { Col, Image, Row } from 'antd';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';
import { AiOutlineEnvironment, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { FaBirthdayCake } from 'react-icons/fa';
import { FcBusinessman, FcBusinesswoman } from 'react-icons/fc';
import { useStatisticUser } from '../../network/queries/statistic';
import NoResults from '../NoResults/index';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export let options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'History Purchases',
    },
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
    tooltip: {
      callbacks: {
        // footer: ()=>{
        // }
      },
    },
  },
};

const UserCard = ({ user }: { user: User }) => {
  const router = useRouter();
  const imgUrl = router.basePath + '/assets/images/icons';
  const { data: statisticResp, isFetching, refetch } = useStatisticUser(user?._id);
  console.log(statisticResp);
  const dataChart = useMemo(
    () => ({
      labels: statisticResp?.data?.responseData?.map((item) => item?._id?.month + '-' + item?._id?.year),
      datasets: [
        {
          label: 'Amount',
          data: statisticResp?.data?.responseData?.map((item) => item?.count),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          maxBarThickness: 30,
        },
      ],
    }),
    [statisticResp],
  );
  const footer = useCallback(
    (tooltipItems) => {
      let sum = 0;
      tooltipItems.forEach(function (tooltipItem, index) {
        sum = statisticResp?.data?.responseData?.[index]?.total;
      });
      return 'Total: $' + sum;
    },
    [user?._id],
  );
  useEffect(() => {
    refetch();
    options = {
      ...options,
      plugins: {
        ...options.plugins,
        tooltip: {
          ...options.plugins.tooltip,
          callbacks: {
            ...options.plugins.tooltip.callbacks,
            footer: footer,
          },
        },
      },
    };
  }, [user]);
  return (
    <>
      <Row>
        <Col span={24} md={10}>
          <div className="bg-white rounded-sm py-4">
            <div className="rounded-lg text-center mb-4 px-4">
              {user?.avatar ? (
                <Image
                  preview={false}
                  width={'100%'}
                  className="max-h-[150px] object-contain mx-auto"
                  src={user?.avatar}
                />
              ) : (
                <Image
                  preview={false}
                  width={'100%'}
                  className="max-h-[120px] object-contain mx-auto"
                  src={user?.gender === 'female' ? imgUrl + '/woman.png' : imgUrl + '/man.png'}
                />
              )}
              <h4 className="text-lg sm:text-xl font-semibold mt-4 uppercase">
                {user?.username ?? user?.displayName ?? user?.lastName + user?.firstName}
              </h4>
            </div>
            <div className="border-t border-gray-300">
              <p className="flex items-center text-sm my-2 px-4 pt-4">
                {user?.gender === 'female' ? (
                  <FcBusinesswoman className="text-lg" />
                ) : (
                  <FcBusinessman className="text-lg" />
                )}
                <span className="ml-2">{user?.fullName ?? 'Full Name'}</span>
              </p>
              <p className="flex items-center text-sm my-2 px-4">
                <FaBirthdayCake className="text-lg" />
                <span className="ml-2">{user?.dob ?? 'Dob'}</span>
              </p>
              <p className="flex items-center text-sm my-2 px-4">
                <AiOutlinePhone className="text-lg" />
                <span className="ml-2">{user?.phone ?? 'phone number'}</span>
              </p>
              <p className="flex items-center text-sm my-2 px-4">
                <AiOutlineMail className="text-lg" />
                <span className="ml-2">{user?.email ?? 'email'}</span>
              </p>
              <p className="flex items-center text-sm my-2 px-4">
                <AiOutlineEnvironment className="text-lg" />
                <span className="ml-2">{user?.address}</span>
              </p>
            </div>
          </div>
        </Col>
        <Col span={24} md={14}>
          <p className="text-lg sm:text-xl font-semibold mt-4 pl-6 uppercase">Overview</p>
          {statisticResp?.data?.total > 0 ? (
            <>
              <div className="pl-6">
                <p className="font-medium">Order: {statisticResp?.data?.count}</p>
                <p className="font-medium">Total: ${statisticResp?.data?.total}</p>
              </div>
              <div className="mt-6 px-5">
                <Bar options={options} data={dataChart} />
              </div>
            </>
          ) : (
            <NoResults description="Not yet order." />
          )}
        </Col>
      </Row>
    </>
  );
};

export default UserCard;
