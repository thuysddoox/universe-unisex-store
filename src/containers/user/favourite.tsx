import NoResults from '@components/NoResults';
import ProductComponent from '@components/Product';
import styled from '@emotion/styled';
import { Product } from '@interfaces';
import { Col, Row } from 'antd';
import { AiOutlineHeart } from 'react-icons/ai';
import UserLayout from './userLayout';
import { useGetFavoriteList } from '../../network/queries/favorite';

const MyFavourite = () => {
  const { data: wishlistResp, refetch } = useGetFavoriteList();
  const favoriteProducts = wishlistResp?.data?.responseData;
  return (
    <UserLayout title={'My Favorite'}>
      {wishlistResp?.data?.responseData?.length > 0 ? (
        <Row className="justify-start pb-8">
          {wishlistResp?.data?.responseData?.map((product) => (
            <Col span={24} sm={12} md={8} lg={6} key={product?._id}>
              <ProductComponent product={product} refetch={refetch} />
            </Col>
          ))}
        </Row>
      ) : (
        <>
          <NoResultWishlist className="text-center mt-5 pt-5">
            <NoResults description="You haven't added any product to your Favourites." />
            <p>
              Collect all your favorite products by clicking on the <AiOutlineHeart fontSize="25px" />
              while you browse.
            </p>
          </NoResultWishlist>
        </>
      )}
    </UserLayout>
  );
};

export default MyFavourite;
const NoResultWishlist = styled.div`
  svg {
    display: inline-block;
    color: var(--navy);
  }
`;
