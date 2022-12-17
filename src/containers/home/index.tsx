// import Banner from "@components/Banner";
import Advertisement from '@components/Advertisement';
import { CategoryItem } from '@components/CategoryItem';
import Filter from '@components/Filter';
import SortBy from '@components/Filter/SortBy';
import Checkout from '@components/Form/Checkout';
import JobsModule from '@components/Job/JobsModule';
import { LoadingDots } from '@components/LoadingDots';
import OrderItem from '@components/OrderItem';
import Product from '@components/Product';
import ProductDetail from '@components/ProductDetail';
import RateResult from '@components/Review/RateResult';
import ReviewComponent from '@components/Review/ReviewComponent';
import SliderDetail from '@components/SliderDetail';
import dynamic from 'next/dynamic';
import { HomePageProps } from 'pages';
import React from 'react';
import BestSeller from './BestSeller';
import HotSale from './HotSale';
import NewCollection from './NewCollection';
import Subcribes from './Subcribes';
const Banner = dynamic(() => import('@components/Banner'), { ssr: false });

export const HomePage = ({ banners, newProduct, saleProduct, bestProduct }: HomePageProps) => {
  return (
    <>
      <Banner bannersList={banners} isVideo={true} />
      <div className="container min-h-screen">
        <HotSale data={saleProduct} />
        <Advertisement bannersList={[]} />
        <BestSeller data={bestProduct} />
        <NewCollection data={newProduct} />
        <Subcribes />
        <JobsModule />
      </div>
    </>
  );
};
export default HomePage;
