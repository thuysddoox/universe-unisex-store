import PageWapper from '@components/PageWrapper';
import ManageOrders from '@containers/admin/order';
import withCMSLayout from '@containers/layout/withCMSLayout';

export function CMSOrderPage() {
  return (
    <PageWapper>
      <ManageOrders />
    </PageWapper>
  );
}

export default withCMSLayout(CMSOrderPage);
