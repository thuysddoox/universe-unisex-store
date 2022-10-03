import withLayout from '@containers/layout/withLayout';
import MyAccount from '@containers/user/account';
import PageWapper from '@components/PageWrapper';

export function AccountPage() {
  return (
    <PageWapper>
      <MyAccount />
    </PageWapper>
  );
}
export default withLayout(AccountPage);
