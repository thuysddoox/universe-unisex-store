import HeadingSection from '@components/HeadingSection';
import ProductComponent from '@components/Product';
import styled from '@emotion/styled';
import { Product } from '@interfaces/common';
import { responsiveSettGeneral, Slider } from '@ui/slider';

const BestSeller = ({ data = [] }: { data?: Product[] }) => {
  console.log(data);
  return (
    <BestSellerWrapper className="py-8">
      <HeadingSection title="Best Seller" link="/sale" mode="center" />
      <Slider slidesToShow={4} arrows={true} responsive={responsiveSettGeneral} className="mx-4 sm:mx-8">
        {data.length > 0 && data.map((product) => <ProductComponent product={product} key={product?._id} />)}
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
