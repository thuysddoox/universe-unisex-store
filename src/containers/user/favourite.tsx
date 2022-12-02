import NextImage from '@components/NextImage';
import styled from '@emotion/styled';
import { Row } from 'antd';
import { AiOutlineHeart } from 'react-icons/ai';
import UserLayout from './userLayout';

const MyFavourite = () => {
  return (
    <UserLayout title={'Profile'}>
      <Row className="justify-between"></Row>
      <NoResultWishlist className="text-center mt-5 pt-5">
        <NextImage src="/assets/images/logo/logo_no_result.svg" alt="BloodStock" width="120px" height="100px" />
        <p style={{ fontSize: '20px', fontWeight: 'bold' }}>You haven't added any horse to your Favourites.</p>
        <p>
          Collect all your favorite horses by clicking on the <AiOutlineHeart fontSize="25px" />
          while you browse.
        </p>
      </NoResultWishlist>
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
