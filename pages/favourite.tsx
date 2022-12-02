import withPrivateLayout from '@containers/layout/withPrivateLayout';
import PageWapper from '@components/PageWrapper';
import MyFavourite from '@containers/user/favourite';

export function AccountPage() {
  return (
    <PageWapper bgColor="var(--primary-lighter)">
      <MyFavourite />
    </PageWapper>
  );
}
export default withPrivateLayout(AccountPage);
