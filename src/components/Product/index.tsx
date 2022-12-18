import { useAddToCart, useQueryCart } from '@api/api';
import Favorite from '@components/Favorite';
import NextImage from '@components/NextImage';
import messages from '@constants/messages';
import styled from '@emotion/styled';
import { Product } from '@interfaces/common';
import Button from '@ui/button';
import { Message } from '@ui/message';
import { Card, Rate } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaShoppingCart } from 'react-icons/fa';
import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import { SafeAny } from '../../interfaces/common';

const ProductComponent = ({
  product,
  refetch,
  refetchCart,
}: {
  product?: Product;
  refetch?: SafeAny;
  refetchCart?: SafeAny;
}) => {
  const router = useRouter();
  const imgUrl = router.basePath + '/assets/images/background/default.png';
  const { currentUser } = useContext(UserContext);
  const { mutate: addToCartFunc, isLoading } = useAddToCart({
    onSuccess: (response) => {
      const cartDataResp = response?.data?.responseData;
      const error = response?.data?.error;
      if (cartDataResp) {
        Message.success(messages.addToCartSuccess);
        refetchCart?.();
      } else if (error) {
        Message.error(error?.message);
      }
    },
    onError: (error) => {
      Message.error(error?.response?.data?.message ?? error.message);
    },
  });
  const handleAddToCart = () => {
    if (currentUser) {
      addToCartFunc({ productId: product?._id, quantity: 1 });
    } else Message.warning(messages.loginRequired);
  };
  console.log('render');
  return (
    <ProductWrap className="w-full py-4 px-2">
      <Card hoverable className="card relative">
        {/* <Link href={`/product/${product?._id}`} passHref> */}
        <div className="product-thumbnail cursor-default">
          <NextImage
            src={product?.thumbnails[0] ?? imgUrl}
            layout="fill"
            objectFit="contain"
            containerClass="h-[200px] lg:h-[250px] relative w-full relative"
          />
        </div>
        {/* </Link> */}
        {product?.discount > 0 && (
          <span className="px-3 text-xs py-1 rounded absolute top-5 text-red-600 bg-red-50 font-medium shadow">
            SALE
          </span>
        )}
        <Favorite
          isFavorite={product?.isFavorite}
          productId={product?._id}
          containerClass={'right-0 mr-5 top-5 -translate-y-1 shadow rounded-circle'}
          refetch={refetch}
        />
        <div className="product-info p-2">
          <Link href={`/product/${product?._id}`} passHref>
            <a>
              <h3 className="product-name transition-all font-semibold my-4 text-base">{product?.name}</h3>
            </a>
          </Link>
          <div className="flex justify-between flex-wrap items-center py-4 border-t-2 border-blue-700">
            <div>
              <span className="font-medium text-blue-800 line-through text-gray-500 text-sm">${product?.price}</span>
              <span className="font-semibold text-red-600 text-base ml-2">
                ${(product?.price * (100 - product?.discount)) / 100}
              </span>
            </div>

            <Rate
              allowClear={true}
              disabled={true}
              defaultValue={product?.rate ?? 0}
              allowHalf={true}
              className={'text-sm'}
            />
          </div>
          <Button borderradius={'3px'} loading={isLoading} disabled={product?.stock < 1} className="w-full btn-add">
            <div className="flex items-center" onClick={handleAddToCart}>
              <FaShoppingCart className="text-lg" />
              <span className="ml-2 font-medium">Add to cart</span>
            </div>
          </Button>
        </div>
      </Card>
    </ProductWrap>
  );
};
const ProductWrap = styled.div`
  .card {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
  }
  &:hover {
    .card {
      box-shadow: 1px 1px 5px rgba(59, 130, 246, 1);
      border: 1px solid rgba(59, 130, 246, 0.5);
    }
    .product-name {
      color: var(--navy);
    }
    .btn-add {
      display: flex;
    }
  }
  h3.product-name {
    ${(props) => props.theme.mixin.cutString(1.25)};
    &:hover {
      color: var(--navy);
    }
  }
`;
export default ProductComponent;
