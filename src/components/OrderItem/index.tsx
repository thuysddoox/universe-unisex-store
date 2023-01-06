import NextImage from '@components/NextImage';
import styled from '@emotion/styled';
import { CartItem } from '@interfaces';
import Button from '@ui/button';
import { Col, Row } from 'antd';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import { IoTrash } from 'react-icons/io5';
import { useDeleteCart, useAddToCart } from '../../network/queries/cart';
import { confirm } from '@ui/modal';
import messages from '@constants/messages';
import { SafeAny } from '../../interfaces/common';
import { Message } from '@ui/message';
import { UserContext } from '../../contexts/userContext';

const Quantity = dynamic(() => import('@components/Quantity'), { ssr: false });

const OrderItem = ({
  isCheckout = false,
  data,
  isDropdown = false,
  className,
  refetchCart,
}: {
  isCheckout?: boolean;
  isDropdown?: boolean;
  className?: string;
  data?: CartItem;
  refetchCart?: SafeAny;
}) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState<number>(data?.quantity ?? 1);
  const defaultImg = `${router.basePath}/assets/images/logo/default.png`;
  const { mutate: deleteCartFunc, isLoading } = useDeleteCart({
    onSuccess: (response) => {
      const error = response?.data?.error;
      if (response?.status === 200) {
        Message.success(messages.deletedProductFromCartSuccess);
        refetchCart?.();
      } else if (error) {
        Message.error(error?.message);
      }
    },
    onError: (error) => {
      console.log(error);
      Message.error(error?.response?.data?.message ?? error.message);
    },
  });
  const { mutate: updateToCartFunc, isLoading: isUpdateLoading } = useAddToCart({
    onSuccess: (response) => {
      const error = response?.data?.error;
      if (response?.status === 200) {
        Message.success(messages.updatedCartSuccess);
        refetchCart();
      } else if (error) {
        Message.error(error?.message);
      }
    },
    onError: (error) => {
      Message.error(error?.response?.data?.message ?? error.message);
    },
  });
  const handleAddToCart = () => {
    updateToCartFunc({ productId: data?.product?._id, quantity });
  };
  const handleDeleteCart = () => {
    confirm({
      title: 'Confirm',
      content: 'Do you really wanna delete this product from cart',
      onOk: () => {
        deleteCartFunc({ products: [data.product._id] });
      },
    });
  };
  useEffect(() => {
    if (quantity != data?.quantity) handleAddToCart();
  }, [quantity]);
  return (
    <OrderItemWrap className={`${isCheckout ? '' : 'p-4'} border-b border-gray-500 ${className}`}>
      <Row className="items-center">
        <Col span={isCheckout ? 6 : 5} className={`${isCheckout ? '' : 'py-4 px-2'} bg-gray-200 rounded-md`}>
          <NextImage
            src={data?.product?.thumbnails?.[0] ?? defaultImg}
            layout="fill"
            containerClass={`h-20 md:h-24 relative mx-auto lg:m-0 thumbnail ${isDropdown && 'h-10 md:h-14'}`}
          />
        </Col>
        <Col span={isCheckout ? 18 : 19} className="px-5">
          <div className="flex justify-between items-center">
            <h4 className={`${isCheckout || isDropdown ? 'text-base' : 'sm:text-base lg:text-lg'} font-semibold`}>
              {data?.product?.name ?? data?.product?.productName}
            </h4>
            {!isCheckout ? (
              <IoTrash className="text-red-600 text-2xl cursor-pointer" onClick={handleDeleteCart} />
            ) : (
              <></>
            )}
          </div>
          <div
            className={`${
              isCheckout || isDropdown ? 'text-xs mt-1' : 'mt-2 mb-1 text-sm'
            } text-gray-500 flex justify-between info`}
          >
            <span>
              Size: <span className="font-semibold text-black uppercase">{data?.product?.size}</span>
            </span>
            <span>
              Color: <span className="font-semibold text-black">{data?.product?.color}</span>
            </span>
          </div>
          <div
            className={`${isCheckout || isDropdown ? 'mt-1' : 'mt-4'} flex justify-between items-center flex-wrap mt-4`}
          >
            {!isCheckout ? (
              <Quantity maxQuantity={data?.product?.stock} quantity={quantity} setQuantity={setQuantity} />
            ) : (
              <></>
            )}
            <span className={`${isCheckout ? 'text-xs' : 'text-sm'} text-gray-500`}>
              {data?.product?.discount > 0 ? (
                <>
                  <span
                    className={`${
                      isCheckout ? 'text-base' : 'text-base md:text-lg'
                    } line-through font-semibold text-gray-500 mr-1`}
                  >
                    ${data?.product?.price}
                  </span>
                  <span className={`${isCheckout ? 'text-base' : 'text-lg md:text-xl'} font-semibold text-black mr-1`}>
                    ${(data?.product?.price * (100 - data?.product?.discount)) / 100}
                  </span>
                </>
              ) : (
                <span className={`${isCheckout ? 'text-base' : 'text-lg md:text-xl'} font-semibold text-black mr-1`}>
                  ${data?.product?.price}
                </span>
              )}
              x {quantity.toString().padStart(2, '0')}
            </span>
          </div>
        </Col>
      </Row>
    </OrderItemWrap>
  );
};
const OrderItemWrap = styled.div`
  .ant-input-number-lg input {
    height: 28px;
    font-size: 14px;
  }
  button {
    font-size: 10px;
  }
`;
export default OrderItem;
