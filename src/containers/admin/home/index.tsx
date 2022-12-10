import CardStatistic from '@components/Statistic/Card';
import Chart from '@components/Statistic/Chart';
import OverviewCategory from '@components/Statistic/OverviewCategory';
import OverviewMonth from '@components/Statistic/OverviewMonth';
import TableCategory from '@components/Table/TableCategory';
import { AiFillStar } from 'react-icons/ai';
import { FaClipboardList, FaMoneyBillAlt, FaUsers } from 'react-icons/fa';

const AdminHomePage = () => {
  return (
    <>
      <div className="flex items-center justify-between my-4">
        <CardStatistic className="w-1/4 mr-2" name="ALL USERS" value="914,001" icon={<FaUsers fontSize={'2.5rem'} />} />
        <CardStatistic
          className="w-1/4 mx-2"
          name="ALL ORDERS"
          value="914,001"
          icon={<FaClipboardList fontSize={'2.5rem'} />}
        />
        <CardStatistic
          className="w-1/4 mx-2"
          name="ALL PROCEEDS"
          value="914,001"
          icon={<FaMoneyBillAlt fontSize={'2.5rem'} />}
        />
        <CardStatistic className="w-1/4 ml-2" name="ALL RATE" value="4.5/5" icon={<AiFillStar fontSize={'2.5rem'} />} />
      </div>
      <div className="flex">
        <div className="mr-2 w-2/3 my-4 bg-white shadow">
          <Chart className="p-4 ml-0 bg-white " />
        </div>
        <div className="flex-grow pl-2">
          <OverviewMonth className="my-4 shadow" />
          <OverviewCategory className="my-4 shadow" />
        </div>
      </div>
      <TableCategory data={[]} />
    </>
  );
};

export default AdminHomePage;
