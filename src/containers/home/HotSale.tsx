import HeadingSection from '@components/HeadingSection';
import Product from '@components/Product';
import styled from '@emotion/styled';
import { NextArrow, PrevArrow, responsiveSettGeneral, Slider } from '@ui/slider';
import React from 'react';

const HotSale = ()=>{
  return (
    <HotSaleWrapper className='py-8'>
      <HeadingSection title="Hot Sale" link='/sale' mode='center'/>
      <Slider slidesToShow={4} arrows={true} responsive={responsiveSettGeneral} className="mx-4 sm:mx-8">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </Slider>
    </HotSaleWrapper>
  )
}
const HotSaleWrapper = styled.div`
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
export default HotSale;
