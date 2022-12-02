import withPrivateLayout from '@containers/layout/withPrivateLayout';
import PageWapper from '@components/PageWrapper';
import MyAccount from '@containers/user/account';

export function AccountPage() {
  return (
    <PageWapper bgColor="var(--primary-lighter)">
      <MyAccount />
    </PageWapper>
  );
}
export default withPrivateLayout(AccountPage);
