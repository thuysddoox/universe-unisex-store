import PageWapper from '@components/PageWrapper';
import ManageUsers from '@containers/admin/user';
import withCMSLayout from '@containers/layout/withCMSLayout';

export function CMSUserPage() {
  return (
    <PageWapper bgColor="transparent">
      <ManageUsers />
    </PageWapper>
  );
}

export default withCMSLayout(CMSUserPage);
