import NextImage from '@components/NextImage';
import styled from '@emotion/styled';
import Button from '@ui/button';
import { Col, Row } from 'antd';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IoTrash } from 'react-icons/io5';
const Quantity = dynamic(() => import('@components/Quantity'), { ssr: false });

const OrderItem = ({ isCheckout = false ,className}: { isCheckout?: boolean, className?: string; }) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState<number>(1);
  return (
    <OrderItemWrap className={`${isCheckout ? '' : 'p-4'} border-b border-gray-500 ${className}`}>
      <Row className="items-center">
        <Col span={isCheckout ? 6 : 5} className={`${isCheckout ? '' : 'py-4 px-2'} bg-gray-200 rounded-md`}>
          <NextImage
            src={`${router.basePath}/assets/images/background/bg1.jpg`}
            layout="fill"
            containerClass="h-20 md:h-24 relative mx-auto lg:m-0 "
          />
        </Col>
        <Col span={isCheckout ? 18 : 19} className="px-5">
          <div className="flex justify-between items-center">
            <h4 className={`${isCheckout ? 'text-base' : 'sm:text-base lg:text-lg'} font-semibold`}>
              Jean with sequins
            </h4>
            {!isCheckout ? <IoTrash className="text-red-600 text-2xl cursor-pointer" /> : <></>}
          </div>
          <div className={`${isCheckout ? 'text-xs mt-1' : 'mt-2 mb-1 text-sm'} text-gray-500 flex justify-between `}>
            <span>
              Size: <span className="font-semibold text-black">XL</span>
            </span>
            <span>
              Color: <span className="font-semibold text-black">Blue</span>
            </span>
          </div>
          <div className={`${isCheckout ? 'mt-1' : 'mt-4'} flex justify-between items-center flex-wrap mt-4`}>
            {!isCheckout ? <Quantity quantity={quantity} setQuantity={setQuantity} /> : <></>}
            <span className={`${isCheckout ? 'text-xs' : 'text-sm'} text-gray-500`}>
              <span className={`${isCheckout ? 'text-base' : 'text-lg md:text-xl'} font-semibold text-black `}>
                $39.00
              </span>{' '}
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
