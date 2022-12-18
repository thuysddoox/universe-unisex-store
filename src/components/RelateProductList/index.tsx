import ProductComponent from '@components/Product';
import styled from '@emotion/styled';
import { renderResponseSiveSetting, responsiveSettGeneral, Slider } from '@ui/slider';
import { Product, SafeAny } from '../../interfaces/common';
import NoResults from '@components/NoResults';

const RelateProductList = ({
  data,
  refetch,
  refetchCart,
}: {
  data?: Product[];
  refetch?: SafeAny;
  refetchCart?: SafeAny;
}) => {
  return (
    <RelateProductListWrapper className="my-14">
      <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold">More Products</h3>
      {data?.length > 0 ? (
        <Slider
          slidesToShow={4}
          infinite={data?.length > 4}
          arrows={true}
          responsive={renderResponseSiveSetting(data?.length)}
          autoplay={false}
          dots={true}
          className="mx-4 sm:mx-8"
        >
          {data?.map((item, index) => (
            <ProductComponent key={item?._id + index} product={item} refetch={refetch} refetchCart={refetchCart} />
          ))}
        </Slider>
      ) : (
        <NoResults description="No Relate Product" />
      )}
    </RelateProductListWrapper>
  );
};
const RelateProductListWrapper = styled.div`
  .slick-dots-bottom {
    bottom: -35px !important;
    align-items: center;
    li {
      width: 10px;
      height: 10px;
      margin: 0 4px;
      border-radius: 50% !important;
      background: var(--light-gray-2);
      button {
        width: 10px;
        height: 10px;
      }
      &.slick-active {
        background: var(--navy) !important;
        width: 13px;
        height: 13px;
        button {
          width: 13px;
          height: 13px;
          border-radius: 50% !important;
          background: var(--navy) !important;
        }
      }
    }
  }
`;
export default RelateProductList;
