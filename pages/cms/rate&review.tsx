import PageWapper from '@components/PageWrapper';
import ManageComment from '@containers/admin/comment';
import withCMSLayout from '@containers/layout/withCMSLayout';

export function CMSOrderPage() {
  return (
    <PageWapper bgColor="transparent">
      <ManageComment />
    </PageWapper>
  );
}

export default withCMSLayout(CMSOrderPage);
