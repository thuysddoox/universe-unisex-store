import PageWapper from '@components/PageWrapper';
import ManageProducts from '@containers/admin/product';
import withCMSLayout from '@containers/layout/withCMSLayout';

export function CMSProductPage() {
  return (
    <PageWapper bgColor="transparent">
      <ManageProducts />
    </PageWapper>
  );
}

export default withCMSLayout(CMSProductPage);
