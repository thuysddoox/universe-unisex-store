import Head from 'next/head';
import withLayout from '@containers/layout/withLayout';
import styled from '@emotion/styled';
import HomePage from '@containers/home';
import { SafeAny, Product } from '@interfaces';
import smoothscroll from 'smoothscroll-polyfill';
import { getNewProduct, getSaleProduct, getBestProduct } from '../src/network/services/product';
import { getBanners } from '../src/network/services/banner';
import { Banner } from '../src/interfaces/common';

export interface HomePageProps {
  banners?: Banner[];
}
if (typeof window !== 'undefined') {
  smoothscroll.polyfill();
}
export function Index({ banners }: HomePageProps) {
  return (
    <HomeWrapper>
      <Head>
        <meta content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no;user-scalable=0; maximum-scale=1" />
        <title>Unisex Universe Store</title>
      </Head>
      <HomePage banners={banners} />
    </HomeWrapper>
  );
}

Index.getInitialProps = async () => {
  const bannersResp = await getBanners();
  return {
    banners: bannersResp?.data?.responseData ?? [],
  };
};

const HomeWrapper = styled.div``;

export default withLayout(Index);
