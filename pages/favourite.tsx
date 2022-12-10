import withPrivateLayout from '@containers/layout/withPrivateLayout';
import PageWapper from '@components/PageWrapper';
import MyFavourite from '@containers/user/favourite';
import { getFavoriteProducts } from '@api/services';
import { Product } from '@interfaces';

export function AccountPage({ favoriteList }: { favoriteList: Product[] }) {
  return (
    <PageWapper bgColor="var(--primary-lighter)">
      <MyFavourite data={favoriteList} />
    </PageWapper>
  );
}
AccountPage.getInitialProps = async () => {
  const favoriteListResp = await getFavoriteProducts();
  return {
    favoriteList: favoriteListResp?.data?.responseData ?? [],
  };
};
export default withPrivateLayout(AccountPage);
