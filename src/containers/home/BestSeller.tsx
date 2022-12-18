import HeadingSection from '@components/HeadingSection';
import ProductComponent from '@components/Product';
import styled from '@emotion/styled';
import { Slider, renderResponseSiveSetting, responsiveSettGeneral } from '@ui/slider';
import { useMemo } from 'react';
import { useBestProducts } from '../../network/queries/product';
import { SafeAny } from '../../interfaces/common';

const BestSeller = ({ refetchCart }: { refetchCart?: SafeAny }) => {
  const { data: dataResp, refetch } = useBestProducts();
  const data = useMemo(() => dataResp?.data?.responseData, [dataResp]);
  return (
    <BestSellerWrapper className="py-8">
      <HeadingSection title="Best Seller" link="/sale" mode="center" />
      <Slider
        slidesToShow={4}
        infinite={data?.length > 4}
        arrows={true}
        responsive={renderResponseSiveSetting(data?.length)}
        className="mx-4 sm:mx-8"
      >
        {data?.length > 0 &&
          data?.map((product) => (
            <ProductComponent
              refetchCart={refetchCart}
              refetch={refetch}
              product={product}
              key={product?._id + 'best'}
            />
          ))}
      </Slider>
    </BestSellerWrapper>
  );
};
const BestSellerWrapper = styled.div`
  .ant-carousel .slick-next {
    right: -45px;
  }
  .ant-carousel .slick-prev {
    left: -45px;
  }
  @media (max-width: 576px) {
    .ant-carousel .slick-next {
      right: -30px;
    }
    .ant-carousel .slick-prev {
      left: -30px;
    }
  }
`;
export default BestSeller;
