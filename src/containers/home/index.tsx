// import Banner from "@components/Banner";
import dynamic from 'next/dynamic';
import { HomePageProps } from 'pages';
import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import { useQueryCart } from '../../network/queries/cart';
import BestSeller from './BestSeller';
import HotSale from './HotSale';
import NewCollection from './NewCollection';
import Testimonials from './Testimonials';
const Banner = dynamic(() => import('@components/Banner'), { ssr: false });

export const HomePage = ({ banners }: HomePageProps) => {
  const { currentUser } = useContext(UserContext);
  const { refetch: refetchCart } = useQueryCart(currentUser);
  return (
    <>
      <Banner bannersList={banners} />
      <div className="container min-h-screen">
        <HotSale refetchCart={refetchCart} />
        <BestSeller refetchCart={refetchCart} />
        <NewCollection refetchCart={refetchCart} />
        <Testimonials />
      </div>
    </>
  );
};
export default HomePage;
