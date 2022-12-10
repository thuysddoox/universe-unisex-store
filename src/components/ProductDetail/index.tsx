import React, { useContext, useState } from 'react';
import styled from '@emotion/styled';
import { Rate } from 'antd';
import ShareOnSocials from '@components/ShareOnSocials';
import Favorite from '@components/Favorite';
import { RadioGroup } from '@ui/radio';
// import Quantity from "@components/Quantity";
import { FaShoppingCart } from 'react-icons/fa';
import Button from '@ui/button';
import dynamic from 'next/dynamic';
import { Product } from '@interfaces/common';
import { useAddToCart, useQueryCart } from '@api/api';
import { UserContext } from '@contexts';
import messages from '@constants/messages';
import { Message } from '@ui/message';
const Quantity = dynamic(() => import('@components/Quantity'), { ssr: false });
const ProductDetail = ({ product }: { product: Product }) => {
  const colors = [
    { value: 'red', label: <span className={`m-1 bg-blue-400 w-5 h-5 block rounded-circle`}></span> },
    { value: 'green', label: <span className={`m-1 bg-blue-400 w-5 h-5 block rounded-circle`}></span> },
    { value: 'blue', label: <span className={`m-1 bg-blue-400 w-5 h-5 block rounded-circle`}></span> },
    { value: 'yellow', label: <span className={`m-1 bg-blue-400 w-5 h-5 block rounded-circle`}></span> },
  ];
  const [quantity, setQuantity] = useState<number>(1);
  const { currentUser } = useContext(UserContext);
  // const { data: CartResp, refetch } = useQueryCart();
  const { mutate: addToCartFunc, isLoading } = useAddToCart({
    onSuccess: (response) => {
      const cartDataResp = response?.data?.responseData;
      const error = response?.data?.error;
      if (cartDataResp) {
        Message.success(messages.addToCartSuccess);
        // refetch();
      } else if (error) {
        Message.error(error?.message);
      }
    },
    onError: (error) => {
      Message.error(error?.response?.data?.message ?? error.message);
    },
  });
  const handleAddToCart = () => {
    if (currentUser) addToCartFunc({ productId: product?._id, quantity: quantity });
    else Message.warning(messages.loginRequired);
  };
  return (
    <ProductDetailWrap className="mt-8 md:mt-0">
      <h3 className="product-title text-xl md:text-2xl lg:text-3xl font-semibold mb-4 md:mb-0">{product?.name}</h3>
      <div className="flex items-center justify-between">
        <div>
          <Rate allowClear={true} defaultValue={3} allowHalf={true} className={'text-sm'} />
          <span className="text-sm text-gray-500">| Đã Bán {product?.sold ?? 0}</span>
        </div>
        <div className="flex">
          <Favorite
            isFavorite={false}
            productId={product?._id}
            containerClass="relative text-red-500 mr-4"
            heartClass="text-sm py-1 px-2"
          />
          <ShareOnSocials shareUrl={''} />
        </div>
      </div>
      <div>
        <div>
          <span className="font-medium text-blue-800 line-through text-gray-500 text-base md:text-xl lg:text-2xl">
            ${product?.price}
          </span>
          <span className="font-semibold text-red-600 ml-2 text-xl md:text-2xl lg:text-3xl">
            {' '}
            ${(product?.price * (100 - product?.discount)) / 100}
          </span>
        </div>
        <RadioGroup
          options={colors}
          size="large"
          label="Color"
          buttonStyle="solid"
          optionType="button"
          containerClass="color-picker"
        />
        <RadioGroup options={['s', 'm', 'l', 'xl']} label="Size" optionType="button" buttonStyle="solid" />
        <Quantity maxQuantity={product?.stock} quantity={quantity} setQuantity={setQuantity} containClass="mt-4" />
        <div className="flex items-center justify-between font-medium text-lg my-4">
          <span>Subtotal</span>
          <span>${(((product?.price * (100 - product?.discount)) / 100) * quantity).toFixed(2)}</span>
        </div>
        <Button borderradius={'3px'} className="w-1/2" loading={isLoading}>
          <div className="flex items-center" onClick={handleAddToCart}>
            <FaShoppingCart className="text-lg" />
            <span className="ml-2 text-base font-medium">Add to cart</span>
          </div>
        </Button>
        {/* <span>add to cart/ out of stock</span> */}
      </div>
    </ProductDetailWrap>
  );
};
const ProductDetailWrap = styled.div``;
export default ProductDetail;
