import HeadingSection from '@components/HeadingSection';
import Product from '@components/Product';
import styled from '@emotion/styled';
import { responsiveSettGeneral, Slider } from '@ui/slider';

const BestSeller = ()=>{
  return (
    <BestSellerWrapper className='py-8'>
      <HeadingSection title="Best Seller" link='/sale' mode='center'/>
      <Slider slidesToShow={4} arrows={true} responsive={responsiveSettGeneral} className="mx-4 sm:mx-8">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </Slider>
    </BestSellerWrapper>
  )
}
const BestSellerWrapper = styled.div`
  .ant-carousel .slick-next{
    right: -45px;
  }
  .ant-carousel .slick-prev{
    left: -45px;
  }
  @media (max-width: 576px){
    .ant-carousel .slick-next{
      right: -30px;
    }
    .ant-carousel .slick-prev{
      left: -30px;
    }
  }
`;
export default BestSeller;
