import PageWapper from '@components/PageWrapper';
import AdminHomePage from '@containers/admin/home';
import withCMSLayout from '@containers/layout/withCMSLayout';

export function CMSPage() {
  return (
    <PageWapper>
      <AdminHomePage />
    </PageWapper>
  );
}

export default withCMSLayout(CMSPage);
