import CardStatistic from '@components/Statistic/Card';
import Chart from '@components/Statistic/Chart';
import OverviewCategory from '@components/Statistic/OverviewCategory';
import OverviewMonth from '@components/Statistic/OverviewMonth';
import TableCategory from '@components/Table/TableCategory';
import messages from '@constants/messages';
import { Message } from '@ui/message';
import { AiFillStar } from 'react-icons/ai';
import { FaClipboardList, FaMoneyBillAlt, FaUsers } from 'react-icons/fa';
import { Category, StatisticData } from '../../../interfaces/common';
import { useCategory, useUpdateCategory } from '../../../network/queries/product';
import { useStatisticOverview, useStatisticMonth } from '../../../network/queries/statistic';
import { useCallback } from 'react';

const AdminHomePage = () => {
  const { data: categoryResp, isFetching, refetch } = useCategory();
  const { data: statisticOverviewResp } = useStatisticOverview();
  const { data: statisticByMonthResp } = useStatisticMonth();
  const statisticOverview = statisticOverviewResp?.data?.responseData;
  const { mutate: updateCategoryFunc, isLoading } = useUpdateCategory({
    onSuccess: (response) => {
      const cateResp = response?.data?.responseData;
      const error = response?.data?.error;
      if (cateResp) {
        Message.success(messages.uploadImageSuccess);
      } else if (error) {
        Message.error(error?.message);
      }
    },
    onError: (error) => {
      Message.error(error?.response?.data?.message ?? error.message);
    },
  });
  const handleSave = useCallback((id: string, thumbnail: string) => {
    updateCategoryFunc({ categoryId: id, thumbnail });
  }, []);
  return (
    <>
      <div className="flex items-center justify-between my-4">
        <CardStatistic
          className="w-1/4 mr-2"
          name="ALL USERS"
          value={statisticOverview?.users + ''}
          icon={<FaUsers fontSize={'2.5rem'} />}
        />
        <CardStatistic
          className="w-1/4 mx-2"
          name="ALL ORDERS"
          value={statisticOverview?.orders + ''}
          icon={<FaClipboardList fontSize={'2.5rem'} />}
        />
        <CardStatistic
          className="w-1/4 mx-2"
          name="ALL PROCEEDS"
          value={`$${statisticOverview?.profit ?? 0
          }`}
          icon={<FaMoneyBillAlt fontSize={'2.5rem'} />}
        />
        <CardStatistic
          className="w-1/4 ml-2"
          name="ALL RATE"
          value={statisticOverview?.rate + ''}
          icon={<AiFillStar fontSize={'2.5rem'} />}
        />
      </div>
      <div className="flex">
        <div className="mr-2 w-2/3 my-4 bg-white shadow">
          <Chart data={statisticByMonthResp?.data?.responseData} className="p-4 ml-0 bg-white " />
        </div>
        <div className="flex-grow pl-2">
          <OverviewMonth data={statisticByMonthResp?.data?.responseData} className="my-4 shadow" />
          <OverviewCategory data={categoryResp?.data?.responseData} className="my-4 shadow" />
        </div>
      </div>
      <TableCategory
        data={categoryResp?.data?.responseData}
        loading={isFetching || isLoading}
        handleSave={handleSave}
      />
    </>
  );
};

export default AdminHomePage;
