import { getStatistic } from '@api/services';
import PageWapper from '@components/PageWrapper';
import AdminHomePage from '@containers/admin/home';
import withCMSLayout from '@containers/layout/withCMSLayout';
import { StatisticData } from '../../src/interfaces/common';

export function CMSPage() {
  return (
    <PageWapper bgColor="transparent">
      <AdminHomePage />
    </PageWapper>
  );
}

export default withCMSLayout(CMSPage);
