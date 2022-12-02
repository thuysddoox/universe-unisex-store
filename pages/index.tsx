import Head from 'next/head';
import withLayout from '@containers/layout/withLayout';
import styled from '@emotion/styled';
import HomePage from '@containers/home';
import { SafeAny, Product } from '@interfaces';
import smoothscroll from 'smoothscroll-polyfill';
import { getNewProduct, getSaleProduct, getBestProduct } from '../src/network/services/product';
import { data } from '../src/components/Statistic/Chart/index';

export interface HomePageProps {
  saleProduct?: Product[];
  bestProduct?: Product[];
  newProduct?: SafeAny[];
}
if (typeof window !== 'undefined') {
  smoothscroll.polyfill();
}
export function Index({ saleProduct, bestProduct, newProduct }: HomePageProps) {
  return (
    <HomeWrapper>
      <Head>
        <meta content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no;user-scalable=0; maximum-scale=1" />
        <title>Unisex Universe Store</title>
      </Head>
      <HomePage saleProduct={saleProduct} bestProduct={bestProduct} newProduct={newProduct} />
    </HomeWrapper>
  );
}

Index.getInitialProps = async () => {
  const [newsProductResp, saleProductsResp, bestProductsResp] = await Promise.all([
    getNewProduct(),
    getSaleProduct({ pageSize: 5 }),
    getBestProduct(),
  ]);
  return {
    newProduct: newsProductResp?.data?.responseData ?? [],
    saleProduct: saleProductsResp?.data?.responseData ?? [],
    bestProduct: bestProductsResp?.data?.responseData ?? [],
  };
};

const HomeWrapper = styled.div``;

export default withLayout(Index);
