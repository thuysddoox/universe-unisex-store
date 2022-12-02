import withPrivateLayout from '@containers/layout/withPrivateLayout';
import PageWapper from '@components/PageWrapper';
import MyFavourite from '@containers/user/favourite';
import ManagePurchases from '@containers/user/ManagePurchases';

export function AccountPage() {
  return (
    <PageWapper bgColor="var(--primary-lighter)">
      <ManagePurchases />
    </PageWapper>
  );
}
export default withPrivateLayout(AccountPage);
